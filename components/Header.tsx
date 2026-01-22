
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-700 pb-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">AI Opportunity Analyzer</h1>
        <p className="text-gray-400 mt-1">Business Operational Performance Analysis</p>
      </div>
      <div className="flex items-center space-x-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className="font-semibold text-sm">AOA v1.0</span>
      </div>
    </header>
  );
};

export default Header;
