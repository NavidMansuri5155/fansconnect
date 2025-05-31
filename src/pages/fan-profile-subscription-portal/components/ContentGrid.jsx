import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function ContentGrid({ content, creators, onPurchase }) {
  const [hoveredContent, setHoveredContent] = useState(null);

  const getCreatorById = (creatorId) => {
    return creators.find(creator => creator.id === creatorId);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  const getContentIcon = (type) => {
    switch (type) {
      case 'photo': return 'Image';
      case 'video': return 'Play';
      case 'live': return 'Radio';
      default: return 'File';
    }
  };

  const getContentTypeColor = (type) => {
    switch (type) {
      case 'photo': return 'text-primary';
      case 'video': return 'text-secondary';
      case 'live': return 'text-accent';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {content.map((item) => {
        const creator = getCreatorById(item.creatorId);
        return (
          <div
            key={item.id}
            className="card p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-102"
            onMouseEnter={() => setHoveredContent(item.id)}
            onMouseLeave={() => setHoveredContent(null)}
          >
            {/* Thumbnail */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item.thumbnail}
                alt={item.title}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  item.isPremium && !creator?.isSubscribed ? 'blur-sm' : ''
                }`}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                {/* Content Type Icon */}
                <div className="absolute top-2 left-2">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                    <Icon 
                      name={getContentIcon(item.type)} 
                      size={16} 
                      className={getContentTypeColor(item.type)} 
                    />
                  </div>
                </div>

                {/* Premium Badge */}
                {item.isPremium && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-accent/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-white text-xs font-medium">Premium</span>
                    </div>
                  </div>
                )}

                {/* Live Badge */}
                {item.type === 'live' && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-error/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-medium">LIVE</span>
                    </div>
                  </div>
                )}

                {/* Price */}
                {item.price > 0 && (
                  <div className="absolute bottom-2 left-2">
                    <div className="bg-primary/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-white text-sm font-bold">${item.price}</span>
                    </div>
                  </div>
                )}

                {/* Free Badge */}
                {item.price === 0 && (
                  <div className="absolute bottom-2 left-2">
                    <div className="bg-success/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-white text-sm font-bold">FREE</span>
                    </div>
                  </div>
                )}

                {/* Hover Actions */}
                {hoveredContent === item.id && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center animate-fade-in">
                    {item.isPremium && !creator?.isSubscribed ? (
                      <button
                        onClick={() => onPurchase(item.id)}
                        className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200"
                      >
                        <Icon name="ShoppingCart" size={16} />
                        <span>Purchase</span>
                      </button>
                    ) : (
                      <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200">
                        <Icon name="Play" size={16} />
                        <span>View</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Content Info */}
            <div className="p-3">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-text-primary text-sm line-clamp-1">{item.title}</h3>
                <span className="text-text-tertiary text-xs whitespace-nowrap ml-2">
                  {formatTimeAgo(item.timestamp)}
                </span>
              </div>

              {/* Creator Info */}
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={creator?.avatar}
                    alt={creator?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-text-secondary text-xs">{creator?.name}</span>
                {creator?.verified && (
                  <Icon name="BadgeCheck" size={12} className="text-primary" />
                )}
              </div>

              {/* Preview Text */}
              <p className="text-text-secondary text-xs mb-3 line-clamp-2">{item.preview}</p>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={12} className="text-error" />
                    <span className="text-text-secondary">{item.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MessageCircle" size={12} className="text-text-tertiary" />
                    <span className="text-text-secondary">{item.comments}</span>
                  </div>
                </div>
                <button className="text-text-tertiary hover:text-text-primary transition-colors duration-200">
                  <Icon name="Bookmark" size={12} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContentGrid;