import React, { useState } from 'react';
import Icon from 'components/AppIcon';

function PricingControls({ contentType, pricing, onPricingChange, subscriptionTiers }) {
  const [customAmount, setCustomAmount] = useState(pricing.amount || 0);

  const ppvPresets = [
    { amount: 5, label: 'Basic', description: 'Standard content' },
    { amount: 10, label: 'Premium', description: 'High-quality content' },
    { amount: 20, label: 'Exclusive', description: 'Rare or special content' },
    { amount: 50, label: 'Ultra Premium', description: 'Highest tier content' }
  ];

  const handleAmountChange = (amount) => {
    setCustomAmount(amount);
    onPricingChange({ ...pricing, amount });
  };

  const handleTierChange = (tier) => {
    onPricingChange({ ...pricing, tier });
  };

  if (contentType === 'free') {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text-primary flex items-center">
        <Icon name="DollarSign" size={20} className="mr-2 text-accent" />
        Pricing & Monetization
      </h3>

      {contentType === 'ppv' && (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-text-primary mb-3">Pay-Per-View Price</h4>
            
            {/* Preset Amounts */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {ppvPresets.map((preset) => (
                <button
                  key={preset.amount}
                  onClick={() => handleAmountChange(preset.amount)}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                    customAmount === preset.amount
                      ? 'border-accent bg-accent/10' :'border-border hover:border-accent/50 hover:bg-surface-700/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-text-primary">${preset.amount}</span>
                    <span className="text-xs text-accent font-medium">{preset.label}</span>
                  </div>
                  <div className="text-xs text-text-secondary">{preset.description}</div>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Custom Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-text-secondary">$</span>
                </div>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => handleAmountChange(parseFloat(e.target.value) || 0)}
                  min="0"
                  max="1000"
                  step="0.01"
                  className="w-full pl-8 input-field"
                  placeholder="0.00"
                />
              </div>
              <div className="text-xs text-text-tertiary mt-1">
                Platform fee: ${(customAmount * 0.1).toFixed(2)} (10%) • You earn: ${(customAmount * 0.9).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Pricing Strategy Tips */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Lightbulb" size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">Pricing Tips</span>
            </div>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Start with lower prices to build audience</li>
              <li>• Premium content can command higher prices</li>
              <li>• Consider your audience's spending habits</li>
              <li>• Test different price points to optimize revenue</li>
            </ul>
          </div>
        </div>
      )}

      {contentType === 'subscription' && (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-text-primary mb-3">Subscription Tier</h4>
            
            <div className="space-y-3">
              {subscriptionTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => handleTierChange(tier.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                    pricing.tier === tier.id
                      ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-surface-700/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      tier.id === 'basic' ? 'bg-success' :
                      tier.id === 'premium' ? 'bg-accent' : 'bg-secondary'
                    }`}></div>
                    <div className="text-left">
                      <div className="font-semibold text-text-primary">{tier.name}</div>
                      <div className="text-sm text-text-secondary">${tier.price}/month</div>
                    </div>
                  </div>
                  
                  {pricing.tier === tier.id && (
                    <Icon name="Check" size={20} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tier Benefits */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Crown" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Tier Benefits</span>
            </div>
            <div className="text-sm text-text-secondary">
              {pricing.tier === 'basic' && 'Access to basic exclusive content and monthly updates'}
              {pricing.tier === 'premium' && 'All basic benefits plus weekly content, direct messaging, and priority support'}
              {pricing.tier === 'vip' && 'All premium benefits plus daily content, video calls, and custom requests'}
            </div>
          </div>
        </div>
      )}

      {/* Revenue Projection */}
      <div className="bg-surface-700/30 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="TrendingUp" size={16} className="mr-2 text-success" />
          Revenue Projection
        </h4>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-success">
              ${contentType === 'ppv' ? (customAmount * 10).toFixed(0) : '450'}
            </div>
            <div className="text-xs text-text-secondary">Weekly Est.</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent">
              ${contentType === 'ppv' ? (customAmount * 45).toFixed(0) : '1,950'}
            </div>
            <div className="text-xs text-text-secondary">Monthly Est.</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">
              ${contentType === 'ppv' ? (customAmount * 500).toFixed(0) : '23,400'}
            </div>
            <div className="text-xs text-text-secondary">Yearly Est.</div>
          </div>
        </div>
        
        <div className="text-xs text-text-tertiary mt-3 text-center">
          *Estimates based on current audience engagement and platform averages
        </div>
      </div>
    </div>
  );
}

export default PricingControls;