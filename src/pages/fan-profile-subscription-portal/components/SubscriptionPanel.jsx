import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function SubscriptionPanel({ creator, onManage }) {
  const [showDetails, setShowDetails] = useState(false);

  const mockSubscriptionDetails = {
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    nextBilling: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    totalSpent: 89.97,
    autoRenew: true,
    tier: 'Premium'
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntilBilling = () => {
    const now = new Date();
    const diff = mockSubscriptionDetails.nextBilling - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="card p-4">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={creator.avatar}
            alt={creator.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-text-primary">{creator.name}</h3>
            {creator.verified && (
              <Icon name="BadgeCheck" size={16} className="text-primary" />
            )}
          </div>
          <p className="text-text-secondary text-sm">{creator.username}</p>
        </div>
        <div className="text-right">
          <div className="text-primary font-bold">${creator.subscriptionPrice}</div>
          <div className="text-text-tertiary text-xs">per month</div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-success text-sm font-medium">Active Subscription</span>
        </div>
        <span className="text-text-secondary text-sm">
          {mockSubscriptionDetails.tier} Tier
        </span>
      </div>

      {/* Next Billing */}
      <div className="bg-surface-700/30 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-text-primary font-medium text-sm">Next Billing</div>
            <div className="text-text-secondary text-xs">
              {formatDate(mockSubscriptionDetails.nextBilling)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-accent font-bold text-sm">
              {getDaysUntilBilling()} days
            </div>
            <div className="text-text-tertiary text-xs">remaining</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-text-primary font-bold text-lg">{creator.posts}</div>
          <div className="text-text-secondary text-xs">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-text-primary font-bold text-lg">
            ${mockSubscriptionDetails.totalSpent}
          </div>
          <div className="text-text-secondary text-xs">Total Spent</div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
        >
          <span className="text-sm font-medium">Subscription Details</span>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} 
          />
        </button>

        {showDetails && (
          <div className="bg-surface-700/30 rounded-lg p-3 space-y-2 animate-fade-in">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Started:</span>
              <span className="text-text-primary">{formatDate(mockSubscriptionDetails.startDate)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Auto-renew:</span>
              <div className="flex items-center space-x-2">
                <span className="text-text-primary">
                  {mockSubscriptionDetails.autoRenew ? 'Enabled' : 'Disabled'}
                </span>
                <div className={`w-4 h-4 rounded-full ${mockSubscriptionDetails.autoRenew ? 'bg-success' : 'bg-error'}`}></div>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <button
            onClick={() => window.location.href = '/fan-messaging-communication'}
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
          >
            <Icon name="MessageCircle" size={16} />
            <span className="text-sm font-medium">Message</span>
          </button>
          <button
            onClick={onManage}
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
          >
            <Icon name="Settings" size={16} />
            <span className="text-sm font-medium">Manage</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPanel;