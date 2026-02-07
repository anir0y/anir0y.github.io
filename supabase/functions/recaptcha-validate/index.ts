import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const PROJECT_ID = "anir0y";
const SITE_KEY = "6LcSV48qAAAAAM6snEXZd57ePDOtv05HWAIZathr";

interface RecaptchaRequest {
  token: string;
  recaptchaAction: string;
}

function base64UrlEncode(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlEncodeStr(str: string): string {
  return base64UrlEncode(new TextEncoder().encode(str));
}

async function getAccessToken(credentials: {
  client_email: string;
  private_key: string;
  token_uri: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const header = base64UrlEncodeStr(
    JSON.stringify({ alg: "RS256", typ: "JWT" })
  );
  const payload = base64UrlEncodeStr(
    JSON.stringify({
      iss: credentials.client_email,
      scope: "https://www.googleapis.com/auth/cloud-platform",
      aud: credentials.token_uri,
      iat: now,
      exp: now + 3600,
    })
  );

  const signingInput = `${header}.${payload}`;

  const pemBody = credentials.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "");

  const binaryKey = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const jwt = `${signingInput}.${base64UrlEncode(signature)}`;

  const res = await fetch(credentials.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!res.ok) {
    throw new Error(`Token exchange failed: ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token;
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { token, recaptchaAction }: RecaptchaRequest = await req.json();

    if (!token || !recaptchaAction) {
      return jsonResponse(
        { success: false, error: "Missing required fields: token and recaptchaAction" },
        400
      );
    }

    const credentialsJson = Deno.env.get("GOOGLE_APPLICATION_CREDENTIALS_JSON");
    if (!credentialsJson) {
      console.error("GOOGLE_APPLICATION_CREDENTIALS_JSON not set");
      return jsonResponse({ success: false, error: "Server configuration error" }, 500);
    }

    const credentials = JSON.parse(credentialsJson);
    const accessToken = await getAccessToken(credentials);

    const assessmentUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID}/assessments`;

    const assessmentRes = await fetch(assessmentUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: {
          token,
          expectedAction: recaptchaAction,
          siteKey: SITE_KEY,
        },
      }),
    });

    if (!assessmentRes.ok) {
      console.error("Assessment API error:", await assessmentRes.text());
      return jsonResponse({ success: false, error: "Assessment request failed" }, 500);
    }

    const assessment = await assessmentRes.json();

    if (!assessment.tokenProperties?.valid) {
      return jsonResponse(
        {
          success: false,
          error: "Invalid token",
          reason: assessment.tokenProperties?.invalidReason || "Unknown",
        },
        400
      );
    }

    if (assessment.tokenProperties?.action !== recaptchaAction) {
      return jsonResponse({ success: false, error: "Action mismatch" }, 400);
    }

    const score = assessment.riskAnalysis?.score || 0;
    const reasons = assessment.riskAnalysis?.reasons || [];

    console.log(`reCAPTCHA validated - Score: ${score}`);

    return jsonResponse({ success: true, score, reasons });
  } catch (error) {
    console.error("reCAPTCHA validation error:", error);
    return jsonResponse({ success: false, error: "Internal server error" }, 500);
  }
});
