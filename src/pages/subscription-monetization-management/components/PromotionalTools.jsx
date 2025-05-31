import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PromotionalTools = () => {
  const [activeTab, setActiveTab] = useState('discounts');
  
  const [discountCodes, setDiscountCodes] = useState([
    {
      id: 1,
      code: 'WELCOME25',
      type: 'percentage',
      value: 25,
      maxUses: 100,
      usedCount: 42,
      expiryDate: '2023-09-30',
      isActive: true,
      appliesTo: 'all'
    },
    {
      id: 2,
      code: 'SUMMER10',
      type: 'percentage',
      value: 10,
      maxUses: 200,
      usedCount: 78,
      expiryDate: '2023-08-31',
      isActive: true,
      appliesTo: 'all'
    },
    {
      id: 3,
      code: 'COMEBACK5',
      type: 'fixed',
      value: 5,
      maxUses: 50,
      usedCount: 12,
      expiryDate: '2023-10-15',
      isActive: true,
      appliesTo: 'basic'
    }
  ]);
  
  const [limitedTimeOffers, setLimitedTimeOffers] = useState([
    {
      id: 1,
      name: 'Summer Special',
      description: 'Get 3 months for the price of 2',
      startDate: '2023-07-01',
      endDate: '2023-08-31',
      discount: 33,
      isActive: true,
      appliesTo: ['basic', 'premium']
    },
    {
      id: 2,
      name: 'Flash Sale',
      description: '50% off your first month',
      startDate: '2023-08-15',
      endDate: '2023-08-20',
      discount: 50,
      isActive: true,
      appliesTo: ['all']
    }
  ]);
  
  const [milestoneRewards, setMilestoneRewards] = useState([
    {
      id: 1,
      milestone: '3 months',
      reward: 'Exclusive photo set',
      isActive: true
    },
    {
      id: 2,
      milestone: '6 months',
      reward: 'Personal video message',
      isActive: true
    },
    {
      id: 3,
      milestone: '1 year',
      reward: 'Free month + merchandise',
      isActive: true
    }
  ]);
  
  const [isAddingDiscount, setIsAddingDiscount] = useState(false);
  const [newDiscount, setNewDiscount] = useState({
    code: '',
    type: 'percentage',
    value: 10,
    maxUses: 100,
    expiryDate: '',
    isActive: true,
    appliesTo: 'all'
  });
  
  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [newOffer, setNewOffer] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    discount: 25,
    isActive: true,
    appliesTo: ['all']
  });
  
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    milestone: '3 months',
    reward: '',
    isActive: true
  });
  
  const handleAddDiscount = () => {
    const discount = {
      id: discountCodes.length + 1,
      ...newDiscount,
      usedCount: 0
    };
    
    setDiscountCodes([...discountCodes, discount]);
    setIsAddingDiscount(false);
    setNewDiscount({
      code: '',
      type: 'percentage',
      value: 10,
      maxUses: 100,
      expiryDate: '',
      isActive: true,
      appliesTo: 'all'
    });
  };
  
  const handleAddOffer = () => {
    const offer = {
      id: limitedTimeOffers.length + 1,
      ...newOffer
    };
    
    setLimitedTimeOffers([...limitedTimeOffers, offer]);
    setIsAddingOffer(false);
    setNewOffer({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      discount: 25,
      isActive: true,
      appliesTo: ['all']
    });
  };
  
  const handleAddMilestone = () => {
    const milestone = {
      id: milestoneRewards.length + 1,
      ...newMilestone
    };
    
    setMilestoneRewards([...milestoneRewards, milestone]);
    setIsAddingMilestone(false);
    setNewMilestone({
      milestone: '3 months',
      reward: '',
      isActive: true
    });
  };
  
  const handleToggleDiscountStatus = (id) => {
    setDiscountCodes(discountCodes.map(discount => 
      discount.id === id ? { ...discount, isActive: !discount.isActive } : discount
    ));
  };
  
  const handleToggleOfferStatus = (id) => {
    setLimitedTimeOffers(limitedTimeOffers.map(offer => 
      offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
    ));
  };
  
  const handleToggleMilestoneStatus = (id) => {
    setMilestoneRewards(milestoneRewards.map(milestone => 
      milestone.id === id ? { ...milestone, isActive: !milestone.isActive } : milestone
    ));
  };
  
  const handleDeleteDiscount = (id) => {
    setDiscountCodes(discountCodes.filter(discount => discount.id !== id));
  };
  
  const handleDeleteOffer = (id) => {
    setLimitedTimeOffers(limitedTimeOffers.filter(offer => offer.id !== id));
  };
  
  const handleDeleteMilestone = (id) => {
    setMilestoneRewards(milestoneRewards.filter(milestone => milestone.id !== id));
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <div>
      <div className="flex border-b border-border mb-6 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('discounts')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
            activeTab === 'discounts' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Discount Codes
        </button>
        <button
          onClick={() => setActiveTab('offers')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
            activeTab === 'offers' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Limited Time Offers
        </button>
        <button
          onClick={() => setActiveTab('milestones')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
            activeTab === 'milestones' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Milestone Rewards
        </button>
      </div>
      
      {activeTab === 'discounts' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Discount Codes</h3>
            <button 
              onClick={() => setIsAddingDiscount(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>Create Discount</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {discountCodes.map((discount) => (
              <div key={discount.id} className="bg-surface-800 border border-border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{discount.code}</h4>
                      {discount.isActive ? (
                        <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded">Active</span>
                      ) : (
                        <span className="text-xs bg-error/20 text-error px-2 py-0.5 rounded">Inactive</span>
                      )}
                    </div>
                    <div className="text-sm text-text-secondary mt-1">
                      {discount.type === 'percentage' ? `${discount.value}% off` : `$${discount.value} off`}
                      {discount.appliesTo !== 'all' ? ` ${discount.appliesTo} tier` : ' all tiers'}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleToggleDiscountStatus(discount.id)}
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                      title={discount.isActive ? 'Deactivate' : 'Activate'}
                    >
                      <Icon name={discount.isActive ? 'EyeOff' : 'Eye'} size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteDiscount(discount.id)}
                      className="p-2 text-text-secondary hover:text-error hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                      title="Delete"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-text-tertiary">Usage</div>
                    <div className="text-sm">{discount.usedCount} / {discount.maxUses}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary">Expiry Date</div>
                    <div className="text-sm">{formatDate(discount.expiryDate)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary">Remaining</div>
                    <div className="text-sm">{discount.maxUses - discount.usedCount} uses left</div>
                  </div>
                </div>
              </div>
            ))}
            
            {discountCodes.length === 0 && (
              <div className="bg-surface-800 border border-border rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Tag" size={24} className="text-text-tertiary" />
                </div>
                <h4 className="font-medium mb-2">No Discount Codes</h4>
                <p className="text-sm text-text-secondary mb-4">
                  Create discount codes to attract new subscribers
                </p>
                <button 
                  onClick={() => setIsAddingDiscount(true)}
                  className="btn-primary"
                >
                  Create Discount Code
                </button>
              </div>
            )}
          </div>
          
          {/* Add Discount Modal */}
          {isAddingDiscount && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Create Discount Code</h3>
                    <button 
                      onClick={() => setIsAddingDiscount(false)}
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Discount Code</label>
                      <input 
                        type="text" 
                        value={newDiscount.code}
                        onChange={(e) => setNewDiscount({...newDiscount, code: e.target.value.toUpperCase()})}
                        className="input-field w-full"
                        placeholder="e.g. WELCOME25"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Discount Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setNewDiscount({...newDiscount, type: 'percentage'})}
                          className={`flex items-center justify-center p-3 rounded-lg border ${
                            newDiscount.type === 'percentage' ?'border-primary bg-primary/10' :'border-border bg-surface-800'
                          }`}
                        >
                          <span className="text-sm font-medium">Percentage (%)</span>
                        </button>
                        
                        <button
                          onClick={() => setNewDiscount({...newDiscount, type: 'fixed'})}
                          className={`flex items-center justify-center p-3 rounded-lg border ${
                            newDiscount.type === 'fixed' ?'border-primary bg-primary/10' :'border-border bg-surface-800'
                          }`}
                        >
                          <span className="text-sm font-medium">Fixed Amount ($)</span>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {newDiscount.type === 'percentage' ? 'Discount Percentage (%)' : 'Discount Amount ($)'}
                      </label>
                      <input 
                        type="number" 
                        min="1"
                        max={newDiscount.type === 'percentage' ? "100" : "999"}
                        value={newDiscount.value}
                        onChange={(e) => setNewDiscount({...newDiscount, value: parseInt(e.target.value)})}
                        className="input-field w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Maximum Uses</label>
                      <input 
                        type="number" 
                        min="1"
                        value={newDiscount.maxUses}
                        onChange={(e) => setNewDiscount({...newDiscount, maxUses: parseInt(e.target.value)})}
                        className="input-field w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry Date</label>
                      <input 
                        type="date" 
                        value={newDiscount.expiryDate}
                        onChange={(e) => setNewDiscount({...newDiscount, expiryDate: e.target.value})}
                        className="input-field w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Applies To</label>
                      <select 
                        value={newDiscount.appliesTo}
                        onChange={(e) => setNewDiscount({...newDiscount, appliesTo: e.target.value})}
                        className="input-field w-full"
                      >
                        <option value="all">All Tiers</option>
                        <option value="basic">Basic Tier</option>
                        <option value="premium">Premium Tier</option>
                        <option value="vip">VIP Tier</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Active</span>
                        <button 
                          onClick={() => setNewDiscount({...newDiscount, isActive: !newDiscount.isActive})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                            newDiscount.isActive ? 'bg-success' : 'bg-surface-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              newDiscount.isActive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button 
                      onClick={handleAddDiscount}
                      className="btn-primary flex-1"
                      disabled={!newDiscount.code || !newDiscount.expiryDate}
                    >
                      Create Discount
                    </button>
                    <button 
                      onClick={() => setIsAddingDiscount(false)}
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
      
      {activeTab === 'offers' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Limited Time Offers</h3>
            <button 
              onClick={() => setIsAddingOffer(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>Create Offer</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {limitedTimeOffers.map((offer) => (
              <div key={offer.id} className="bg-surface-800 border border-border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{offer.name}</h4>
                      {offer.isActive ? (
                        <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded">Active</span>
                      ) : (
                        <span className="text-xs bg-error/20 text-error px-2 py-0.5 rounded">Inactive</span>
                      )}
                    </div>
                    <div className="text-sm text-text-secondary mt-1">
                      {offer.description}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleToggleOfferStatus(offer.id)}
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                      title={offer.isActive ? 'Deactivate' : 'Activate'}
                    >
                      <Icon name={offer.isActive ? 'EyeOff' : 'Eye'} size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteOffer(offer.id)}
                      className="p-2 text-text-secondary hover:text-error hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                      title="Delete"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-text-tertiary">Discount</div>
                    <div className="text-sm">{offer.discount}% off</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary">Date Range</div>
                    <div className="text-sm">{formatDate(offer.startDate)} - {formatDate(offer.endDate)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary">Applies To</div>
                    <div className="text-sm capitalize">
                      {offer.appliesTo.includes('all') ? 'All Tiers' : offer.appliesTo.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {limitedTimeOffers.length === 0 && (
              <div className="bg-surface-800 border border-border rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={24} className="text-text-tertiary" />
                </div>
                <h4 className="font-medium mb-2">No Limited Time Offers</h4>
                <p className="text-sm text-text-secondary mb-4">
                  Create limited time offers to boost subscriptions
                </p>
                <button 
                  onClick={() => setIsAddingOffer(true)}
                  className="btn-primary"
                >
                  Create Limited Time Offer
                </button>
              </div>
            )}
          </div>
          
          {/* Add Offer Modal */}
          {isAddingOffer && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Create Limited Time Offer</h3>
                    <button 
                      onClick={() => setIsAddingOffer(false)}
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Offer Name</label>
                      <input 
                        type="text" 
                        value={newOffer.name}
                        onChange={(e) => setNewOffer({...newOffer, name: e.target.value})}
                        className="input-field w-full"
                        placeholder="e.g. Summer Special"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <input 
                        type="text" 
                        value={newOffer.description}
                        onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                        className="input-field w-full"
                        placeholder="e.g. Get 3 months for the price of 2"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Discount Percentage (%)</label>
                      <input 
                        type="number" 
                        min="1"
                        max="100"
                        value={newOffer.discount}
                        onChange={(e) => setNewOffer({...newOffer, discount: parseInt(e.target.value)})}
                        className="input-field w-full"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Start Date</label>
                        <input 
                          type="date" 
                          value={newOffer.startDate}
                          onChange={(e) => setNewOffer({...newOffer, startDate: e.target.value})}
                          className="input-field w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">End Date</label>
                        <input 
                          type="date" 
                          value={newOffer.endDate}
                          onChange={(e) => setNewOffer({...newOffer, endDate: e.target.value})}
                          className="input-field w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Applies To</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="allTiers" 
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                            checked={newOffer.appliesTo.includes('all')}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewOffer({...newOffer, appliesTo: ['all']});
                              } else {
                                setNewOffer({...newOffer, appliesTo: []});
                              }
                            }}
                          />
                          <label htmlFor="allTiers" className="ml-2 text-sm">
                            All Tiers
                          </label>
                        </div>
                        
                        {!newOffer.appliesTo.includes('all') && (
                          <>
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id="basicTier" 
                                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                                checked={newOffer.appliesTo.includes('basic')}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewOffer({...newOffer, appliesTo: [...newOffer.appliesTo, 'basic']});
                                  } else {
                                    setNewOffer({
                                      ...newOffer, 
                                      appliesTo: newOffer.appliesTo.filter(tier => tier !== 'basic')
                                    });
                                  }
                                }}
                              />
                              <label htmlFor="basicTier" className="ml-2 text-sm">
                                Basic Tier
                              </label>
                            </div>
                            
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id="premiumTier" 
                                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                                checked={newOffer.appliesTo.includes('premium')}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewOffer({...newOffer, appliesTo: [...newOffer.appliesTo, 'premium']});
                                  } else {
                                    setNewOffer({
                                      ...newOffer, 
                                      appliesTo: newOffer.appliesTo.filter(tier => tier !== 'premium')
                                    });
                                  }
                                }}
                              />
                              <label htmlFor="premiumTier" className="ml-2 text-sm">
                                Premium Tier
                              </label>
                            </div>
                            
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id="vipTier" 
                                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                                checked={newOffer.appliesTo.includes('vip')}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewOffer({...newOffer, appliesTo: [...newOffer.appliesTo, 'vip']});
                                  } else {
                                    setNewOffer({
                                      ...newOffer, 
                                      appliesTo: newOffer.appliesTo.filter(tier => tier !== 'vip')
                                    });
                                  }
                                }}
                              />
                              <label htmlFor="vipTier" className="ml-2 text-sm">
                                VIP Tier
                              </label>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Active</span>
                        <button 
                          onClick={() => setNewOffer({...newOffer, isActive: !newOffer.isActive})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                            newOffer.isActive ? 'bg-success' : 'bg-surface-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              newOffer.isActive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button 
                      onClick={handleAddOffer}
                      className="btn-primary flex-1"
                      disabled={
                        !newOffer.name || 
                        !newOffer.description || 
                        !newOffer.startDate || 
                        !newOffer.endDate || 
                        newOffer.appliesTo.length === 0
                      }
                    >
                      Create Offer
                    </button>
                    <button 
                      onClick={() => setIsAddingOffer(false)}
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
      
      {activeTab === 'milestones' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Milestone Rewards</h3>
            <button 
              onClick={() => setIsAddingMilestone(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>Add Milestone</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {milestoneRewards.map((milestone) => (
              <div key={milestone.id} className="bg-surface-800 border border-border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{milestone.milestone} Milestone</h4>
                      {milestone.isActive ? (
                        <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded">Active</span>
                      ) : (
                        <span className="text-xs bg-error/20 text-error px-2 py-0.5 rounded">Inactive</span>
                      )}
                    </div>
                    <div className="text-sm text-text-secondary mt-1">
                      Reward: {milestone.reward}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleToggleMilestoneStatus(milestone.id)}
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                      title={milestone.isActive ? 'Deactivate' : 'Activate'}
                    >
                      <Icon name={milestone.isActive ? 'EyeOff' : 'Eye'} size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteMilestone(milestone.id)}
                      className="p-2 text-text-secondary hover:text-error hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                      title="Delete"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {milestoneRewards.length === 0 && (
              <div className="bg-surface-800 border border-border rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Award" size={24} className="text-text-tertiary" />
                </div>
                <h4 className="font-medium mb-2">No Milestone Rewards</h4>
                <p className="text-sm text-text-secondary mb-4">
                  Create milestone rewards to improve subscriber retention
                </p>
                <button 
                  onClick={() => setIsAddingMilestone(true)}
                  className="btn-primary"
                >
                  Add Milestone Reward
                </button>
              </div>
            )}
          </div>
          
          {/* Add Milestone Modal */}
          {isAddingMilestone && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Add Milestone Reward</h3>
                    <button 
                      onClick={() => setIsAddingMilestone(false)}
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Milestone</label>
                      <select 
                        value={newMilestone.milestone}
                        onChange={(e) => setNewMilestone({...newMilestone, milestone: e.target.value})}
                        className="input-field w-full"
                      >
                        <option value="1 month">1 Month</option>
                        <option value="3 months">3 Months</option>
                        <option value="6 months">6 Months</option>
                        <option value="1 year">1 Year</option>
                        <option value="2 years">2 Years</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Reward</label>
                      <input 
                        type="text" 
                        value={newMilestone.reward}
                        onChange={(e) => setNewMilestone({...newMilestone, reward: e.target.value})}
                        className="input-field w-full"
                        placeholder="e.g. Exclusive photo set"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Active</span>
                        <button 
                          onClick={() => setNewMilestone({...newMilestone, isActive: !newMilestone.isActive})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                            newMilestone.isActive ? 'bg-success' : 'bg-surface-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              newMilestone.isActive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button 
                      onClick={handleAddMilestone}
                      className="btn-primary flex-1"
                      disabled={!newMilestone.reward}
                    >
                      Add Milestone
                    </button>
                    <button 
                      onClick={() => setIsAddingMilestone(false)}
                      className="px-6 py-3 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6 bg-surface-800 border border-border rounded-lg p-4">
            <h4 className="font-medium mb-3">Milestone Reward Tips</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <span className="text-sm text-text-secondary">Milestone rewards can increase subscriber retention by up to 35%</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <span className="text-sm text-text-secondary">Personalized rewards have higher engagement than generic ones</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <span className="text-sm text-text-secondary">Consider increasing reward value for longer subscription milestones</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionalTools;