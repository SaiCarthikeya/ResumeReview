import React, { useState } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import AnalysisDisplay from './AnalysisDisplay';
import { ArrowUpTrayIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';


const API_URL = 'http://localhost:5001';

const UploadTab = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnalysis(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysis(response.data);
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Start Your Analysis</h2>
        <p className="text-gray-500 mt-1">Upload your resume in PDF format to begin.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-indigo-500 transition-colors">
        <label htmlFor="file-upload" className="cursor-pointer">
          <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PDF up to 10MB</p>
        </label>
        <input 
          id="file-upload"
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange}
          className="sr-only"
        />
        {file && (
          <div className="mt-4 text-sm text-gray-700 flex items-center justify-center">
            <DocumentDuplicateIcon className="h-5 w-5 mr-2 text-gray-500"/>
            <span>{file.name}</span>
          </div>
        )}
        <button 
          type="submit" 
          disabled={loading || !file}
          className="mt-6 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>
      
      {error && <p className="text-red-500 text-center animate-pulse">{error}</p>}
      
      {loading && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <HashLoader />
          <p className="text-gray-600">AI is working its magic... this can take a minute.</p>
        </div>
      )}
      
      {analysis && <AnalysisDisplay data={analysis} />}
    </div>
  );
};

export default UploadTab;