import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SITE_KEY = "6LcSV48qAAAAAM6snEXZd57ePDOtv05HWAIZathr";

interface RecaptchaRequest {
  token: string;
  recaptchaAction: string;
}

async function getSecretKeyFromDb(): Promise<string | null> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return null;
  }

  const url = `${supabaseUrl}/rest/v1/app_secrets?key=eq.RECAPTCHA_LEGACY_SECRET&select=value&limit=1`;

  const res = await fetch(url, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    console.error("DB fetch failed:", res.status, await res.text());
    return null;
  }

  const rows = await res.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    console.error("No secret key found in app_secrets table");
    return null;
  }

  return rows[0].value;
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
        {
          success: false,
          error: "Missing required fields: token and recaptchaAction",
        },
        400
      );
    }

    const secretKey = await getSecretKeyFromDb();

    if (!secretKey) {
      return jsonResponse(
        { success: false, error: "Server configuration error" },
        500
      );
    }

    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    const params = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    const verifyRes = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!verifyRes.ok) {
      console.error("siteverify error:", verifyRes.status, await verifyRes.text());
      return jsonResponse(
        { success: false, error: "Verification request failed" },
        500
      );
    }

    const result = await verifyRes.json();

    if (!result.success) {
      return jsonResponse(
        {
          success: false,
          error: "Verification failed",
          errorCodes: result["error-codes"] || [],
        },
        400
      );
    }

    if (result.action && result.action !== recaptchaAction) {
      return jsonResponse({ success: false, error: "Action mismatch" }, 400);
    }

    const score = result.score || 0;

    return jsonResponse({ success: true, score });
  } catch (error) {
    console.error("reCAPTCHA validation error:", error);
    return jsonResponse(
      { success: false, error: "Internal server error" },
      500
    );
  }
});
