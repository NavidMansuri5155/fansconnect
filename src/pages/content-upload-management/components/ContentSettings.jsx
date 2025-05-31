import React, { useState } from 'react';
import Icon from 'components/AppIcon';

function ContentSettings() {
  const [settings, setSettings] = useState({
    allowComments: true,
    allowDownloads: false,
    ageRating: 'adult',
    geoBlocking: [],
    expirationEnabled: false,
    expirationDays: 30,
    watermarkEnabled: true,
    watermarkPosition: 'bottom-right',
    contentWarning: false,
    warningText: ''
  });

  const ageRatings = [
    { value: 'general', label: 'General Audience', icon: 'Users' },
    { value: 'mature', label: 'Mature (18+)', icon: 'AlertTriangle' },
    { value: 'adult', label: 'Adult Content', icon: 'Shield' }
  ];

  const watermarkPositions = [
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-right', label: 'Bottom Right' },
    { value: 'center', label: 'Center' }
  ];

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 
    'Germany', 'France', 'Japan', 'Brazil', 'India', 'China'
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleGeoBlockingChange = (country) => {
    setSettings(prev => ({
      ...prev,
      geoBlocking: prev.geoBlocking.includes(country)
        ? prev.geoBlocking.filter(c => c !== country)
        : [...prev.geoBlocking, country]
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text-primary flex items-center">
        <Icon name="Settings" size={20} className="mr-2 text-primary" />
        Advanced Content Settings
      </h3>

      {/* Interaction Settings */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">Interaction Settings</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="MessageCircle" size={18} className="text-primary" />
              <div>
                <div className="font-medium text-text-primary">Allow Comments</div>
                <div className="text-sm text-text-secondary">Let fans comment on this content</div>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('allowComments', !settings.allowComments)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.allowComments ? 'bg-primary' : 'bg-surface-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.allowComments ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Download" size={18} className="text-secondary" />
              <div>
                <div className="font-medium text-text-primary">Allow Downloads</div>
                <div className="text-sm text-text-secondary">Enable content downloading for subscribers</div>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('allowDownloads', !settings.allowDownloads)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.allowDownloads ? 'bg-primary' : 'bg-surface-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.allowDownloads ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Age Rating */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">Content Rating</h4>
        
        <div className="grid grid-cols-1 gap-3">
          {ageRatings.map((rating) => (
            <button
              key={rating.value}
              onClick={() => handleSettingChange('ageRating', rating.value)}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                settings.ageRating === rating.value
                  ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-surface-700/30'
              }`}
            >
              <Icon name={rating.icon} size={18} className="text-primary" />
              <span className="font-medium text-text-primary">{rating.label}</span>
              {settings.ageRating === rating.value && (
                <Icon name="Check" size={16} className="text-primary ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Watermark Settings */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">Watermark Settings</h4>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={18} className="text-accent" />
            <div>
              <div className="font-medium text-text-primary">Enable Watermark</div>
              <div className="text-sm text-text-secondary">Protect your content with watermarks</div>
            </div>
          </div>
          <button
            onClick={() => handleSettingChange('watermarkEnabled', !settings.watermarkEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              settings.watermarkEnabled ? 'bg-primary' : 'bg-surface-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                settings.watermarkEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {settings.watermarkEnabled && (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Watermark Position
            </label>
            <select
              value={settings.watermarkPosition}
              onChange={(e) => handleSettingChange('watermarkPosition', e.target.value)}
              className="w-full input-field"
            >
              {watermarkPositions.map((position) => (
                <option key={position.value} value={position.value}>
                  {position.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Content Expiration */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">Content Expiration</h4>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={18} className="text-warning" />
            <div>
              <div className="font-medium text-text-primary">Auto-Expire Content</div>
              <div className="text-sm text-text-secondary">Automatically remove content after specified time</div>
            </div>
          </div>
          <button
            onClick={() => handleSettingChange('expirationEnabled', !settings.expirationEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              settings.expirationEnabled ? 'bg-primary' : 'bg-surface-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                settings.expirationEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {settings.expirationEnabled && (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Expiration Period (Days)
            </label>
            <input
              type="number"
              value={settings.expirationDays}
              onChange={(e) => handleSettingChange('expirationDays', parseInt(e.target.value))}
              min="1"
              max="365"
              className="w-full input-field"
            />
          </div>
        )}
      </div>

      {/* Geo-blocking */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">Geographic Restrictions</h4>
        
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Block Content in Selected Countries
          </label>
          <div className="max-h-32 overflow-y-auto border border-border rounded-lg p-3 space-y-2">
            {countries.map((country) => (
              <label key={country} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.geoBlocking.includes(country)}
                  onChange={() => handleGeoBlockingChange(country)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-primary">{country}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Content Warning */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-primary">Content Warning</h4>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={18} className="text-error" />
            <div>
              <div className="font-medium text-text-primary">Add Content Warning</div>
              <div className="text-sm text-text-secondary">Display warning before content is shown</div>
            </div>
          </div>
          <button
            onClick={() => handleSettingChange('contentWarning', !settings.contentWarning)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              settings.contentWarning ? 'bg-primary' : 'bg-surface-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                settings.contentWarning ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {settings.contentWarning && (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Warning Message
            </label>
            <textarea
              value={settings.warningText}
              onChange={(e) => handleSettingChange('warningText', e.target.value)}
              placeholder="Enter a warning message for viewers..."
              className="w-full h-20 input-field resize-none"
              maxLength={200}
            />
            <div className="text-xs text-text-tertiary mt-1">
              {settings.warningText.length}/200 characters
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentSettings;