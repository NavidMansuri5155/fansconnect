import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

import Header from 'components/ui/Header';
import CreatorCard from './components/CreatorCard';
import ContentGrid from './components/ContentGrid';
import SubscriptionPanel from './components/SubscriptionPanel';
import TipModal from './components/TipModal';
import FilterSidebar from './components/FilterSidebar';
import CreatorProfile from './components/CreatorProfile';
import PurchaseHistory from './components/PurchaseHistory';
import WishlistPanel from './components/WishlistPanel';

function FanProfileSubscriptionPortal() {
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [activeTab, setActiveTab] = useState('discover');
  const [showTipModal, setShowTipModal] = useState(false);
  const [contentFilter, setContentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mockCreators = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "@sarahj",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      banner: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=300&fit=crop",
      bio: `Professional photographer and content creator sharing behind-the-scenes moments and exclusive photo shoots.
      
Join me for daily updates, personal stories, and premium content you won't find anywhere else!`,
      verified: true,
      subscribers: 12500,
      posts: 342,
      subscriptionPrice: 19.99,
      isSubscribed: false,
      rating: 4.8,
      tags: ["Photography", "Lifestyle", "Fashion"],
      lastActive: "2 hours ago",
      tipGoal: { current: 750, target: 1000, description: "New camera equipment" }
    },
    {
      id: 2,
      name: "Alex Rivera",
      username: "@alexr",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      banner: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=300&fit=crop",
      bio: `Fitness enthusiast and lifestyle coach helping you achieve your goals through personalized content and motivation.
      
Get access to exclusive workout routines, nutrition tips, and personal coaching sessions!`,
      verified: false,
      subscribers: 8200,
      posts: 189,
      subscriptionPrice: 14.99,
      isSubscribed: true,
      rating: 4.6,
      tags: ["Fitness", "Health", "Motivation"],
      lastActive: "1 hour ago",
      tipGoal: { current: 320, target: 500, description: "Home gym upgrade" }
    },
    {
      id: 3,
      name: "Emma Chen",
      username: "@emmac",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      banner: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop",
      bio: `Artist and digital creator bringing you into my creative world with tutorials, time-lapses, and exclusive artwork.
      
Support my art journey and get early access to new pieces and commission opportunities!`,
      verified: true,
      subscribers: 15800,
      posts: 456,
      subscriptionPrice: 24.99,
      isSubscribed: false,
      rating: 4.9,
      tags: ["Art", "Digital", "Tutorials"],
      lastActive: "30 minutes ago",
      tipGoal: { current: 1200, target: 1500, description: "Art studio rent" }
    }
  ];

  const mockContent = [
    {
      id: 1,
      creatorId: 1,
      type: "photo",
      title: "Golden Hour Photoshoot",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      price: 5.99,
      isPremium: true,
      likes: 245,
      comments: 18,
      timestamp: new Date(Date.now() - 3600000),
      preview: "Exclusive behind-the-scenes content from my latest golden hour session..."
    },
    {
      id: 2,
      creatorId: 2,
      type: "video",
      title: "Morning Workout Routine",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      price: 0,
      isPremium: false,
      likes: 189,
      comments: 32,
      timestamp: new Date(Date.now() - 7200000),
      preview: "Start your day right with this energizing 20-minute workout routine..."
    },
    {
      id: 3,
      creatorId: 3,
      type: "live",
      title: "Live Art Session",
      thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop",
      price: 2.99,
      isPremium: true,
      likes: 156,
      comments: 45,
      timestamp: new Date(Date.now() - 1800000),
      preview: "Join me live as I create a new digital masterpiece from scratch..."
    }
  ];

  const mockPurchases = [
    {
      id: 1,
      contentTitle: "Exclusive Photo Set",
      creatorName: "Sarah Johnson",
      price: 15.99,
      date: new Date(Date.now() - 86400000),
      downloadUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      contentTitle: "Premium Video Content",
      creatorName: "Alex Rivera",
      price: 9.99,
      date: new Date(Date.now() - 172800000),
      downloadUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop"
    }
  ];

  const tabs = [
    { id: 'discover', label: 'Discover', icon: 'Compass' },
    { id: 'subscriptions', label: 'My Subscriptions', icon: 'Heart' },
    { id: 'purchases', label: 'Purchases', icon: 'ShoppingBag' },
    { id: 'wishlist', label: 'Wishlist', icon: 'Bookmark' }
  ];

  const handleCreatorSelect = (creator) => {
    setSelectedCreator(creator);
  };

  const handleSubscribe = (creatorId) => {
    console.log('Subscribing to creator:', creatorId);
  };

  const handleTip = (creatorId, amount) => {
    console.log('Sending tip:', amount, 'to creator:', creatorId);
    setShowTipModal(false);
  };

  const handleContentPurchase = (contentId) => {
    console.log('Purchasing content:', contentId);
  };

  const filteredCreators = mockCreators.filter(creator => {
    if (activeTab === 'subscriptions') {
      return creator.isSubscribed;
    }
    if (searchQuery) {
      return creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
             creator.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return true;
  });

  const filteredContent = mockContent.filter(content => {
    if (contentFilter === 'all') return true;
    return content.type === contentFilter;
  }).sort((a, b) => {
    if (sortBy === 'recent') return b.timestamp - a.timestamp;
    if (sortBy === 'popular') return b.likes - a.likes;
    if (sortBy === 'price') return a.price - b.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 fixed left-0 top-16 bottom-0 bg-surface border-r border-border overflow-y-auto">
            <FilterSidebar 
              contentFilter={contentFilter}
              setContentFilter={setContentFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-64">
            <div className="p-4 lg:p-6">
              {/* Mobile Search */}
              <div className="lg:hidden mb-6">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search creators, content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="mb-6">
                <div className="flex space-x-1 bg-surface p-1 rounded-lg overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface-700/50'
                      }`}
                    >
                      <Icon name={tab.icon} size={18} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Based on Active Tab */}
              {activeTab === 'discover' && (
                <div className="space-y-6">
                  {/* Featured Creators */}
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary mb-4">Featured Creators</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredCreators.map((creator) => (
                        <CreatorCard
                          key={creator.id}
                          creator={creator}
                          onSelect={handleCreatorSelect}
                          onSubscribe={handleSubscribe}
                          onTip={() => setShowTipModal(true)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Latest Content */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-text-primary">Latest Content</h2>
                      <div className="flex items-center space-x-2">
                        <select
                          value={contentFilter}
                          onChange={(e) => setContentFilter(e.target.value)}
                          className="bg-surface border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="all">All Content</option>
                          <option value="photo">Photos</option>
                          <option value="video">Videos</option>
                          <option value="live">Live Streams</option>
                        </select>
                      </div>
                    </div>
                    <ContentGrid
                      content={filteredContent}
                      creators={mockCreators}
                      onPurchase={handleContentPurchase}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'subscriptions' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-text-primary">My Subscriptions</h2>
                  {filteredCreators.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredCreators.map((creator) => (
                        <SubscriptionPanel
                          key={creator.id}
                          creator={creator}
                          onManage={() => console.log('Managing subscription for:', creator.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Heart" size={48} className="text-text-tertiary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-text-primary mb-2">No Subscriptions Yet</h3>
                      <p className="text-text-secondary mb-6">Start following your favorite creators to see them here</p>
                      <button
                        onClick={() => setActiveTab('discover')}
                        className="btn-primary"
                      >
                        Discover Creators
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'purchases' && (
                <PurchaseHistory purchases={mockPurchases} />
              )}

              {activeTab === 'wishlist' && (
                <WishlistPanel creators={mockCreators.slice(0, 2)} />
              )}
            </div>
          </div>

          {/* Desktop Right Sidebar */}
          <div className="hidden xl:block w-80 fixed right-0 top-16 bottom-0 bg-surface border-l border-border overflow-y-auto">
            {selectedCreator && (
              <CreatorProfile
                creator={selectedCreator}
                onSubscribe={handleSubscribe}
                onTip={() => setShowTipModal(true)}
                onMessage={() => window.location.href = '/fan-messaging-communication'}
              />
            )}
          </div>
        </div>
      </div>

      {/* Tip Modal */}
      {showTipModal && (
        <TipModal
          creator={selectedCreator}
          onTip={handleTip}
          onClose={() => setShowTipModal(false)}
        />
      )}
    </div>
  );
}

export default FanProfileSubscriptionPortal;