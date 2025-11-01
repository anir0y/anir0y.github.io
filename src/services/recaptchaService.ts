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

export class RecaptchaService {
  private projectId: string;
  private apiKey: string;
  private siteKey: string;

  constructor(projectId: string, apiKey: string, siteKey: string) {
    this.projectId = projectId;
    this.apiKey = apiKey;
    this.siteKey = siteKey;
  }

  /**
   * Verify reCAPTCHA token using Google reCAPTCHA Enterprise API
   */
  async verifyToken(request: RecaptchaVerificationRequest): Promise<RecaptchaVerificationResponse> {
    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${this.projectId}/assessments?key=${this.apiKey}`;

    const payload = {
      event: {
        token: request.token,
        expectedAction: request.expectedAction,
        siteKey: this.siteKey,
        userIpAddress: request.userIpAddress,
        userAgent: request.userAgent,
      },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        success: data.tokenProperties?.valid || false,
        score: data.riskAnalysis?.score,
        action: data.tokenProperties?.action,
        challenge_ts: data.tokenProperties?.createTime,
        hostname: data.tokenProperties?.hostname,
        error_codes: data.tokenProperties?.invalidReason ? [data.tokenProperties.invalidReason] : [],
        risk_analysis: {
          score: data.riskAnalysis?.score || 0,
          reasons: data.riskAnalysis?.reasons || [],
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
    projectId: import.meta.env.VITE_RECAPTCHA_PROJECT_ID || 'your-project-id',
    apiKey: import.meta.env.VITE_RECAPTCHA_API_KEY || 'your-api-key',
  };
};