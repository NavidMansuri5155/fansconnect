import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const SubscriberAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeMetric, setActiveMetric] = useState('growth');
  
  // Mock data for subscriber growth
  const subscriberGrowthData = [
    { date: '2023-05-01', subscribers: 845, newSubscribers: 32, churn: 12 },
    { date: '2023-05-08', subscribers: 865, newSubscribers: 28, churn: 8 },
    { date: '2023-05-15', subscribers: 892, newSubscribers: 35, churn: 8 },
    { date: '2023-05-22', subscribers: 924, newSubscribers: 42, churn: 10 },
    { date: '2023-05-29', subscribers: 958, newSubscribers: 45, churn: 11 },
    { date: '2023-06-05', subscribers: 992, newSubscribers: 48, churn: 14 },
    { date: '2023-06-12', subscribers: 1026, newSubscribers: 52, churn: 18 },
    { date: '2023-06-19', subscribers: 1060, newSubscribers: 49, churn: 15 },
    { date: '2023-06-26', subscribers: 1094, newSubscribers: 47, churn: 13 },
    { date: '2023-07-03', subscribers: 1128, newSubscribers: 51, churn: 17 },
    { date: '2023-07-10', subscribers: 1162, newSubscribers: 54, churn: 20 },
    { date: '2023-07-17', subscribers: 1196, newSubscribers: 58, churn: 24 },
    { date: '2023-07-24', subscribers: 1230, newSubscribers: 55, churn: 21 },
    { date: '2023-07-31', subscribers: 1264, newSubscribers: 53, churn: 19 },
    { date: '2023-08-07', subscribers: 1284, newSubscribers: 38, churn: 18 },
  ];
  
  // Mock data for retention rates
  const retentionData = [
    { month: '1 Month', rate: 92 },
    { month: '2 Months', rate: 84 },
    { month: '3 Months', rate: 78 },
    { month: '6 Months', rate: 65 },
    { month: '12 Months', rate: 42 },
  ];
  
  // Mock data for subscriber sources
  const subscriberSourceData = [
    { name: 'Direct', value: 45 },
    { name: 'Social Media', value: 25 },
    { name: 'Referrals', value: 15 },
    { name: 'Search', value: 10 },
    { name: 'Other', value: 5 },
  ];
  
  // Mock data for subscriber demographics
  const demographicsData = [
    { age: '18-24', male: 15, female: 12, other: 3 },
    { age: '25-34', male: 25, female: 18, other: 5 },
    { age: '35-44', male: 18, female: 12, other: 2 },
    { age: '45-54', male: 8, female: 5, other: 1 },
    { age: '55+', male: 4, female: 2, other: 0 },
  ];
  
  // Mock data for lifetime value
  const lifetimeValueData = [
    { tier: 'Basic', value: 78.5 },
    { tier: 'Premium', value: 187.2 },
    { tier: 'VIP', value: 412.8 },
  ];
  
  const COLORS = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#64748B'];
  
  const metrics = [
    { id: 'growth', label: 'Subscriber Growth', icon: 'TrendingUp' },
    { id: 'retention', label: 'Retention Rates', icon: 'Users' },
    { id: 'sources', label: 'Subscriber Sources', icon: 'PieChart' },
    { id: 'demographics', label: 'Demographics', icon: 'BarChart2' },
    { id: 'lifetime', label: 'Lifetime Value', icon: 'DollarSign' },
  ];
  
  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: 'Year' },
    { value: 'all', label: 'All Time' },
  ];
  
  const renderMetricContent = () => {
    switch (activeMetric) {
      case 'growth':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Subscriber Growth</h3>
              <div className="text-sm text-text-secondary">
                Total Subscribers: <span className="font-medium text-text-primary">1,284</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricCard 
                title="New Subscribers"
                value="38"
                change="+12.5%"
                isPositive={true}
                icon="UserPlus"
                period="Last 7 days"
              />
              
              <MetricCard 
                title="Churn Rate"
                value="4.2%"
                change="-0.8%"
                isPositive={true}
                icon="UserMinus"
                period="Last 7 days"
              />
              
              <MetricCard 
                title="Net Growth"
                value="+20"
                change="+15.3%"
                isPositive={true}
                icon="TrendingUp"
                period="Last 7 days"
              />
            </div>
            
            <div className="h-80 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={subscriberGrowthData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorSubscribers" x1="0" y1="0" x2="0" y2="1">
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
                    formatter={(value) => [`${value}`, 'Subscribers']}
                    labelFormatter={(date) => {
                      const d = new Date(date);
                      return `${d.toLocaleDateString()}`;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="subscribers" 
                    stroke="#6366F1" 
                    fillOpacity={1} 
                    fill="url(#colorSubscribers)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subscriberGrowthData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
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
                    formatter={(value) => [`${value}`, '']}
                    labelFormatter={(date) => {
                      const d = new Date(date);
                      return `${d.toLocaleDateString()}`;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="newSubscribers" name="New Subscribers" fill="#10B981" />
                  <Bar dataKey="churn" name="Churn" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
        
      case 'retention':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Retention Rates</h3>
              <div className="text-sm text-text-secondary">
                Average Retention: <span className="font-medium text-text-primary">72.2%</span>
              </div>
            </div>
            
            <div className="h-80 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={retentionData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E1E3F', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: '#F8FAFC'
                    }}
                    formatter={(value) => [`${value}%`, 'Retention Rate']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#EC4899" 
                    strokeWidth={2}
                    dot={{ r: 6, fill: '#EC4899', strokeWidth: 0 }}
                    activeDot={{ r: 8, fill: '#EC4899', strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-surface-800 border border-border rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-3">Retention Insights</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Icon name="AlertCircle" size={18} className="text-warning mt-0.5" />
                  <div>
                    <p className="text-sm">Subscribers are most likely to churn after the first 3 months</p>
                    <p className="text-xs text-text-tertiary mt-1">Consider creating special offers for 3-month subscribers</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={18} className="text-success mt-0.5" />
                  <div>
                    <p className="text-sm">VIP tier has the highest retention rate at 86%</p>
                    <p className="text-xs text-text-tertiary mt-1">Focus on upselling subscribers to higher tiers</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="Info" size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm">Subscribers who engage with messages have 2.3x better retention</p>
                    <p className="text-xs text-text-tertiary mt-1">Increase direct messaging and engagement with subscribers</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
        
      case 'sources':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Subscriber Sources</h3>
              <div className="text-sm text-text-secondary">
                Total New Subscribers: <span className="font-medium text-text-primary">142</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subscriberSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {subscriberSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E1E3F', 
                        borderColor: 'rgba(255,255,255,0.1)',
                        color: '#F8FAFC'
                      }}
                      formatter={(value) => [`${value}%`, 'Percentage']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Source Breakdown</h4>
                <div className="space-y-4">
                  {subscriberSourceData.map((source, index) => (
                    <div key={source.name}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <span className="text-sm">{source.name}</span>
                        </div>
                        <span className="text-sm font-medium">{source.value}%</span>
                      </div>
                      <div className="w-full bg-surface-600 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${source.value}%`,
                            backgroundColor: COLORS[index % COLORS.length]
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-medium mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={16} className="text-primary mt-0.5" />
                      <span className="text-sm text-text-secondary">Focus on growing social media presence</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={16} className="text-primary mt-0.5" />
                      <span className="text-sm text-text-secondary">Optimize referral program incentives</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={16} className="text-primary mt-0.5" />
                      <span className="text-sm text-text-secondary">Improve SEO for better search visibility</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'demographics':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Subscriber Demographics</h3>
              <div className="text-sm text-text-secondary">
                Data based on <span className="font-medium text-text-primary">85%</span> of subscribers
              </div>
            </div>
            
            <div className="h-80 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={demographicsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="age" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E1E3F', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: '#F8FAFC'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="male" name="Male" fill="#6366F1" />
                  <Bar dataKey="female" name="Female" fill="#EC4899" />
                  <Bar dataKey="other" name="Other" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-800 border border-border rounded-lg p-4">
                <h4 className="font-medium mb-3">Geographic Distribution</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">United States</span>
                      <span className="text-sm font-medium">58%</span>
                    </div>
                    <div className="w-full bg-surface-600 rounded-full h-2">
                      <div className="h-2 rounded-full bg-primary" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">United Kingdom</span>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <div className="w-full bg-surface-600 rounded-full h-2">
                      <div className="h-2 rounded-full bg-primary" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Canada</span>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    <div className="w-full bg-surface-600 rounded-full h-2">
                      <div className="h-2 rounded-full bg-primary" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Australia</span>
                      <span className="text-sm font-medium">7%</span>
                    </div>
                    <div className="w-full bg-surface-600 rounded-full h-2">
                      <div className="h-2 rounded-full bg-primary" style={{ width: '7%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Germany</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <div className="w-full bg-surface-600 rounded-full h-2">
                      <div className="h-2 rounded-full bg-primary" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Other</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <div className="w-full bg-surface-600 rounded-full h-2">
                      <div className="h-2 rounded-full bg-primary" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-800 border border-border rounded-lg p-4">
                <h4 className="font-medium mb-3">Engagement Patterns</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Mobile Users</span>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                    <div className="w-full bg-surface-600 rounded-full h-2">
                      <div className="h-2 rounded-full bg-secondary" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Desktop Users</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="w-full bg-surface-600 rounded-full h-2">
                      <div className="h-2 rounded-full bg-secondary" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Peak Activity Time</span>
                      <span className="text-sm font-medium">6PM - 11PM</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Most Active Day</span>
                      <span className="text-sm font-medium">Saturday</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg. Session Duration</span>
                      <span className="text-sm font-medium">18 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'lifetime':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Subscriber Lifetime Value</h3>
              <div className="text-sm text-text-secondary">
                Average LTV: <span className="font-medium text-text-primary">$226.17</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {lifetimeValueData.map((item) => (
                <div key={item.tier} className="bg-surface-800 border border-border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{item.tier} Tier</h4>
                  <div className="text-2xl font-bold mb-1">${item.value.toFixed(2)}</div>
                  <p className="text-sm text-text-secondary">Average lifetime value</p>
                </div>
              ))}
            </div>
            
            <div className="h-80 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={lifetimeValueData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="tier" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E1E3F', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: '#F8FAFC'
                    }}
                    formatter={(value) => [`$${value.toFixed(2)}`, 'Lifetime Value']}
                  />
                  <Bar dataKey="value" name="Lifetime Value" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-surface-800 border border-border rounded-lg p-4">
              <h4 className="font-medium mb-3">LTV Improvement Strategies</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="ArrowUpRight" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Tier Upgrades</p>
                    <p className="text-sm text-text-secondary mt-1">Encourage subscribers to upgrade to higher tiers with exclusive content previews</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={16} className="text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Retention Programs</p>
                    <p className="text-sm text-text-secondary mt-1">Implement loyalty rewards for subscribers who stay for 3+ months</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Gift" size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Additional Purchases</p>
                    <p className="text-sm text-text-secondary mt-1">Create premium pay-per-view content to supplement subscription revenue</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-bold mb-4 md:mb-0">Subscriber Analytics</h2>
        
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
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {metrics.map((metric) => (
          <button
            key={metric.id}
            onClick={() => setActiveMetric(metric.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 ${
              activeMetric === metric.id
                ? 'bg-primary/10 border border-primary/20 text-primary' :'bg-surface-800 border border-border text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon 
              name={metric.icon} 
              size={24} 
              className={activeMetric === metric.id ? 'text-primary mb-2' : 'text-text-tertiary mb-2'} 
            />
            <span className="text-sm font-medium">{metric.label}</span>
          </button>
        ))}
      </div>
      
      <div className="bg-surface-800 border border-border rounded-lg p-4 md:p-6">
        {renderMetricContent()}
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, change, isPositive, icon, period }) => {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={20} className="text-primary" />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-success' : 'text-error'}`}>
          <Icon name={isPositive ? "TrendingUp" : "TrendingDown"} size={14} />
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-text-secondary text-sm mb-1">{title}</h3>
      <div className="flex items-end justify-between">
        <div className="text-xl font-bold">{value}</div>
        <div className="text-xs text-text-tertiary">{period}</div>
      </div>
    </div>
  );
};

export default SubscriberAnalytics;