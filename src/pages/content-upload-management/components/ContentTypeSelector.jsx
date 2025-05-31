import React from 'react';
import Icon from 'components/AppIcon';

function ContentTypeSelector({ selectedType, onTypeChange }) {
  const contentTypes = [
    {
      id: 'free',
      name: 'Free Post',
      description: 'Visible to all followers',
      icon: 'Globe',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'ppv',
      name: 'Pay-Per-View',
      description: 'One-time purchase to unlock',
      icon: 'DollarSign',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'subscription',
      name: 'Subscription Only',
      description: 'Exclusive to subscribers',
      icon: 'Crown',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'story',
      name: '24h Story',
      description: 'Disappears after 24 hours',
      icon: 'Clock',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary flex items-center">
        <Icon name="Layers" size={20} className="mr-2 text-primary" />
        Content Type
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {contentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedType === type.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-surface-700/30'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.bgColor}`}>
                <Icon name={type.icon} size={20} className={type.color} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary mb-1">{type.name}</h4>
                <p className="text-sm text-text-secondary">{type.description}</p>
              </div>

              {selectedType === type.id && (
                <Icon name="Check" size={20} className="text-primary" />
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedType === 'story' && (
        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-secondary">Story Content</span>
          </div>
          <p className="text-sm text-text-secondary">
            Stories are perfect for behind-the-scenes content, quick updates, and time-sensitive announcements. 
            They automatically disappear after 24 hours to create urgency and exclusivity.
          </p>
        </div>
      )}
    </div>
  );
}

export default ContentTypeSelector;