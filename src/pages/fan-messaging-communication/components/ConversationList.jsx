import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function ConversationList({ conversations, onConversationSelect, selectedConversation }) {
  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return timestamp.toLocaleDateString();
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'VIP': return 'text-accent';
      case 'Premium': return 'text-primary';
      case 'Basic': return 'text-secondary';
      default: return 'text-text-tertiary';
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'VIP': return 'Crown';
      case 'Premium': return 'Star';
      case 'Basic': return 'Heart';
      default: return 'User';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.length === 0 ? (
        <div className="p-8 text-center">
          <Icon name="MessageCircle" size={48} className="text-text-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No conversations found</h3>
          <p className="text-text-secondary">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onConversationSelect(conversation)}
              className={`w-full p-4 text-left hover:bg-surface-700/50 transition-colors duration-200 ${
                selectedConversation?.id === conversation.id ? 'bg-primary/10 border-r-2 border-primary' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar with Online Status */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-600">
                    <Image
                      src={conversation.avatar}
                      alt={conversation.fanName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-success rounded-full border-2 border-surface"></div>
                  )}
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Name and Subscription Status */}
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-text-primary truncate">{conversation.fanName}</h3>
                    {conversation.isSubscriber && (
                      <div className="flex items-center space-x-1">
                        <Icon 
                          name={getTierIcon(conversation.subscriptionTier)} 
                          size={14} 
                          className={getTierColor(conversation.subscriptionTier)} 
                        />
                        <span className={`text-xs font-medium ${getTierColor(conversation.subscriptionTier)}`}>
                          {conversation.subscriptionTier}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Username */}
                  <p className="text-sm text-text-tertiary mb-1">{conversation.fanUsername}</p>

                  {/* Last Message */}
                  <p className={`text-sm truncate ${
                    conversation.unreadCount > 0 ? 'text-text-primary font-medium' : 'text-text-secondary'
                  }`}>
                    {conversation.lastMessage}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3 text-xs text-text-tertiary">
                      {conversation.messagesPaid > 0 && (
                        <div className="flex items-center space-x-1">
                          <Icon name="DollarSign" size={12} className="text-accent" />
                          <span>{conversation.messagesPaid}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Icon name="CreditCard" size={12} />
                        <span>${conversation.totalSpent}</span>
                      </div>
                    </div>
                    <span className="text-xs text-text-tertiary">{formatTime(conversation.timestamp)}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConversationList;