import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';

function MessageComposer({ 
  onSendMessage, 
  quickResponses, 
  onQuickResponse, 
  payPerMessageEnabled, 
  messageRate 
}) {
  const [message, setMessage] = useState('');
  const [showQuickResponses, setShowQuickResponses] = useState(false);
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage({
        content: message.trim(),
        type: 'text',
        isPaid: payPerMessageEnabled,
        amount: payPerMessageEnabled ? messageRate : 0
      });
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMediaUpload = (type) => {
    fileInputRef.current?.click();
    setShowMediaOptions(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic
      console.log('File selected:', file);
      onSendMessage({
        content: '',
        type: 'media',
        file: file,
        isPaid: payPerMessageEnabled,
        amount: payPerMessageEnabled ? messageRate : 0
      });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Handle voice recording logic
  };

  return (
    <div className="bg-surface border-t border-border p-4">
      {/* Pay-per-message indicator */}
      {payPerMessageEnabled && (
        <div className="flex items-center justify-center mb-3">
          <div className="flex items-center space-x-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
            <Icon name="DollarSign" size={14} />
            <span>Pay-per-message: ${messageRate}</span>
          </div>
        </div>
      )}

      {/* Quick Responses */}
      {showQuickResponses && (
        <div className="mb-3 p-3 bg-surface-700/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Quick Responses</span>
            <button
              onClick={() => setShowQuickResponses(false)}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => onQuickResponse(response)}
                className="text-left p-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-600/50 rounded-md transition-colors duration-200"
              >
                {response}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Media Options */}
      {showMediaOptions && (
        <div className="mb-3 p-3 bg-surface-700/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Send Media</span>
            <button
              onClick={() => setShowMediaOptions(false)}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => handleMediaUpload('image')}
              className="flex flex-col items-center space-y-2 p-3 text-text-secondary hover:text-text-primary hover:bg-surface-600/50 rounded-lg transition-colors duration-200"
            >
              <Icon name="Image" size={20} />
              <span className="text-xs">Photo</span>
            </button>
            <button
              onClick={() => handleMediaUpload('video')}
              className="flex flex-col items-center space-y-2 p-3 text-text-secondary hover:text-text-primary hover:bg-surface-600/50 rounded-lg transition-colors duration-200"
            >
              <Icon name="Video" size={20} />
              <span className="text-xs">Video</span>
            </button>
            <button
              onClick={toggleRecording}
              className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-colors duration-200 ${
                isRecording 
                  ? 'text-error bg-error/20' :'text-text-secondary hover:text-text-primary hover:bg-surface-600/50'
              }`}
            >
              <Icon name={isRecording ? "Square" : "Mic"} size={20} />
              <span className="text-xs">{isRecording ? 'Stop' : 'Voice'}</span>
            </button>
            <button
              onClick={() => handleMediaUpload('file')}
              className="flex flex-col items-center space-y-2 p-3 text-text-secondary hover:text-text-primary hover:bg-surface-600/50 rounded-lg transition-colors duration-200"
            >
              <Icon name="Paperclip" size={20} />
              <span className="text-xs">File</span>
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="flex items-end space-x-3">
        {/* Action Buttons */}
        <div className="flex space-x-1">
          <button
            onClick={() => setShowMediaOptions(!showMediaOptions)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              showMediaOptions 
                ? 'bg-primary/20 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-700/50'
            }`}
          >
            <Icon name="Plus" size={18} />
          </button>
          <button
            onClick={() => setShowQuickResponses(!showQuickResponses)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              showQuickResponses 
                ? 'bg-primary/20 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-700/50'
            }`}
          >
            <Icon name="Zap" size={18} />
          </button>
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
            className="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`p-3 rounded-lg transition-all duration-200 ${
            message.trim()
              ? 'bg-primary hover:bg-primary-600 text-white transform hover:scale-105'
              : 'bg-surface-700/50 text-text-tertiary cursor-not-allowed'
          }`}
        >
          <Icon name="Send" size={18} />
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

export default MessageComposer;