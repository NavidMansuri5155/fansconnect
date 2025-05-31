import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function FanProfileSidebar({ fan, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  const mockPurchaseHistory = [
    {
      id: 1,
      type: 'Subscription',
      tier: 'Premium',
      amount: 29.99,
      date: new Date(Date.now() - 86400000 * 5),
      status: 'active'
    },
    {
      id: 2,
      type: 'Tip',
      amount: 15.00,
      date: new Date(Date.now() - 86400000 * 3),
      message: 'Love your content! 💕'
    },
    {
      id: 3,
      type: 'Custom Content',
      amount: 50.00,
      date: new Date(Date.now() - 86400000 * 7),
      description: 'Custom photo set'
    },
    {
      id: 4,
      type: 'Pay-per-message',
      amount: 25.00,
      date: new Date(Date.now() - 86400000 * 2),
      messageCount: 5
    }
  ];

  const mockInteractionStats = {
    totalMessages: 127,
    totalSpent: fan.totalSpent,
    memberSince: new Date(2023, 8, 15),
    lastActive: fan.lastSeen,
    favoriteContentType: 'Photos',
    engagementRate: 85,
    averageSessionTime: '12 minutes'
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'Subscription': return 'Star';
      case 'Tip': return 'Heart';
      case 'Custom Content': return 'Image';
      case 'Pay-per-message': return 'MessageCircle';
      default: return 'DollarSign';
    }
  };

  return (
    <div className="w-80 bg-surface border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text-primary">Fan Profile</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Fan Info */}
        <div className="text-center">
          <div className="relative inline-block mb-3">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-600 mx-auto">
              <Image
                src={fan.avatar}
                alt={fan.fanName}
                className="w-full h-full object-cover"
              />
            </div>
            {fan.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-surface"></div>
            )}
          </div>

          <h3 className="font-semibold text-text-primary mb-1">{fan.fanName}</h3>
          <p className="text-sm text-text-secondary mb-2">{fan.fanUsername}</p>

          {fan.isSubscriber && (
            <div className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/20 rounded-full">
              <Icon name={getTierIcon(fan.subscriptionTier)} size={12} className={getTierColor(fan.subscriptionTier)} />
              <span className={`text-xs font-medium ${getTierColor(fan.subscriptionTier)}`}>
                {fan.subscriptionTier} Subscriber
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {[
            { id: 'overview', label: 'Overview', icon: 'User' },
            { id: 'purchases', label: 'Purchases', icon: 'CreditCard' },
            { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-700/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-text-primary">{formatCurrency(mockInteractionStats.totalSpent)}</div>
                <div className="text-xs text-text-secondary">Total Spent</div>
              </div>
              <div className="bg-surface-700/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-text-primary">{mockInteractionStats.totalMessages}</div>
                <div className="text-xs text-text-secondary">Messages</div>
              </div>
            </div>

            {/* Member Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-text-primary">Member Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Member since:</span>
                  <span className="text-text-primary">{formatDate(mockInteractionStats.memberSince)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Last active:</span>
                  <span className="text-text-primary">{formatDate(mockInteractionStats.lastActive)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Status:</span>
                  <span className={`${fan.isOnline ? 'text-success' : 'text-text-secondary'}`}>
                    {fan.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="font-semibold text-text-primary">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 bg-surface-700/50 hover:bg-surface-600/50 rounded-lg transition-colors duration-200">
                  <Icon name="Gift" size={16} className="text-secondary" />
                  <span className="text-text-primary">Send Special Offer</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-surface-700/50 hover:bg-surface-600/50 rounded-lg transition-colors duration-200">
                  <Icon name="Star" size={16} className="text-accent" />
                  <span className="text-text-primary">Add to VIP List</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-surface-700/50 hover:bg-surface-600/50 rounded-lg transition-colors duration-200">
                  <Icon name="Shield" size={16} className="text-error" />
                  <span className="text-text-primary">Block User</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-text-primary">Purchase History</h4>
              <span className="text-sm text-text-secondary">{mockPurchaseHistory.length} transactions</span>
            </div>

            <div className="space-y-3">
              {mockPurchaseHistory.map((purchase) => (
                <div key={purchase.id} className="bg-surface-700/50 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={getTransactionIcon(purchase.type)} size={16} className="text-primary" />
                      <span className="font-medium text-text-primary">{purchase.type}</span>
                    </div>
                    <span className="font-bold text-success">{formatCurrency(purchase.amount)}</span>
                  </div>

                  <div className="text-sm text-text-secondary">
                    {formatDate(purchase.date)}
                  </div>

                  {purchase.tier && (
                    <div className="text-xs text-primary mt-1">{purchase.tier} Tier</div>
                  )}

                  {purchase.message && (
                    <div className="text-xs text-text-secondary mt-1 italic">"{purchase.message}"</div>
                  )}

                  {purchase.description && (
                    <div className="text-xs text-text-secondary mt-1">{purchase.description}</div>
                  )}

                  {purchase.messageCount && (
                    <div className="text-xs text-text-secondary mt-1">{purchase.messageCount} messages</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary">Engagement Analytics</h4>

            {/* Engagement Metrics */}
            <div className="space-y-3">
              <div className="bg-surface-700/50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-secondary">Engagement Rate</span>
                  <span className="font-bold text-success">{mockInteractionStats.engagementRate}%</span>
                </div>
                <div className="w-full bg-surface-600 rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full" 
                    style={{ width: `${mockInteractionStats.engagementRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="bg-surface-700/50 rounded-lg p-3">
                  <div className="text-text-secondary text-sm">Avg. Session Time</div>
                  <div className="text-text-primary font-bold">{mockInteractionStats.averageSessionTime}</div>
                </div>
                <div className="bg-surface-700/50 rounded-lg p-3">
                  <div className="text-text-secondary text-sm">Favorite Content</div>
                  <div className="text-text-primary font-bold">{mockInteractionStats.favoriteContentType}</div>
                </div>
              </div>
            </div>

            {/* Activity Chart Placeholder */}
            <div className="bg-surface-700/50 rounded-lg p-4">
              <h5 className="font-medium text-text-primary mb-3">Activity Over Time</h5>
              <div className="h-32 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                <div className="text-center">
                  <Icon name="BarChart3" size={24} className="text-text-tertiary mx-auto mb-2" />
                  <p className="text-sm text-text-secondary">Activity chart would go here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FanProfileSidebar;