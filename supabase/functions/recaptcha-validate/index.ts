import { RecaptchaEnterpriseServiceClient } from 'npm:@google-cloud/recaptcha-enterprise@6.3.1';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RecaptchaRequest {
  token: string;
  recaptchaAction: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { token, recaptchaAction }: RecaptchaRequest = await req.json();

    if (!token || !recaptchaAction) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: token and recaptchaAction',
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const projectID = 'anir0y';
    const recaptchaKey = '6LcSV48qAAAAAM6snEXZd57ePDOtv05HWAIZathr';

    const credentialsJson = Deno.env.get('GOOGLE_APPLICATION_CREDENTIALS_JSON');
    
    if (!credentialsJson) {
      console.error('GOOGLE_APPLICATION_CREDENTIALS_JSON not found in environment');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Server configuration error: Missing credentials',
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const credentials = JSON.parse(credentialsJson);

    const client = new RecaptchaEnterpriseServiceClient({
      credentials: credentials,
    });

    const projectPath = client.projectPath(projectID);

    const request = {
      assessment: {
        event: {
          token: token,
          siteKey: recaptchaKey,
        },
      },
      parent: projectPath,
    };

    const [response] = await client.createAssessment(request);

    if (!response.tokenProperties?.valid) {
      const invalidReason = response.tokenProperties?.invalidReason || 'Unknown';
      console.log(`Token validation failed: ${invalidReason}`);
      
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid token',
          reason: invalidReason,
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (response.tokenProperties?.action !== recaptchaAction) {
      console.log('Action mismatch');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Action mismatch',
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const score = response.riskAnalysis?.score || 0;
    const reasons = response.riskAnalysis?.reasons || [];

    console.log(`reCAPTCHA validation successful. Score: ${score}`);

    return new Response(
      JSON.stringify({
        success: true,
        score: score,
        reasons: reasons,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('reCAPTCHA validation error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});