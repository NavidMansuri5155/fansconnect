import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EarningsHistory = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [filterType, setFilterType] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  
  // Mock data for earnings history
  const earningsData = [
    { 
      month: 'Mar 2023', 
      total: 1532.45, 
      subscriptions: 1025.32, 
      tips: 427.13, 
      ppv: 80.00,
      payout: 1532.45,
      payoutStatus: 'completed',
      payoutDate: '2023-04-01'
    },
    { 
      month: 'Apr 2023', 
      total: 1678.92, 
      subscriptions: 1124.67, 
      tips: 474.25, 
      ppv: 80.00,
      payout: 1678.92,
      payoutStatus: 'completed',
      payoutDate: '2023-05-01'
    },
    { 
      month: 'May 2023', 
      total: 1756.30, 
      subscriptions: 1156.30, 
      tips: 520.00, 
      ppv: 80.00,
      payout: 1756.30,
      payoutStatus: 'completed',
      payoutDate: '2023-06-01'
    },
    { 
      month: 'Jun 2023', 
      total: 1845.72, 
      subscriptions: 1205.72, 
      tips: 560.00, 
      ppv: 80.00,
      payout: 1845.72,
      payoutStatus: 'completed',
      payoutDate: '2023-07-01'
    },
    { 
      month: 'Jul 2023', 
      total: 1982.18, 
      subscriptions: 1262.18, 
      tips: 640.00, 
      ppv: 80.00,
      payout: 1982.18,
      payoutStatus: 'completed',
      payoutDate: '2023-08-01'
    },
    { 
      month: 'Aug 2023', 
      total: 2125.45, 
      subscriptions: 1325.45, 
      tips: 720.00, 
      ppv: 80.00,
      payout: 2125.45,
      payoutStatus: 'pending',
      payoutDate: '2023-09-01'
    }
  ];
  
  // Mock data for daily earnings
  const dailyEarningsData = [
    { day: '01', earnings: 68.45 },
    { day: '02', earnings: 72.18 },
    { day: '03', earnings: 65.92 },
    { day: '04', earnings: 70.30 },
    { day: '05', earnings: 75.72 },
    { day: '06', earnings: 82.18 },
    { day: '07', earnings: 85.45 },
    { day: '08', earnings: 78.92 },
    { day: '09', earnings: 76.30 },
    { day: '10', earnings: 72.72 },
    { day: '11', earnings: 68.18 },
    { day: '12', earnings: 65.45 },
    { day: '13', earnings: 70.92 },
    { day: '14', earnings: 75.30 },
    { day: '15', earnings: 80.72 },
    { day: '16', earnings: 85.18 },
    { day: '17', earnings: 82.45 },
    { day: '18', earnings: 78.92 },
    { day: '19', earnings: 76.30 },
    { day: '20', earnings: 72.72 },
    { day: '21', earnings: 68.18 },
    { day: '22', earnings: 65.45 },
    { day: '23', earnings: 70.92 },
    { day: '24', earnings: 75.30 },
    { day: '25', earnings: 80.72 },
    { day: '26', earnings: 85.18 },
    { day: '27', earnings: 82.45 },
    { day: '28', earnings: 78.92 },
    { day: '29', earnings: 76.30 },
    { day: '30', earnings: 72.72 },
    { day: '31', earnings: 68.18 }
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
    { id: 8, type: 'tip', username: '@michaelb', amount: 15.00, date: '2023-08-05T20:15:33', status: 'completed' },
    { id: 9, type: 'subscription', username: '@jenniferk', amount: 9.99, date: '2023-08-05T18:22:41', status: 'completed' },
    { id: 10, type: 'ppv', username: '@christopherl', amount: 15.00, date: '2023-08-05T16:05:19', status: 'completed' },
  ];
  
  const timeRanges = [
    { value: '1m', label: '1 Month' },
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: 'Year' },
    { value: 'all', label: 'All Time' },
  ];
  
  const filterTypes = [
    { value: 'all', label: 'All Earnings' },
    { value: 'subscriptions', label: 'Subscriptions' },
    { value: 'tips', label: 'Tips' },
    { value: 'ppv', label: 'Pay-per-view' },
  ];
  
  const getFilteredEarningsData = () => {
    let data = [...earningsData];
    
    switch (timeRange) {
      case '1m':
        data = data.slice(-1);
        break;
      case '3m':
        data = data.slice(-3);
        break;
      case '6m':
        data = data.slice(-6);
        break;
      case '1y':
        // All data is less than a year in our mock
        break;
      default:
        break;
    }
    
    return data;
  };
  
  const calculateTotalEarnings = () => {
    const data = getFilteredEarningsData();
    
    if (filterType === 'all') {
      return data.reduce((sum, item) => sum + item.total, 0);
    } else {
      return data.reduce((sum, item) => sum + item[filterType], 0);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
  
  const handleExport = (format) => {
    // In a real app, this would trigger an API call to generate the export
    setIsExporting(false);
    
    // Simulate export completion
    setTimeout(() => {
      alert(`Earnings data exported in ${format.toUpperCase()} format`);
    }, 1000);
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-bold mb-4 md:mb-0">Earnings History</h2>
        
        <div className="flex flex-wrap gap-4">
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
          
          <button 
            onClick={() => setIsExporting(true)}
            className="px-4 py-2 text-sm bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Icon name="Download" size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {filterTypes.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setFilterType(filter.value)}
            className={`p-4 rounded-lg transition-all duration-200 ${
              filterType === filter.value
                ? 'bg-primary/10 border border-primary/20 text-primary' :'bg-surface-800 border border-border text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className="font-medium mb-1">{filter.label}</div>
            <div className="text-xl font-bold">
              {filter.value === 'all' 
                ? formatCurrency(calculateTotalEarnings())
                : formatCurrency(getFilteredEarningsData().reduce((sum, item) => sum + item[filter.value], 0))}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-4">Monthly Earnings</h3>
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getFilteredEarningsData()}
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
                  formatter={(value) => [`$${value.toFixed(2)}`, '']}
                />
                {(filterType === 'all' || filterType === 'subscriptions') && (
                  <Bar dataKey="subscriptions" name="Subscriptions" fill="#6366F1" />
                )}
                {(filterType === 'all' || filterType === 'tips') && (
                  <Bar dataKey="tips" name="Tips" fill="#EC4899" />
                )}
                {(filterType === 'all' || filterType === 'ppv') && (
                  <Bar dataKey="ppv" name="Pay-per-view" fill="#F59E0B" />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium mb-4">Daily Earnings (Current Month)</h3>
          <div className="bg-surface-800 border border-border rounded-lg p-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyEarningsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#94A3B8"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => value}
                  />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E1E3F', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: '#F8FAFC'
                    }}
                    formatter={(value) => [`$${value.toFixed(2)}`, 'Earnings']}
                    labelFormatter={(day) => `August ${day}, 2023`}
                  />
                  <Bar dataKey="earnings" name="Daily Earnings" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Payout History</h3>
          <div className="bg-surface-800 border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Month</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {getFilteredEarningsData().map((earning, index) => (
                    <tr key={index} className="hover:bg-surface-700/50 transition-colors duration-150">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm font-medium">{earning.month}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm font-medium">${earning.payout.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          earning.payoutStatus === 'completed' 
                            ? 'bg-success/20 text-success' 
                            : earning.payoutStatus === 'pending' ?'bg-warning/20 text-warning' :'bg-error/20 text-error'
                        }`}>
                          {earning.payoutStatus === 'completed' ? (
                            <>
                              <Icon name="Check" size={12} className="mr-1" />
                              Completed
                            </>
                          ) : earning.payoutStatus === 'pending' ? (
                            <>
                              <Icon name="Clock" size={12} className="mr-1" />
                              Pending
                            </>
                          ) : (
                            <>
                              <Icon name="X" size={12} className="mr-1" />
                              Failed
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm">{formatDate(earning.payoutDate)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
              Showing <span className="font-medium">10</span> of <span className="font-medium">248</span> transactions
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
      
      {/* Export Modal */}
      {isExporting && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Export Earnings Data</h3>
                <button 
                  onClick={() => setIsExporting(false)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Format</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleExport('csv')}
                      className="flex flex-col items-center justify-center p-4 rounded-lg border border-border bg-surface-800 hover:bg-surface-700 transition-all duration-200"
                    >
                      <Icon name="FileText" size={24} className="text-text-secondary mb-2" />
                      <span className="text-sm font-medium">CSV</span>
                    </button>
                    
                    <button
                      onClick={() => handleExport('pdf')}
                      className="flex flex-col items-center justify-center p-4 rounded-lg border border-border bg-surface-800 hover:bg-surface-700 transition-all duration-200"
                    >
                      <Icon name="FileText" size={24} className="text-text-secondary mb-2" />
                      <span className="text-sm font-medium">PDF</span>
                    </button>
                    
                    <button
                      onClick={() => handleExport('excel')}
                      className="flex flex-col items-center justify-center p-4 rounded-lg border border-border bg-surface-800 hover:bg-surface-700 transition-all duration-200"
                    >
                      <Icon name="FileText" size={24} className="text-text-secondary mb-2" />
                      <span className="text-sm font-medium">Excel</span>
                    </button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Info" size={14} className="text-primary" />
                    <span>Exports include all transaction details for the selected time period</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={() => setIsExporting(false)}
                  className="w-full px-6 py-3 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
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

export default EarningsHistory;