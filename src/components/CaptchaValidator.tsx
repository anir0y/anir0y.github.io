import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertCircle, RefreshCw, Globe, Key, Server } from 'lucide-react';

interface CaptchaStatus {
  scriptLoaded: boolean;
  apiReady: boolean;
  siteKeyValid: boolean;
  domainWhitelisted: boolean;
  tokenGenerated: boolean;
  serverValidation: boolean;
  score: number | null;
  errors: string[];
  warnings: string[];
}

export const CaptchaValidator: React.FC = () => {
  const [status, setStatus] = useState<CaptchaStatus>({
    scriptLoaded: false,
    apiReady: false,
    siteKeyValid: false,
    domainWhitelisted: false,
    tokenGenerated: false,
    serverValidation: false,
    score: null,
    errors: [],
    warnings: []
  });
  
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    runDiagnostics();
  }, []);

  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    const newStatus: CaptchaStatus = {
      scriptLoaded: false,
      apiReady: false,
      siteKeyValid: false,
      domainWhitelisted: false,
      tokenGenerated: false,
      serverValidation: false,
      score: null,
      errors: [],
      warnings: []
    };

    addTestResult('🔍 Starting CAPTCHA diagnostics...');

    // 1. Check if reCAPTCHA script is loaded
    try {
      if (typeof window.grecaptcha !== 'undefined') {
        newStatus.scriptLoaded = true;
        addTestResult('✅ reCAPTCHA script loaded successfully');
      } else {
        newStatus.errors.push('reCAPTCHA script not loaded');
        addTestResult('❌ reCAPTCHA script not found');
      }
    } catch (error) {
      newStatus.errors.push(`Script check failed: ${error}`);
      addTestResult('❌ Script check failed');
    }

    // 2. Check site key configuration
    if (!siteKey || siteKey === 'your-recaptcha-site-key') {
      newStatus.errors.push('Invalid or missing site key');
      addTestResult('❌ Site key not configured');
    } else {
      newStatus.siteKeyValid = true;
      addTestResult('✅ Site key configured');
    }

    // 3. Test reCAPTCHA API readiness
    if (newStatus.scriptLoaded && window.grecaptcha) {
      try {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Timeout')), 5000);
          
          window.grecaptcha.ready(() => {
            clearTimeout(timeout);
            newStatus.apiReady = true;
            addTestResult('✅ reCAPTCHA API ready');
            resolve();
          });
        });
      } catch (error) {
        newStatus.errors.push('reCAPTCHA API not ready');
        addTestResult('❌ reCAPTCHA API timeout');
      }
    }

    // 4. Test token generation
    if (newStatus.apiReady && newStatus.siteKeyValid) {
      try {
        const token = await window.grecaptcha.execute(siteKey, { action: 'diagnostic_test' });
        if (token) {
          newStatus.tokenGenerated = true;
          addTestResult('✅ Token generated successfully');
          
          // 5. Test server-side validation
          try {
            const response = await fetch(`${backendUrl}/api/recaptcha/assess`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token,
                recaptchaAction: 'diagnostic_test'
              })
            });

            if (response.ok) {
              const result = await response.json();
              if (result.success) {
                newStatus.serverValidation = true;
                newStatus.score = result.score;
                addTestResult(`✅ Server validation successful (Score: ${result.score})`);
                
                if (result.score < 0.5) {
                  newStatus.warnings.push('Low CAPTCHA score detected');
                  addTestResult('⚠️ Low CAPTCHA score - may indicate bot activity');
                }
              } else {
                newStatus.errors.push(`Server validation failed: ${result.error}`);
                addTestResult('❌ Server validation failed');
              }
            } else {
              newStatus.errors.push(`Server responded with ${response.status}`);
              addTestResult(`❌ Server error: ${response.status}`);
            }
          } catch (error) {
            newStatus.errors.push(`Backend connection failed: ${error}`);
            addTestResult('❌ Backend connection failed');
          }
        } else {
          newStatus.errors.push('Token generation returned empty result');
          addTestResult('❌ Empty token received');
        }
      } catch (error) {
        newStatus.errors.push(`Token generation failed: ${error}`);
        addTestResult('❌ Token generation failed');
      }
    }

    // 6. Domain whitelist check (heuristic)
    const currentDomain = window.location.hostname;
    if (currentDomain === 'localhost' || currentDomain.includes('127.0.0.1')) {
      newStatus.warnings.push('Running on localhost - ensure domain is whitelisted for production');
      addTestResult('⚠️ Localhost detected - check domain whitelist');
    } else {
      newStatus.domainWhitelisted = true;
      addTestResult('✅ Production domain detected');
    }

    setStatus(newStatus);
    setIsRunning(false);
    addTestResult('🏁 Diagnostics complete');
  };

  const getOverallStatus = () => {
    const criticalIssues = status.errors.length;
    const warnings = status.warnings.length;
    
    if (criticalIssues === 0 && status.serverValidation) {
      return { status: 'OPERATIONAL', color: 'text-green-400', icon: CheckCircle };
    } else if (criticalIssues === 0 && warnings > 0) {
      return { status: 'WARNING', color: 'text-yellow-400', icon: AlertCircle };
    } else {
      return { status: 'ERROR', color: 'text-red-400', icon: AlertCircle };
    }
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="tech-card">
        <div className="tech-card-header">
          <span className="text-cyan-400 font-mono text-sm">// CAPTCHA_DIAGNOSTICS</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white font-mono">
            <span className="text-cyan-400">&gt;</span> SYSTEM_STATUS
          </h3>
          <div className="flex items-center space-x-2">
            <overallStatus.icon className={overallStatus.color} size={20} />
            <span className={`font-mono text-sm ${overallStatus.color}`}>
              {overallStatus.status}
            </span>
          </div>
        </div>

        <button
          onClick={runDiagnostics}
          disabled={isRunning}
          className="w-full px-4 py-2 bg-cyan-600/20 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-600/30 rounded font-mono text-sm transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <RefreshCw className={isRunning ? 'animate-spin' : ''} size={16} />
          <span>{isRunning ? 'RUNNING_DIAGNOSTICS...' : 'RUN_DIAGNOSTICS'}</span>
        </button>
      </div>

      {/* Detailed Status */}
      <div className="tech-card">
        <div className="tech-card-header">
          <span className="text-purple-400 font-mono text-sm">// DETAILED_STATUS</span>
        </div>
        
        <div className="space-y-3">
          <StatusItem 
            icon={Globe}
            label="SCRIPT_LOADED"
            status={status.scriptLoaded}
            error={status.errors.find(e => e.includes('script'))}
          />
          <StatusItem 
            icon={Key}
            label="SITE_KEY_VALID"
            status={status.siteKeyValid}
            error={status.errors.find(e => e.includes('site key'))}
          />
          <StatusItem 
            icon={Shield}
            label="API_READY"
            status={status.apiReady}
            error={status.errors.find(e => e.includes('API'))}
          />
          <StatusItem 
            icon={CheckCircle}
            label="TOKEN_GENERATED"
            status={status.tokenGenerated}
            error={status.errors.find(e => e.includes('token') || e.includes('Token'))}
          />
          <StatusItem 
            icon={Server}
            label="SERVER_VALIDATION"
            status={status.serverValidation}
            error={status.errors.find(e => e.includes('Server') || e.includes('Backend'))}
          />
          
          {status.score !== null && (
            <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
              <span className="text-gray-300 font-mono text-sm">RISK_SCORE</span>
              <span className={`font-mono text-xs ${
                status.score >= 0.7 ? 'text-green-400' : 
                status.score >= 0.5 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {status.score.toFixed(2)}/1.00
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Errors and Warnings */}
      {(status.errors.length > 0 || status.warnings.length > 0) && (
        <div className="tech-card">
          <div className="tech-card-header">
            <span className="text-red-400 font-mono text-sm">// ISSUES_DETECTED</span>
          </div>
          
          <div className="space-y-2">
            {status.errors.map((error, index) => (
              <div key={index} className="p-2 bg-red-900/20 border border-red-500/30 rounded">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="text-red-400" size={14} />
                  <span className="text-red-400 font-mono text-xs">ERROR</span>
                </div>
                <p className="text-red-300 text-xs mt-1">{error}</p>
              </div>
            ))}
            
            {status.warnings.map((warning, index) => (
              <div key={index} className="p-2 bg-yellow-900/20 border border-yellow-500/30 rounded">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="text-yellow-400" size={14} />
                  <span className="text-yellow-400 font-mono text-xs">WARNING</span>
                </div>
                <p className="text-yellow-300 text-xs mt-1">{warning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test Results Log */}
      {testResults.length > 0 && (
        <div className="tech-card">
          <div className="tech-card-header">
            <span className="text-green-400 font-mono text-sm">// TEST_LOG</span>
          </div>
          
          <div className="bg-gray-900/50 rounded p-3 max-h-40 overflow-y-auto">
            {testResults.map((result, index) => (
              <div key={index} className="text-gray-300 font-mono text-xs mb-1">
                {result}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StatusItem: React.FC<{
  icon: React.FC<{ size?: number; className?: string }>;
  label: string;
  status: boolean;
  error?: string;
}> = ({ icon: Icon, label, status, error }) => (
  <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
    <div className="flex items-center space-x-2">
      <Icon className="text-gray-400" size={14} />
      <span className="text-gray-300 font-mono text-sm">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      {status ? (
        <CheckCircle className="text-green-400" size={16} />
      ) : (
        <AlertCircle className="text-red-400" size={16} />
      )}
      <span className={`font-mono text-xs ${status ? 'text-green-400' : 'text-red-400'}`}>
        {status ? 'PASS' : 'FAIL'}
      </span>
    </div>
    {error && (
      <div className="ml-2 text-red-400 text-xs max-w-xs truncate" title={error}>
        {error}
      </div>
    )}
  </div>
);

// Extend Window interface for TypeScript
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}