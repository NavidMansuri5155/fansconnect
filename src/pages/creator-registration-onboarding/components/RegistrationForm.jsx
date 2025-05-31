import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

function RegistrationForm({ formData, onUpdate }) {
  const [validationErrors, setValidationErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const checkUsernameAvailability = (username) => {
    if (!validateUsername(username)) return;
    
    // Simulate API call
    setTimeout(() => {
      const unavailableUsernames = ['admin', 'test', 'user', 'creator123'];
      setUsernameAvailable(!unavailableUsernames.includes(username.toLowerCase()));
    }, 500);
  };

  const handleInputChange = (field, value) => {
    onUpdate(field, value);
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }

    // Real-time validation
    if (field === 'email' && value) {
      if (!validateEmail(value)) {
        setValidationErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email address'
        }));
      }
    }

    if (field === 'password' && value) {
      if (!validatePassword(value)) {
        setValidationErrors(prev => ({
          ...prev,
          password: 'Password must be at least 8 characters with uppercase, lowercase, and number'
        }));
      }
    }

    if (field === 'confirmPassword' && value) {
      if (value !== formData.password) {
        setValidationErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match'
        }));
      }
    }

    if (field === 'username' && value) {
      if (!validateUsername(value)) {
        setValidationErrors(prev => ({
          ...prev,
          username: 'Username must be 3-20 characters, letters, numbers, and underscores only'
        }));
        setUsernameAvailable(null);
      } else {
        checkUsernameAvailability(value);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Email Address *
        </label>
        <div className="relative">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`input-field w-full pl-12 ${
              validationErrors.email ? 'border-error focus:ring-error' : ''
            }`}
            placeholder="Enter your email"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon name="Mail" size={18} className="text-text-secondary" />
          </div>
        </div>
        {validationErrors.email && (
          <p className="text-error text-sm mt-1 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{validationErrors.email}</span>
          </p>
        )}
      </div>

      {/* Username Field */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Username *
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className={`input-field w-full pl-12 pr-12 ${
              validationErrors.username ? 'border-error focus:ring-error' : 
              usernameAvailable === true ? 'border-success focus:ring-success' :
              usernameAvailable === false ? 'border-error focus:ring-error' : ''
            }`}
            placeholder="Choose a username"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon name="AtSign" size={18} className="text-text-secondary" />
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {usernameAvailable === true && (
              <Icon name="Check" size={18} className="text-success" />
            )}
            {usernameAvailable === false && (
              <Icon name="X" size={18} className="text-error" />
            )}
          </div>
        </div>
        {validationErrors.username && (
          <p className="text-error text-sm mt-1 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{validationErrors.username}</span>
          </p>
        )}
        {usernameAvailable === true && (
          <p className="text-success text-sm mt-1 flex items-center space-x-1">
            <Icon name="Check" size={14} />
            <span>Username is available</span>
          </p>
        )}
        {usernameAvailable === false && (
          <p className="text-error text-sm mt-1 flex items-center space-x-1">
            <Icon name="X" size={14} />
            <span>Username is already taken</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Password *
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`input-field w-full pl-12 pr-12 ${
              validationErrors.password ? 'border-error focus:ring-error' : ''
            }`}
            placeholder="Create a strong password"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon name="Lock" size={18} className="text-text-secondary" />
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        {validationErrors.password && (
          <p className="text-error text-sm mt-1 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{validationErrors.password}</span>
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`input-field w-full pl-12 pr-12 ${
              validationErrors.confirmPassword ? 'border-error focus:ring-error' : ''
            }`}
            placeholder="Confirm your password"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon name="Lock" size={18} className="text-text-secondary" />
          </div>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        {validationErrors.confirmPassword && (
          <p className="text-error text-sm mt-1 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{validationErrors.confirmPassword}</span>
          </p>
        )}
      </div>

      {/* Age Verification */}
      <div className="space-y-4">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.ageVerified}
            onChange={(e) => onUpdate('ageVerified', e.target.checked)}
            className="mt-1 w-5 h-5 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
          />
          <div className="text-sm">
            <span className="text-text-primary font-medium">
              I confirm that I am 18 years of age or older *
            </span>
            <p className="text-text-secondary mt-1">
              You must be at least 18 years old to create a creator account on this platform.
            </p>
          </div>
        </label>

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={(e) => onUpdate('termsAccepted', e.target.checked)}
            className="mt-1 w-5 h-5 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
          />
          <div className="text-sm">
            <span className="text-text-primary font-medium">
              I agree to the Terms of Service and Privacy Policy *
            </span>
            <p className="text-text-secondary mt-1">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary-600">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:text-primary-600">Privacy Policy</a>.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}

export default RegistrationForm;