import React, { useCallback, useState } from 'react';
import Icon from 'components/AppIcon';

function UploadZone({ onFilesUpload, isUploading }) {
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
      onFilesUpload(validFiles);
    }
  }, [onFilesUpload]);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFilesUpload(files);
    }
  }, [onFilesUpload]);

  const supportedFormats = [
    { type: 'Images', formats: 'JPG, PNG, GIF, WebP', icon: 'Image' },
    { type: 'Videos', formats: 'MP4, MOV, AVI, WebM', icon: 'Video' },
    { type: 'Audio', formats: 'MP3, WAV, AAC', icon: 'Music' },
    { type: 'Text', formats: 'TXT, PDF, DOC', icon: 'FileText' }
  ];

  return (
    <div className="space-y-4">
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
              <h3 className="text-lg font-semibold text-text-primary">Uploading...</h3>
              <p className="text-text-secondary">Please wait while we process your files</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Upload" size={32} className="text-primary" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Drag & drop your content here
                </h3>
                <p className="text-text-secondary mb-4">
                  or <span className="text-primary font-medium">browse files</span> from your device
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {supportedFormats.map((format) => (
                  <div key={format.type} className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name={format.icon} size={16} className="text-primary" />
                    <div>
                      <div className="font-medium">{format.type}</div>
                      <div className="text-xs">{format.formats}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Automatic watermarking enabled</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} className="text-accent" />
          <span>Max file size: 500MB</span>
        </div>
      </div>
    </div>
  );
}

export default UploadZone;