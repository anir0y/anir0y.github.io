interface RecaptchaVerificationRequest {
  token: string;
  expectedAction: string;
  userIpAddress?: string;
  userAgent?: string;
}

interface RecaptchaVerificationResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  error_codes?: string[];
  risk_analysis?: {
    score: number;
    reasons: string[];
  };
}

interface BackendAssessmentRequest {
  token: string;
  recaptchaAction: string;
  userIpAddress?: string;
  userAgent?: string;
}

interface BackendAssessmentResponse {
  success: boolean;
  score?: number;
  reasons?: string[];
  error?: string;
  invalidReason?: string;
}

export class RecaptchaService {
  private backendUrl: string;
  private siteKey: string;

  constructor(backendUrl: string, siteKey: string) {
    this.backendUrl = backendUrl;
    this.siteKey = siteKey;
  }

  /**
   * Verify reCAPTCHA token using your Node.js backend
   */
  async verifyToken(request: RecaptchaVerificationRequest): Promise<RecaptchaVerificationResponse> {
    const payload: BackendAssessmentRequest = {
      token: request.token,
      recaptchaAction: request.expectedAction,
      userIpAddress: request.userIpAddress,
      userAgent: request.userAgent,
    };

    try {
      const response = await fetch(`${this.backendUrl}/api/recaptcha/assess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BackendAssessmentResponse = await response.json();

      return {
        success: data.success,
        score: data.score,
        action: request.expectedAction,
        challenge_ts: new Date().toISOString(),
        hostname: window.location.hostname,
        error_codes: data.error ? [data.error] : data.invalidReason ? [data.invalidReason] : [],
        risk_analysis: {
          score: data.score || 0,
          reasons: data.reasons || [],
        },
      };
    } catch (error) {
      console.error('reCAPTCHA verification failed:', error);
      return {
        success: false,
        error_codes: ['network-error'],
      };
    }
  }

  /**
   * Client-side helper to get user IP (requires additional service)
   */
  async getUserIP(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Failed to get user IP:', error);
      return null;
    }
  }

  /**
   * Validate reCAPTCHA score and action
   */
  isValidAssessment(
    response: RecaptchaVerificationResponse,
    expectedAction: string,
    minScore: number = 0.5
  ): boolean {
    if (!response.success) {
      return false;
    }

    if (response.action !== expectedAction) {
      console.warn(`Action mismatch: expected ${expectedAction}, got ${response.action}`);
      return false;
    }

    if (response.score !== undefined && response.score < minScore) {
      console.warn(`Score too low: ${response.score} < ${minScore}`);
      return false;
    }

    return true;
  }
}

// Environment configuration
export const getRecaptchaConfig = () => {
  return {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LcSV48qAAAAAM6snEXZd57ePDOtv05HWAIZathr',
    backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
  };
};