import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function CreatorProfile({ creator, onSubscribe, onTip, onMessage }) {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About', icon: 'User' },
    { id: 'stats', label: 'Stats', icon: 'BarChart3' },
    { id: 'media', label: 'Media', icon: 'Image' }
  ];

  const mockStats = {
    totalLikes: 15420,
    totalViews: 89650,
    avgRating: 4.8,
    responseTime: '< 1 hour',
    joinDate: 'March 2023',
    contentCount: {
      photos: 156,
      videos: 89,
      live: 23
    }
  };

  const mockRecentMedia = [
    {
      id: 1,
      type: 'photo',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
      likes: 45
    },
    {
      id: 2,
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      likes: 67
    },
    {
      id: 3,
      type: 'photo',
      thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop',
      likes: 89
    }
  ];

  const tipProgress = (creator.tipGoal.current / creator.tipGoal.target) * 100;

  return (
    <div className="p-4 space-y-6">
      {/* Creator Header */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
          <Image
            src={creator.avatar}
            alt={creator.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center justify-center space-x-2 mb-1">
          <h2 className="text-lg font-bold text-text-primary">{creator.name}</h2>
          {creator.verified && (
            <Icon name="BadgeCheck" size={16} className="text-primary" />
          )}
        </div>
        <p className="text-text-secondary text-sm mb-3">{creator.username}</p>
        
        {/* Rating */}
        <div className="flex items-center justify-center space-x-1 mb-4">
          <Icon name="Star" size={16} className="text-accent" />
          <span className="text-text-primary font-medium">{creator.rating}</span>
          <span className="text-text-secondary text-sm">({creator.subscribers} reviews)</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {creator.isSubscribed ? (
            <button className="w-full bg-success text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2">
              <Icon name="Check" size={16} />
              <span>Subscribed</span>
            </button>
          ) : (
            <button
              onClick={() => onSubscribe(creator.id)}
              className="w-full btn-primary py-2"
            >
              Subscribe - ${creator.subscriptionPrice}/month
            </button>
          )}
          
          <div className="flex space-x-2">
            <button
              onClick={onTip}
              className="flex-1 bg-accent hover:bg-accent-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              <Icon name="DollarSign" size={16} />
              <span>Tip</span>
            </button>
            <button
              onClick={onMessage}
              className="flex-1 bg-secondary hover:bg-secondary-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              <Icon name="MessageCircle" size={16} />
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tip Goal */}
      <div className="bg-surface-700/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Tip Goal</span>
          <span className="text-sm text-text-secondary">
            ${creator.tipGoal.current}/${creator.tipGoal.target}
          </span>
        </div>
        <div className="w-full bg-surface-700 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(tipProgress, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-text-tertiary">{creator.tipGoal.description}</p>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex space-x-1 bg-surface-700/30 p-1 rounded-lg mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'about' && (
            <div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {creator.bio}
              </p>
              
              {/* Tags */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-text-primary mb-2">Interests</h4>
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

              {/* Last Active */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Last Active:</span>
                <span className="text-text-primary">{creator.lastActive}</span>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-text-primary font-bold text-lg">{mockStats.totalLikes.toLocaleString()}</div>
                  <div className="text-text-secondary text-xs">Total Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-text-primary font-bold text-lg">{mockStats.totalViews.toLocaleString()}</div>
                  <div className="text-text-secondary text-xs">Total Views</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Response Time:</span>
                  <span className="text-text-primary">{mockStats.responseTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Member Since:</span>
                  <span className="text-text-primary">{mockStats.joinDate}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Content Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Photos:</span>
                    <span className="text-text-primary">{mockStats.contentCount.photos}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Videos:</span>
                    <span className="text-text-primary">{mockStats.contentCount.videos}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Live Streams:</span>
                    <span className="text-text-primary">{mockStats.contentCount.live}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-3">Recent Media</h4>
              <div className="grid grid-cols-3 gap-2">
                {mockRecentMedia.map((media) => (
                  <div key={media.id} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={media.thumbnail}
                      alt="Recent media"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-1 left-1">
                        <Icon 
                          name={media.type === 'video' ? 'Play' : 'Image'} 
                          size={12} 
                          color="white" 
                        />
                      </div>
                      <div className="absolute bottom-1 right-1 flex items-center space-x-1">
                        <Icon name="Heart" size={10} color="white" />
                        <span className="text-white text-xs">{media.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatorProfile;