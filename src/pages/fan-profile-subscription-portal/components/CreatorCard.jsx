import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function CreatorCard({ creator, onSelect, onSubscribe, onTip }) {
  const handleSubscribe = (e) => {
    e.stopPropagation();
    onSubscribe(creator.id);
  };

  const handleTip = (e) => {
    e.stopPropagation();
    onTip(creator.id);
  };

  const tipProgress = (creator.tipGoal.current / creator.tipGoal.target) * 100;

  return (
    <div 
      className="card p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-102"
      onClick={() => onSelect(creator)}
    >
      {/* Banner */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={creator.banner}
          alt={`${creator.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          {creator.verified && (
            <div className="bg-primary/90 backdrop-blur-sm rounded-full p-1">
              <Icon name="BadgeCheck" size={16} color="white" />
            </div>
          )}
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-white text-xs font-medium">{creator.lastActive}</span>
          </div>
        </div>
      </div>

      {/* Avatar */}
      <div className="relative px-4 -mt-8">
        <div className="w-16 h-16 rounded-full border-4 border-surface overflow-hidden">
          <Image
            src={creator.avatar}
            alt={creator.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-2">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-text-primary text-lg">{creator.name}</h3>
            <p className="text-text-secondary text-sm">{creator.username}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-accent" />
            <span className="text-sm font-medium text-text-primary">{creator.rating}</span>
          </div>
        </div>

        <p className="text-text-secondary text-sm mb-3 line-clamp-2">{creator.bio}</p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} className="text-text-tertiary" />
              <span className="text-text-secondary">{creator.subscribers.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Image" size={14} className="text-text-tertiary" />
              <span className="text-text-secondary">{creator.posts}</span>
            </div>
          </div>
          <div className="text-primary font-bold">
            ${creator.subscriptionPrice}/month
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {creator.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-surface-700/50 text-text-secondary text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Tip Goal Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-text-secondary">Tip Goal</span>
            <span className="text-xs text-text-primary font-medium">
              ${creator.tipGoal.current}/${creator.tipGoal.target}
            </span>
          </div>
          <div className="w-full bg-surface-700 rounded-full h-2">
            <div
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(tipProgress, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-text-tertiary mt-1">{creator.tipGoal.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {creator.isSubscribed ? (
            <button className="flex-1 bg-success text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2">
              <Icon name="Check" size={16} />
              <span>Subscribed</span>
            </button>
          ) : (
            <button
              onClick={handleSubscribe}
              className="flex-1 btn-primary py-2"
            >
              Subscribe
            </button>
          )}
          <button
            onClick={handleTip}
            className="px-4 py-2 bg-accent hover:bg-accent-600 text-white rounded-lg transition-colors duration-200"
          >
            <Icon name="DollarSign" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatorCard;