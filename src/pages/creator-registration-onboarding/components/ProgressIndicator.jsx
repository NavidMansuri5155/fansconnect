import React from 'react';
import Icon from 'components/AppIcon';

function ProgressIndicator({ currentStep, totalSteps }) {
  const steps = [
    { number: 1, label: 'Account Details', icon: 'User' },
    { number: 2, label: 'Email Verification', icon: 'Mail' },
    { number: 3, label: 'Profile Setup', icon: 'Settings' },
    { number: 4, label: 'Complete', icon: 'CheckCircle' }
  ];

  return (
    <div className="mb-8">
      {/* Mobile Progress Bar */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-text-tertiary">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-surface-700 rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden lg:flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                step.number < currentStep
                  ? 'bg-primary border-primary text-white'
                  : step.number === currentStep
                  ? 'border-primary text-primary bg-primary/10' :'border-border text-text-tertiary'
              }`}>
                {step.number < currentStep ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step.icon} size={20} />
                )}
              </div>
              <span className={`text-xs font-medium mt-2 text-center ${
                step.number <= currentStep ? 'text-text-primary' : 'text-text-tertiary'
              }`}>
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                step.number < currentStep ? 'bg-primary' : 'bg-border'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProgressIndicator;