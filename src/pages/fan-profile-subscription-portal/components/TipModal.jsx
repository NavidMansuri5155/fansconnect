import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function TipModal({ creator, onTip, onClose }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getFinalAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  const handleSendTip = () => {
    const amount = getFinalAmount();
    if (amount > 0) {
      onTip(creator.id, amount, message, isAnonymous);
    }
  };

  const isValidAmount = getFinalAmount() >= 1;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-300 p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-text-primary">Send Tip</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Creator Info */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={creator?.avatar}
                alt={creator?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-text-primary">{creator?.name}</h3>
                {creator?.verified && (
                  <Icon name="BadgeCheck" size={16} className="text-primary" />
                )}
              </div>
              <p className="text-text-secondary text-sm">{creator?.username}</p>
            </div>
          </div>

          {/* Tip Goal Progress */}
          {creator?.tipGoal && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Current Goal</span>
                <span className="text-sm text-text-primary font-medium">
                  ${creator.tipGoal.current}/${creator.tipGoal.target}
                </span>
              </div>
              <div className="w-full bg-surface-700 rounded-full h-2">
                <div
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((creator.tipGoal.current / creator.tipGoal.target) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-text-tertiary mt-1">{creator.tipGoal.description}</p>
            </div>
          )}
        </div>

        {/* Amount Selection */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">
              Select Amount
            </label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-3 px-4 rounded-lg border transition-all duration-200 ${
                    selectedAmount === amount
                      ? 'border-primary bg-primary/10 text-primary' :'border-border text-text-secondary hover:text-text-primary hover:border-primary/50'
                  }`}
                >
                  <div className="font-bold">${amount}</div>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                $
              </div>
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-surface-700/50 border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                min="1"
                step="0.01"
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Message (Optional)
            </label>
            <textarea
              placeholder="Add a personal message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-surface-700/50 border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows="3"
              maxLength="200"
            />
            <div className="text-right text-xs text-text-tertiary mt-1">
              {message.length}/200
            </div>
          </div>

          {/* Anonymous Option */}
          <div className="mb-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-primary bg-surface border border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-text-secondary">Send tip anonymously</span>
            </label>
          </div>

          {/* Total */}
          <div className="bg-surface-700/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Total Amount:</span>
              <span className="text-2xl font-bold text-primary">
                ${getFinalAmount().toFixed(2)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSendTip}
              disabled={!isValidAmount}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isValidAmount
                  ? 'bg-primary hover:bg-primary-600 text-white' :'bg-surface-600 text-text-tertiary cursor-not-allowed'
              }`}
            >
              Send Tip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TipModal;