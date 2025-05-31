import React, { useState, useRef, useCallback } from 'react';
import Icon from 'components/AppIcon';

import Header from 'components/ui/Header';
import UploadZone from './components/UploadZone';
import ContentTypeSelector from './components/ContentTypeSelector';
import MediaPreview from './components/MediaPreview';
import SchedulingSystem from './components/SchedulingSystem';
import ContentSettings from './components/ContentSettings';
import PricingControls from './components/PricingControls';
import BulkUploadManager from './components/BulkUploadManager';

function ContentUploadManagement() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedContentType, setSelectedContentType] = useState('free');
  const [caption, setCaption] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [pricing, setPricing] = useState({ amount: 0, tier: 'basic' });
  const [scheduleDate, setScheduleDate] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const mockTags = [
    'photography', 'lifestyle', 'fitness', 'fashion', 'art', 'music', 
    'travel', 'food', 'beauty', 'gaming', 'tech', 'nature'
  ];

  const mockSubscriptionTiers = [
    { id: 'basic', name: 'Basic', price: 9.99 },
    { id: 'premium', name: 'Premium', price: 19.99 },
    { id: 'vip', name: 'VIP', price: 39.99 }
  ];

  const handleFileUpload = useCallback((files) => {
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newFiles = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: URL.createObjectURL(file),
        uploadProgress: 100,
        status: 'completed'
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
    }, 2000);
  }, []);

  const handleRemoveFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handlePublish = () => {
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one file before publishing.');
      return;
    }

    // Simulate publishing
    console.log('Publishing content:', {
      files: uploadedFiles,
      contentType: selectedContentType,
      caption,
      tags: selectedTags,
      pricing,
      scheduleDate
    });

    alert('Content published successfully!');
    
    // Reset form
    setUploadedFiles([]);
    setCaption('');
    setSelectedTags([]);
    setPricing({ amount: 0, tier: 'basic' });
    setScheduleDate(null);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...');
    alert('Draft saved successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Content Upload & Management</h1>
                <p className="text-text-secondary">Create, organize, and monetize your content efficiently</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsBulkMode(!isBulkMode)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                    isBulkMode 
                      ? 'bg-primary text-white border-primary' :'border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50'
                  }`}
                >
                  <Icon name="Layers" size={16} className="mr-2" />
                  Bulk Mode
                </button>
                
                <button
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="px-4 py-2 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200"
                >
                  <Icon name="Settings" size={16} className="mr-2" />
                  Advanced
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Upload & Content */}
            <div className="space-y-6">
              {/* Upload Zone */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                  <Icon name="Upload" size={20} className="mr-2 text-primary" />
                  Upload Content
                </h2>
                
                {isBulkMode ? (
                  <BulkUploadManager 
                    onFilesUpload={handleFileUpload}
                    isUploading={isUploading}
                  />
                ) : (
                  <UploadZone 
                    onFilesUpload={handleFileUpload}
                    isUploading={isUploading}
                  />
                )}
              </div>

              {/* Content Type Selector */}
              <div className="card p-6">
                <ContentTypeSelector 
                  selectedType={selectedContentType}
                  onTypeChange={setSelectedContentType}
                />
              </div>

              {/* Caption & Tags */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Caption & Tags</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Caption
                    </label>
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Write a captivating caption for your content..."
                      className="w-full h-32 input-field resize-none"
                      maxLength={2000}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-text-tertiary">{caption.length}/2000 characters</span>
                      <div className="flex space-x-2">
                        <button className="text-text-secondary hover:text-text-primary">
                          <Icon name="Hash" size={16} />
                        </button>
                        <button className="text-text-secondary hover:text-text-primary">
                          <Icon name="Smile" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {mockTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => {
                            if (selectedTags.includes(tag)) {
                              setSelectedTags(prev => prev.filter(t => t !== tag));
                            } else {
                              setSelectedTags(prev => [...prev, tag]);
                            }
                          }}
                          className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                            selectedTags.includes(tag)
                              ? 'bg-primary text-white' :'bg-surface-700 text-text-secondary hover:text-text-primary hover:bg-surface-600'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Preview & Settings */}
            <div className="space-y-6">
              {/* Media Preview */}
              {uploadedFiles.length > 0 && (
                <div className="card p-6">
                  <MediaPreview 
                    files={uploadedFiles}
                    onRemoveFile={handleRemoveFile}
                  />
                </div>
              )}

              {/* Pricing Controls */}
              {selectedContentType !== 'free' && (
                <div className="card p-6">
                  <PricingControls 
                    contentType={selectedContentType}
                    pricing={pricing}
                    onPricingChange={setPricing}
                    subscriptionTiers={mockSubscriptionTiers}
                  />
                </div>
              )}

              {/* Scheduling System */}
              <div className="card p-6">
                <SchedulingSystem 
                  scheduleDate={scheduleDate}
                  onScheduleChange={setScheduleDate}
                />
              </div>

              {/* Advanced Settings */}
              {showAdvancedOptions && (
                <div className="card p-6">
                  <ContentSettings />
                </div>
              )}

              {/* Action Buttons */}
              <div className="card p-6">
                <div className="space-y-3">
                  <button
                    onClick={handlePublish}
                    disabled={uploadedFiles.length === 0}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Icon name="Send" size={18} className="mr-2" />
                    {scheduleDate ? 'Schedule Post' : 'Publish Now'}
                  </button>
                  
                  <button
                    onClick={handleSaveDraft}
                    className="w-full px-6 py-3 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <Icon name="Save" size={18} className="mr-2" />
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">247</div>
              <div className="text-sm text-text-secondary">Total Posts</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-secondary mb-1">89</div>
              <div className="text-sm text-text-secondary">Premium Content</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-accent mb-1">15</div>
              <div className="text-sm text-text-secondary">Scheduled Posts</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-success mb-1">3.2K</div>
              <div className="text-sm text-text-secondary">Total Views</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentUploadManagement;