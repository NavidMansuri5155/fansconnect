import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import RoleSwitcher from './RoleSwitcher';
import NotificationBadge from './NotificationBadge';
import QuickActionToolbar from './QuickActionToolbar';

function Sidebar() {
  const [currentRole, setCurrentRole] = useState('fan');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('/fan-profile-subscription-portal');
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
      tooltip: 'Explore content and creators',
      description: 'Find new creators and content'
    },
    {
      label: 'Create',
      path: '/content-upload-management',
      icon: 'Plus',
      roles: ['creator'],
      tooltip: 'Upload and manage content',
      description: 'Upload photos, videos, and posts'
    },
    {
      label: 'Earnings',
      path: '/subscription-monetization-management',
      icon: 'DollarSign',
      roles: ['creator'],
      tooltip: 'Track revenue and analytics',
      description: 'Monitor income and analytics',
      hasNotification: notifications.earnings > 0
    },
    {
      label: 'Messages',
      path: '/fan-messaging-communication',
      icon: 'MessageCircle',
      roles: ['fan', 'creator'],
      tooltip: 'Chat with fans and creators',
      description: 'Private conversations',
      hasNotification: notifications.messages > 0
    },
    {
      label: 'Account',
      path: '/creator-registration-onboarding',
      icon: 'User',
      roles: ['fan', 'creator'],
      tooltip: 'Profile and settings',
      description: 'Manage your profile'
    }
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(currentRole)
  );

  const handleRoleSwitch = (newRole) => {
    setCurrentRole(newRole);
  };

  const handleNavigation = (path) => {
    setActiveItem(path);
    window.location.href = path;
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveItem(currentPath);
  }, []);

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-200 bg-surface border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } lg:w-64 lg:fixed`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={16} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary text-sm">Navigation</h3>
                  <p className="text-xs text-text-secondary capitalize">{currentRole} Mode</p>
                </div>
              </div>
            )}
            <button
              onClick={toggleCollapse}
              className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-md transition-all duration-200 lg:hidden"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {filteredNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`relative w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                activeItem === item.path
                  ? 'bg-primary/10 text-primary border-l-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-700/50'
              }`}
              title={isCollapsed ? item.tooltip : ''}
            >
              <div className="relative">
                <Icon name={item.icon} size={20} />
                {item.hasNotification && (
                  <NotificationBadge 
                    count={item.label === 'Messages' ? notifications.messages : notifications.earnings}
                    size="sm"
                  />
                )}
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-text-tertiary">{item.description}</div>
                </div>
              )}

              {!isCollapsed && activeItem === item.path && (
                <Icon name="ChevronRight" size={16} className="text-primary" />
              )}
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <QuickActionToolbar currentRole={currentRole} />
          </div>
        )}

        {/* Role Switcher */}
        <div className="p-4 border-t border-border">
          <RoleSwitcher 
            currentRole={currentRole} 
            onRoleSwitch={handleRoleSwitch}
            isCollapsed={isCollapsed}
          />
        </div>

        {/* Sidebar Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary">Alex Morgan</div>
                <div className="text-xs text-text-secondary">Premium Creator</div>
              </div>
              <button className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-md transition-all duration-200">
                <Icon name="Settings" size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;