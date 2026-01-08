
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  description: string;
  descriptionStrong?: string;
  change?: number;
}

const ArrowUpIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

const ArrowDownIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, description, descriptionStrong, change }) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-gray-700/50 p-4 rounded-lg flex flex-col justify-between h-full min-h-[160px]">
      <div>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <div className="flex items-baseline space-x-2 mt-2">
          <p className="text-3xl font-bold text-white">{value}</p>
          {unit && <p className="text-gray-400">{unit}</p>}
        </div>
         {change !== undefined && (
          <div className={`flex items-center text-sm font-semibold mt-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
             {isPositive ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
            <span>{Math.abs(change).toFixed(1)}% vs. historical</span>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        {description} {descriptionStrong && <strong className="text-gray-400">{descriptionStrong}</strong>}.
      </p>
    </div>
  );
};

export default MetricCard;
