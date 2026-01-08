
export interface HistoricalVehicle {
  Vehicle_ID: string;
  Year: number;
  Make: string;
  Model: string;
  Mileage: number;
  Initial_Price: number;
  Final_Price: number;
  Days_To_Sale: number;
  Total_Views: number;
  Total_Leads: number;
  Gross_Profit_Dollar: number;
}

export interface CurrentInventoryVehicle {
  Vehicle_ID: string;
  Year: number;
  Make: string;
  Model: string;
  Current_Price: number;
  Mileage: number;
  Days_Listed: number;
  Total_Views: number;
  Total_Saves: number;
  Total_Leads: number;
}

export enum Signal {
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  RED = 'RED',
}

export interface AnalysisResult {
  vehicleId: string;
  vehicleData: CurrentInventoryVehicle;
  currentVelocity: number;
  baselineVelocity: number;
  predictedDaysRemaining: number | null;
  signal: Signal;
  suggestedAction: string;
  velocityStatus: string;
  similarVehiclesFound: number;
}
