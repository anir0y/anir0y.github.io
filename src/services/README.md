# reCAPTCHA Enterprise Integration

This directory contains the reCAPTCHA Enterprise integration for secure form validation.

## Setup Instructions

### 1. Google Cloud Console Setup

1. **Create a Google Cloud Project** (if you don't have one):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable reCAPTCHA Enterprise API**:
   - Navigate to APIs & Services > Library
   - Search for "reCAPTCHA Enterprise API"
   - Click "Enable"

3. **Create API Key**:
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "API Key"
   - Copy the API key for later use

4. **Create reCAPTCHA Site Key**:
   - Go to reCAPTCHA Enterprise in the console
   - Click "Create Key"
   - Choose "Score-based (v3)" for better user experience
   - Add your domain(s)
   - Copy the site key

### 2. Environment Configuration

Create a `.env` file in your project root:

```env
VITE_RECAPTCHA_SITE_KEY=your-site-key-here
VITE_RECAPTCHA_PROJECT_ID=your-project-id-here
VITE_RECAPTCHA_API_KEY=your-api-key-here
```

### 3. Security Considerations

**Important**: The current implementation includes the API key in the frontend for demonstration purposes. In production, you should:

1. **Move API calls to your backend server**
2. **Never expose API keys in frontend code**
3. **Use server-side verification only**

### 4. Production Backend Implementation

For production, create a backend endpoint like this:

```javascript
// Example Node.js/Express endpoint
app.post('/api/verify-recaptcha', async (req, res) => {
  const { token, action } = req.body;
  
  const response = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID}/assessments?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: {
          token,
          expectedAction: action,
          siteKey: SITE_KEY,
          userIpAddress: req.ip,
          userAgent: req.get('User-Agent'),
        },
      }),
    }
  );
  
  const data = await response.json();
  
  // Validate the response
  const isValid = data.tokenProperties?.valid && 
                  data.tokenProperties?.action === action &&
                  data.riskAnalysis?.score >= 0.5;
  
  res.json({ success: isValid, score: data.riskAnalysis?.score });
});
```

### 5. Usage in Components

The reCAPTCHA integration is already set up in the ContactForm component. To use it in other forms:

```tsx
import { useRecaptcha } from '../components/RecaptchaProvider';

const MyForm = () => {
  const { executeRecaptcha } = useRecaptcha();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = await executeRecaptcha('my_action');
    if (!token) {
      // Handle reCAPTCHA failure
      return;
    }
    
    // Send token to your backend for verification
    // ... rest of form submission logic
  };
};
```

### 6. Score Interpretation

reCAPTCHA Enterprise returns a score from 0.0 to 1.0:
- **1.0**: Very likely a good interaction
- **0.9**: Likely a good interaction  
- **0.7**: Possibly a good interaction
- **0.5**: Neutral (default threshold)
- **0.3**: Possibly a bad interaction
- **0.1**: Likely a bad interaction
- **0.0**: Very likely a bot

Adjust the minimum score threshold based on your security requirements.

### 7. Testing

- **Development**: Use localhost domains in reCAPTCHA console
- **Staging**: Add staging domain to allowed domains
- **Production**: Add production domain to allowed domains

### 8. Monitoring

Monitor your reCAPTCHA usage in the Google Cloud Console:
- Go to reCAPTCHA Enterprise
- View metrics and analytics
- Set up alerts for unusual activity