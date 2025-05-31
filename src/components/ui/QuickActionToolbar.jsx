import React, { useState } from 'react';
import Icon from '../AppIcon';

function QuickActionToolbar({ currentRole }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const creatorActions = [
    {
      id: 'upload',
      label: 'Upload Content',
      icon: 'Upload',
      color: 'text-primary',
      action: () => window.location.href = '/content-upload-management'
    },
    {
      id: 'live',
      label: 'Go Live',
      icon: 'Video',
      color: 'text-secondary',
      action: () => console.log('Starting live stream...')
    },
    {
      id: 'post',
      label: 'Create Post',
      icon: 'Edit3',
      color: 'text-accent',
      action: () => console.log('Creating new post...')
    },
    {
      id: 'analytics',
      label: 'View Analytics',
      icon: 'BarChart3',
      color: 'text-success',
      action: () => window.location.href = '/subscription-monetization-management'
    }
  ];

  const fanActions = [
    {
      id: 'tip',
      label: 'Send Tip',
      icon: 'DollarSign',
      color: 'text-accent',
      action: () => console.log('Opening tip modal...')
    },
    {
      id: 'message',
      label: 'Send Message',
      icon: 'MessageCircle',
      color: 'text-primary',
      action: () => window.location.href = '/fan-messaging-communication'
    },
    {
      id: 'bookmark',
      label: 'Bookmarks',
      icon: 'Bookmark',
      color: 'text-secondary',
      action: () => console.log('Opening bookmarks...')
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: 'Compass',
      color: 'text-success',
      action: () => window.location.href = '/fan-profile-subscription-portal'
    }
  ];

  const actions = currentRole === 'creator' ? creatorActions : fanActions;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAction = (action) => {
    action.action();
    setIsExpanded(false);
  };

  return (
    <div className="relative">
      <div className="text-xs font-medium text-text-secondary mb-3 uppercase tracking-wide">
        Quick Actions
      </div>

      {isExpanded ? (
        <div className="space-y-2 animate-fade-in">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              className="w-full flex items-center space-x-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 group"
            >
              <Icon name={action.icon} size={16} className={action.color} />
              <span className="text-sm font-medium">{action.label}</span>
              <Icon name="ArrowRight" size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
          
          <button
            onClick={toggleExpanded}
            className="w-full flex items-center justify-center px-3 py-2 text-text-tertiary hover:text-text-secondary border border-border rounded-lg transition-all duration-200 mt-3"
          >
            <Icon name="ChevronUp" size={14} />
            <span className="text-xs ml-1">Show Less</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {actions.slice(0, 2).map((action) => (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              className="flex flex-col items-center space-y-1 px-3 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 group"
              title={action.label}
            >
              <Icon name={action.icon} size={18} className={action.color} />
              <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
            </button>
          ))}
          
          <button
            onClick={toggleExpanded}
            className="col-span-2 flex items-center justify-center px-3 py-2 text-text-tertiary hover:text-text-secondary border border-border rounded-lg transition-all duration-200"
          >
            <Icon name="MoreHorizontal" size={14} />
            <span className="text-xs ml-1">More Actions</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default QuickActionToolbar;