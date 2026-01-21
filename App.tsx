
import React, { useState, useEffect, useMemo } from 'react';
import { runAnalysis, parseCurrentInventory, parseHistoricalSales } from './services/analysisService';
import { historicalData } from './data/historicalData';
import { currentInventoryData } from './data/currentInventoryData';
import { AnalysisResult } from './types';
import Header from './components/Header';
import VehicleInputCard from './components/VehicleInputCard';
import AnalysisDashboard from './components/AnalysisDashboard';
import DashboardView from './components/DashboardView';
import AIOpportunityAnalyzer from './components/AIOpportunityAnalyzer';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'scorecard' | 'ai-analyzer'>('dashboard');
  const [allAnalyses, setAllAnalyses] = useState<AnalysisResult[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const performAnalysis = () => {
      try {
        const historicalVehicles = parseHistoricalSales(historicalData);
        const currentInventory = parseCurrentInventory(currentInventoryData);
        
        const analyses = currentInventory.map(vehicle => 
          runAnalysis(vehicle, historicalVehicles)
        );
        setAllAnalyses(analyses);
      } catch (error) {
        console.error("Error running analysis:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Simulate a short loading time for better UX
    setTimeout(performAnalysis, 1000);
  }, []);

  const handleSelectVehicle = (vehicleId: string) => {
    const analysis = allAnalyses.find(a => a.vehicleId === vehicleId);
    if (analysis) {
      setSelectedAnalysis(analysis);
      setView('scorecard');
    }
  };

  const handleBackToDashboard = () => {
    setSelectedAnalysis(null);
    setView('dashboard');
  };

  const renderContent = () => {
    if (view === 'ai-analyzer') {
        return (
            <div className="mt-8">
                <button onClick={() => setView('dashboard')} className="mb-6 bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Dashboard
                </button>
                <AIOpportunityAnalyzer />
            </div>
        );
    }

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full bg-gray-800 rounded-lg p-8 mt-8">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-accent-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg text-gray-400">Initializing Algorithmic Engine...</p>
          </div>
        </div>
      );
    }

    if (view === 'scorecard' && selectedAnalysis) {
      return (
        <div className="mt-8">
           <button onClick={handleBackToDashboard} className="mb-6 bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <VehicleInputCard vehicle={selectedAnalysis.vehicleData} />
            </div>
            <div className="lg:col-span-2">
              <AnalysisDashboard result={selectedAnalysis} />
            </div>
          </div>
        </div>
      );
    }

    return <DashboardView analyses={allAnalyses} onSelectVehicle={handleSelectVehicle} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        <div className="flex justify-end mb-4">
            <button
                onClick={() => setView('ai-analyzer')}
                className={`bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors ${view === 'ai-analyzer' ? 'hidden' : ''}`}
            >
                AI Opportunity Analyzer
            </button>
        </div>
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
