import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, Loader } from 'lucide-react';

const Uploader = ({ setDocuments, setSelectedDoc }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
