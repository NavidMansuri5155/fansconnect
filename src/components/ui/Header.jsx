import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import RoleSwitcher from './RoleSwitcher';
import NotificationBadge from './NotificationBadge';
import SearchIntegration from './SearchIntegration';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState('fan');
  const [notifications, setNotifications] = useState({
    messages: 3,
    earnings: 1,
    subscribers: 2
  });

  const navigationItems = [
    {
      label: 'Discover',
      path: '/fan-profile-subscription-portal',
      icon: 'Compass',
      roles: ['fan', 'creator'],
      tooltip: 'Explore content and creators'
    },
    {
      label: 'Create',
      path: '/content-upload-management',
      icon: 'Plus',
      roles: ['creator'],
      tooltip: 'Upload and manage content'
    },
    {
      label: 'Earnings',
      path: '/subscription-monetization-management',
      icon: 'DollarSign',
      roles: ['creator'],
      tooltip: 'Track revenue and analytics',
      hasNotification: notifications.earnings > 0
    },
    {
      label: 'Messages',
      path: '/fan-messaging-communication',
      icon: 'MessageCircle',
      roles: ['fan', 'creator'],
      tooltip: 'Chat with fans and creators',
      hasNotification: notifications.messages > 0
    },
    {
      label: 'Account',
      path: '/creator-registration-onboarding',
      icon: 'User',
      roles: ['fan', 'creator'],
      tooltip: 'Profile and settings'
    }
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(currentRole)
  );

  const handleRoleSwitch = (newRole) => {
    setCurrentRole(newRole);
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface/95 backdrop-blur-premium border-b border-border">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-gradient hidden sm:block">
                CreatorHub
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {filteredNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="relative flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 group"
                title={item.tooltip}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-medium">{item.label}</span>
                {item.hasNotification && (
                  <NotificationBadge 
                    count={item.label === 'Messages' ? notifications.messages : notifications.earnings}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchIntegration />
            <RoleSwitcher 
              currentRole={currentRole} 
              onRoleSwitch={handleRoleSwitch}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="space-y-2">
              {/* Mobile Search */}
              <div className="px-2 pb-4">
                <SearchIntegration />
              </div>

              {/* Mobile Navigation Items */}
              {filteredNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="relative w-full flex items-center space-x-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                  {item.hasNotification && (
                    <NotificationBadge 
                      count={item.label === 'Messages' ? notifications.messages : notifications.earnings}
                    />
                  )}
                </button>
              ))}

              {/* Mobile Role Switcher */}
              <div className="pt-4 border-t border-border">
                <RoleSwitcher 
                  currentRole={currentRole} 
                  onRoleSwitch={handleRoleSwitch}
                  isMobile={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;