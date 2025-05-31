import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RevenueOverview = () => {
  const [timeRange, setTimeRange] = useState('30d');
  
  // Mock data for revenue chart
  const revenueData = [
    { date: '2023-05-01', revenue: 1245.32, subscriptions: 845.12, tips: 320.20, ppv: 80.00 },
    { date: '2023-05-08', revenue: 1302.18, subscriptions: 865.45, tips: 356.73, ppv: 80.00 },
    { date: '2023-05-15', revenue: 1387.65, subscriptions: 892.15, tips: 415.50, ppv: 80.00 },
    { date: '2023-05-22', revenue: 1456.92, subscriptions: 924.42, tips: 452.50, ppv: 80.00 },
    { date: '2023-05-29', revenue: 1532.48, subscriptions: 958.48, tips: 494.00, ppv: 80.00 },
    { date: '2023-06-05', revenue: 1598.76, subscriptions: 992.76, tips: 526.00, ppv: 80.00 },
    { date: '2023-06-12', revenue: 1678.32, subscriptions: 1026.32, tips: 572.00, ppv: 80.00 },
    { date: '2023-06-19', revenue: 1742.85, subscriptions: 1060.85, tips: 602.00, ppv: 80.00 },
    { date: '2023-06-26', revenue: 1824.16, subscriptions: 1094.16, tips: 650.00, ppv: 80.00 },
    { date: '2023-07-03', revenue: 1898.45, subscriptions: 1128.45, tips: 690.00, ppv: 80.00 },
    { date: '2023-07-10', revenue: 1972.68, subscriptions: 1162.68, tips: 730.00, ppv: 80.00 },
    { date: '2023-07-17', revenue: 2048.92, subscriptions: 1196.92, tips: 772.00, ppv: 80.00 },
    { date: '2023-07-24', revenue: 2124.35, subscriptions: 1230.35, tips: 814.00, ppv: 80.00 },
    { date: '2023-07-31', revenue: 2198.72, subscriptions: 1264.72, tips: 854.00, ppv: 80.00 },
    { date: '2023-08-07', revenue: 2258.32, subscriptions: 1284.32, tips: 894.00, ppv: 80.00 },
  ];
  
  // Mock data for revenue breakdown
  const revenueBreakdownData = [
    { name: 'Subscriptions', value: 1284.32, color: '#6366F1' },
    { name: 'Tips', value: 894.00, color: '#EC4899' },
    { name: 'Pay-per-view', value: 80.00, color: '#F59E0B' },
  ];
  
  // Mock data for top subscribers
  const topSubscribers = [
    { id: 1, name: 'Alex Johnson', username: '@alexj', amount: 142.50, tier: 'VIP', avatar: '/assets/images/no_image.png' },
    { id: 2, name: 'Sarah Miller', username: '@sarahm', amount: 124.75, tier: 'VIP', avatar: '/assets/images/no_image.png' },
    { id: 3, name: 'Michael Brown', username: '@mikeb', amount: 98.20, tier: 'Premium', avatar: '/assets/images/no_image.png' },
    { id: 4, name: 'Jessica Lee', username: '@jessical', amount: 87.45, tier: 'Premium', avatar: '/assets/images/no_image.png' },
    { id: 5, name: 'David Wilson', username: '@davidw', amount: 75.30, tier: 'Premium', avatar: '/assets/images/no_image.png' },
  ];
  
  // Mock data for recent transactions
  const recentTransactions = [
    { id: 1, type: 'subscription', username: '@alexj', amount: 19.99, date: '2023-08-07T14:32:45', status: 'completed' },
    { id: 2, type: 'tip', username: '@sarahm', amount: 50.00, date: '2023-08-07T12:18:22', status: 'completed' },
    { id: 3, type: 'ppv', username: '@mikeb', amount: 15.00, date: '2023-08-06T23:45:12', status: 'completed' },
    { id: 4, type: 'subscription', username: '@jessical', amount: 9.99, date: '2023-08-06T18:32:05', status: 'completed' },
    { id: 5, type: 'tip', username: '@davidw', amount: 25.00, date: '2023-08-06T15:12:38', status: 'completed' },
    { id: 6, type: 'subscription', username: '@robertj', amount: 19.99, date: '2023-08-06T10:05:22', status: 'failed' },
    { id: 7, type: 'subscription', username: '@emilyt', amount: 4.99, date: '2023-08-05T22:48:17', status: 'completed' },
  ];
  
  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: 'Year' },
    { value: 'all', label: 'All Time' },
  ];
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };
  
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'subscription':
        return 'CreditCard';
      case 'tip':
        return 'Gift';
      case 'ppv':
        return 'Play';
      default:
        return 'DollarSign';
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-bold mb-4 md:mb-0">Revenue Overview</h2>
        
        <div className="flex flex-wrap gap-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                timeRange === range.value
                  ? 'bg-primary text-white' :'bg-surface-700/50 text-text-secondary hover:text-text-primary'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Monthly Revenue</h3>
            <div className="text-sm text-success flex items-center">
              <Icon name="TrendingUp" size={14} className="mr-1" />
              <span>+8.2%</span>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">$12,458.32</div>
          <p className="text-sm text-text-secondary mb-4">vs $11,512.45 last month</p>
          
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Subscriptions</span>
                <span className="font-medium">$8,245.18</span>
              </div>
              <div className="w-full bg-surface-600 rounded-full h-2">
                <div className="h-2 rounded-full bg-primary" style={{ width: '66%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Tips</span>
                <span className="font-medium">$3,813.14</span>
              </div>
              <div className="w-full bg-surface-600 rounded-full h-2">
                <div className="h-2 rounded-full bg-secondary" style={{ width: '31%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Pay-per-view</span>
                <span className="font-medium">$400.00</span>
              </div>
              <div className="w-full bg-surface-600 rounded-full h-2">
                <div className="h-2 rounded-full bg-accent" style={{ width: '3%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <h3 className="font-medium mb-4">Revenue Breakdown</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E3F', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: '#F8FAFC'
                  }}
                  formatter={(value) => [`$${value.toFixed(2)}`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {revenueBreakdownData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <h3 className="font-medium mb-4">Top Supporters</h3>
          <div className="space-y-4">
            {topSubscribers.map((subscriber) => (
              <div key={subscriber.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-surface-600 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{subscriber.name}</div>
                    <div className="text-xs text-text-secondary">{subscriber.username} • {subscriber.tier}</div>
                  </div>
                </div>
                <div className="text-sm font-medium">${subscriber.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 text-sm text-primary hover:text-primary-600 border border-border rounded-lg transition-all duration-200">
            View All Supporters
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-4">Revenue Trend</h3>
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.getMonth() + 1}/${d.getDate()}`;
                  }}
                  stroke="#94A3B8"
                />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E3F', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: '#F8FAFC'
                  }}
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']}
                  labelFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.toLocaleDateString()}`;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366F1" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-4">Recent Transactions</h3>
        <div className="bg-surface-800 border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-surface-700/50 transition-colors duration-150">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-surface-600 rounded-full flex items-center justify-center">
                          <Icon name={getTransactionIcon(transaction.type)} size={14} className="text-text-secondary" />
                        </div>
                        <span className="text-sm capitalize">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm">{transaction.username}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-medium">{formatCurrency(transaction.amount)}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div>
                        <div className="text-sm">{formatDate(transaction.date)}</div>
                        <div className="text-xs text-text-tertiary">{formatTime(transaction.date)}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' 
                          ? 'bg-success/20 text-success' :'bg-error/20 text-error'
                      }`}>
                        {transaction.status === 'completed' ? (
                          <>
                            <Icon name="Check" size={12} className="mr-1" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Icon name="X" size={12} className="mr-1" />
                            Failed
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-surface-700 px-4 py-3 flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing <span className="font-medium">7</span> of <span className="font-medium">248</span> transactions
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-surface-600 text-text-secondary rounded-lg hover:bg-surface-500 transition-colors duration-200">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;