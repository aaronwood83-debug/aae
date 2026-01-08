
import React from 'react';
import { AnalysisResult } from '../types';
import SignalIndicator from './SignalIndicator';
import MetricCard from './MetricCard';

interface AnalysisDashboardProps {
  result: AnalysisResult;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ result }) => {
  const { 
    signal, 
    suggestedAction, 
    currentVelocity, 
    baselineVelocity, 
    predictedDaysRemaining,
    velocityStatus,
    similarVehiclesFound
  } = result;

  const velocityDiff = baselineVelocity > 0 ? ((currentVelocity - baselineVelocity) / baselineVelocity) * 100 : 0;
  const daysListed = result.vehicleData.Days_Listed;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SignalIndicator signal={signal} />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">Strategic Signal & Recommendation</h3>
          <p className="text-gray-300 mt-1">{suggestedAction}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-6">
        <h3 className="text-xl font-bold text-white mb-4">Algorithmic Scorecard</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard 
            title="Velocity Gauge"
            value={`${currentVelocity.toFixed(1)}`}
            unit="views/day"
            description={`Baseline avg: ${baselineVelocity.toFixed(1)} views/day. This vehicle is performing`}
            descriptionStrong={velocityStatus}
            change={velocityDiff}
          />
          <MetricCard 
            title="Predictive Forecast"
            value={predictedDaysRemaining ? `~${Math.round(predictedDaysRemaining)}` : 'N/A'}
            unit="days to sale"
            description={predictedDaysRemaining ? `Based on ${similarVehiclesFound} similar vehicles sold historically.` : 'Insufficient historical data for a confident forecast.'}
          />
           <MetricCard 
            title="Market Freshness"
            value={daysListed.toString()}
            unit="days on market"
            description={daysListed > 90 ? "Vehicle is considered critically aged." : daysListed > 45 ? "Vehicle is aging and losing freshness." : "Vehicle is still considered fresh."}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
