import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import RegistrationForm from './components/RegistrationForm';
import ProgressIndicator from './components/ProgressIndicator';
import SocialMediaLinks from './components/SocialMediaLinks';
import LanguageSelector from './components/LanguageSelector';

function CreatorRegistrationOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    ageVerified: false,
    termsAccepted: false,
    socialMedia: {
      twitter: '',
      instagram: '',
      twitch: ''
    }
  });

  const totalSteps = 4;

  const handleFormUpdate = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaUpdate = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleContinue = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete registration
      console.log('Registration completed:', formData);
      window.location.href = '/content-upload-management';
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canContinue = () => {
    if (currentStep === 1) {
      return formData.email && 
             formData.password && 
             formData.confirmPassword && 
             formData.username && 
             formData.ageVerified && 
             formData.termsAccepted &&
             formData.password === formData.confirmPassword;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={20} color="white" />
            </div>
            <span className="text-xl font-bold text-gradient">FansConnect</span>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Desktop Side Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
            <div className="max-w-md text-center">
              <Icon name="Star" size={64} className="mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Start Your Creator Journey</h2>
              <p className="text-lg opacity-90 mb-8">
                Join thousands of creators who are monetizing their content and building meaningful connections with their fans.
              </p>
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={20} />
                  <span>Multiple revenue streams</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={20} />
                  <span>Direct fan engagement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={20} />
                  <span>Advanced analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={20} />
                  <span>Secure payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:w-1/2 flex flex-col">
          <div className="flex-1 px-4 py-8 lg:px-12 lg:py-16">
            <div className="max-w-md mx-auto">
              {/* Progress Indicator */}
              <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

              {/* Step Content */}
              <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                  Create Your Account
                </h1>
                <p className="text-text-secondary">
                  Step {currentStep} of {totalSteps}: Let's get you started with the basics
                </p>
              </div>

              {currentStep === 1 && (
                <div className="space-y-6">
                  <RegistrationForm 
                    formData={formData}
                    onUpdate={handleFormUpdate}
                  />
                  
                  <div className="border-t border-border pt-6">
                    <SocialMediaLinks 
                      socialMedia={formData.socialMedia}
                      onUpdate={handleSocialMediaUpdate}
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="text-center py-12">
                  <Icon name="Mail" size={64} className="mx-auto mb-6 text-primary" />
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    Verify Your Email
                  </h2>
                  <p className="text-text-secondary mb-6">
                    We've sent a verification link to {formData.email}. Please check your inbox and click the link to continue.
                  </p>
                  <button
                    onClick={() => console.log('Resending email...')}
                    className="text-primary hover:text-primary-600 font-medium"
                  >
                    Resend verification email
                  </button>
                </div>
              )}

              {currentStep === 3 && (
                <div className="text-center py-12">
                  <Icon name="User" size={64} className="mx-auto mb-6 text-secondary" />
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    Profile Setup
                  </h2>
                  <p className="text-text-secondary mb-6">
                    Complete your profile to start attracting fans and building your audience.
                  </p>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center py-12">
                  <Icon name="CheckCircle" size={64} className="mx-auto mb-6 text-success" />
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    Welcome to FansConnect!
                  </h2>
                  <p className="text-text-secondary mb-6">
                    Your account is ready. Start uploading content and connecting with your fans.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Fixed Bottom Actions */}
          <div className="border-t border-border bg-surface p-4 lg:px-12">
            <div className="max-w-md mx-auto flex space-x-4">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Icon name="ArrowLeft" size={20} />
                  <span>Back</span>
                </button>
              )}
              
              <button
                onClick={handleContinue}
                disabled={!canContinue()}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  canContinue()
                    ? 'btn-primary' :'bg-surface-600 text-text-tertiary cursor-not-allowed'
                }`}
              >
                <span>{currentStep === totalSteps ? 'Get Started' : 'Continue'}</span>
                <Icon name="ArrowRight" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorRegistrationOnboarding;