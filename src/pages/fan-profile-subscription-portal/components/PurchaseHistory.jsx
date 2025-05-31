import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function PurchaseHistory({ purchases }) {
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  const sortedPurchases = [...purchases].sort((a, b) => {
    if (sortBy === 'recent') return b.date - a.date;
    if (sortBy === 'price') return b.price - a.price;
    if (sortBy === 'creator') return a.creatorName.localeCompare(b.creatorName);
    return 0;
  });

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.price, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Purchase History</h2>
        <div className="flex items-center space-x-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="recent">Most Recent</option>
            <option value="price">Highest Price</option>
            <option value="creator">Creator Name</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">{purchases.length}</div>
          <div className="text-text-secondary text-sm">Total Purchases</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-accent mb-1">${totalSpent.toFixed(2)}</div>
          <div className="text-text-secondary text-sm">Total Spent</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">
            ${(totalSpent / purchases.length).toFixed(2)}
          </div>
          <div className="text-text-secondary text-sm">Average Purchase</div>
        </div>
      </div>

      {/* Purchase List */}
      {sortedPurchases.length > 0 ? (
        <div className="space-y-4">
          {sortedPurchases.map((purchase) => (
            <div key={purchase.id} className="card p-4">
              <div className="flex items-center space-x-4">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={purchase.thumbnail}
                    alt={purchase.contentTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text-primary mb-1 truncate">
                    {purchase.contentTitle}
                  </h3>
                  <p className="text-text-secondary text-sm mb-2">
                    by {purchase.creatorName}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-text-tertiary">
                    <span>{formatDate(purchase.date)}</span>
                    <span className="text-primary font-bold">${purchase.price}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => window.open(purchase.downloadUrl, '_blank')}
                    className="p-2 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
                    title="Download"
                  >
                    <Icon name="Download" size={16} />
                  </button>
                  <button
                    className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                    title="View Details"
                  >
                    <Icon name="Eye" size={16} />
                  </button>
                  <button
                    className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                    title="More Options"
                  >
                    <Icon name="MoreVertical" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="ShoppingBag" size={48} className="text-text-tertiary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">No Purchases Yet</h3>
          <p className="text-text-secondary mb-6">
            Start exploring content to see your purchase history here
          </p>
          <button
            onClick={() => window.location.href = '/fan-profile-subscription-portal'}
            className="btn-primary"
          >
            Browse Content
          </button>
        </div>
      )}

      {/* Download All */}
      {purchases.length > 0 && (
        <div className="flex justify-center">
          <button className="flex items-center space-x-2 px-6 py-3 bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200">
            <Icon name="Download" size={16} />
            <span>Download All Purchases</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default PurchaseHistory;