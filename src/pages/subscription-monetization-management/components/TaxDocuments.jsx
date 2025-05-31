import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TaxDocuments = () => {
  const [taxInfo, setTaxInfo] = useState({
    name: 'Alex Morgan',
    address: '123 Main St, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    taxId: '***-**-1234',
    taxClassification: 'Individual/Sole Proprietor',
    isComplete: true
  });
  
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ ...taxInfo });
  
  const [taxDocuments, setTaxDocuments] = useState([
    {
      id: 1,
      year: 2022,
      type: '1099-NEC',
      dateIssued: '2023-01-31',
      status: 'available',
      earnings: 18245.72
    },
    {
      id: 2,
      year: 2021,
      type: '1099-NEC',
      dateIssued: '2022-01-31',
      status: 'available',
      earnings: 12458.36
    },
    {
      id: 3,
      year: 2020,
      type: '1099-NEC',
      dateIssued: '2021-01-31',
      status: 'available',
      earnings: 8752.45
    }
  ]);
  
  const [taxSettings, setTaxSettings] = useState({
    withholdingEnabled: false,
    withholdingPercentage: 15,
    autoFileEnabled: false,
    receiveEmailNotifications: true
  });
  
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [editedSettings, setEditedSettings] = useState({ ...taxSettings });
  
  const handleSaveInfo = () => {
    setTaxInfo(editedInfo);
    setIsEditingInfo(false);
  };
  
  const handleSaveSettings = () => {
    setTaxSettings(editedSettings);
    setIsEditingSettings(false);
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Tax Documents</h2>
        <div className="text-sm text-text-secondary">
          Tax Year: <span className="font-medium text-text-primary">2023</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Tax Information</h3>
            <button 
              onClick={() => {
                setEditedInfo({ ...taxInfo });
                setIsEditingInfo(true);
              }}
              className="px-4 py-2 text-sm bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Icon name="Edit" size={14} />
              <span>Edit</span>
            </button>
          </div>
          
          <div className="bg-surface-800 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${taxInfo.isComplete ? 'bg-success' : 'bg-error'}`}></div>
                <span className="text-sm font-medium">{taxInfo.isComplete ? 'Complete' : 'Incomplete'}</span>
              </div>
              {!taxInfo.isComplete && (
                <span className="text-xs bg-error/20 text-error px-2 py-0.5 rounded">
                  Action Required
                </span>
              )}
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-xs text-text-tertiary">Name</div>
                <div className="text-sm">{taxInfo.name}</div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary">Address</div>
                <div className="text-sm">{taxInfo.address}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-text-tertiary">City</div>
                  <div className="text-sm">{taxInfo.city}</div>
                </div>
                <div>
                  <div className="text-xs text-text-tertiary">State</div>
                  <div className="text-sm">{taxInfo.state}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-text-tertiary">Zip Code</div>
                  <div className="text-sm">{taxInfo.zipCode}</div>
                </div>
                <div>
                  <div className="text-xs text-text-tertiary">Country</div>
                  <div className="text-sm">{taxInfo.country}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary">Tax ID (SSN/EIN)</div>
                <div className="text-sm">{taxInfo.taxId}</div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary">Tax Classification</div>
                <div className="text-sm">{taxInfo.taxClassification}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Tax Settings</h3>
            <button 
              onClick={() => {
                setEditedSettings({ ...taxSettings });
                setIsEditingSettings(true);
              }}
              className="px-4 py-2 text-sm bg-surface-700 text-text-primary hover:bg-surface-600 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Icon name="Settings" size={14} />
              <span>Configure</span>
            </button>
          </div>
          
          <div className="bg-surface-800 border border-border rounded-lg p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">Tax Withholding</div>
                  <div className="text-xs text-text-secondary mt-1">
                    {taxSettings.withholdingEnabled 
                      ? `${taxSettings.withholdingPercentage}% withheld from earnings` 
                      : 'Not enabled'}
                  </div>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded ${
                  taxSettings.withholdingEnabled 
                    ? 'bg-success/20 text-success' :'bg-surface-600 text-text-secondary'
                }`}>
                  {taxSettings.withholdingEnabled ? 'Enabled' : 'Disabled'}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">Automated Tax Filing</div>
                  <div className="text-xs text-text-secondary mt-1">
                    {taxSettings.autoFileEnabled 
                      ? 'Quarterly estimated taxes filed automatically' :'Manual filing required'}
                  </div>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded ${
                  taxSettings.autoFileEnabled 
                    ? 'bg-success/20 text-success' :'bg-surface-600 text-text-secondary'
                }`}>
                  {taxSettings.autoFileEnabled ? 'Enabled' : 'Disabled'}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">Email Notifications</div>
                  <div className="text-xs text-text-secondary mt-1">
                    {taxSettings.receiveEmailNotifications 
                      ? 'Receive emails about tax documents and deadlines' 
                      : 'No tax-related email notifications'}
                  </div>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded ${
                  taxSettings.receiveEmailNotifications 
                    ? 'bg-success/20 text-success' :'bg-surface-600 text-text-secondary'
                }`}>
                  {taxSettings.receiveEmailNotifications ? 'Enabled' : 'Disabled'}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-xs text-text-tertiary mb-2">2023 Estimated Tax Summary</div>
              <div className="flex justify-between items-center">
                <span className="text-sm">YTD Earnings</span>
                <span className="text-sm font-medium">$14,921.45</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm">Estimated Tax Liability</span>
                <span className="text-sm font-medium">$3,730.36</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-4">Available Tax Documents</h3>
        <div className="bg-surface-800 border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Document Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date Issued</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Earnings</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {taxDocuments.map((document) => (
                  <tr key={document.id} className="hover:bg-surface-700/50 transition-colors duration-150">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-medium">{document.year}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm">{document.type}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm">{formatDate(document.dateIssued)}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-medium">{formatCurrency(document.earnings)}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        document.status === 'available' ?'bg-success/20 text-success' 
                          : document.status === 'pending' ?'bg-warning/20 text-warning' :'bg-error/20 text-error'
                      }`}>
                        {document.status === 'available' ? (
                          <>
                            <Icon name="Check" size={12} className="mr-1" />
                            Available
                          </>
                        ) : document.status === 'pending' ? (
                          <>
                            <Icon name="Clock" size={12} className="mr-1" />
                            Pending
                          </>
                        ) : (
                          <>
                            <Icon name="X" size={12} className="mr-1" />
                            Unavailable
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-200">
                          Download
                        </button>
                        <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-200">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {taxDocuments.length === 0 && (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="FileText" size={24} className="text-text-tertiary" />
              </div>
              <h4 className="font-medium mb-2">No Tax Documents</h4>
              <p className="text-sm text-text-secondary">
                Tax documents will be available in January for the previous tax year
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <h3 className="font-medium mb-4">Tax Calendar</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Calendar" size={20} className="text-warning" />
              </div>
              <div>
                <div className="font-medium">Q3 Estimated Tax Payment</div>
                <div className="text-sm text-text-secondary mt-1">Due September 15, 2023</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-surface-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Calendar" size={20} className="text-text-secondary" />
              </div>
              <div>
                <div className="font-medium">Q4 Estimated Tax Payment</div>
                <div className="text-sm text-text-secondary mt-1">Due January 15, 2024</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-surface-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="FileText" size={20} className="text-text-secondary" />
              </div>
              <div>
                <div className="font-medium">1099-NEC Forms Issued</div>
                <div className="text-sm text-text-secondary mt-1">By January 31, 2024</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-surface-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="FileText" size={20} className="text-text-secondary" />
              </div>
              <div>
                <div className="font-medium">Federal Tax Return Due</div>
                <div className="text-sm text-text-secondary mt-1">April 15, 2024</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-surface-800 border border-border rounded-lg p-4">
          <h3 className="font-medium mb-4">Tax Resources</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Book" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium">Tax Guide for Content Creators</div>
                <div className="text-sm text-text-secondary mt-1">Learn about tax obligations specific to content creators</div>
                <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-200 mt-2">
                  Read Guide
                </button>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium">Tax FAQ</div>
                <div className="text-sm text-text-secondary mt-1">Answers to common tax questions</div>
                <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-200 mt-2">
                  View FAQ
                </button>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Users" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium">Tax Professional Directory</div>
                <div className="text-sm text-text-secondary mt-1">Find tax professionals experienced with content creators</div>
                <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-200 mt-2">
                  Browse Directory
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Tax Info Modal */}
      {isEditingInfo && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Edit Tax Information</h3>
                <button 
                  onClick={() => setIsEditingInfo(false)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editedInfo.name}
                    onChange={(e) => setEditedInfo({...editedInfo, name: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input 
                    type="text" 
                    value={editedInfo.address}
                    onChange={(e) => setEditedInfo({...editedInfo, address: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input 
                      type="text" 
                      value={editedInfo.city}
                      onChange={(e) => setEditedInfo({...editedInfo, city: e.target.value})}
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input 
                      type="text" 
                      value={editedInfo.state}
                      onChange={(e) => setEditedInfo({...editedInfo, state: e.target.value})}
                      className="input-field w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Zip Code</label>
                    <input 
                      type="text" 
                      value={editedInfo.zipCode}
                      onChange={(e) => setEditedInfo({...editedInfo, zipCode: e.target.value})}
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <select 
                      value={editedInfo.country}
                      onChange={(e) => setEditedInfo({...editedInfo, country: e.target.value})}
                      className="input-field w-full"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Tax ID (SSN/EIN)</label>
                  <input 
                    type="text" 
                    value={editedInfo.taxId}
                    onChange={(e) => setEditedInfo({...editedInfo, taxId: e.target.value})}
                    className="input-field w-full"
                    disabled
                  />
                  <p className="text-xs text-text-tertiary mt-1">
                    For security, tax ID can only be updated by contacting support
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Tax Classification</label>
                  <select 
                    value={editedInfo.taxClassification}
                    onChange={(e) => setEditedInfo({...editedInfo, taxClassification: e.target.value})}
                    className="input-field w-full"
                  >
                    <option value="Individual/Sole Proprietor">Individual/Sole Proprietor</option>
                    <option value="LLC - Single Member">LLC - Single Member</option>
                    <option value="LLC - Partnership">LLC - Partnership</option>
                    <option value="LLC - C Corporation">LLC - C Corporation</option>
                    <option value="LLC - S Corporation">LLC - S Corporation</option>
                    <option value="C Corporation">C Corporation</option>
                    <option value="S Corporation">S Corporation</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Trust/Estate">Trust/Estate</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={handleSaveInfo}
                  className="btn-primary flex-1"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditingInfo(false)}
                  className="px-6 py-3 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Tax Settings Modal */}
      {isEditingSettings && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Configure Tax Settings</h3>
                <button 
                  onClick={() => setIsEditingSettings(false)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Tax Withholding</div>
                    <button 
                      onClick={() => setEditedSettings({...editedSettings, withholdingEnabled: !editedSettings.withholdingEnabled})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                        editedSettings.withholdingEnabled ? 'bg-success' : 'bg-surface-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          editedSettings.withholdingEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">
                    Automatically withhold a percentage of your earnings for taxes
                  </p>
                  
                  {editedSettings.withholdingEnabled && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Withholding Percentage</label>
                      <select 
                        value={editedSettings.withholdingPercentage}
                        onChange={(e) => setEditedSettings({...editedSettings, withholdingPercentage: parseInt(e.target.value)})}
                        className="input-field w-full"
                      >
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                        <option value="20">20%</option>
                        <option value="25">25%</option>
                        <option value="30">30%</option>
                      </select>
                    </div>
                  )}
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Automated Tax Filing</div>
                    <button 
                      onClick={() => setEditedSettings({...editedSettings, autoFileEnabled: !editedSettings.autoFileEnabled})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                        editedSettings.autoFileEnabled ? 'bg-success' : 'bg-surface-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          editedSettings.autoFileEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Automatically file quarterly estimated tax payments (additional fees apply)
                  </p>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Email Notifications</div>
                    <button 
                      onClick={() => setEditedSettings({...editedSettings, receiveEmailNotifications: !editedSettings.receiveEmailNotifications})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                        editedSettings.receiveEmailNotifications ? 'bg-success' : 'bg-surface-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          editedSettings.receiveEmailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Receive email notifications about tax documents and important tax deadlines
                  </p>
                </div>
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

export default TaxDocuments;