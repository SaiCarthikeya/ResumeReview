import React, { useState, useEffect } from 'react';
import {HashLoader} from 'react-spinners'
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
    <div className="flex text-center justify-center">
      <HashLoader />
    </div>

  );
  if (error) return <p className="text-red-500 font-bold text-center">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Analysis History</h2>

      {/* --- Desktop Table View --- */}
      <div className="hidden md:block shadow-md rounded-lg overflow-hidden border border-gray-200">
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

      {/* --- Mobile Card View --- */}
      <div className="block md:hidden space-y-4">
        {history.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start">
                <div className="flex-grow min-w-0">
                    <p className="font-bold text-lg text-gray-800 break-words">{item.name || 'N/A'}</p>
                    <p className="font-mono text-xs text-gray-500 break-all">{item.filename}</p>
                </div>
                <button onClick={() => setSelectedResumeId(item.id)} className="ml-4 flex-shrink-0 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center">
                    <EyeIcon className="h-4 w-4 mr-1"/>
                    Details
                </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">Analyzed on:</span> {new Date(item.created_at).toLocaleDateString()}
                </p>
            </div>
          </div>
        ))}
      </div>

      {selectedResumeId && (
        <DetailsModal resumeId={selectedResumeId} onClose={() => setSelectedResumeId(null)} />
      )}
    </div>
  );
};

export default HistoryTab;