import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function MediaPreview({ files, onRemoveFile }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editMode, setEditMode] = useState(null);

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

  const handleEditFile = (fileId) => {
    setEditMode(fileId);
  };

  const renderFilePreview = (file) => {
    if (file.type.startsWith('image/')) {
      return (
        <Image
          src={file.preview}
          alt={file.name}
          className="w-full h-32 object-cover rounded-lg"
        />
      );
    }

    if (file.type.startsWith('video/')) {
      return (
        <div className="relative w-full h-32 bg-surface-700 rounded-lg flex items-center justify-center">
          <video
            src={file.preview}
            className="w-full h-full object-cover rounded-lg"
            muted
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
            <Icon name="Play" size={24} className="text-white" />
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-32 bg-surface-700 rounded-lg flex items-center justify-center">
        <Icon name={getFileIcon(file.type)} size={32} className="text-text-secondary" />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Eye" size={20} className="mr-2 text-primary" />
          Media Preview ({files.length})
        </h3>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200">
            <Icon name="Grid" size={16} />
          </button>
          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-all duration-200">
            <Icon name="List" size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {files.map((file) => (
          <div key={file.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 flex-shrink-0">
                {renderFilePreview(file)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-text-primary truncate">{file.name}</h4>
                  <button
                    onClick={() => onRemoveFile(file.id)}
                    className="p-1 text-text-secondary hover:text-error hover:bg-error/10 rounded transition-all duration-200"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                  <span className="flex items-center">
                    <Icon name={getFileIcon(file.type)} size={14} className="mr-1" />
                    {file.type.split('/')[1].toUpperCase()}
                  </span>
                  <span>{formatFileSize(file.size)}</span>
                  <span className="flex items-center text-success">
                    <Icon name="Check" size={14} className="mr-1" />
                    Uploaded
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditFile(file.id)}
                    className="px-3 py-1 text-xs bg-primary/10 text-primary hover:bg-primary/20 rounded-md transition-all duration-200"
                  >
                    <Icon name="Edit" size={12} className="mr-1" />
                    Edit
                  </button>
                  
                  <button className="px-3 py-1 text-xs bg-surface-700 text-text-secondary hover:text-text-primary hover:bg-surface-600 rounded-md transition-all duration-200">
                    <Icon name="Crop" size={12} className="mr-1" />
                    Crop
                  </button>
                  
                  <button className="px-3 py-1 text-xs bg-surface-700 text-text-secondary hover:text-text-primary hover:bg-surface-600 rounded-md transition-all duration-200">
                    <Icon name="Blur" size={12} className="mr-1" />
                    Blur
                  </button>
                  
                  <button className="px-3 py-1 text-xs bg-surface-700 text-text-secondary hover:text-text-primary hover:bg-surface-600 rounded-md transition-all duration-200">
                    <Icon name="Shield" size={12} className="mr-1" />
                    Watermark
                  </button>
                </div>
              </div>
            </div>

            {editMode === file.id && (
              <div className="border-t border-border pt-3 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 p-3 border border-border rounded-lg hover:bg-surface-700/50 transition-all duration-200">
                    <Icon name="RotateCw" size={16} className="text-primary" />
                    <span className="text-sm">Rotate</span>
                  </button>
                  
                  <button className="flex items-center justify-center space-x-2 p-3 border border-border rounded-lg hover:bg-surface-700/50 transition-all duration-200">
                    <Icon name="Palette" size={16} className="text-secondary" />
                    <span className="text-sm">Filter</span>
                  </button>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditMode(null)}
                    className="px-4 py-2 text-sm border border-border text-text-secondary hover:text-text-primary rounded-lg transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-600 transition-all duration-200">
                    Apply Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Shield" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Content Protection</span>
          </div>
          <p className="text-sm text-text-secondary">
            All uploaded content will be automatically watermarked and protected against unauthorized downloads. 
            You can customize watermark settings in the advanced options.
          </p>
        </div>
      )}
    </div>
  );
}

export default MediaPreview;