import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { NexusCareLogo } from '@/shared/components/ui/NexusCareLogo';
import { Mail } from 'lucide-react';

export function EmailLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store email for OTP verification
      localStorage.setItem('pendingEmail', email);
      
      // Navigate to OTP verification
      navigate('/auth/verify-otp');
    } catch (error) {
      console.error('OTP send error:', error);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    
    if (error) {
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3FAFF] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Main Login Card */}
        <Card className="bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden min-h-[90vh] sm:min-h-[80vh] flex flex-col">
          {/* Header with Logo */}
          <div className="bg-white px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between">
              <NexusCareLogo size="sm" />
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white px-6 pb-2">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-gradient-to-r from-onboarding-primaryGreen to-onboarding-primaryBlue h-1 rounded-full w-1/4"></div>
            </div>
          </div>

          <CardContent className="px-6 py-8 flex-1 flex flex-col justify-center">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-3xl font-bold text-onboarding-textPrimary mb-4">
                Start your professional journey.
              </h1>
              <p className="text-lg sm:text-base text-onboarding-textSecondary leading-relaxed">
                Enter your work email to begin.
              </p>
            </div>

            <form onSubmit={handleSendOTP} className="space-y-8">
              {/* Email Address Section */}
              <div className="space-y-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Work Email
                </label>
                
                {/* Email Input Container */}
                <div className="flex items-center gap-3 rounded-xl bg-onboarding-inputBackground px-4 py-4">
                  {/* Email Icon */}
                  <Mail className="h-5 w-5 text-secondary-600 flex-shrink-0" />
                  
                  {/* Email Input */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className="flex-1 bg-transparent text-base text-neutral-800 placeholder:text-neutral-400 outline-none"
                    placeholder="name@medicalcenter.com"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
              </div>

              {/* Continue Button */}
              <Button
                type="submit"
                disabled={isLoading || !email.trim()}
                isLoading={isLoading}
                className="w-full rounded-xl bg-gradient-to-r from-onboarding-primaryGreen to-onboarding-primaryBlue py-5 text-base font-semibold uppercase tracking-widest text-white transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                Continue →
              </Button>

              {/* Security Notice */}
              <div className="flex items-center justify-center space-x-2 text-sm text-onboarding-textSecondary">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure OTP will be sent to your email.</span>
              </div>
            </form>

            {/* Support Link */}
            <div className="mt-10 text-center">
              <p className="text-sm text-onboarding-textSecondary">
                Need help accessing your account?{' '}
                <button className="text-secondary-600 hover:text-secondary-700 font-medium">
                  Support
                </button>
              </p>
            </div>

            {/* Footer Text */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex-shrink-0">
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium text-center">
                Trusted by Healthcare Professionals Across Nigeria
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}