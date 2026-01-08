
import { CurrentInventoryVehicle, HistoricalVehicle, AnalysisResult, Signal } from '../types';

function parseCsv<T>(csv: string): T[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(',');
    const vehicle: any = {};
    headers.forEach((header, index) => {
      const key = header;
      const value = values[index].trim();
      const numValue = parseFloat(value);
      vehicle[key] = isNaN(numValue) || key === 'Vehicle_ID' ? value : numValue;
    });
    return vehicle as T;
  });
}

export const parseCurrentInventory = (csv: string): CurrentInventoryVehicle[] => parseCsv<CurrentInventoryVehicle>(csv);
export const parseHistoricalSales = (csv: string): HistoricalVehicle[] => parseCsv<HistoricalVehicle>(csv);


export function runAnalysis(
  currentVehicle: CurrentInventoryVehicle,
  historicalVehicles: HistoricalVehicle[]
): AnalysisResult {
  
  // --- Calculate Current & Baseline Velocity ---
  const currentVelocity = currentVehicle.Days_Listed > 0 ? currentVehicle.Total_Views / currentVehicle.Days_Listed : 0;
  
  const historicalMakeModel = historicalVehicles.filter(
    v => v.Make === currentVehicle.Make && v.Model === currentVehicle.Model
  );

  const historicalVelocities = historicalMakeModel
    .map(v => (v.Days_To_Sale > 0 ? v.Total_Views / v.Days_To_Sale : 0))
    .filter(v => v > 0);

  const baselineVelocity = historicalVelocities.length > 0
    ? historicalVelocities.reduce((a, b) => a + b, 0) / historicalVelocities.length
    : 0;

  const velocityDiffPercent = baselineVelocity > 0
    ? ((currentVelocity - baselineVelocity) / baselineVelocity) * 100
    : currentVelocity > 0 ? 100 : 0;
  
  let velocityStatus = "Average";
  if (velocityDiffPercent > 5) velocityStatus = "Above Average";
  if (velocityDiffPercent < -5) velocityStatus = "Below Average";

  // --- Predictive Days-to-Sale (Forecast) ---
  const priceLowerBound = currentVehicle.Current_Price * 0.85;
  const priceUpperBound = currentVehicle.Current_Price * 1.15;
  
  let similarVehicles = historicalVehicles.filter(v => 
    v.Make === currentVehicle.Make &&
    v.Model === currentVehicle.Model &&
    v.Year >= currentVehicle.Year - 2 &&
    v.Year <= currentVehicle.Year + 2 &&
    v.Initial_Price >= priceLowerBound &&
    v.Initial_Price <= priceUpperBound
  );
  
  const top5Similar = similarVehicles.slice(0, 5);
  let predictedDaysRemaining: number | null = null;
  
  if (top5Similar.length > 0) {
    const avgDaysToSale = top5Similar.reduce((sum, v) => sum + v.Days_To_Sale, 0) / top5Similar.length;
    
    if (currentVelocity > baselineVelocity) {
      predictedDaysRemaining = avgDaysToSale * 0.8;
    } else if (baselineVelocity > 0) {
       predictedDaysRemaining = avgDaysToSale * (1 + (Math.abs(velocityDiffPercent)/100));
    } else {
      predictedDaysRemaining = avgDaysToSale * 1.2;
    }
  }

  // --- Signal Generation ---
  let signal: Signal;
  let suggestedAction: string;

  if (velocityDiffPercent < -20 || currentVehicle.Days_Listed > 90) {
    signal = Signal.RED;
    suggestedAction = "Aggressive price cut (7%+) or liquidation. Vehicle is aging and underperforming significantly.";
  } else if ((velocityDiffPercent <= -10 && velocityDiffPercent > -20) || (currentVehicle.Days_Listed > 45 && currentVehicle.Days_Listed <= 90)) {
    signal = Signal.YELLOW;
    suggestedAction = "Suggest a price cut of 3-5% to boost velocity and reduce time on market.";
  } else {
    signal = Signal.GREEN;
    suggestedAction = "No action needed. Market velocity is strong and the vehicle is performing as expected.";
  }

  return {
    vehicleId: currentVehicle.Vehicle_ID,
    vehicleData: currentVehicle,
    currentVelocity,
    baselineVelocity,
    predictedDaysRemaining,
    signal,
    suggestedAction,
    velocityStatus,
    similarVehiclesFound: top5Similar.length,
  };
}
