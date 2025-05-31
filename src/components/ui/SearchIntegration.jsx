import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

function SearchIntegration() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const mockResults = [
    {
      type: 'creator',
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarahj',
      avatar: '/assets/images/no_image.png',
      verified: true,
      subscribers: '12.5K'
    },
    {
      type: 'creator',
      id: 2,
      name: 'Alex Rivera',
      username: '@alexr',
      avatar: '/assets/images/no_image.png',
      verified: false,
      subscribers: '8.2K'
    },
    {
      type: 'content',
      id: 3,
      title: 'Behind the Scenes: Photo Shoot',
      creator: 'Sarah Johnson',
      thumbnail: '/assets/images/no_image.png',
      likes: 245
    },
    {
      type: 'content',
      id: 4,
      title: 'Exclusive Live Stream Highlights',
      creator: 'Alex Rivera',
      thumbnail: '/assets/images/no_image.png',
      likes: 189
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = mockResults.filter(item => 
          (item.name && item.name.toLowerCase().includes(query.toLowerCase())) ||
          (item.username && item.username.toLowerCase().includes(query.toLowerCase())) ||
          (item.title && item.title.toLowerCase().includes(query.toLowerCase()))
        );
        setSearchResults(filtered);
        setIsLoading(false);
      }, 300);
    } else {
      setSearchResults([]);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = (e) => {
    // Don't close if clicking within the search container
    if (containerRef.current && containerRef.current.contains(e.relatedTarget)) {
      return;
    }
    setTimeout(() => {
      setIsExpanded(false);
      setSearchResults([]);
    }, 150);
  };

  const handleResultClick = (result) => {
    if (result.type === 'creator') {
      window.location.href = `/creator/${result.username}`;
    } else {
      window.location.href = `/content/${result.id}`;
    }
    setIsExpanded(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className={`flex items-center bg-surface-700/50 border border-border rounded-lg transition-all duration-200 ${
        isExpanded ? 'ring-2 ring-primary/20' : ''
      }`}>
        <div className="pl-3">
          <Icon name="Search" size={18} className="text-text-secondary" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          placeholder="Search creators, content..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full md:w-64 px-3 py-2 bg-transparent text-text-primary placeholder-text-secondary focus:outline-none"
        />

        {searchQuery && (
          <button
            onClick={clearSearch}
            className="pr-3 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isExpanded && (searchResults.length > 0 || isLoading || searchQuery.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg z-300 max-h-96 overflow-y-auto animate-fade-in">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                <span className="text-text-secondary">Searching...</span>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-surface-700/50 transition-colors duration-200"
                >
                  {result.type === 'creator' ? (
                    <>
                      <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} color="white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-text-primary">{result.name}</span>
                          {result.verified && (
                            <Icon name="BadgeCheck" size={14} className="text-primary" />
                          )}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {result.username} • {result.subscribers} subscribers
                        </div>
                      </div>
                      <Icon name="User" size={16} className="text-text-tertiary" />
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-surface-600 rounded-lg flex items-center justify-center">
                        <Icon name="Image" size={16} className="text-text-secondary" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-text-primary">{result.title}</div>
                        <div className="text-sm text-text-secondary">
                          by {result.creator} • {result.likes} likes
                        </div>
                      </div>
                      <Icon name="Play" size={16} className="text-text-tertiary" />
                    </>
                  )}
                </button>
              ))}
            </div>
          ) : searchQuery.length > 0 ? (
            <div className="p-4 text-center">
              <Icon name="Search" size={24} className="text-text-tertiary mx-auto mb-2" />
              <p className="text-text-secondary">No results found for "{searchQuery}"</p>
              <p className="text-sm text-text-tertiary mt-1">Try different keywords</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchIntegration;