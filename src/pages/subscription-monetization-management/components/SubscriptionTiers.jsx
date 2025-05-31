import React, { useState } from 'react';
import Icon from 'components/AppIcon';


const SubscriptionTiers = () => {
  const [tiers, setTiers] = useState([
    {
      id: 1,
      name: "Basic",
      price: 4.99,
      subscribers: 745,
      revenue: 3717.55,
      benefits: [
        "Access to regular posts",
        "Basic messaging privileges",
        "Monthly exclusive photo set"
      ],
      color: "bg-primary",
      isActive: true
    },
    {
      id: 2,
      name: "Premium",
      price: 9.99,
      subscribers: 382,
      revenue: 3816.18,
      benefits: [
        "All Basic tier benefits",
        "Weekly exclusive content",
        "Priority messaging response",
        "Behind-the-scenes content"
      ],
      color: "bg-secondary",
      isActive: true
    },
    {
      id: 3,
      name: "VIP",
      price: 19.99,
      subscribers: 157,
      revenue: 3138.43,
      benefits: [
        "All Premium tier benefits",
        "Monthly personalized content",
        "Direct messaging with voice notes",
        "Early access to all new content",
        "Monthly live stream access"
      ],
      color: "bg-accent",
      isActive: true
    }
  ]);
  
  const [bundles, setBundles] = useState([
    {
      id: 1,
      name: "3-Month Premium",
      tierName: "Premium",
      months: 3,
      regularPrice: 29.97,
      bundlePrice: 24.99,
      discount: 16.6,
      sales: 87,
      isActive: true
    },
    {
      id: 2,
      name: "6-Month VIP",
      tierName: "VIP",
      months: 6,
      regularPrice: 119.94,
      bundlePrice: 89.99,
      discount: 25,
      sales: 42,
      isActive: true
    }
  ]);
  
  const [freeTrials, setFreeTrials] = useState({
    isEnabled: true,
    duration: 7,
    conversionRate: 38.5,
    activeTrials: 64,
    completedTrials: 428,
    convertedTrials: 165
  });
  
  const [editingTier, setEditingTier] = useState(null);
  const [editingBundle, setEditingBundle] = useState(null);
  const [isEditingTrials, setIsEditingTrials] = useState(false);
  
  const handleEditTier = (tier) => {
    setEditingTier({...tier});
  };
  
  const handleSaveTier = () => {
    if (editingTier) {
      setTiers(tiers.map(tier => 
        tier.id === editingTier.id ? editingTier : tier
      ));
      setEditingTier(null);
    }
  };
  
  const handleEditBundle = (bundle) => {
    setEditingBundle({...bundle});
  };
  
  const handleSaveBundle = () => {
    if (editingBundle) {
      setBundles(bundles.map(bundle => 
        bundle.id === editingBundle.id ? editingBundle : bundle
      ));
      setEditingBundle(null);
    }
  };
  
  const handleEditTrials = () => {
    setIsEditingTrials(true);
  };
  
  const handleSaveTrials = () => {
    setIsEditingTrials(false);
  };
  
  const addNewTier = () => {
    const newTier = {
      id: tiers.length + 1,
      name: "New Tier",
      price: 0,
      subscribers: 0,
      revenue: 0,
      benefits: ["New benefit"],
      color: "bg-primary",
      isActive: false
    };
    setTiers([...tiers, newTier]);
    setEditingTier(newTier);
  };
  
  const addNewBundle = () => {
    const newBundle = {
      id: bundles.length + 1,
      name: "New Bundle",
      tierName: tiers[0].name,
      months: 3,
      regularPrice: tiers[0].price * 3,
      bundlePrice: tiers[0].price * 3 * 0.8,
      discount: 20,
      sales: 0,
      isActive: false
    };
    setBundles([...bundles, newBundle]);
    setEditingBundle(newBundle);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Subscription Tiers</h2>
        <p className="text-text-secondary mb-6">Configure your subscription tiers, pricing, and benefits</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {tiers.map(tier => (
            <div key={tier.id} className="bg-surface-800 border border-border rounded-lg overflow-hidden">
              <div className={`h-2 ${tier.color}`}></div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{tier.name}</h3>
                    <div className="text-2xl font-bold mt-1">${tier.price.toFixed(2)}<span className="text-sm text-text-secondary font-normal">/month</span></div>
                  </div>
                  <button 
                    onClick={() => handleEditTier(tier)}
                    className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                  >
                    <Icon name="Edit" size={16} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">Subscribers</span>
                    <span className="font-medium">{tier.subscribers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Monthly Revenue</span>
                    <span className="font-medium">${tier.revenue.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-border pt-4 mb-4">
                  <h4 className="font-medium mb-2">Benefits</h4>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
                        <span className="text-sm text-text-secondary">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${tier.isActive ? 'bg-success' : 'bg-error'}`}></div>
                    <span className="text-sm">{tier.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                  <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-200">
                    View Subscribers
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <button 
            onClick={addNewTier}
            className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/50 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-surface-700 rounded-full flex items-center justify-center mb-3">
              <Icon name="Plus" size={24} />
            </div>
            <span className="font-medium">Add New Tier</span>
            <span className="text-sm text-text-tertiary mt-1">Create a custom subscription tier</span>
          </button>
        </div>
      </div>
      
      {/* Edit Tier Modal */}
      {editingTier && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Edit Tier</h3>
                <button 
                  onClick={() => setEditingTier(null)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tier Name</label>
                  <input 
                    type="text" 
                    value={editingTier.name}
                    onChange={(e) => setEditingTier({...editingTier, name: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Price ($)</label>
                  <input 
                    type="number" 
                    min="0.99"
                    step="0.01"
                    value={editingTier.price}
                    onChange={(e) => setEditingTier({...editingTier, price: parseFloat(e.target.value)})}
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Benefits</label>
                  <div className="space-y-2">
                    {editingTier.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input 
                          type="text" 
                          value={benefit}
                          onChange={(e) => {
                            const newBenefits = [...editingTier.benefits];
                            newBenefits[index] = e.target.value;
                            setEditingTier({...editingTier, benefits: newBenefits});
                          }}
                          className="input-field flex-1"
                        />
                        <button 
                          onClick={() => {
                            const newBenefits = editingTier.benefits.filter((_, i) => i !== index);
                            setEditingTier({...editingTier, benefits: newBenefits});
                          }}
                          className="p-2 text-text-secondary hover:text-error hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => setEditingTier({
                        ...editingTier, 
                        benefits: [...editingTier.benefits, "New benefit"]
                      })}
                      className="flex items-center space-x-2 text-sm text-primary hover:text-primary-600 transition-colors duration-200"
                    >
                      <Icon name="Plus" size={14} />
                      <span>Add Benefit</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Tier Color</label>
                  <div className="flex space-x-3">
                    {["bg-primary", "bg-secondary", "bg-accent", "bg-success", "bg-warning"].map(color => (
                      <button 
                        key={color}
                        onClick={() => setEditingTier({...editingTier, color})}
                        className={`w-8 h-8 rounded-full ${color} ${editingTier.color === color ? 'ring-2 ring-white' : ''}`}
                      ></button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Active</span>
                    <button 
                      onClick={() => setEditingTier({...editingTier, isActive: !editingTier.isActive})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                        editingTier.isActive ? 'bg-success' : 'bg-surface-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          editingTier.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={handleSaveTier}
                  className="btn-primary flex-1"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setEditingTier(null)}
                  className="px-6 py-3 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Bundle Deals Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Bundle Deals</h2>
        <p className="text-text-secondary mb-6">Create discounted subscription bundles for multiple months</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {bundles.map(bundle => (
            <div key={bundle.id} className="bg-surface-800 border border-border rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{bundle.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="text-xl font-bold">${bundle.bundlePrice.toFixed(2)}</div>
                      <div className="text-sm text-text-tertiary line-through ml-2">${bundle.regularPrice.toFixed(2)}</div>
                      <div className="ml-2 text-xs font-medium bg-success/20 text-success px-2 py-0.5 rounded">
                        Save {bundle.discount}%
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEditBundle(bundle)}
                    className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                  >
                    <Icon name="Edit" size={16} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">Tier</span>
                    <span className="font-medium">{bundle.tierName}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">Duration</span>
                    <span className="font-medium">{bundle.months} months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Total Sales</span>
                    <span className="font-medium">{bundle.sales}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${bundle.isActive ? 'bg-success' : 'bg-error'}`}></div>
                    <span className="text-sm">{bundle.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button 
            onClick={addNewBundle}
            className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/50 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-surface-700 rounded-full flex items-center justify-center mb-3">
              <Icon name="Plus" size={24} />
            </div>
            <span className="font-medium">Add New Bundle</span>
            <span className="text-sm text-text-tertiary mt-1">Create a discounted subscription bundle</span>
          </button>
        </div>
      </div>
      
      {/* Edit Bundle Modal */}
      {editingBundle && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Edit Bundle</h3>
                <button 
                  onClick={() => setEditingBundle(null)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Bundle Name</label>
                  <input 
                    type="text" 
                    value={editingBundle.name}
                    onChange={(e) => setEditingBundle({...editingBundle, name: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Subscription Tier</label>
                  <select 
                    value={editingBundle.tierName}
                    onChange={(e) => {
                      const selectedTier = tiers.find(tier => tier.name === e.target.value);
                      const regularPrice = selectedTier.price * editingBundle.months;
                      const bundlePrice = regularPrice * (1 - editingBundle.discount / 100);
                      
                      setEditingBundle({
                        ...editingBundle, 
                        tierName: e.target.value,
                        regularPrice,
                        bundlePrice
                      });
                    }}
                    className="input-field w-full"
                  >
                    {tiers.map(tier => (
                      <option key={tier.id} value={tier.name}>{tier.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Duration (Months)</label>
                  <select 
                    value={editingBundle.months}
                    onChange={(e) => {
                      const months = parseInt(e.target.value);
                      const selectedTier = tiers.find(tier => tier.name === editingBundle.tierName);
                      const regularPrice = selectedTier.price * months;
                      const bundlePrice = regularPrice * (1 - editingBundle.discount / 100);
                      
                      setEditingBundle({
                        ...editingBundle, 
                        months,
                        regularPrice,
                        bundlePrice
                      });
                    }}
                    className="input-field w-full"
                  >
                    {[3, 6, 12].map(month => (
                      <option key={month} value={month}>{month} months</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Discount (%)</label>
                  <input 
                    type="number" 
                    min="1"
                    max="50"
                    value={editingBundle.discount}
                    onChange={(e) => {
                      const discount = parseFloat(e.target.value);
                      const bundlePrice = editingBundle.regularPrice * (1 - discount / 100);
                      
                      setEditingBundle({
                        ...editingBundle, 
                        discount,
                        bundlePrice
                      });
                    }}
                    className="input-field w-full"
                  />
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">Regular Price</span>
                    <span className="font-medium">${editingBundle.regularPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Bundle Price</span>
                    <span className="font-medium">${editingBundle.bundlePrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Active</span>
                    <button 
                      onClick={() => setEditingBundle({...editingBundle, isActive: !editingBundle.isActive})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                        editingBundle.isActive ? 'bg-success' : 'bg-surface-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          editingBundle.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={handleSaveBundle}
                  className="btn-primary flex-1"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setEditingBundle(null)}
                  className="px-6 py-3 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Free Trial Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Free Trial Configuration</h2>
        <p className="text-text-secondary mb-6">Configure free trial settings to attract new subscribers</p>
        
        <div className="bg-surface-800 border border-border rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-lg">Free Trial Settings</h3>
                <p className="text-text-secondary text-sm mt-1">
                  Allow new fans to try your content before subscribing
                </p>
              </div>
              <button 
                onClick={handleEditTrials}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
              >
                <Icon name="Edit" size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${freeTrials.isEnabled ? 'bg-success' : 'bg-error'}`}></div>
                    <span className="font-medium">{freeTrials.isEnabled ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="text-sm text-text-secondary">
                    {freeTrials.duration} days trial
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Active Trials</span>
                    <span className="font-medium">{freeTrials.activeTrials}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Completed Trials</span>
                    <span className="font-medium">{freeTrials.completedTrials}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Converted to Paid</span>
                    <span className="font-medium">{freeTrials.convertedTrials}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Conversion Rate</h4>
                  <div className="flex items-end space-x-2">
                    <div className="text-2xl font-bold">{freeTrials.conversionRate}%</div>
                    <div className="text-sm text-success flex items-center">
                      <Icon name="TrendingUp" size={14} className="mr-1" />
                      <span>+2.3%</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div className="text-xs text-text-secondary">
                      <span>0%</span>
                    </div>
                    <div className="text-xs text-text-secondary">
                      <span>100%</span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-surface-600">
                    <div style={{ width: `${freeTrials.conversionRate}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-success"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Free Trial Modal */}
      {isEditingTrials && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Edit Free Trial Settings</h3>
                <button 
                  onClick={() => setIsEditingTrials(false)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enable Free Trials</span>
                  <button 
                    onClick={() => setFreeTrials({...freeTrials, isEnabled: !freeTrials.isEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                      freeTrials.isEnabled ? 'bg-success' : 'bg-surface-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        freeTrials.isEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Trial Duration (Days)</label>
                  <select 
                    value={freeTrials.duration}
                    onChange={(e) => setFreeTrials({...freeTrials, duration: parseInt(e.target.value)})}
                    className="input-field w-full"
                    disabled={!freeTrials.isEnabled}
                  >
                    {[3, 5, 7, 14, 30].map(days => (
                      <option key={days} value={days}>{days} days</option>
                    ))}
                  </select>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium mb-2">Trial Availability</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="allTiers" 
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        checked
                        disabled={!freeTrials.isEnabled}
                      />
                      <label htmlFor="allTiers" className="ml-2 text-sm">
                        Available for all subscription tiers
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="newFans" 
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        checked
                        disabled={!freeTrials.isEnabled}
                      />
                      <label htmlFor="newFans" className="ml-2 text-sm">
                        Only for new fans (never subscribed before)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="limitOne" 
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        checked
                        disabled={!freeTrials.isEnabled}
                      />
                      <label htmlFor="limitOne" className="ml-2 text-sm">
                        Limit one trial per fan
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={handleSaveTrials}
                  className="btn-primary flex-1"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditingTrials(false)}
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

export default SubscriptionTiers;