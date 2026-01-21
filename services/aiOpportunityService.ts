
import {
  ProcessInput,
  OpportunityScore,
  ReadinessScore,
  ROIAnalysis,
  OpportunityRecommendation,
} from "../aiTypes";

export const calculateVolumeScore = (annualVolume: number): number => {
  if (annualVolume < 50) return 1 + annualVolume / 50;
  if (annualVolume < 100) return 3 + (annualVolume - 50) / 50;
  if (annualVolume < 500) return 5 + (annualVolume - 100) / 400;
  if (annualVolume < 1000) return 7 + (annualVolume - 500) / 500;
  return Math.min(10, 9 + (annualVolume - 1000) / 1000);
};

export const calculateTimeScore = (hours: number): number => {
  if (hours < 0.5) return 2 + hours / 0.5;
  if (hours < 1) return 3 + (hours - 0.5) / 0.5;
  if (hours < 2) return 5 + (hours - 1) / 1;
  if (hours < 4) return 7 + (hours - 2) / 2;
  return Math.min(10, 9 + (hours - 4) / 4);
};

export const calculateErrorScore = (errorRate: number): number => {
  if (errorRate < 0.02) return 1 + errorRate / 0.02;
  if (errorRate < 0.05) return 3 + (errorRate - 0.02) / 0.03;
  if (errorRate < 0.10) return 5 + (errorRate - 0.05) / 0.05;
  if (errorRate < 0.20) return 7 + (errorRate - 0.10) / 0.10;
  return Math.min(10, 9 + (errorRate - 0.20) / 0.20);
};

export const calculateConsistencyScore = (consistency: string): number => {
  const mapping: { [key: string]: number } = {
    high: 2,
    medium: 6,
    low: 9,
  };
  return mapping[consistency.toLowerCase()] || 6;
};

export const calculateDataScore = (
  dataFormat: string,
  dataLocation: string,
  dataQuality: string,
  dataAccess: string
): number => {
  let score = 0;

  // Format
  const formatMap: { [key: string]: number } = {
    structured: 3,
    "semi-structured": 2,
    unstructured: 1,
  };
  score += formatMap[dataFormat.toLowerCase()] || 1;

  // Location
  const locationMap: { [key: string]: number } = {
    single: 3,
    multiple: 2,
    scattered: 1,
  };
  score += locationMap[dataLocation.toLowerCase()] || 1;

  // Quality
  const qualityMap: { [key: string]: number } = {
    clean: 3,
    moderate: 2,
    poor: 1,
  };
  score += qualityMap[dataQuality.toLowerCase()] || 1;

  // Access
  const accessMap: { [key: string]: number } = {
    easy: 1,
    moderate: 0.5,
    difficult: 0,
  };
  score += accessMap[dataAccess.toLowerCase()] || 0.5;

  return Math.min(10, score);
};

export const calculateComplexityScore = (process: ProcessInput): number => {
  const baseMap: { [key: string]: number } = {
    rules: 2,
    patterns: 6,
    judgment: 8,
  };
  let score = baseMap[process.decision_type.toLowerCase()] || 5;

  if (process.requires_expertise) score += 1;
  if (process.multiple_factors) score += 0.5;
  if (process.unclear_criteria) score += 0.5;
  if (process.compliance_considerations) score += 0.5;
  if (process.subjective_judgment) score += 0.5;

  return Math.min(10, score);
};

export const calculateImpactScore = (
  totalCost: number,
  process: ProcessInput
): number => {
  let score = 0;
  if (totalCost < 25000) score = 1 + totalCost / 25000;
  else if (totalCost < 50000) score = 3 + (totalCost - 25000) / 25000;
  else if (totalCost < 100000) score = 5 + (totalCost - 50000) / 50000;
  else if (totalCost < 250000) score = 7 + (totalCost - 100000) / 150000;
  else score = Math.min(10, 9 + (totalCost - 250000) / 250000);

  if (process.customer_impact) score += 0.5;
  if (process.competitive_advantage) score += 0.5;
  if (process.executive_visibility) score += 0.3;

  return Math.min(10, score);
};

export const calculateOpportunityScore = (
  process: ProcessInput
): OpportunityScore => {
  const totalCost =
    process.annual_labor_cost +
    process.annual_tool_cost +
    process.annual_error_cost +
    process.annual_delay_cost +
    process.annual_opportunity_cost +
    process.annual_hidden_cost;

  const volume = calculateVolumeScore(process.annual_volume);
  const time = calculateTimeScore(process.avg_time_per_instance);
  const error = calculateErrorScore(process.error_rate);
  const consistency = calculateConsistencyScore(process.consistency_level);
  const data = calculateDataScore(
    process.data_format,
    process.data_location,
    process.data_quality,
    process.data_access
  );
  const complexity = calculateComplexityScore(process);
  const impact = calculateImpactScore(totalCost, process);

  const total =
    volume + time + error + consistency + data + complexity + impact;

  let band = "Defer";
  if (total >= 50) band = "Critical";
  else if (total >= 40) band = "High";
  else if (total >= 30) band = "Medium";
  else if (total >= 20) band = "Low";

  return {
    volume_score: Number(volume.toFixed(1)),
    time_score: Number(time.toFixed(1)),
    error_score: Number(error.toFixed(1)),
    consistency_score: Number(consistency.toFixed(1)),
    data_score: Number(data.toFixed(1)),
    complexity_score: Number(complexity.toFixed(1)),
    impact_score: Number(impact.toFixed(1)),
    total_score: Number(total.toFixed(1)),
    priority_band: band,
  };
};

export const calculateReadiness = (process: ProcessInput): ReadinessScore => {
  const technical =
    (process.data_digital ? 2 : 0) +
    (process.process_ownership_clear ? 2 : 0) +
    (process.systems_have_apis ? 2 : 0) +
    (process.sample_data_available ? 2 : 0) +
    (process.success_metrics_defined ? 2 : 0);

  const organizational =
    (process.executive_sponsor ? 2 : 0) +
    (process.stakeholder_openness ? 2 : 0) +
    (process.change_capacity ? 2 : 0) +
    (process.experimentation_culture ? 2 : 0) +
    (process.resources_available ? 2 : 0);

  const aiMaturity = 7.0;

  const combined = (technical + organizational + aiMaturity) / 3;

  let status: "green" | "yellow" | "red" = "red";
  if (combined >= 8) status = "green";
  else if (combined >= 5) status = "yellow";

  return {
    technical_score: Number(technical.toFixed(1)),
    organizational_score: Number(organizational.toFixed(1)),
    ai_maturity_score: Number(aiMaturity.toFixed(1)),
    combined_score: Number(combined.toFixed(1)),
    status: status,
  };
};

export const calculateROI = (
  process: ProcessInput,
  readiness: ReadinessScore
): ROIAnalysis => {
  const totalCurrent =
    process.annual_labor_cost +
    process.annual_tool_cost +
    process.annual_error_cost +
    process.annual_delay_cost +
    process.annual_opportunity_cost +
    process.annual_hidden_cost;

  const timeSavings = 0.6;
  const errorReduction = 0.5;
  const throughputImprovement = 0.5;

  let benefit =
    process.annual_labor_cost * timeSavings +
    process.annual_error_cost * errorReduction +
    process.annual_delay_cost * throughputImprovement +
    process.annual_opportunity_cost * 0.5;

  const riskMultiplier: { [key: string]: number } = {
    green: 1.0,
    yellow: 0.8,
    red: 0.6,
  };
  benefit *= riskMultiplier[readiness.status] || 0.8;

  let implCost = 0;
  let ongoing = 0;

  if (totalCurrent < 50000) {
    implCost = 30000;
    ongoing = 8000;
  } else if (totalCurrent < 150000) {
    implCost = 60000;
    ongoing = 15000;
  } else {
    implCost = 100000;
    ongoing = 25000;
  }

  const netBenefit = benefit - ongoing;
  const roi = implCost > 0 ? (netBenefit / implCost) * 100 : 0;
  const payback = netBenefit > 0 ? (implCost / netBenefit) * 12 : Infinity;
  const npv3yr = netBenefit * 2.5 - implCost;

  return {
    total_current_cost: Number(totalCurrent.toFixed(2)),
    expected_annual_benefit: Number(benefit.toFixed(2)),
    implementation_cost: Number(implCost.toFixed(2)),
    annual_ongoing_cost: Number(ongoing.toFixed(2)),
    net_annual_benefit: Number(netBenefit.toFixed(2)),
    roi_percentage: Number(roi.toFixed(1)),
    payback_months: payback === Infinity ? null : Number(payback.toFixed(1)),
    three_year_npv: Number(npv3yr.toFixed(2)),
  };
};

export const recommendAICapability = (process: ProcessInput): string => {
  const name = process.process_name.toLowerCase();
  if (name.includes("document") || name.includes("contract"))
    return "Document Analysis";
  if (name.includes("extract") || name.includes("data entry"))
    return "Data Extraction";
  if (name.includes("classify") || name.includes("categorize"))
    return "Classification";
  if (name.includes("support") || name.includes("inquiry"))
    return "Conversational AI";
  if (process.decision_type === "patterns") return "Pattern Recognition";
  return "Workflow Automation";
};

