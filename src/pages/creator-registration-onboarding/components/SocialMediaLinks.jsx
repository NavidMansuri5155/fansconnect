import React, { useState } from 'react';
import Icon from 'components/AppIcon';

function SocialMediaLinks({ socialMedia, onUpdate }) {
  const [expandedPlatform, setExpandedPlatform] = useState(null);

  const platforms = [
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'Twitter',
      color: 'text-blue-400',
      placeholder: '@username',
      prefix: 'https://twitter.com/',
      description: 'Connect your Twitter to cross-promote content'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'Instagram',
      color: 'text-pink-400',
      placeholder: '@username',
      prefix: 'https://instagram.com/',
      description: 'Link your Instagram for visual content promotion'
    },
    {
      id: 'twitch',
      name: 'Twitch',
      icon: 'Twitch',
      color: 'text-purple-400',
      placeholder: 'username',
      prefix: 'https://twitch.tv/',
      description: 'Connect your Twitch for live streaming integration'
    }
  ];

  const handlePlatformToggle = (platformId) => {
    setExpandedPlatform(expandedPlatform === platformId ? null : platformId);
  };

  const handleInputChange = (platform, value) => {
    onUpdate(platform, value);
  };

  const validateUrl = (platform, value) => {
    if (!value) return true;
    const platformData = platforms.find(p => p.id === platform);
    return value.startsWith(platformData.prefix) || value.startsWith('@') || !value.includes('http');
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Connect Your Social Media
        </h3>
        <p className="text-sm text-text-secondary">
          Optional: Link your existing accounts to boost your reach
        </p>
      </div>

      <div className="space-y-3">
        {platforms.map((platform) => (
          <div key={platform.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => handlePlatformToggle(platform.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-surface-700/30 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-surface-700 flex items-center justify-center ${platform.color}`}>
                  <Icon name={platform.icon} size={20} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-text-primary">{platform.name}</div>
                  <div className="text-sm text-text-secondary">{platform.description}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {socialMedia[platform.id] && (
                  <Icon name="Check" size={16} className="text-success" />
                )}
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-text-secondary transition-transform duration-200 ${
                    expandedPlatform === platform.id ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </button>

            {expandedPlatform === platform.id && (
              <div className="px-4 pb-4 border-t border-border bg-surface-700/20 animate-fade-in">
                <div className="pt-4">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    {platform.name} Profile
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={socialMedia[platform.id]}
                      onChange={(e) => handleInputChange(platform.id, e.target.value)}
                      className={`input-field w-full pl-12 ${
                        socialMedia[platform.id] && !validateUrl(platform.id, socialMedia[platform.id])
                          ? 'border-error focus:ring-error' :''
                      }`}
                      placeholder={platform.placeholder}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Icon name={platform.icon} size={18} className={platform.color} />
                    </div>
                  </div>
                  <p className="text-xs text-text-tertiary mt-2">
                    Enter your username or full profile URL
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <p className="text-xs text-text-tertiary">
          You can always add or update these links later in your profile settings
        </p>
      </div>
    </div>
  );
}

export default SocialMediaLinks;