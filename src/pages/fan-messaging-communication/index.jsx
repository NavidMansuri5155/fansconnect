import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

import Header from 'components/ui/Header';
import ConversationList from './components/ConversationList';
import ChatView from './components/ChatView';
import FanProfileSidebar from './components/FanProfileSidebar';
import MessageComposer from './components/MessageComposer';
import MassMessageModal from './components/MassMessageModal';
import PayPerMessageSettings from './components/PayPerMessageSettings';

function FanMessagingCommunication() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showFanProfile, setShowFanProfile] = useState(false);
  const [showMassMessage, setShowMassMessage] = useState(false);
  const [showPaySettings, setShowPaySettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageFilter, setMessageFilter] = useState('all');
  const [payPerMessageEnabled, setPayPerMessageEnabled] = useState(true);
  const [messageRate, setMessageRate] = useState(5.00);

  const mockConversations = [
    {
      id: 1,
      fanName: "Emma Wilson",
      fanUsername: "@emmaw",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thank you for the amazing content! Can\'t wait for more 💕",
      timestamp: new Date(Date.now() - 300000),
      unreadCount: 2,
      isSubscriber: true,
      subscriptionTier: "Premium",
      isOnline: true,
      totalSpent: 245.50,
      messagesPaid: 12,
      lastSeen: new Date(Date.now() - 120000)
    },
    {
      id: 2,
      fanName: "Michael Chen",
      fanUsername: "@mikec",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Hey! I\'d love to request some custom content if you\'re available",
      timestamp: new Date(Date.now() - 1800000),
      unreadCount: 0,
      isSubscriber: true,
      subscriptionTier: "VIP",
      isOnline: false,
      totalSpent: 890.25,
      messagesPaid: 45,
      lastSeen: new Date(Date.now() - 3600000)
    },
    {
      id: 3,
      fanName: "Sarah Davis",
      fanUsername: "@sarahd",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Your live stream yesterday was incredible! 🔥",
      timestamp: new Date(Date.now() - 7200000),
      unreadCount: 1,
      isSubscriber: true,
      subscriptionTier: "Basic",
      isOnline: true,
      totalSpent: 156.75,
      messagesPaid: 8,
      lastSeen: new Date(Date.now() - 300000)
    },
    {
      id: 4,
      fanName: "Alex Rodriguez",
      fanUsername: "@alexr",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Just sent you a tip! Keep up the amazing work ⭐",
      timestamp: new Date(Date.now() - 14400000),
      unreadCount: 0,
      isSubscriber: false,
      subscriptionTier: null,
      isOnline: false,
      totalSpent: 45.00,
      messagesPaid: 3,
      lastSeen: new Date(Date.now() - 7200000)
    },
    {
      id: 5,
      fanName: "Jessica Taylor",
      fanUsername: "@jesst",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Would love to chat more! Are you available for a custom video?",
      timestamp: new Date(Date.now() - 21600000),
      unreadCount: 3,
      isSubscriber: true,
      subscriptionTier: "Premium",
      isOnline: true,
      totalSpent: 567.80,
      messagesPaid: 28,
      lastSeen: new Date(Date.now() - 600000)
    }
  ];

  const mockMessages = [
    {
      id: 1,
      senderId: 1,
      senderName: "Emma Wilson",
      content: "Hey! I absolutely loved your latest photo set 😍",
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
      isPaid: false,
      amount: 0,
      status: "read"
    },
    {
      id: 2,
      senderId: "creator",
      senderName: "You",
      content: "Thank you so much! I\'m glad you enjoyed it 💕",
      timestamp: new Date(Date.now() - 3300000),
      type: "text",
      isPaid: false,
      amount: 0,
      status: "delivered"
    },
    {
      id: 3,
      senderId: 1,
      senderName: "Emma Wilson",
      content: "Could you do a custom video for me? I have some specific requests",
      timestamp: new Date(Date.now() - 1800000),
      type: "request",
      isPaid: true,
      amount: 25.00,
      status: "read",
      requestDetails: {
        type: "Custom Video",
        duration: "5-10 minutes",
        description: "Casual outfit, specific poses as discussed"
      }
    },
    {
      id: 4,
      senderId: "creator",
      senderName: "You",
      content: "Absolutely! I\'d be happy to create that for you. Let me send you the details",
      timestamp: new Date(Date.now() - 1500000),
      type: "text",
      isPaid: false,
      amount: 0,
      status: "delivered"
    },
    {
      id: 5,
      senderId: "creator",
      senderName: "You",
      content: "",
      timestamp: new Date(Date.now() - 1200000),
      type: "media",
      isPaid: false,
      amount: 0,
      status: "delivered",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=150&fit=crop",
        caption: "Here\'s a preview of what I\'m thinking for your custom video"
      }
    },
    {
      id: 6,
      senderId: 1,
      senderName: "Emma Wilson",
      content: "Perfect! That\'s exactly what I had in mind. When can you have it ready?",
      timestamp: new Date(Date.now() - 600000),
      type: "text",
      isPaid: true,
      amount: 5.00,
      status: "read"
    },
    {
      id: 7,
      senderId: 1,
      senderName: "Emma Wilson",
      content: "Thank you for the amazing content! Can\'t wait for more 💕",
      timestamp: new Date(Date.now() - 300000),
      type: "text",
      isPaid: true,
      amount: 5.00,
      status: "read"
    }
  ];

  const quickResponses = [
    "Thank you so much! 💕",
    "I'm glad you enjoyed it!",
    "More content coming soon!",
    "Let me check my schedule",
    "I'd be happy to help with that",
    "Thanks for your support!"
  ];

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.fanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.fanUsername.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = messageFilter === 'all' ||
                         (messageFilter === 'subscribers' && conv.isSubscriber) ||
                         (messageFilter === 'unread' && conv.unreadCount > 0) ||
                         (messageFilter === 'paid' && conv.messagesPaid > 0);
    
    return matchesSearch && matchesFilter;
  });

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobileView) {
      setShowFanProfile(false);
    }
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    setShowFanProfile(false);
  };

  const handleShowProfile = () => {
    setShowFanProfile(!showFanProfile);
  };

  const handleSendMessage = (messageData) => {
    console.log('Sending message:', messageData);
    // Handle message sending logic
  };

  const handleQuickResponse = (response) => {
    handleSendMessage({
      content: response,
      type: 'text',
      isPaid: payPerMessageEnabled,
      amount: payPerMessageEnabled ? messageRate : 0
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (filteredConversations.length > 0 && !selectedConversation) {
      setSelectedConversation(filteredConversations[0]);
    }
  }, [filteredConversations]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 h-screen flex">
        {/* Mobile View */}
        {isMobileView ? (
          <div className="flex-1 flex flex-col">
            {!selectedConversation ? (
              <div className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <div className="bg-surface border-b border-border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold text-text-primary">Messages</h1>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowPaySettings(true)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          payPerMessageEnabled 
                            ? 'bg-primary/20 text-primary' :'bg-surface-700/50 text-text-secondary'
                        }`}
                        title="Pay-per-message settings"
                      >
                        <Icon name="DollarSign" size={18} />
                      </button>
                      <button
                        onClick={() => setShowMassMessage(true)}
                        className="p-2 bg-surface-700/50 text-text-secondary hover:text-text-primary rounded-lg transition-colors duration-200"
                        title="Mass message"
                      >
                        <Icon name="Users" size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Search and Filter */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-surface-700/50 border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="flex space-x-2 overflow-x-auto pb-1">
                      {[
                        { id: 'all', label: 'All', icon: 'MessageCircle' },
                        { id: 'unread', label: 'Unread', icon: 'Bell' },
                        { id: 'subscribers', label: 'Subscribers', icon: 'Star' },
                        { id: 'paid', label: 'Paid', icon: 'DollarSign' }
                      ].map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => setMessageFilter(filter.id)}
                          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                            messageFilter === filter.id
                              ? 'bg-primary text-white' :'bg-surface-700/50 text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          <Icon name={filter.icon} size={14} />
                          <span>{filter.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <ConversationList
                  conversations={filteredConversations}
                  onConversationSelect={handleConversationSelect}
                  selectedConversation={selectedConversation}
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <ChatView
                  conversation={selectedConversation}
                  messages={mockMessages}
                  onBack={handleBackToList}
                  onShowProfile={handleShowProfile}
                  isMobile={true}
                />
                <MessageComposer
                  onSendMessage={handleSendMessage}
                  quickResponses={quickResponses}
                  onQuickResponse={handleQuickResponse}
                  payPerMessageEnabled={payPerMessageEnabled}
                  messageRate={messageRate}
                />
              </div>
            )}
          </div>
        ) : (
          /* Desktop View */
          <div className="flex-1 flex">
            {/* Conversation List */}
            <div className="w-80 bg-surface border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold text-text-primary">Messages</h1>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowPaySettings(true)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        payPerMessageEnabled 
                          ? 'bg-primary/20 text-primary' :'bg-surface-700/50 text-text-secondary'
                      }`}
                      title="Pay-per-message settings"
                    >
                      <Icon name="DollarSign" size={18} />
                    </button>
                    <button
                      onClick={() => setShowMassMessage(true)}
                      className="p-2 bg-surface-700/50 text-text-secondary hover:text-text-primary rounded-lg transition-colors duration-200"
                      title="Mass message"
                    >
                      <Icon name="Users" size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-surface-700/50 border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: 'All', icon: 'MessageCircle' },
                      { id: 'unread', label: 'Unread', icon: 'Bell' },
                      { id: 'subscribers', label: 'Subscribers', icon: 'Star' },
                      { id: 'paid', label: 'Paid', icon: 'DollarSign' }
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setMessageFilter(filter.id)}
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                          messageFilter === filter.id
                            ? 'bg-primary text-white' :'bg-surface-700/50 text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        <Icon name={filter.icon} size={12} />
                        <span>{filter.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <ConversationList
                conversations={filteredConversations}
                onConversationSelect={handleConversationSelect}
                selectedConversation={selectedConversation}
              />
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  <ChatView
                    conversation={selectedConversation}
                    messages={mockMessages}
                    onShowProfile={handleShowProfile}
                    isMobile={false}
                  />
                  <MessageComposer
                    onSendMessage={handleSendMessage}
                    quickResponses={quickResponses}
                    onQuickResponse={handleQuickResponse}
                    payPerMessageEnabled={payPerMessageEnabled}
                    messageRate={messageRate}
                  />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-surface-800/30">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="MessageCircle" size={32} color="white" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Select a conversation</h3>
                    <p className="text-text-secondary">Choose a fan to start messaging</p>
                  </div>
                </div>
              )}
            </div>

            {/* Fan Profile Sidebar */}
            {showFanProfile && selectedConversation && (
              <FanProfileSidebar
                fan={selectedConversation}
                onClose={() => setShowFanProfile(false)}
              />
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showMassMessage && (
        <MassMessageModal
          onClose={() => setShowMassMessage(false)}
          subscribers={mockConversations.filter(c => c.isSubscriber)}
        />
      )}

      {showPaySettings && (
        <PayPerMessageSettings
          enabled={payPerMessageEnabled}
          rate={messageRate}
          onEnabledChange={setPayPerMessageEnabled}
          onRateChange={setMessageRate}
          onClose={() => setShowPaySettings(false)}
        />
      )}
    </div>
  );
}

export default FanMessagingCommunication;