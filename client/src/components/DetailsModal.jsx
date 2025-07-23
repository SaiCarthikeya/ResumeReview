import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnalysisDisplay from './AnalysisDisplay';
import { XMarkIcon } from '@heroicons/react/24/solid';

const API_URL = 'http://localhost:5001';

const DetailsModal = ({ resumeId, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/resumes/${resumeId}`);
        setDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch details", error);
      } finally {
        setLoading(false);
      }
    };
    if (resumeId) {
      fetchDetails();
    }
  }, [resumeId]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sticky top-0 bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center rounded-t-2xl">
            <h2 className="text-xl font-bold text-gray-800">Resume Analysis Details</h2>
            <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-300 hover:text-gray-800 transition-colors">
                <XMarkIcon className="h-6 w-6"/>
            </button>
        </header>
        <div className="p-6 overflow-y-auto">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : (
                <AnalysisDisplay data={details} />
            )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;