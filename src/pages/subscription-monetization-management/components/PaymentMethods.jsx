import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PaymentMethods = () => {
  const [activeTab, setActiveTab] = useState('payout');
  const [payoutMethods, setPayoutMethods] = useState([
    {
      id: 1,
      type: 'bank',
      name: 'Direct Deposit',
      details: {
        accountName: 'Alex Morgan',
        accountNumber: '****6789',
        bankName: 'Chase Bank',
        routingNumber: '****4321'
      },
      isDefault: true,
      isVerified: true
    },
    {
      id: 2,
      type: 'paypal',
      name: 'PayPal',
      details: {
        email: 'alex.morgan@example.com'
      },
      isDefault: false,
      isVerified: true
    }
  ]);
  
  const [paymentProcessors, setPaymentProcessors] = useState([
    {
      id: 1,
      name: 'Credit/Debit Cards',
      processor: 'Stripe',
      fee: '2.9% + $0.30',
      isEnabled: true,
      icon: 'CreditCard'
    },
    {
      id: 2,
      name: 'PayPal',
      processor: 'PayPal',
      fee: '3.5% + $0.30',
      isEnabled: true,
      icon: 'DollarSign'
    },
    {
      id: 3,
      name: 'Cryptocurrency',
      processor: 'Coinbase',
      fee: '1.5%',
      isEnabled: false,
      icon: 'Bitcoin'
    },
    {
      id: 4,
      name: 'Apple Pay',
      processor: 'Stripe',
      fee: '2.9% + $0.30',
      isEnabled: false,
      icon: 'Smartphone'
    },
    {
      id: 5,
      name: 'Google Pay',
      processor: 'Stripe',
      fee: '2.9% + $0.30',
      isEnabled: false,
      icon: 'Smartphone'
    }
  ]);
  
  const [payoutSchedule, setPayoutSchedule] = useState({
    frequency: 'monthly',
    minimumAmount: 50,
    nextPayoutDate: '2023-09-01',
    pendingAmount: 1245.32
  });
  
  const [payoutHistory, setPayoutHistory] = useState([
    {
      id: 1,
      date: '2023-08-01',
      amount: 1125.45,
      method: 'Direct Deposit',
      status: 'completed',
      reference: 'PAY-2023080112345'
    },
    {
      id: 2,
      date: '2023-07-01',
      amount: 982.18,
      method: 'Direct Deposit',
      status: 'completed',
      reference: 'PAY-2023070198765'
    },
    {
      id: 3,
      date: '2023-06-01',
      amount: 845.72,
      method: 'PayPal',
      status: 'completed',
      reference: 'PAY-2023060187654'
    },
    {
      id: 4,
      date: '2023-05-01',
      amount: 756.30,
      method: 'PayPal',
      status: 'completed',
      reference: 'PAY-2023050176543'
    }
  ]);
  
  const [isAddingPayoutMethod, setIsAddingPayoutMethod] = useState(false);
  const [newPayoutMethod, setNewPayoutMethod] = useState({
    type: 'bank',
    accountName: '',
    accountNumber: '',
    bankName: '',
    routingNumber: '',
    email: ''
  });
  
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState({ ...payoutSchedule });
  
  const handleToggleProcessor = (id) => {
    setPaymentProcessors(paymentProcessors.map(processor => 
      processor.id === id ? { ...processor, isEnabled: !processor.isEnabled } : processor
    ));
  };
  
  const handleSetDefaultPayoutMethod = (id) => {
    setPayoutMethods(payoutMethods.map(method => 
      ({ ...method, isDefault: method.id === id })
    ));
  };
  
  const handleDeletePayoutMethod = (id) => {
    setPayoutMethods(payoutMethods.filter(method => method.id !== id));
  };
  
  const handleAddPayoutMethod = () => {
    const newMethod = {
      id: payoutMethods.length + 1,
      type: newPayoutMethod.type,
      name: newPayoutMethod.type === 'bank' ? 'Direct Deposit' : 'PayPal',
      details: newPayoutMethod.type === 'bank' 
        ? {
            accountName: newPayoutMethod.accountName,
            accountNumber: `****${newPayoutMethod.accountNumber.slice(-4)}`,
            bankName: newPayoutMethod.bankName,
            routingNumber: `****${newPayoutMethod.routingNumber.slice(-4)}`
          }
        : {
            email: newPayoutMethod.email
          },
      isDefault: payoutMethods.length === 0,
      isVerified: false
    };
    
    setPayoutMethods([...payoutMethods, newMethod]);
    setIsAddingPayoutMethod(false);
    setNewPayoutMethod({
      type: 'bank',
      accountName: '',
      accountNumber: '',
      bankName: '',
      routingNumber: '',
      email: ''
    });
  };
  
  const handleSaveSchedule = () => {
    setPayoutSchedule(editedSchedule);
    setIsEditingSchedule(false);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };
  
  return (
    <div>
      <div className="flex border-b border-border mb-6 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('payout')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
            activeTab === 'payout' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Payout Methods
        </button>
        <button
          onClick={() => setActiveTab('processors')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
            activeTab === 'processors' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Payment Processors
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
            activeTab === 'schedule' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Payout Schedule
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
            activeTab === 'history' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Payout History
        </button>
      </div>
      
      {activeTab === 'payout' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Payout Methods</h3>
            <button 
              onClick={() => setIsAddingPayoutMethod(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>Add Method</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {payoutMethods.map((method) => (
              <div key={method.id} className="bg-surface-800 border border-border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={method.type === 'bank' ? 'Building' : 'DollarSign'} size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{method.name}</h4>
                        {method.isDefault && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Default</span>
                        )}
                        {method.isVerified ? (
                          <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded flex items-center">
                            <Icon name="Check" size={10} className="mr-1" />
                            Verified
                          </span>
                        ) : (
                          <span className="text-xs bg-warning/20 text-warning px-2 py-0.5 rounded flex items-center">
                            <Icon name="AlertCircle" size={10} className="mr-1" />
                            Pending
                          </span>
                        )}
                      </div>
                      {method.type === 'bank' ? (
                        <div className="text-sm text-text-secondary mt-1">
                          {method.details.bankName} • {method.details.accountNumber}
                        </div>
                      ) : (
                        <div className="text-sm text-text-secondary mt-1">
                          {method.details.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!method.isDefault && (
                      <button 
                        onClick={() => handleSetDefaultPayoutMethod(method.id)}
                        className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                        title="Set as default"
                      >
                        <Icon name="Star" size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeletePayoutMethod(method.id)}
                      className="p-2 text-text-secondary hover:text-error hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                      title="Delete method"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
                
                {method.type === 'bank' && (
                  <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-text-tertiary">Account Name</div>
                      <div className="text-sm">{method.details.accountName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-tertiary">Account Number</div>
                      <div className="text-sm">{method.details.accountNumber}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-tertiary">Bank Name</div>
                      <div className="text-sm">{method.details.bankName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-tertiary">Routing Number</div>
                      <div className="text-sm">{method.details.routingNumber}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {payoutMethods.length === 0 && (
              <div className="bg-surface-800 border border-border rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CreditCard" size={24} className="text-text-tertiary" />
                </div>
                <h4 className="font-medium mb-2">No Payout Methods</h4>
                <p className="text-sm text-text-secondary mb-4">
                  Add a payout method to receive your earnings
                </p>
                <button 
                  onClick={() => setIsAddingPayoutMethod(true)}
                  className="btn-primary"
                >
                  Add Payout Method
                </button>
              </div>
            )}
          </div>
          
          {/* Add Payout Method Modal */}
          {isAddingPayoutMethod && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Add Payout Method</h3>
                    <button 
                      onClick={() => setIsAddingPayoutMethod(false)}
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Method Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setNewPayoutMethod({...newPayoutMethod, type: 'bank'})}
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                            newPayoutMethod.type === 'bank' ?'border-primary bg-primary/10' :'border-border bg-surface-800'
                          }`}
                        >
                          <Icon 
                            name="Building" 
                            size={24} 
                            className={newPayoutMethod.type === 'bank' ? 'text-primary mb-2' : 'text-text-secondary mb-2'} 
                          />
                          <span className="text-sm font-medium">Bank Account</span>
                        </button>
                        
                        <button
                          onClick={() => setNewPayoutMethod({...newPayoutMethod, type: 'paypal'})}
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                            newPayoutMethod.type === 'paypal' ?'border-primary bg-primary/10' :'border-border bg-surface-800'
                          }`}
                        >
                          <Icon 
                            name="DollarSign" 
                            size={24} 
                            className={newPayoutMethod.type === 'paypal' ? 'text-primary mb-2' : 'text-text-secondary mb-2'} 
                          />
                          <span className="text-sm font-medium">PayPal</span>
                        </button>
                      </div>
                    </div>
                    
                    {newPayoutMethod.type === 'bank' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Account Holder Name</label>
                          <input 
                            type="text" 
                            value={newPayoutMethod.accountName}
                            onChange={(e) => setNewPayoutMethod({...newPayoutMethod, accountName: e.target.value})}
                            className="input-field w-full"
                            placeholder="Enter full name on account"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Bank Name</label>
                          <input 
                            type="text" 
                            value={newPayoutMethod.bankName}
                            onChange={(e) => setNewPayoutMethod({...newPayoutMethod, bankName: e.target.value})}
                            className="input-field w-full"
                            placeholder="Enter bank name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Account Number</label>
                          <input 
                            type="text" 
                            value={newPayoutMethod.accountNumber}
                            onChange={(e) => setNewPayoutMethod({...newPayoutMethod, accountNumber: e.target.value})}
                            className="input-field w-full"
                            placeholder="Enter account number"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Routing Number</label>
                          <input 
                            type="text" 
                            value={newPayoutMethod.routingNumber}
                            onChange={(e) => setNewPayoutMethod({...newPayoutMethod, routingNumber: e.target.value})}
                            className="input-field w-full"
                            placeholder="Enter routing number"
                          />
                        </div>
                      </>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium mb-1">PayPal Email</label>
                        <input 
                          type="email" 
                          value={newPayoutMethod.email}
                          onChange={(e) => setNewPayoutMethod({...newPayoutMethod, email: e.target.value})}
                          className="input-field w-full"
                          placeholder="Enter PayPal email address"
                        />
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="Info" size={14} className="text-primary" />
                        <span>Your payout method will need to be verified before use</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button 
                      onClick={handleAddPayoutMethod}
                      className="btn-primary flex-1"
                      disabled={
                        (newPayoutMethod.type === 'bank' && 
                          (!newPayoutMethod.accountName || 
                           !newPayoutMethod.accountNumber || 
                           !newPayoutMethod.bankName || 
                           !newPayoutMethod.routingNumber)) ||
                        (newPayoutMethod.type === 'paypal' && !newPayoutMethod.email)
                      }
                    >
                      Add Method
                    </button>
                    <button 
                      onClick={() => setIsAddingPayoutMethod(false)}
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
      )}
      
      {activeTab === 'processors' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Payment Processors</h3>
            <div className="text-sm text-text-secondary">
              Configure how your fans can pay you
            </div>
          </div>
          
          <div className="space-y-4">
            {paymentProcessors.map((processor) => (
              <div key={processor.id} className="bg-surface-800 border border-border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={processor.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{processor.name}</h4>
                      <div className="text-sm text-text-secondary mt-1">
                        Processor: {processor.processor} • Fee: {processor.fee}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleToggleProcessor(processor.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                      processor.isEnabled ? 'bg-success' : 'bg-surface-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        processor.isEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-surface-800 border border-border rounded-lg p-4">
            <h4 className="font-medium mb-3">Payment Processing Notes</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <span className="text-sm text-text-secondary">Processing fees are deducted from each transaction</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <span className="text-sm text-text-secondary">You must have at least one payment processor enabled</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <span className="text-sm text-text-secondary">Cryptocurrency payments require additional verification</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {activeTab === 'schedule' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Payout Schedule</h3>
            <button 
              onClick={() => {
                setEditedSchedule({ ...payoutSchedule });
                setIsEditingSchedule(true);
              }}
              className="px-4 py-2 text-sm bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Icon name="Edit" size={14} />
              <span>Edit Schedule</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-surface-800 border border-border rounded-lg p-4">
              <h4 className="font-medium mb-4">Current Schedule</h4>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-text-secondary mb-1">Payout Frequency</div>
                  <div className="font-medium capitalize">{payoutSchedule.frequency}</div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary mb-1">Minimum Payout Amount</div>
                  <div className="font-medium">${payoutSchedule.minimumAmount.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary mb-1">Next Payout Date</div>
                  <div className="font-medium">{formatDate(payoutSchedule.nextPayoutDate)}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-800 border border-border rounded-lg p-4">
              <h4 className="font-medium mb-4">Pending Balance</h4>
              <div className="text-3xl font-bold mb-2">${payoutSchedule.pendingAmount.toFixed(2)}</div>
              <div className="text-sm text-text-secondary mb-4">
                Will be paid out on {formatDate(payoutSchedule.nextPayoutDate)}
              </div>
              
              <div className="flex space-x-3">
                <button className="btn-primary flex-1 flex items-center justify-center space-x-2">
                  <Icon name="DollarSign" size={16} />
                  <span>Request Immediate Payout</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-800 border border-border rounded-lg p-4">
            <h4 className="font-medium mb-3">Payout Information</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <Icon name="Calendar" size={16} className="text-primary mt-0.5" />
                <span className="text-sm text-text-secondary">
                  Monthly payouts are processed on the 1st of each month
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon name="Clock" size={16} className="text-primary mt-0.5" />
                <span className="text-sm text-text-secondary">
                  Payouts typically take 3-5 business days to process
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon name="AlertCircle" size={16} className="text-primary mt-0.5" />
                <span className="text-sm text-text-secondary">
                  Immediate payouts are subject to a 1% expedited processing fee
                </span>
              </li>
            </ul>
          </div>
          
          {/* Edit Schedule Modal */}
          {isEditingSchedule && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Edit Payout Schedule</h3>
                    <button 
                      onClick={() => setIsEditingSchedule(false)}
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Payout Frequency</label>
                      <select 
                        value={editedSchedule.frequency}
                        onChange={(e) => setEditedSchedule({...editedSchedule, frequency: e.target.value})}
                        className="input-field w-full"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Minimum Payout Amount ($)</label>
                      <input 
                        type="number" 
                        min="1"
                        step="1"
                        value={editedSchedule.minimumAmount}
                        onChange={(e) => setEditedSchedule({...editedSchedule, minimumAmount: parseInt(e.target.value)})}
                        className="input-field w-full"
                      />
                      <p className="text-xs text-text-tertiary mt-1">
                        Earnings below this amount will roll over to the next payout period
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="Info" size={14} className="text-primary" />
                        <span>Changes will take effect from the next payout cycle</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button 
                      onClick={handleSaveSchedule}
                      className="btn-primary flex-1"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={() => setIsEditingSchedule(false)}
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
      )}
      
      {activeTab === 'history' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Payout History</h3>
            <button className="px-4 py-2 text-sm bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center space-x-2">
              <Icon name="Download" size={14} />
              <span>Export History</span>
            </button>
          </div>
          
          <div className="bg-surface-800 border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Method</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Reference</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {payoutHistory.map((payout) => (
                    <tr key={payout.id} className="hover:bg-surface-700/50 transition-colors duration-150">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm">{formatDate(payout.date)}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm font-medium">{formatCurrency(payout.amount)}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm">{payout.method}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payout.status === 'completed' 
                            ? 'bg-success/20 text-success' 
                            : payout.status === 'pending' ?'bg-warning/20 text-warning' :'bg-error/20 text-error'
                        }`}>
                          {payout.status === 'completed' ? (
                            <>
                              <Icon name="Check" size={12} className="mr-1" />
                              Completed
                            </>
                          ) : payout.status === 'pending' ? (
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
                        <span className="text-sm font-mono text-text-secondary">{payout.reference}</span>
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
            
            {payoutHistory.length === 0 && (
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Calendar" size={24} className="text-text-tertiary" />
                </div>
                <h4 className="font-medium mb-2">No Payout History</h4>
                <p className="text-sm text-text-secondary">
                  Your payout history will appear here once you receive your first payout
                </p>
              </div>
            )}
            
            <div className="bg-surface-700 px-4 py-3 flex items-center justify-between">
              <div className="text-sm text-text-secondary">
                Showing <span className="font-medium">4</span> of <span className="font-medium">4</span> payouts
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
          
          <div className="mt-6 bg-surface-800 border border-border rounded-lg p-4">
            <h4 className="font-medium mb-3">Tax Information</h4>
            <p className="text-sm text-text-secondary mb-4">
              Annual tax documents will be available for download in January of each year
            </p>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-sm bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center space-x-2">
                <Icon name="FileText" size={14} />
                <span>2022 Tax Documents</span>
              </button>
              <button className="px-4 py-2 text-sm bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center space-x-2">
                <Icon name="Settings" size={14} />
                <span>Tax Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;