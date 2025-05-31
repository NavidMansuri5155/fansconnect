import React, { useState } from 'react';
import Icon from '../AppIcon';

function RoleSwitcher({ currentRole, onRoleSwitch, isMobile = false, isCollapsed = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    {
      id: 'fan',
      label: 'Fan',
      icon: 'Heart',
      description: 'Discover and support creators',
      color: 'text-secondary'
    },
    {
      id: 'creator',
      label: 'Creator',
      icon: 'Star',
      description: 'Create and monetize content',
      color: 'text-primary'
    }
  ];

  const currentRoleData = roles.find(role => role.id === currentRole);

  const handleRoleSelect = (roleId) => {
    onRoleSwitch(roleId);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (isCollapsed) {
    return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-full p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
          title={`Switch from ${currentRoleData?.label} mode`}
        >
          <Icon name={currentRoleData?.icon} size={20} className={currentRoleData?.color} />
        </button>

        {isOpen && (
          <div className="absolute left-full top-0 ml-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-300 animate-scale-in">
            <div className="p-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 ${
                    currentRole === role.id
                      ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-700/50'
                  }`}
                >
                  <Icon name={role.icon} size={16} className={role.color} />
                  <div className="text-left">
                    <div className="font-medium text-sm">{role.label}</div>
                    <div className="text-xs text-text-tertiary">{role.description}</div>
                  </div>
                  {currentRole === role.id && (
                    <Icon name="Check" size={14} className="text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="px-2">
        <div className="text-sm font-medium text-text-primary mb-2">Switch Mode</div>
        <div className="space-y-2">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentRole === role.id
                  ? 'bg-primary/10 text-primary border border-primary/20' :'text-text-secondary hover:text-text-primary hover:bg-surface-700/50 border border-border'
              }`}
            >
              <Icon name={role.icon} size={20} className={role.color} />
              <div className="flex-1 text-left">
                <div className="font-medium">{role.label}</div>
                <div className="text-xs text-text-tertiary">{role.description}</div>
              </div>
              {currentRole === role.id && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-full flex items-center space-x-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 group"
      >
        <Icon name={currentRoleData?.icon} size={18} className={currentRoleData?.color} />
        <div className="flex-1 text-left">
          <div className="font-medium text-sm">{currentRoleData?.label} Mode</div>
          <div className="text-xs text-text-tertiary">Click to switch</div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-surface border border-border rounded-lg shadow-lg z-300 animate-scale-in">
          <div className="p-2">
            <div className="text-xs font-medium text-text-secondary px-3 py-2 border-b border-border">
              Switch Role
            </div>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 ${
                  currentRole === role.id
                    ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-700/50'
                }`}
              >
                <Icon name={role.icon} size={16} className={role.color} />
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{role.label}</div>
                  <div className="text-xs text-text-tertiary">{role.description}</div>
                </div>
                {currentRole === role.id && (
                  <Icon name="Check" size={14} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RoleSwitcher;