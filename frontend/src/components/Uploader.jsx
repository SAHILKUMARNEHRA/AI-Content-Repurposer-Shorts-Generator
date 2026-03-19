import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, Loader } from 'lucide-react';

const Uploader = ({ setDocuments, setSelectedDoc }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const newDoc = {
        id: response.data.document_id,
        filename: file.name
      };

      setDocuments(prev => [...prev, newDoc]);
      setSelectedDoc(newDoc);
    } catch (err) {
      console.error(err);
      setError('Failed to upload and process document.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 transition-colors bg-white dark:bg-gray-800 cursor-pointer relative overflow-hidden group">
      <input 
        type="file" 
        accept=".pdf" 
        onChange={handleFileUpload} 
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
        disabled={isUploading}
      />
      {isUploading ? (
        <Loader className="animate-spin text-blue-500 mb-2" size={32} />
      ) : (
        <UploadCloud className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" size={32} />
      )}
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {isUploading ? 'Processing PDF...' : 'Upload PDF'}
      </p>
      {error && <p className="text-xs text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
};

export default Uploader;