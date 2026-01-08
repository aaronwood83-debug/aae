
import React from 'react';
import { CurrentInventoryVehicle } from '../types';

interface VehicleInputCardProps {
  vehicle: CurrentInventoryVehicle;
}

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
    <span className="text-sm text-gray-400">{label}</span>
    <span className="text-md font-semibold text-gray-200">{value}</span>
  </div>
);

const VehicleInputCard: React.FC<VehicleInputCardProps> = ({ vehicle }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-xl font-bold text-white mb-1">Vehicle Details</h2>
      <p className="text-accent-blue font-mono text-sm mb-4">{vehicle.Vehicle_ID}</p>
      <div className="space-y-2">
        <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-lg font-bold">{`${vehicle.Year} ${vehicle.Make} ${vehicle.Model}`}</p>
        </div>
        <DetailItem label="Price" value={`$${vehicle.Current_Price.toLocaleString()}`} />
        <DetailItem label="Mileage" value={vehicle.Mileage.toLocaleString()} />
        <DetailItem label="Days Listed" value={vehicle.Days_Listed} />
        <DetailItem label="Total Views" value={vehicle.Total_Views} />
        <DetailItem label="Total Leads" value={vehicle.Total_Leads} />
        <DetailItem label="Total Saves" value={vehicle.Total_Saves} />
      </div>
    </div>
  );
};

export default VehicleInputCard;
