import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function WishlistPanel({ creators }) {
  const handleRemoveFromWishlist = (creatorId) => {
    console.log('Removing from wishlist:', creatorId);
  };

  const handleSubscribe = (creatorId) => {
    console.log('Subscribing to creator:', creatorId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">My Wishlist</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Bookmark" size={20} className="text-secondary" />
          <span className="text-text-secondary">{creators.length} creators</span>
        </div>
      </div>

      {/* Wishlist Items */}
      {creators.length > 0 ? (
        <div className="space-y-4">
          {creators.map((creator) => (
            <div key={creator.id} className="card p-4">
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Creator Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-text-primary truncate">{creator.name}</h3>
                    {creator.verified && (
                      <Icon name="BadgeCheck" size={16} className="text-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-text-secondary text-sm mb-2">{creator.username}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-sm text-text-tertiary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{creator.subscribers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Image" size={12} />
                      <span>{creator.posts}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-accent" />
                      <span>{creator.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <div className="text-primary font-bold text-lg">
                    ${creator.subscriptionPrice}
                  </div>
                  <div className="text-text-tertiary text-xs">per month</div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2 flex-shrink-0">
                  {creator.isSubscribed ? (
                    <button className="px-4 py-2 bg-success text-white rounded-lg font-medium text-sm">
                      Subscribed
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(creator.id)}
                      className="px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium text-sm transition-colors duration-200"
                    >
                      Subscribe
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveFromWishlist(creator.id)}
                    className="px-4 py-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-all duration-200 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex flex-wrap gap-1">
                  {creator.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-surface-700/50 text-text-secondary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="Bookmark" size={48} className="text-text-tertiary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">Your Wishlist is Empty</h3>
          <p className="text-text-secondary mb-6">
            Save your favorite creators to easily find them later
          </p>
          <button
            onClick={() => window.location.href = '/fan-profile-subscription-portal'}
            className="btn-primary"
          >
            Discover Creators
          </button>
        </div>
      )}

      {/* Wishlist Actions */}
      {creators.length > 0 && (
        <div className="flex justify-center space-x-4">
          <button className="flex items-center space-x-2 px-6 py-3 bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200">
            <Icon name="Share" size={16} />
            <span>Share Wishlist</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors duration-200">
            <Icon name="Users" size={16} />
            <span>Subscribe to All</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default WishlistPanel;