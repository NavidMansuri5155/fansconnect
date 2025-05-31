import React from 'react';

function NotificationBadge({ count = 0, size = 'default', className = '' }) {
  if (count === 0) return null;

  const displayCount = count > 99 ? '99+' : count.toString();
  
  const sizeClasses = {
    sm: 'h-4 w-4 text-xs',
    default: 'h-5 w-5 text-xs',
    lg: 'h-6 w-6 text-sm'
  };

  const baseClasses = `absolute -top-1 -right-1 bg-secondary text-white font-medium rounded-full flex items-center justify-center animate-pulse-glow ${sizeClasses[size]}`;

  return (
    <span className={`${baseClasses} ${className}`}>
      {displayCount}
    </span>
  );
}

export default NotificationBadge;