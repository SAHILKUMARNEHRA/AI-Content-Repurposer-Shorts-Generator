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

