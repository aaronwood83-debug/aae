
import React from 'react';
import { AnalysisResult, Signal } from '../types';

interface DashboardViewProps {
  analyses: AnalysisResult[];
  onSelectVehicle: (vehicleId: string) => void;
}

const signalEmojiMap: Record<Signal, string> = {
  [Signal.GREEN]: '🟢',
  [Signal.YELLOW]: '🟡',
  [Signal.RED]: '🔴',
};

const DashboardView: React.FC<DashboardViewProps> = ({ analyses, onSelectVehicle }) => {
  return (
    <div className="mt-8 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Live Inventory Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="border-b border-gray-600 text-sm text-gray-400">
            <tr>
              <th className="p-3">Signal</th>
              <th className="p-3">ID</th>
              <th className="p-3">Vehicle</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">Days</th>
              <th className="p-3 text-right">Velocity</th>
            </tr>
          </thead>
          <tbody>
            {analyses.map((result) => (
              <tr 
                key={result.vehicleId} 
                className="border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors"
                onClick={() => onSelectVehicle(result.vehicleId)}
                aria-label={`Select vehicle ${result.vehicleData.Vehicle_ID} for details`}
              >
                <td className="p-3 text-center text-xl" title={result.signal}>{signalEmojiMap[result.signal]}</td>
                <td className="p-3 font-mono text-sm text-gray-400">{result.vehicleData.Vehicle_ID}</td>
                <td className="p-3">
                  <div className="font-semibold">{`${result.vehicleData.Year} ${result.vehicleData.Make} ${result.vehicleData.Model}`}</div>
                </td>
                <td className="p-3 text-right font-semibold">${result.vehicleData.Current_Price.toLocaleString()}</td>
                <td className="p-3 text-right">{result.vehicleData.Days_Listed}</td>
                <td className="p-3 text-right">{result.currentVelocity.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-6 text-gray-500">
        <p>Enter a Vehicle ID or click a row to generate the full Algorithmic Scorecard.</p>
      </div>
    </div>
  );
};

export default DashboardView;
