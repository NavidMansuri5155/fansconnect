import React, { useState } from 'react';
import Icon from 'components/AppIcon';

import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import SubscriptionTiers from './components/SubscriptionTiers';
import SubscriberAnalytics from './components/SubscriberAnalytics';
import RevenueOverview from './components/RevenueOverview';
import PaymentMethods from './components/PaymentMethods';
import PromotionalTools from './components/PromotionalTools';
import ReferralProgram from './components/ReferralProgram';
import RevenueForecasting from './components/RevenueForecasting';
import EarningsHistory from './components/EarningsHistory';
import TaxDocuments from './components/TaxDocuments';

const SubscriptionMonetizationManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'tiers', label: 'Subscription Tiers', icon: 'Layers' },
    { id: 'analytics', label: 'Subscriber Analytics', icon: 'BarChart2' },
    { id: 'payments', label: 'Payment Methods', icon: 'CreditCard' },
    { id: 'promotions', label: 'Promotional Tools', icon: 'Tag' },
    { id: 'referrals', label: 'Referral Program', icon: 'Users' },
    { id: 'forecasting', label: 'Revenue Forecasting', icon: 'TrendingUp' },
    { id: 'history', label: 'Earnings History', icon: 'Clock' },
    { id: 'taxes', label: 'Tax Documents', icon: 'FileText' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <RevenueOverview />;
      case 'tiers':
        return <SubscriptionTiers />;
      case 'analytics':
        return <SubscriberAnalytics />;
      case 'payments':
        return <PaymentMethods />;
      case 'promotions':
        return <PromotionalTools />;
      case 'referrals':
        return <ReferralProgram />;
      case 'forecasting':
        return <RevenueForecasting />;
      case 'history':
        return <EarningsHistory />;
      case 'taxes':
        return <TaxDocuments />;
      default:
        return <RevenueOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Header />
      
      <div className="flex flex-1 pt-16">
        <Sidebar />
        
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Subscription & Monetization</h1>
                  <p className="text-text-secondary">Manage your earnings, subscribers, and monetization strategies</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button className="btn-primary flex items-center space-x-2">
                    <Icon name="Download" size={18} />
                    <span>Export Earnings</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Earnings Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <EarningsSummaryCard 
                title="Total Earnings"
                value="$12,458.32"
                change="+12.5%"
                isPositive={true}
                icon="DollarSign"
                period="This month"
              />
              
              <EarningsSummaryCard 
                title="Active Subscribers"
                value="1,284"
                change="+8.3%"
                isPositive={true}
                icon="Users"
                period="This month"
              />
              
              <EarningsSummaryCard 
                title="Avg. Subscription"
                value="$9.72"
                change="+2.1%"
                isPositive={true}
                icon="CreditCard"
                period="Per subscriber"
              />
              
              <EarningsSummaryCard 
                title="Churn Rate"
                value="4.2%"
                change="-1.5%"
                isPositive={true}
                icon="UserMinus"
                period="This month"
              />
            </div>
            
            {/* Mobile Tab Navigation */}
            <div className="md:hidden mb-6 relative">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-surface border border-border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={tabs.find(tab => tab.id === activeTab)?.icon} size={18} className="text-primary" />
                  <span className="font-medium">{tabs.find(tab => tab.id === activeTab)?.label}</span>
                </div>
                <Icon name={isMobileMenuOpen ? "ChevronUp" : "ChevronDown"} size={18} />
              </button>
              
              {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg z-10 animate-fade-in">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-surface-700/50 transition-colors duration-200 ${
                        activeTab === tab.id ? 'text-primary bg-primary/10' : 'text-text-secondary'
                      }`}
                    >
                      <Icon name={tab.icon} size={18} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Desktop Tab Navigation */}
            <div className="hidden md:flex mb-6 border-b border-border overflow-x-auto scrollbar-hide">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'text-primary border-b-2 border-primary font-medium' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab.icon} size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="bg-surface border border-border rounded-lg p-4 md:p-6">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Earnings Summary Card Component
const EarningsSummaryCard = ({ title, value, change, isPositive, icon, period }) => {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
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
        <div className="text-xl md:text-2xl font-bold">{value}</div>
        <div className="text-xs text-text-tertiary">{period}</div>
      </div>
    </div>
  );
};

export default SubscriptionMonetizationManagement;