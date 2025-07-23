import React, { useState } from 'react';
import UploadTab from './components/UploadTab';
import HistoryTab from './components/HistoryTab';
import { DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';


function App() {
  const [activeTab, setActiveTab] = useState('upload');

  const commonTabStyles = 'flex items-center justify-center px-4 sm:px-6 py-3 font-medium text-sm rounded-md transition-all duration-300';
  const activeTabStyles = 'bg-white text-indigo-600 shadow-sm';
  const inactiveTabStyles = 'text-gray-500 hover:text-indigo-600';

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <div className="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Resume Analyzer AI
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Get instant, AI-powered feedback to elevate your resume.
          </p>
        </header>
        
        <div className="flex justify-center mb-6">
          <div className="bg-gray-200 p-1.5 rounded-lg flex space-x-2">
            <button 
              onClick={() => setActiveTab('upload')} 
              className={`${commonTabStyles} ${activeTab === 'upload' ? activeTabStyles : inactiveTabStyles}`}
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Live Analysis
            </button>
            <button 
              onClick={() => setActiveTab('history')} 
              className={`${commonTabStyles} ${activeTab === 'history' ? activeTabStyles : inactiveTabStyles}`}
            >
               <ClockIcon className="h-5 w-5 mr-2" />
              History
            </button>
          </div>
        </div>

        <main className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
          {activeTab === 'upload' && <UploadTab />}
          {activeTab === 'history' && <HistoryTab />}
        </main>
        <footer className="text-center mt-8 text-sm text-gray-400">
            Powered by Gemini AI at {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

export default App;