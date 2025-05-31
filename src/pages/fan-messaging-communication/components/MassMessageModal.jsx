import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function MassMessageModal({ onClose, subscribers }) {
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('text');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [isScheduled, setIsScheduled] = useState(false);
  const [attachedMedia, setAttachedMedia] = useState(null);

  const filteredSubscribers = subscribers.filter(sub => {
    if (filterTier === 'all') return true;
    return sub.subscriptionTier === filterTier;
  });

  const handleSelectAll = () => {
    if (selectedSubscribers.length === filteredSubscribers.length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(filteredSubscribers.map(sub => sub.id));
    }
  };

  const handleSelectSubscriber = (subscriberId) => {
    setSelectedSubscribers(prev => 
      prev.includes(subscriberId)
        ? prev.filter(id => id !== subscriberId)
        : [...prev, subscriberId]
    );
  };

  const handleSendMessage = () => {
    const messageData = {
      recipients: selectedSubscribers,
      content: message,
      type: messageType,
      media: attachedMedia,
      scheduled: isScheduled ? {
        date: scheduledDate,
        time: scheduledTime
      } : null
    };

    console.log('Sending mass message:', messageData);
    // Handle mass message sending logic
    onClose();
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">Mass Message</h2>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          <p className="text-text-secondary mt-2">Send a message to multiple subscribers at once</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Recipient Selection */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">Select Recipients</h3>
              <div className="flex items-center space-x-3">
                {/* Tier Filter */}
                <select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value)}
                  className="px-3 py-1 bg-surface-700/50 border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Tiers</option>
                  <option value="VIP">VIP Only</option>
                  <option value="Premium">Premium Only</option>
                  <option value="Basic">Basic Only</option>
                </select>

                {/* Select All */}
                <button
                  onClick={handleSelectAll}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors duration-200"
                >
                  {selectedSubscribers.length === filteredSubscribers.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
            </div>

            {/* Subscriber List */}
            <div className="max-h-48 overflow-y-auto space-y-2">
              {filteredSubscribers.map((subscriber) => (
                <label
                  key={subscriber.id}
                  className="flex items-center space-x-3 p-3 bg-surface-700/30 hover:bg-surface-700/50 rounded-lg cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedSubscribers.includes(subscriber.id)}
                    onChange={() => handleSelectSubscriber(subscriber.id)}
                    className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary/20"
                  />
                  
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-600 flex-shrink-0">
                    <Image
                      src={subscriber.avatar}
                      alt={subscriber.fanName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-text-primary truncate">{subscriber.fanName}</span>
                      <Icon 
                        name={getTierIcon(subscriber.subscriptionTier)} 
                        size={12} 
                        className={getTierColor(subscriber.subscriptionTier)} 
                      />
                    </div>
                    <span className="text-sm text-text-secondary">{subscriber.fanUsername}</span>
                  </div>

                  <div className="text-right">
                    <div className={`text-xs font-medium ${getTierColor(subscriber.subscriptionTier)}`}>
                      {subscriber.subscriptionTier}
                    </div>
                    <div className="text-xs text-text-tertiary">${subscriber.totalSpent}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-3 text-sm text-text-secondary">
              {selectedSubscribers.length} of {filteredSubscribers.length} subscribers selected
            </div>
          </div>

          {/* Message Composition */}
          <div className="p-6 flex-1">
            <h3 className="font-semibold text-text-primary mb-4">Compose Message</h3>

            {/* Message Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-2">Message Type</label>
              <div className="flex space-x-3">
                {[
                  { id: 'text', label: 'Text', icon: 'Type' },
                  { id: 'media', label: 'Media', icon: 'Image' },
                  { id: 'promotion', label: 'Promotion', icon: 'Tag' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setMessageType(type.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      messageType === type.id
                        ? 'bg-primary text-white' :'bg-surface-700/50 text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name={type.icon} size={14} />
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Content */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={4}
                className="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            {/* Media Attachment */}
            {messageType === 'media' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-2">Attach Media</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Icon name="Upload" size={24} className="text-text-tertiary mx-auto mb-2" />
                  <p className="text-text-secondary">Click to upload or drag and drop</p>
                  <p className="text-xs text-text-tertiary mt-1">Images, videos up to 50MB</p>
                </div>
              </div>
            )}

            {/* Scheduling */}
            <div className="mb-4">
              <label className="flex items-center space-x-2 mb-3">
                <input
                  type="checkbox"
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary/20"
                />
                <span className="text-sm font-medium text-text-secondary">Schedule for later</span>
              </label>

              {isScheduled && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-text-tertiary mb-1">Date</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-700/50 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-tertiary mb-1">Time</label>
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-700/50 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Sending to {selectedSubscribers.length} subscriber{selectedSubscribers.length !== 1 ? 's' : ''}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={selectedSubscribers.length === 0 || !message.trim()}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedSubscribers.length > 0 && message.trim()
                    ? 'bg-primary hover:bg-primary-600 text-white' :'bg-surface-700/50 text-text-tertiary cursor-not-allowed'
                }`}
              >
                {isScheduled ? 'Schedule Message' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MassMessageModal;