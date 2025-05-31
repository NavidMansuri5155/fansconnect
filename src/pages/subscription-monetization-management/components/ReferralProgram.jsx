import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ReferralProgram = () => {
  const [isReferralEnabled, setIsReferralEnabled] = useState(true);
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  
  const [referralSettings, setReferralSettings] = useState({
    rewardType: 'percentage',
    rewardValue: 20,
    rewardDuration: 1,
    minSubscriptionDays: 30,
    customMessage: 'Join me on FanHub and get 20% off your first month! Use my referral link below.',
    allowMultiple: true
  });
  
  const [editedSettings, setEditedSettings] = useState({ ...referralSettings });
  
  // Mock data for referral stats
  const referralStats = {
    totalReferrals: 87,
    activeReferrals: 42,
    conversionRate: 48.3,
    totalEarned: 378.45
  };
  
  // Mock data for referral history
  const referralHistory = [
    { date: '2023-08-01', referrals: 12, conversions: 6 },
    { date: '2023-07-01', referrals: 18, conversions: 9 },
    { date: '2023-06-01', referrals: 15, conversions: 7 },
    { date: '2023-05-01', referrals: 22, conversions: 10 },
    { date: '2023-04-01', referrals: 10, conversions: 5 },
    { date: '2023-03-01', referrals: 10, conversions: 5 },
  ];
  
  // Mock data for top referrers
  const topReferrers = [
    { id: 1, name: 'Sarah Miller', username: '@sarahm', referrals: 12, earnings: 48.00, avatar: '/assets/images/no_image.png' },
    { id: 2, name: 'John Davis', username: '@johnd', referrals: 8, earnings: 32.00, avatar: '/assets/images/no_image.png' },
    { id: 3, name: 'Emma Wilson', username: '@emmaw', referrals: 6, earnings: 24.00, avatar: '/assets/images/no_image.png' },
  ];
  
  const handleSaveSettings = () => {
    setReferralSettings(editedSettings);
    setIsEditingSettings(false);
  };
  
  const handleToggleReferralProgram = () => {
    setIsReferralEnabled(!isReferralEnabled);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };
  
  const referralLink = 'https://fanhub.com/ref/username123';
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Referral Program</h2>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Program Status</span>
            <button 
              onClick={handleToggleReferralProgram}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                isReferralEnabled ? 'bg-success' : 'bg-surface-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  isReferralEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <button 
            onClick={() => {
              setEditedSettings({ ...referralSettings });
              setIsEditingSettings(true);
            }}
            className="px-4 py-2 text-sm bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Icon name="Settings" size={14} />
            <span>Edit Settings</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <h3 className="font-medium mb-4">Your Referral Link</h3>
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-1 bg-surface-700 text-text-secondary px-3 py-2 rounded-lg font-mono text-sm truncate">
              {referralLink}
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(referralLink)}
              className="p-2 bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200"
              title="Copy to clipboard"
            >
              <Icon name="Copy" size={16} />
            </button>
          </div>
          
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-all duration-200 flex items-center justify-center space-x-2">
              <Icon name="Share2" size={16} />
              <span>Share on Social Media</span>
            </button>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center justify-center">
                <Icon name="Twitter" size={16} />
              </button>
              <button className="flex-1 px-4 py-2 bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center justify-center">
                <Icon name="Instagram" size={16} />
              </button>
              <button className="flex-1 px-4 py-2 bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center justify-center">
                <Icon name="Facebook" size={16} />
              </button>
              <button className="flex-1 px-4 py-2 bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center justify-center">
                <Icon name="Mail" size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <h3 className="font-medium mb-4">Referral Stats</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-text-secondary mb-1">Total Referrals</div>
              <div className="text-2xl font-bold">{referralStats.totalReferrals}</div>
            </div>
            <div>
              <div className="text-sm text-text-secondary mb-1">Active Referrals</div>
              <div className="text-2xl font-bold">{referralStats.activeReferrals}</div>
            </div>
            <div>
              <div className="text-sm text-text-secondary mb-1">Conversion Rate</div>
              <div className="text-2xl font-bold">{referralStats.conversionRate}%</div>
            </div>
            <div>
              <div className="text-sm text-text-secondary mb-1">Total Earned</div>
              <div className="text-2xl font-bold">${referralStats.totalEarned.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm">Current Reward</h4>
              <div className="text-sm text-text-secondary">
                {referralSettings.rewardType === 'percentage' 
                  ? `${referralSettings.rewardValue}% for ${referralSettings.rewardDuration} month(s)` 
                  : `$${referralSettings.rewardValue.toFixed(2)} for ${referralSettings.rewardDuration} month(s)`}
              </div>
            </div>
            <p className="text-xs text-text-tertiary">
              You earn this reward for each successful referral that subscribes to your content
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-4">Referral History</h3>
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={referralHistory}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="#94A3B8"
                />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E3F', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: '#F8FAFC'
                  }}
                  formatter={(value) => [value, '']}
                  labelFormatter={(date) => formatDate(date)}
                />
                <Line 
                  type="monotone" 
                  dataKey="referrals" 
                  name="Referrals"
                  stroke="#6366F1" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#6366F1', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#6366F1', strokeWidth: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="conversions" 
                  name="Conversions"
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#10B981', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-4">Top Referrers</h3>
        <div className="bg-surface-800 border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Referrals</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Earnings</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {topReferrers.map((referrer) => (
                  <tr key={referrer.id} className="hover:bg-surface-700/50 transition-colors duration-150">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-surface-600 rounded-full flex items-center justify-center">
                          <Icon name="User" size={14} className="text-text-secondary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{referrer.name}</div>
                          <div className="text-xs text-text-secondary">{referrer.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-medium">{referrer.referrals}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-medium">${referrer.earnings.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-200">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {topReferrers.length === 0 && (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} className="text-text-tertiary" />
              </div>
              <h4 className="font-medium mb-2">No Referrers Yet</h4>
              <p className="text-sm text-text-secondary">
                Share your referral link to start earning rewards
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-surface-800 border border-border rounded-lg p-4">
        <h3 className="font-medium mb-4">Promotional Message</h3>
        <div className="bg-surface-700 p-4 rounded-lg mb-4">
          <p className="text-sm text-text-secondary italic">
            "{referralSettings.customMessage}"
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => {
              setEditedSettings({ ...referralSettings });
              setIsEditingSettings(true);
            }}
            className="px-4 py-2 text-sm bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Icon name="Edit" size={14} />
            <span>Edit Message</span>
          </button>
          <button 
            onClick={() => navigator.clipboard.writeText(referralSettings.customMessage)}
            className="px-4 py-2 text-sm bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Icon name="Copy" size={14} />
            <span>Copy Message</span>
          </button>
        </div>
      </div>
      
      {/* Edit Settings Modal */}
      {isEditingSettings && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Edit Referral Settings</h3>
                <button 
                  onClick={() => setIsEditingSettings(false)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Reward Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setEditedSettings({...editedSettings, rewardType: 'percentage'})}
                      className={`flex items-center justify-center p-3 rounded-lg border ${
                        editedSettings.rewardType === 'percentage' ?'border-primary bg-primary/10' :'border-border bg-surface-800'
                      }`}
                    >
                      <span className="text-sm font-medium">Percentage (%)</span>
                    </button>
                    
                    <button
                      onClick={() => setEditedSettings({...editedSettings, rewardType: 'fixed'})}
                      className={`flex items-center justify-center p-3 rounded-lg border ${
                        editedSettings.rewardType === 'fixed' ?'border-primary bg-primary/10' :'border-border bg-surface-800'
                      }`}
                    >
                      <span className="text-sm font-medium">Fixed Amount ($)</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {editedSettings.rewardType === 'percentage' ? 'Reward Percentage (%)' : 'Reward Amount ($)'}
                  </label>
                  <input 
                    type="number" 
                    min="1"
                    max={editedSettings.rewardType === 'percentage' ? "100" : "999"}
                    value={editedSettings.rewardValue}
                    onChange={(e) => setEditedSettings({...editedSettings, rewardValue: parseInt(e.target.value)})}
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Reward Duration (Months)</label>
                  <select 
                    value={editedSettings.rewardDuration}
                    onChange={(e) => setEditedSettings({...editedSettings, rewardDuration: parseInt(e.target.value)})}
                    className="input-field w-full"
                  >
                    <option value="1">1 Month</option>
                    <option value="2">2 Months</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Minimum Subscription Days</label>
                  <select 
                    value={editedSettings.minSubscriptionDays}
                    onChange={(e) => setEditedSettings({...editedSettings, minSubscriptionDays: parseInt(e.target.value)})}
                    className="input-field w-full"
                  >
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                    <option value="30">30 Days</option>
                    <option value="60">60 Days</option>
                    <option value="90">90 Days</option>
                  </select>
                  <p className="text-xs text-text-tertiary mt-1">
                    Referred users must stay subscribed for this many days before you earn the reward
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Custom Referral Message</label>
                  <textarea 
                    value={editedSettings.customMessage}
                    onChange={(e) => setEditedSettings({...editedSettings, customMessage: e.target.value})}
                    className="input-field w-full h-24 resize-none"
                    placeholder="Enter a custom message to share with your referral link"
                  ></textarea>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Allow Multiple Rewards</span>
                    <button 
                      onClick={() => setEditedSettings({...editedSettings, allowMultiple: !editedSettings.allowMultiple})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                        editedSettings.allowMultiple ? 'bg-success' : 'bg-surface-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          editedSettings.allowMultiple ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-text-tertiary">
                  If enabled, you'll earn rewards for all referrals. If disabled, you'll only earn for the first referral from each user.
                </p>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={handleSaveSettings}
                  className="btn-primary flex-1"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditingSettings(false)}
                  className="px-6 py-3 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralProgram;