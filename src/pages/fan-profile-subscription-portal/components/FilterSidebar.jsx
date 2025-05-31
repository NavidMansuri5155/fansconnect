import React from 'react';
import Icon from 'components/AppIcon';

function FilterSidebar({ contentFilter, setContentFilter, sortBy, setSortBy, searchQuery, setSearchQuery }) {
  const contentTypes = [
    { id: 'all', label: 'All Content', icon: 'Grid3X3' },
    { id: 'photo', label: 'Photos', icon: 'Image' },
    { id: 'video', label: 'Videos', icon: 'Play' },
    { id: 'live', label: 'Live Streams', icon: 'Radio' }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Most Recent', icon: 'Clock' },
    { id: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { id: 'price', label: 'Price: Low to High', icon: 'DollarSign' }
  ];

  const categories = [
    'Photography', 'Fitness', 'Art', 'Music', 'Gaming', 'Lifestyle', 
    'Fashion', 'Cooking', 'Travel', 'Education'
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Search */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
          Search
        </h3>
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-700/50 border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Content Type Filter */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
          Content Type
        </h3>
        <div className="space-y-1">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setContentFilter(type.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                contentFilter === type.id
                  ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-700/50'
              }`}
            >
              <Icon name={type.icon} size={16} />
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
          Sort By
        </h3>
        <div className="space-y-1">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                sortBy === option.id
                  ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-700/50'
              }`}
            >
              <Icon name={option.icon} size={16} />
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
          Categories
        </h3>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category}
              className="w-full text-left px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 text-sm"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
          Price Range
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="flex-1 h-2 bg-surface-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>$0</span>
            <span>$100+</span>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
          Quick Filters
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-primary bg-surface border border-border rounded focus:ring-primary" />
            <span className="text-sm text-text-secondary">Verified Only</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-primary bg-surface border border-border rounded focus:ring-primary" />
            <span className="text-sm text-text-secondary">Free Content</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-primary bg-surface border border-border rounded focus:ring-primary" />
            <span className="text-sm text-text-secondary">Currently Live</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;