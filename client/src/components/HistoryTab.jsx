import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetailsModal from './DetailsModal';
import { EyeIcon } from '@heroicons/react/24/solid';

const API_URL = 'http://localhost:5001';

const HistoryTab = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedResumeId, setSelectedResumeId] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/resumes`);
        setHistory(response.data);
      } catch (err) {
        setError('Failed to fetch history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Analysis History</h2>
      <div className="shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">File Name</th>
              <th className="py-3 px-6 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">Date</th>
              <th className="py-3 px-6 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium">{item.name || 'N/A'}</td>
                <td className="py-4 px-6 font-mono text-sm text-gray-600">{item.filename}</td>
                <td className="py-4 px-6 text-sm">{new Date(item.created_at).toLocaleDateString()}</td>
                <td className="py-4 px-6 text-center">
                  <button onClick={() => setSelectedResumeId(item.id)} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 text-sm font-semibold inline-flex items-center transition-all duration-300 transform hover:scale-110">
                    <EyeIcon className="h-4 w-4 mr-1"/>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedResumeId && (
        <DetailsModal resumeId={selectedResumeId} onClose={() => setSelectedResumeId(null)} />
      )}
    </div>
  );
};

export default HistoryTab;