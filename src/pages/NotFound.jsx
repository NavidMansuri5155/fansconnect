import React from 'react';
import Icon from 'components/AppIcon';

function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} color="white" />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={20} />
            <span>Go to Homepage</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full px-6 py-3 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-text-tertiary">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;