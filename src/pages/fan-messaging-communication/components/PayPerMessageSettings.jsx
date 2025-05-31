import React, { useState } from 'react';
import Icon from 'components/AppIcon';

function PayPerMessageSettings({ enabled, rate, onEnabledChange, onRateChange, onClose }) {
  const [tempEnabled, setTempEnabled] = useState(enabled);
  const [tempRate, setTempRate] = useState(rate);
  const [customRates, setCustomRates] = useState({
    vip: 3.00,
    premium: 5.00,
    basic: 7.00
  });
  const [useCustomRates, setUseCustomRates] = useState(false);

  const presetRates = [1.00, 2.50, 5.00, 7.50, 10.00, 15.00];

  const handleSave = () => {
    onEnabledChange(tempEnabled);
    onRateChange(tempRate);
    onClose();
  };

  const handlePresetSelect = (preset) => {
    setTempRate(preset);
  };

  const handleCustomRateChange = (tier, value) => {
    setCustomRates(prev => ({
      ...prev,
      [tier]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">Pay-per-Message Settings</h2>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          <p className="text-text-secondary mt-2">Configure pricing for your messages</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-text-primary">Enable Pay-per-Message</h3>
              <p className="text-sm text-text-secondary">Charge fans for each message you send</p>
            </div>
            <button
              onClick={() => setTempEnabled(!tempEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                tempEnabled ? 'bg-primary' : 'bg-surface-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  tempEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {tempEnabled && (
            <>
              {/* Rate Type Selection */}
              <div>
                <h4 className="font-medium text-text-primary mb-3">Rate Structure</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      checked={!useCustomRates}
                      onChange={() => setUseCustomRates(false)}
                      className="w-4 h-4 text-primary bg-surface border-border focus:ring-primary/20"
                    />
                    <span className="text-text-primary">Flat rate for all subscribers</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      checked={useCustomRates}
                      onChange={() => setUseCustomRates(true)}
                      className="w-4 h-4 text-primary bg-surface border-border focus:ring-primary/20"
                    />
                    <span className="text-text-primary">Custom rates by subscription tier</span>
                  </label>
                </div>
              </div>

              {!useCustomRates ? (
                <>
                  {/* Preset Rates */}
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Quick Select</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {presetRates.map((preset) => (
                        <button
                          key={preset}
                          onClick={() => handlePresetSelect(preset)}
                          className={`p-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                            tempRate === preset
                              ? 'bg-primary text-white' :'bg-surface-700/50 text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          ${preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Rate Input */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Custom Rate (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
                      <input
                        type="number"
                        value={tempRate}
                        onChange={(e) => setTempRate(parseFloat(e.target.value) || 0)}
                        min="0.50"
                        max="50.00"
                        step="0.50"
                        className="w-full pl-8 pr-4 py-3 bg-surface-700/50 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <p className="text-xs text-text-tertiary mt-1">Minimum: $0.50, Maximum: $50.00</p>
                  </div>
                </>
              ) : (
                /* Custom Rates by Tier */
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Rates by Subscription Tier</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'vip', label: 'VIP Subscribers', icon: 'Crown', color: 'text-accent' },
                      { key: 'premium', label: 'Premium Subscribers', icon: 'Star', color: 'text-primary' },
                      { key: 'basic', label: 'Basic Subscribers', icon: 'Heart', color: 'text-secondary' }
                    ].map((tier) => (
                      <div key={tier.key} className="flex items-center space-x-3">
                        <Icon name={tier.icon} size={16} className={tier.color} />
                        <span className="flex-1 text-text-primary">{tier.label}</span>
                        <div className="relative w-24">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-text-secondary text-sm">$</span>
                          <input
                            type="number"
                            value={customRates[tier.key]}
                            onChange={(e) => handleCustomRateChange(tier.key, e.target.value)}
                            min="0.50"
                            max="50.00"
                            step="0.50"
                            className="w-full pl-6 pr-2 py-2 bg-surface-700/50 border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Revenue Estimate */}
              <div className="bg-surface-700/30 rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-2">Revenue Estimate</h4>
                <div className="text-sm text-text-secondary space-y-1">
                  <p>Based on your current messaging activity:</p>
                  <div className="flex justify-between">
                    <span>~50 messages/day</span>
                    <span className="text-success font-medium">
                      ${(50 * (useCustomRates ? 5.00 : tempRate)).toFixed(2)}/day
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>~1,500 messages/month</span>
                    <span className="text-success font-medium">
                      ${(1500 * (useCustomRates ? 5.00 : tempRate)).toFixed(2)}/month
                    </span>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-accent mt-0.5" />
                  <div className="text-sm">
                    <p className="text-accent font-medium mb-1">Important Notes:</p>
                    <ul className="text-text-secondary space-y-1 text-xs">
                      <li>• Fans will see the message price before you send</li>
                      <li>• You can still send free messages anytime</li>
                      <li>• Platform takes 20% commission on paid messages</li>
                      <li>• Subscribers can opt out of paid messages</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayPerMessageSettings;