const express = require('express');
const cors = require('cors');
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
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
    // Create the reCAPTCHA client
    const client = new RecaptchaEnterpriseServiceClient();
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
    });

    // Create assessment
    const result = await createAssessment({
      token,
      recaptchaAction,
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
  });
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
  console.log(`reCAPTCHA Enterprise Backend running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/api/health`);
  console.log(`reCAPTCHA endpoint: http://localhost:${port}/api/recaptcha/assess`);
});

module.exports = app;