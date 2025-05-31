import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const RevenueForecasting = () => {
  const [forecastPeriod, setForecastPeriod] = useState('6m');
  const [growthScenario, setGrowthScenario] = useState('moderate');
  
  // Mock data for revenue forecast
  const forecastData = {
    moderate: [
      { month: 'Sep 2023', revenue: 2350, subscribers: 1320 },
      { month: 'Oct 2023', revenue: 2450, subscribers: 1360 },
      { month: 'Nov 2023', revenue: 2560, subscribers: 1400 },
      { month: 'Dec 2023', revenue: 2680, subscribers: 1450 },
      { month: 'Jan 2024', revenue: 2810, subscribers: 1500 },
      { month: 'Feb 2024', revenue: 2950, subscribers: 1550 },
      { month: 'Mar 2024', revenue: 3100, subscribers: 1600 },
      { month: 'Apr 2024', revenue: 3250, subscribers: 1650 },
      { month: 'May 2024', revenue: 3410, subscribers: 1700 },
      { month: 'Jun 2024', revenue: 3580, subscribers: 1750 },
      { month: 'Jul 2024', revenue: 3760, subscribers: 1800 },
      { month: 'Aug 2024', revenue: 3950, subscribers: 1850 },
    ],
    conservative: [
      { month: 'Sep 2023', revenue: 2320, subscribers: 1310 },
      { month: 'Oct 2023', revenue: 2380, subscribers: 1330 },
      { month: 'Nov 2023', revenue: 2440, subscribers: 1350 },
      { month: 'Dec 2023', revenue: 2500, subscribers: 1370 },
      { month: 'Jan 2024', revenue: 2560, subscribers: 1390 },
      { month: 'Feb 2024', revenue: 2620, subscribers: 1410 },
      { month: 'Mar 2024', revenue: 2680, subscribers: 1430 },
      { month: 'Apr 2024', revenue: 2740, subscribers: 1450 },
      { month: 'May 2024', revenue: 2800, subscribers: 1470 },
      { month: 'Jun 2024', revenue: 2860, subscribers: 1490 },
      { month: 'Jul 2024', revenue: 2920, subscribers: 1510 },
      { month: 'Aug 2024', revenue: 2980, subscribers: 1530 },
    ],
    optimistic: [
      { month: 'Sep 2023', revenue: 2400, subscribers: 1340 },
      { month: 'Oct 2023', revenue: 2580, subscribers: 1400 },
      { month: 'Nov 2023', revenue: 2780, subscribers: 1470 },
      { month: 'Dec 2023', revenue: 3000, subscribers: 1550 },
      { month: 'Jan 2024', revenue: 3240, subscribers: 1640 },
      { month: 'Feb 2024', revenue: 3500, subscribers: 1740 },
      { month: 'Mar 2024', revenue: 3780, subscribers: 1850 },
      { month: 'Apr 2024', revenue: 4080, subscribers: 1970 },
      { month: 'May 2024', revenue: 4400, subscribers: 2100 },
      { month: 'Jun 2024', revenue: 4750, subscribers: 2240 },
      { month: 'Jul 2024', revenue: 5130, subscribers: 2390 },
      { month: 'Aug 2024', revenue: 5540, subscribers: 2550 },
    ]
  };
  
  // Mock data for growth factors
  const growthFactors = [
    {
      name: 'Subscriber Growth Rate',
      conservative: '1.5%',
      moderate: '3.0%',
      optimistic: '6.0%',
      impact: 'high'
    },
    {
      name: 'Churn Rate',
      conservative: '5.0%',
      moderate: '4.0%',
      optimistic: '3.0%',
      impact: 'high'
    },
    {
      name: 'ARPU Growth',
      conservative: '0.5%',
      moderate: '1.0%',
      optimistic: '2.0%',
      impact: 'medium'
    },
    {
      name: 'Tip Frequency',
      conservative: '10%',
      moderate: '15%',
      optimistic: '20%',
      impact: 'medium'
    },
    {
      name: 'PPV Purchases',
      conservative: '5%',
      moderate: '8%',
      optimistic: '12%',
      impact: 'low'
    }
  ];
  
  // Mock data for revenue breakdown forecast
  const revenueBreakdownForecast = {
    subscriptions: {
      current: 1284.32,
      forecast: growthScenario === 'conservative' ? 1450.80 : growthScenario === 'moderate' ? 1680.50 : 2210.40
    },
    tips: {
      current: 894.00,
      forecast: growthScenario === 'conservative' ? 980.20 : growthScenario === 'moderate' ? 1150.30 : 1580.60
    },
    ppv: {
      current: 80.00,
      forecast: growthScenario === 'conservative' ? 95.00 : growthScenario === 'moderate' ? 120.00 : 180.00
    }
  };
  
  const forecastPeriods = [
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '12m', label: '12 Months' },
  ];
  
  const growthScenarios = [
    { value: 'conservative', label: 'Conservative' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'optimistic', label: 'Optimistic' },
  ];
  
  const getFilteredForecastData = () => {
    const data = forecastData[growthScenario];
    
    switch (forecastPeriod) {
      case '3m':
        return data.slice(0, 3);
      case '6m':
        return data.slice(0, 6);
      case '12m':
        return data.slice(0, 12);
      default:
        return data.slice(0, 6);
    }
  };
  
  const calculateTotalForecast = () => {
    const lastMonth = getFilteredForecastData().slice(-1)[0];
    return lastMonth ? lastMonth.revenue : 0;
  };
  
  const calculateGrowthPercentage = () => {
    const currentRevenue = 2258.32; // Current monthly revenue from mock data
    const forecastRevenue = calculateTotalForecast();
    
    return ((forecastRevenue - currentRevenue) / currentRevenue * 100).toFixed(1);
  };
  
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-bold mb-4 md:mb-0">Revenue Forecasting</h2>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex space-x-2 items-center">
            <span className="text-sm text-text-secondary">Period:</span>
            <div className="flex">
              {forecastPeriods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => setForecastPeriod(period.value)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                    forecastPeriod === period.value
                      ? 'bg-primary text-white' :'bg-surface-700/50 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2 items-center">
            <span className="text-sm text-text-secondary">Scenario:</span>
            <div className="flex">
              {growthScenarios.map((scenario) => (
                <button
                  key={scenario.value}
                  onClick={() => setGrowthScenario(scenario.value)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                    growthScenario === scenario.value
                      ? 'bg-primary text-white' :'bg-surface-700/50 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {scenario.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <h3 className="font-medium mb-2">Current Monthly Revenue</h3>
          <div className="text-2xl font-bold mb-1">$2,258.32</div>
          <div className="text-sm text-success flex items-center">
            <Icon name="TrendingUp" size={14} className="mr-1" />
            <span>+2.7% from last month</span>
          </div>
        </div>
        
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <h3 className="font-medium mb-2">Forecasted Revenue</h3>
          <div className="text-2xl font-bold mb-1">${calculateTotalForecast().toFixed(2)}</div>
          <div className="text-sm text-success flex items-center">
            <Icon name="TrendingUp" size={14} className="mr-1" />
            <span>+{calculateGrowthPercentage()}% growth</span>
          </div>
        </div>
        
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <h3 className="font-medium mb-2">Forecasted Subscribers</h3>
          <div className="text-2xl font-bold mb-1">
            {getFilteredForecastData().slice(-1)[0]?.subscribers || 0}
          </div>
          <div className="text-sm text-success flex items-center">
            <Icon name="TrendingUp" size={14} className="mr-1" />
            <span>+{(((getFilteredForecastData().slice(-1)[0]?.subscribers || 0) - 1284) / 1284 * 100).toFixed(1)}% growth</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-4">Revenue Forecast</h3>
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={getFilteredForecastData()}
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
                  dataKey="month" 
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
      
      <div className="mb-6">
        <h3 className="font-medium mb-4">Subscriber Forecast</h3>
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={getFilteredForecastData()}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  stroke="#94A3B8"
                />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E3F', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: '#F8FAFC'
                  }}
                  formatter={(value) => [value, 'Subscribers']}
                />
                <Line 
                  type="monotone" 
                  dataKey="subscribers" 
                  stroke="#EC4899" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#EC4899', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#EC4899', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium mb-4">Growth Factors</h3>
          <div className="bg-surface-800 border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Factor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Conservative</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Moderate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Optimistic</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {growthFactors.map((factor, index) => (
                    <tr key={index} className="hover:bg-surface-700/50 transition-colors duration-150">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm font-medium">{factor.name}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-sm ${growthScenario === 'conservative' ? 'font-medium text-primary' : ''}`}>
                          {factor.conservative}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-sm ${growthScenario === 'moderate' ? 'font-medium text-primary' : ''}`}>
                          {factor.moderate}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-sm ${growthScenario === 'optimistic' ? 'font-medium text-primary' : ''}`}>
                          {factor.optimistic}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-sm font-medium ${getImpactColor(factor.impact)}`}>
                          {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Revenue Breakdown Forecast</h3>
          <div className="bg-surface-800 border border-border rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Subscriptions</span>
                  <div className="text-sm">
                    <span className="font-medium">${revenueBreakdownForecast.subscriptions.forecast.toFixed(2)}</span>
                    <span className="text-text-tertiary ml-1">
                      (${revenueBreakdownForecast.subscriptions.current.toFixed(2)} now)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-surface-600 rounded-full h-2">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${(revenueBreakdownForecast.subscriptions.forecast / calculateTotalForecast() * 100).toFixed(0)}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Tips</span>
                  <div className="text-sm">
                    <span className="font-medium">${revenueBreakdownForecast.tips.forecast.toFixed(2)}</span>
                    <span className="text-text-tertiary ml-1">
                      (${revenueBreakdownForecast.tips.current.toFixed(2)} now)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-surface-600 rounded-full h-2">
                  <div className="h-2 rounded-full bg-secondary" style={{ width: `${(revenueBreakdownForecast.tips.forecast / calculateTotalForecast() * 100).toFixed(0)}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Pay-per-view</span>
                  <div className="text-sm">
                    <span className="font-medium">${revenueBreakdownForecast.ppv.forecast.toFixed(2)}</span>
                    <span className="text-text-tertiary ml-1">
                      (${revenueBreakdownForecast.ppv.current.toFixed(2)} now)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-surface-600 rounded-full h-2">
                  <div className="h-2 rounded-full bg-accent" style={{ width: `${(revenueBreakdownForecast.ppv.forecast / calculateTotalForecast() * 100).toFixed(0)}%` }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-medium mb-3">Growth Opportunities</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={16} className="text-success mt-0.5" />
                  <span className="text-sm text-text-secondary">
                    Increasing subscription prices by $1 could add $1,300+ to monthly revenue
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={16} className="text-success mt-0.5" />
                  <span className="text-sm text-text-secondary">
                    Reducing churn by 1% could increase subscriber count by 150+ within 6 months
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={16} className="text-success mt-0.5" />
                  <span className="text-sm text-text-secondary">
                    Adding more premium content could increase tips by 20-30%
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-surface-800 border border-border rounded-lg p-4">
        <h3 className="font-medium mb-4">Forecast Assumptions</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Based on historical performance</p>
              <p className="text-sm text-text-secondary">
                This forecast uses your past 6 months of performance data to predict future growth
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Seasonal factors included</p>
              <p className="text-sm text-text-secondary">
                The model accounts for seasonal variations in subscriber behavior
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium">Forecasts are estimates only</p>
              <p className="text-sm text-text-secondary">
                Actual results may vary based on content quality, promotion efforts, and market conditions
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex justify-end">
          <button className="px-4 py-2 text-sm bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center space-x-2">
            <Icon name="Download" size={14} />
            <span>Export Forecast</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevenueForecasting;