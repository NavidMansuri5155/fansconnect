import React, { useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function ChatView({ conversation, messages, onBack, onShowProfile, isMobile }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return messageDate.toLocaleDateString();
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sent': return 'Check';
      case 'delivered': return 'CheckCheck';
      case 'read': return 'CheckCheck';
      default: return 'Clock';
    }
  };

  const getMessageStatusColor = (status) => {
    switch (status) {
      case 'read': return 'text-primary';
      case 'delivered': return 'text-text-secondary';
      case 'sent': return 'text-text-tertiary';
      default: return 'text-text-tertiary';
    }
  };

  const renderMessage = (message, index) => {
    const isCreator = message.senderId === 'creator';
    const showDate = index === 0 || 
      formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);

    return (
      <div key={message.id}>
        {showDate && (
          <div className="flex justify-center my-4">
            <span className="px-3 py-1 bg-surface-700/50 text-text-secondary text-xs rounded-full">
              {formatDate(message.timestamp)}
            </span>
          </div>
        )}

        <div className={`flex mb-4 ${isCreator ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs lg:max-w-md ${isCreator ? 'order-2' : 'order-1'}`}>
            {/* Message Bubble */}
            <div className={`relative px-4 py-3 rounded-2xl ${
              isCreator 
                ? 'bg-primary text-white rounded-br-md' :'bg-surface border border-border rounded-bl-md'
            }`}>
              {/* Paid Message Indicator */}
              {message.isPaid && message.amount > 0 && (
                <div className={`flex items-center space-x-1 mb-2 text-xs ${
                  isCreator ? 'text-white/80' : 'text-accent'
                }`}>
                  <Icon name="DollarSign" size={12} />
                  <span>+${message.amount}</span>
                </div>
              )}

              {/* Message Content */}
              {message.type === 'text' && (
                <p className={`${isCreator ? 'text-white' : 'text-text-primary'}`}>
                  {message.content}
                </p>
              )}

              {message.type === 'media' && message.media && (
                <div>
                  {message.media.type === 'image' && (
                    <div className="rounded-lg overflow-hidden mb-2">
                      <Image
                        src={message.media.url}
                        alt="Shared media"
                        className="w-full h-auto max-h-64 object-cover"
                      />
                    </div>
                  )}
                  {message.media.caption && (
                    <p className={`text-sm ${isCreator ? 'text-white' : 'text-text-primary'}`}>
                      {message.media.caption}
                    </p>
                  )}
                </div>
              )}

              {message.type === 'request' && message.requestDetails && (
                <div className={`p-3 rounded-lg border-2 border-dashed ${
                  isCreator ? 'border-white/30 bg-white/10' : 'border-accent/30 bg-accent/10'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Star" size={16} className={isCreator ? 'text-white' : 'text-accent'} />
                    <span className={`font-semibold ${isCreator ? 'text-white' : 'text-accent'}`}>
                      Custom Request
                    </span>
                  </div>
                  <div className={`text-sm space-y-1 ${isCreator ? 'text-white/90' : 'text-text-primary'}`}>
                    <p><strong>Type:</strong> {message.requestDetails.type}</p>
                    <p><strong>Duration:</strong> {message.requestDetails.duration}</p>
                    <p><strong>Details:</strong> {message.requestDetails.description}</p>
                  </div>
                  {message.content && (
                    <p className={`mt-2 ${isCreator ? 'text-white' : 'text-text-primary'}`}>
                      {message.content}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Message Info */}
            <div className={`flex items-center space-x-2 mt-1 text-xs text-text-tertiary ${
              isCreator ? 'justify-end' : 'justify-start'
            }`}>
              <span>{formatTime(message.timestamp)}</span>
              {isCreator && (
                <Icon 
                  name={getMessageStatusIcon(message.status)} 
                  size={12} 
                  className={getMessageStatusColor(message.status)} 
                />
              )}
            </div>
          </div>

          {/* Avatar for fan messages */}
          {!isCreator && (
            <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-600 ml-3 order-2 flex-shrink-0">
              <Image
                src={conversation.avatar}
                alt={conversation.fanName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-surface border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isMobile && (
              <button
                onClick={onBack}
                className="p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-lg transition-colors duration-200"
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
            )}

            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-600">
                  <Image
                    src={conversation.avatar}
                    alt={conversation.fanName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {conversation.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-surface"></div>
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="font-semibold text-text-primary">{conversation.fanName}</h2>
                  {conversation.isSubscriber && (
                    <Icon name="Star" size={14} className="text-primary" />
                  )}
                </div>
                <p className="text-sm text-text-secondary">
                  {conversation.isOnline ? 'Online' : `Last seen ${formatTime(conversation.lastSeen)}`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onShowProfile}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
              title="View profile"
            >
              <Icon name="User" size={18} />
            </button>
            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200">
              <Icon name="MoreVertical" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {messages.map((message, index) => renderMessage(message, index))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatView;