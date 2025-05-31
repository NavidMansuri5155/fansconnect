import React, { useState, useCallback } from 'react';
import Icon from 'components/AppIcon';

function BulkUploadManager({ onFilesUpload, isUploading }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [bulkSettings, setBulkSettings] = useState({
    contentType: 'free',
    pricing: 0,
    tags: [],
    caption: '',
    scheduleInterval: 0 // hours between posts
  });
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const validTypes = ['image/', 'video/', 'audio/', 'text/'];
      return validTypes.some(type => file.type.startsWith(type));
    });

    if (validFiles.length > 0) {
      const fileObjects = validFiles.map((file, index) => ({
        id: Date.now() + index,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: URL.createObjectURL(file),
        status: 'pending'
      }));
      setSelectedFiles(fileObjects);
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const fileObjects = files.map((file, index) => ({
        id: Date.now() + index,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: URL.createObjectURL(file),
        status: 'pending'
      }));
      setSelectedFiles(fileObjects);
    }
  }, []);

  const handleRemoveFile = (fileId) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleBulkUpload = () => {
    if (selectedFiles.length === 0) return;
    
    onFilesUpload(selectedFiles.map(f => f.file));
    setSelectedFiles([]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'Image';
    if (type.startsWith('video/')) return 'Video';
    if (type.startsWith('audio/')) return 'Music';
    return 'FileText';
  };

  const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="space-y-6">
      {/* Bulk Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input
          type="file"
          multiple
          accept="image/*,video/*,audio/*,.txt,.pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />

        <div className="space-y-4">
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg font-semibold text-text-primary">Processing Bulk Upload...</h3>
              <p className="text-text-secondary">Uploading {selectedFiles.length} files</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Layers" size={32} className="text-primary" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Bulk Upload Multiple Files
                </h3>
                <p className="text-text-secondary mb-4">
                  Select multiple files to upload and configure them all at once
                </p>
              </div>

              <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Upload" size={16} className="text-primary" />
                  <span>Drag & Drop</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MousePointer" size={16} className="text-secondary" />
                  <span>Click to Browse</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} className="text-accent" />
                  <span>Batch Process</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-text-primary">
              Selected Files ({selectedFiles.length})
            </h4>
            <div className="text-sm text-text-secondary">
              Total size: {formatFileSize(totalSize)}
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2">
            {selectedFiles.map((file) => (
              <div key={file.id} className="flex items-center space-x-3 p-3 bg-surface-700/30 rounded-lg">
                <Icon name={getFileIcon(file.type)} size={20} className="text-primary" />
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-text-primary truncate">{file.name}</div>
                  <div className="text-sm text-text-secondary">
                    {file.type.split('/')[1].toUpperCase()} • {formatFileSize(file.size)}
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveFile(file.id)}
                  className="p-1 text-text-secondary hover:text-error hover:bg-error/10 rounded transition-all duration-200"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bulk Settings */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-text-primary">Bulk Settings</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Content Type
              </label>
              <select
                value={bulkSettings.contentType}
                onChange={(e) => setBulkSettings(prev => ({ ...prev, contentType: e.target.value }))}
                className="w-full input-field"
              >
                <option value="free">Free Post</option>
                <option value="ppv">Pay-Per-View</option>
                <option value="subscription">Subscription Only</option>
                <option value="story">24h Story</option>
              </select>
            </div>

            {bulkSettings.contentType === 'ppv' && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Price per Item ($)
                </label>
                <input
                  type="number"
                  value={bulkSettings.pricing}
                  onChange={(e) => setBulkSettings(prev => ({ ...prev, pricing: parseFloat(e.target.value) || 0 }))}
                  min="0"
                  step="0.01"
                  className="w-full input-field"
                  placeholder="0.00"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Schedule Interval (hours)
              </label>
              <input
                type="number"
                value={bulkSettings.scheduleInterval}
                onChange={(e) => setBulkSettings(prev => ({ ...prev, scheduleInterval: parseInt(e.target.value) || 0 }))}
                min="0"
                max="168"
                className="w-full input-field"
                placeholder="0 = Upload all now"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Common Tags
              </label>
              <input
                type="text"
                value={bulkSettings.tags.join(', ')}
                onChange={(e) => setBulkSettings(prev => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                }))}
                className="w-full input-field"
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Common Caption Template
            </label>
            <textarea
              value={bulkSettings.caption}
              onChange={(e) => setBulkSettings(prev => ({ ...prev, caption: e.target.value }))}
              className="w-full h-20 input-field resize-none"
              placeholder="Enter a caption template that will be applied to all uploads..."
            />
          </div>

          <button
            onClick={handleBulkUpload}
            disabled={selectedFiles.length === 0}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Icon name="Upload" size={18} className="mr-2" />
            Upload {selectedFiles.length} Files
            {bulkSettings.scheduleInterval > 0 && ` (${bulkSettings.scheduleInterval}h intervals)`}
          </button>
        </div>
      )}

      {/* Bulk Upload Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Lightbulb" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Bulk Upload Tips</span>
        </div>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Use consistent naming for better organization</li>
          <li>• Set scheduling intervals to maintain regular posting</li>
          <li>• Apply common tags and captions to save time</li>
          <li>• Review individual files before final upload</li>
        </ul>
      </div>
    </div>
  );
}

export default BulkUploadManager;