# reCAPTCHA Enterprise Integration with Node.js Backend

This directory contains the reCAPTCHA Enterprise integration that works with your Node.js backend for secure form validation.

## Setup Instructions

### 1. Google Cloud Console Setup

1. **Create a Google Cloud Project** (if you don't have one):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable reCAPTCHA Enterprise API**:
   - Navigate to APIs & Services > Library
   - Search for "reCAPTCHA Enterprise API"
   - Click "Enable"

3. **Create Service Account**:
   - Go to IAM & Admin > Service Accounts
   - Create a new service account
   - Download the JSON key file
   - Grant "reCAPTCHA Enterprise Agent" role

4. **Create reCAPTCHA Site Key**:
   - Go to reCAPTCHA Enterprise in the console
   - Click "Create Key"
   - Choose "Score-based (v3)" for better user experience
   - Add your domain(s)
   - Copy the site key

### 2. Backend Setup

1. **Install Dependencies**:
   ```bash
   npm install @google-cloud/recaptcha-enterprise express cors dotenv
   ```

2. **Environment Configuration** (Backend `.env`):
   ```env
   GOOGLE_CLOUD_PROJECT_ID=anir0y
   RECAPTCHA_SITE_KEY=6LcSV48qAAAAAM6snEXZd57ePDOtv05HWAIZathr
   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
   PORT=3000
   ```

3. **Start Backend Server**:
   ```bash
   node server.js
   ```

### 3. Frontend Environment Configuration

Create a `.env` file in your frontend project root:

```env
VITE_RECAPTCHA_SITE_KEY=your-site-key-here
VITE_BACKEND_URL=http://localhost:3000
```

### 4. Security Considerations

**✅ Secure Implementation**: This setup properly separates concerns:

1. **✅ Backend handles all Google API calls**
2. **✅ No API keys exposed in frontend**
3. **✅ Server-side verification only**
4. **✅ Proper authentication with service account**

### 5. API Endpoints

Your Node.js backend provides these endpoints:

- **POST `/api/recaptcha/assess`** - Verify reCAPTCHA tokens
- **POST `/api/contact`** - Contact form with reCAPTCHA validation
- **GET `/api/health`** - Health check endpoint

### 6. Usage in Components

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
    
    // Token is automatically sent to your backend for verification
    // ... rest of form submission logic
  };
};
```

### 7. Score Interpretation

reCAPTCHA Enterprise returns a score from 0.0 to 1.0:
- **1.0**: Very likely a good interaction
- **0.9**: Likely a good interaction  
- **0.7**: Possibly a good interaction
- **0.5**: Neutral (default threshold)
- **0.3**: Possibly a bad interaction
- **0.1**: Likely a bad interaction
- **0.0**: Very likely a bot

Adjust the minimum score threshold based on your security requirements.

### 8. Testing

- **Development**: Use localhost domains in reCAPTCHA console
- **Staging**: Add staging domain to allowed domains
- **Production**: Add production domain to allowed domains

### 9. Deployment

**Backend Deployment Options:**
- **Google Cloud Run** - Recommended for Google Cloud integration
- **Heroku** - Easy deployment with environment variables
- **AWS Lambda** - Serverless option
- **DigitalOcean App Platform** - Simple container deployment

**Environment Variables for Production:**
```env
GOOGLE_CLOUD_PROJECT_ID=anir0y
RECAPTCHA_SITE_KEY=6LcSV48qAAAAAM6snEXZd57ePDOtv05HWAIZathr
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...}
PORT=3000
NODE_ENV=production
```

### 10. Monitoring

Monitor your reCAPTCHA usage in the Google Cloud Console:
- Go to reCAPTCHA Enterprise
- View metrics and analytics
- Set up alerts for unusual activity