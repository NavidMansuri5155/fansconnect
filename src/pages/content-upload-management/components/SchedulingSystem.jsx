import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

function SchedulingSystem({ scheduleDate, onScheduleChange }) {
  const [isScheduled, setIsScheduled] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timezone, setTimezone] = useState('UTC-5 (EST)');

  const optimalTimes = [
    { time: '09:00', label: 'Morning Peak', engagement: 'High' },
    { time: '12:00', label: 'Lunch Break', engagement: 'Medium' },
    { time: '18:00', label: 'Evening Peak', engagement: 'Very High' },
    { time: '21:00', label: 'Night Time', engagement: 'High' }
  ];

  const timezones = [
    'UTC-8 (PST)', 'UTC-7 (MST)', 'UTC-6 (CST)', 'UTC-5 (EST)',
    'UTC+0 (GMT)', 'UTC+1 (CET)', 'UTC+8 (CST)', 'UTC+9 (JST)'
  ];

  const handleScheduleToggle = () => {
    setIsScheduled(!isScheduled);
    if (!isScheduled) {
      onScheduleChange(null);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const handleDateTimeChange = () => {
    if (selectedDate && selectedTime) {
      const scheduleDateTime = new Date(`${selectedDate}T${selectedTime}`);
      onScheduleChange(scheduleDateTime);
    }
  };

  const handleOptimalTimeSelect = (time) => {
    setSelectedTime(time);
    if (selectedDate) {
      const scheduleDateTime = new Date(`${selectedDate}T${time}`);
      onScheduleChange(scheduleDateTime);
    }
  };

  React.useEffect(() => {
    handleDateTimeChange();
  }, [selectedDate, selectedTime]);

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Calendar" size={20} className="mr-2 text-primary" />
          Publishing Schedule
        </h3>
        
        <button
          onClick={handleScheduleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
            isScheduled ? 'bg-primary' : 'bg-surface-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
              isScheduled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {!isScheduled ? (
        <div className="text-center py-6">
          <Icon name="Send" size={32} className="text-primary mx-auto mb-3" />
          <h4 className="font-semibold text-text-primary mb-2">Publish Immediately</h4>
          <p className="text-sm text-text-secondary">
            Your content will be published as soon as you click the publish button
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getTomorrowDate()}
                className="w-full input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Time
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full input-field"
              />
            </div>
          </div>

          {/* Timezone Selection */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full input-field"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>

          {/* Optimal Times Suggestions */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Suggested Optimal Times
            </label>
            <div className="grid grid-cols-2 gap-2">
              {optimalTimes.map((optimal) => (
                <button
                  key={optimal.time}
                  onClick={() => handleOptimalTimeSelect(optimal.time)}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                    selectedTime === optimal.time
                      ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-surface-700/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-text-primary">{optimal.time}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      optimal.engagement === 'Very High' ? 'bg-success/20 text-success' :
                      optimal.engagement === 'High'? 'bg-accent/20 text-accent' : 'bg-secondary/20 text-secondary'
                    }`}>
                      {optimal.engagement}
                    </span>
                  </div>
                  <div className="text-xs text-text-secondary">{optimal.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Summary */}
          {scheduleDate && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Scheduled for Publishing</span>
              </div>
              <p className="text-sm text-text-secondary">
                {scheduleDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} at {scheduleDate.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })} ({timezone})
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SchedulingSystem;