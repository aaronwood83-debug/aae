
export interface ProcessInput {
  process_name: string;
  department: string;

  // Volume metrics
  annual_volume: number;
  avg_time_per_instance: number; // hours
  num_people: number;

  // Quality metrics
  error_rate: number; // decimal (0.15 = 15%)
  consistency_level: "high" | "medium" | "low";

  // Data characteristics
  data_format: "structured" | "semi-structured" | "unstructured";
  data_location: "single" | "multiple" | "scattered";
  data_quality: "clean" | "moderate" | "poor";
  data_access: "easy" | "moderate" | "difficult";

  // Decision complexity
  decision_type: "rules" | "patterns" | "judgment";
  requires_expertise: boolean;
  multiple_factors: boolean;
  unclear_criteria: boolean;
  compliance_considerations: boolean;
  subjective_judgment: boolean;

  // Costs
  annual_labor_cost: number;
  annual_tool_cost: number;
  annual_error_cost: number;
  annual_delay_cost: number;
  annual_opportunity_cost: number;
  annual_hidden_cost: number;

  // Readiness
  data_digital: boolean;
  process_ownership_clear: boolean;
  systems_have_apis: boolean;
  sample_data_available: boolean;
  success_metrics_defined: boolean;

  executive_sponsor: boolean;
  stakeholder_openness: boolean;
  change_capacity: boolean;
  experimentation_culture: boolean;
  resources_available: boolean;

  // Strategic
  aligns_with_priorities: boolean;
  executive_visibility: boolean;
  customer_impact: boolean;
  competitive_advantage: boolean;
  innovation_showcase: boolean;
}

export interface OpportunityScore {
  volume_score: number;
  time_score: number;
  error_score: number;
  consistency_score: number;
  data_score: number;
  complexity_score: number;
  impact_score: number;
  total_score: number;
  priority_band: string;
}

export interface ReadinessScore {
  technical_score: number;
  organizational_score: number;
  ai_maturity_score: number;
  combined_score: number;
  status: "green" | "yellow" | "red";
}

export interface ROIAnalysis {
  total_current_cost: number;
  expected_annual_benefit: number;
  implementation_cost: number;
  annual_ongoing_cost: number;
  net_annual_benefit: number;
  roi_percentage: number;
  payback_months: number | null;
  three_year_npv: number;
}

export interface OpportunityRecommendation {
  process_name: string;
  opportunity_score: OpportunityScore;
  readiness_score: ReadinessScore;
  roi_analysis: ROIAnalysis;
  recommended_ai_capability: string;
  priority_score: number;
  priority_tier: string;
  recommended_action: string;
  timeline: string;
  key_risks: string[];
  next_steps: string[];
}
