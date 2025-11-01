require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://anir0y.in', 'https://anir0y-anir0y-github-7k35.bolt.host'],
  credentials: true
}));
app.use(express.json());

// reCAPTCHA configuration
const RECAPTCHA_CONFIG = {
  projectID: process.env.GOOGLE_CLOUD_PROJECT_ID || "anir0y",
  recaptchaKey: process.env.RECAPTCHA_SITE_KEY || "6LcSV48qAAAAAM6snEXZd57ePDOtv05HWAIZathr",
};

/**
 * Create an assessment to analyze the risk of a UI action.
 */
async function createAssessment({
  projectID = RECAPTCHA_CONFIG.projectID,
  recaptchaKey = RECAPTCHA_CONFIG.recaptchaKey,
  token,
  recaptchaAction,
}) {
  try {
    // For development/testing without Google Cloud credentials
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && !process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      console.log('⚠️ No Google Cloud credentials found - using mock validation for development');

      // Mock validation for development
      if (!token || token.length < 10) {
        return {
          success: false,
          error: 'Invalid token format',
        };
      }

      // Return mock successful response
      return {
        success: true,
        score: 0.9, // Mock high score
        reasons: [],
        mock: true,
      };
    }

    // Parse credentials if provided as JSON string
    let clientOptions = {};
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      try {
        const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        clientOptions = {
          credentials: credentials
        };
      } catch (parseError) {
        console.error('Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON:', parseError.message);
        throw new Error('Invalid credentials format');
      }
    }

    // Create the reCAPTCHA client
    const client = new RecaptchaEnterpriseServiceClient(clientOptions);
    const projectPath = client.projectPath(projectID);

    // Build the assessment request
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

    // Check if the token is valid
    if (!response.tokenProperties.valid) {
      console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
      return {
        success: false,
        invalidReason: response.tokenProperties.invalidReason,
      };
    }

    // Check if the expected action was executed
    if (response.tokenProperties.action === recaptchaAction) {
      // Get the risk score and the reason(s)
      console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
      
      const reasons = [];
      if (response.riskAnalysis.reasons) {
        response.riskAnalysis.reasons.forEach((reason) => {
          console.log(reason);
          reasons.push(reason);
        });
      }

      return {
        success: true,
        score: response.riskAnalysis.score,
        reasons: reasons,
      };
    } else {
      console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
      return {
        success: false,
        error: "Action mismatch",
      };
    }
  } catch (error) {
    console.error('reCAPTCHA assessment error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// API endpoint for reCAPTCHA assessment
app.post('/api/recaptcha/assess', async (req, res) => {
  try {
    const { token, recaptchaAction, userIpAddress, userAgent } = req.body;

    // Validate required fields
    if (!token || !recaptchaAction) {
      return res.status(400).json({
        success: false,
        error: 'Token and recaptchaAction are required',
      });
    }

    // Log request details for debugging
    console.log('reCAPTCHA Assessment Request:', {
      action: recaptchaAction,
      userIP: userIpAddress || req.ip,
      userAgent: userAgent || req.get('User-Agent'),
      tokenLength: token.length,
    });

    // Create assessment
    const result = await createAssessment({
      token,
      recaptchaAction,
    });

    // Log result for debugging
    console.log('Assessment Result:', {
      success: result.success,
      score: result.score,
      mock: result.mock || false,
    });

    // Return result
    res.json(result);

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'reCAPTCHA Enterprise Backend',
    config: {
      projectID: RECAPTCHA_CONFIG.projectID,
      siteKey: RECAPTCHA_CONFIG.recaptchaKey,
      hasCredentials: !!(process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON),
    },
  });
});

// RSS feed proxy endpoint
app.get('/api/proxy/rss', async (req, res) => {
  try {
    const rssUrl = 'https://anir0y.cronitorstatus.com/history/rss';

    console.log('Fetching RSS feed from:', rssUrl);

    const response = await fetch(rssUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StatusFeedBot/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });

    if (!response.ok) {
      throw new Error(`RSS feed request failed with status: ${response.status}`);
    }

    const xmlText = await response.text();

    res.set({
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=300',
    });

    res.send(xmlText);

  } catch (error) {
    console.error('RSS proxy error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch RSS feed',
      details: error.message,
    });
  }
});

// Contact form endpoint (example)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, recaptchaToken } = req.body;

    // Verify reCAPTCHA first
    const recaptchaResult = await createAssessment({
      token: recaptchaToken,
      recaptchaAction: 'contact_form',
    });

    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      return res.status(400).json({
        success: false,
        error: 'reCAPTCHA verification failed',
        score: recaptchaResult.score,
      });
    }

    // Process the contact form (save to database, send email, etc.)
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      recaptchaScore: recaptchaResult.score,
    });

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json({
      success: true,
      message: 'Contact form submitted successfully',
      recaptchaScore: recaptchaResult.score,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process contact form',
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 reCAPTCHA Enterprise Backend running on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
  console.log(`🔒 reCAPTCHA endpoint: http://localhost:${port}/api/recaptcha/assess`);
  console.log(`🌐 CORS enabled for: http://localhost:5173, https://anir0y.in`);
  
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && !process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    console.log('⚠️  Running in DEVELOPMENT MODE with mock validation');
    console.log('   Set GOOGLE_APPLICATION_CREDENTIALS for production use');
  }
});

module.exports = app;