export const calculatePriorityScore = (
  oppScore: OpportunityScore,
  readiness: ReadinessScore,
  roi: ROIAnalysis,
  process: ProcessInput
): number => {
  const strategic =
    (process.aligns_with_priorities ? 3 : 0) +
    (process.executive_visibility ? 2 : 0) +
    (process.customer_impact ? 2 : 0) +
    (process.competitive_advantage ? 2 : 0) +
    (process.innovation_showcase ? 1 : 0);

  const priority =
    oppScore.total_score * 0.4 +
    readiness.combined_score * 0.3 +
    (Math.min(roi.roi_percentage, 500) / 500) * 10 * 0.2 +
    strategic * 0.1;

  return Number(priority.toFixed(1));
};

export const determineRecommendation = (
  priorityScore: number,
  oppScore: OpportunityScore,
  readiness: ReadinessScore
): { tier: string; action: string; timeline: string } => {
  let tier = "Future - Defer";
  if (priorityScore >= 8) tier = "Q1 - Quick Win";
  else if (priorityScore >= 6.5) tier = "Q1 - Strategic Project";
  else if (priorityScore >= 5) tier = "Q2-Q3 - Fill-in";

  let action = "Monitor and revisit in 6-12 months";
  let timeline = "Reassess in H2";

  if (oppScore.total_score >= 40 && readiness.status === "green") {
    action = "Immediate implementation recommended";
    timeline = "Start within 30 days, complete in 8-12 weeks";
  } else if (oppScore.total_score >= 40 && readiness.status === "yellow") {
    action = "Address readiness gaps, then implement";
    timeline = "2-4 months prep, then 8-12 weeks implementation";
  } else if (oppScore.total_score >= 30 && readiness.status === "green") {
    action = "Schedule for Q2 implementation";
    timeline = "Start in 3-4 months, complete in 8-10 weeks";
  } else if (readiness.status === "red") {
    action = "Improve readiness before proceeding";
    timeline = "4-6 months readiness building, then reassess";
  }

  return { tier, action, timeline };
};

export const identifyRisks = (
  process: ProcessInput,
  readiness: ReadinessScore
): string[] => {
  const risks: string[] = [];

  if (!process.data_digital)
    risks.push("Data not fully digitized - requires data migration");
  if (!process.systems_have_apis)
    risks.push("Limited system integration capabilities");
  if (!process.executive_sponsor)
    risks.push("No executive sponsor - may face adoption challenges");
  if (process.error_rate > 0.15)
    risks.push("High current error rate - may indicate process complexity");
  if (!process.change_capacity) risks.push("Limited change management capacity");
  if (readiness.status === "red")
    risks.push("Low readiness score - significant preparation needed");

  return risks.length > 0 ? risks : ["No major risks identified"];
};

export const generateNextSteps = (readiness: ReadinessScore): string[] => {
  const steps: string[] = [];

  if (readiness.technical_score < 8) {
    steps.push("Complete technical readiness assessment");
    steps.push("Identify data sources and access methods");
  }

  if (readiness.organizational_score < 8) {
    steps.push("Secure executive sponsorship");
    steps.push("Conduct stakeholder workshops");
  }

  steps.push("Schedule discovery session with process owner");
  steps.push("Develop detailed process documentation");
  steps.push("Create proof-of-concept scope");
  steps.push("Build initial ROI model with stakeholders");
  steps.push("Present findings and recommendation");

  return steps.slice(0, 5);
};

export const analyzeProcess = (
  process: ProcessInput
): OpportunityRecommendation => {
  const oppScore = calculateOpportunityScore(process);
  const readiness = calculateReadiness(process);
  const roi = calculateROI(process, readiness);
  const aiCapability = recommendAICapability(process);
  const priorityScore = calculatePriorityScore(
    oppScore,
    readiness,
    roi,
    process
  );
  const { tier, action, timeline } = determineRecommendation(
    priorityScore,
    oppScore,
    readiness
  );
  const risks = identifyRisks(process, readiness);
  const nextSteps = generateNextSteps(readiness);

  return {
    process_name: process.process_name,
    opportunity_score: oppScore,
    readiness_score: readiness,
    roi_analysis: roi,
    recommended_ai_capability: aiCapability,
    priority_score: priorityScore,
    priority_tier: tier,
    recommended_action: action,
    timeline: timeline,
    key_risks: risks,
    next_steps: nextSteps,
  };
};
