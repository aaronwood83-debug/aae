
import React, { useState } from "react";
import { ProcessInput, OpportunityRecommendation } from "../aiTypes";
import { analyzeProcess } from "../services/aiOpportunityService";

const initialProcessInput: ProcessInput = {
  process_name: "New Process",
  department: "Operations",
  annual_volume: 1000,
  avg_time_per_instance: 1.0,
  num_people: 5,
  error_rate: 0.05,
  consistency_level: "medium",
  data_format: "structured",
  data_location: "single",
  data_quality: "moderate",
  data_access: "moderate",
  decision_type: "rules",
  requires_expertise: false,
  multiple_factors: false,
  unclear_criteria: false,
  compliance_considerations: false,
  subjective_judgment: false,
  annual_labor_cost: 50000,
  annual_tool_cost: 5000,
  annual_error_cost: 10000,
  annual_delay_cost: 5000,
  annual_opportunity_cost: 0,
  annual_hidden_cost: 0,
  data_digital: true,
  process_ownership_clear: true,
  systems_have_apis: false,
  sample_data_available: false,
  success_metrics_defined: false,
  executive_sponsor: false,
  stakeholder_openness: true,
  change_capacity: true,
  experimentation_culture: false,
  resources_available: true,
  aligns_with_priorities: false,
  executive_visibility: false,
  customer_impact: false,
  competitive_advantage: false,
  innovation_showcase: false,
};

const AIOpportunityAnalyzer: React.FC = () => {
  const [input, setInput] = useState<ProcessInput>(initialProcessInput);
  const [result, setResult] = useState<OpportunityRecommendation | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;

    if (type === "number") {
      finalValue = parseFloat(value);
    } else if (type === "checkbox") {
      finalValue = (e.target as HTMLInputElement).checked;
    }

    setInput((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleAnalyze = () => {
    const analysisResult = analyzeProcess(input);
    setResult(analysisResult);
  };

  const handleReset = () => {
      setInput(initialProcessInput);
      setResult(null);
  }

  const handleFillExample = () => {
      setInput({
        process_name: "Contract Review Process",
        department: "Legal/Procurement",
        annual_volume: 200,
        avg_time_per_instance: 3.0,
        num_people: 3,
        error_rate: 0.17,
        consistency_level: "medium",
        data_format: "unstructured",
        data_location: "single",
        data_quality: "clean",
        data_access: "easy",
        decision_type: "judgment",
        requires_expertise: true,
        multiple_factors: true,
        unclear_criteria: false,
        compliance_considerations: true,
        subjective_judgment: true,
        annual_labor_cost: 90000,
        annual_tool_cost: 5000,
        annual_error_cost: 180000,
        annual_delay_cost: 135000,
        annual_opportunity_cost: 45000,
        annual_hidden_cost: 0,
        data_digital: true,
        process_ownership_clear: true,
        systems_have_apis: true,
        sample_data_available: true,
        success_metrics_defined: true,
        executive_sponsor: true,
        stakeholder_openness: true,
        change_capacity: true,
        experimentation_culture: true,
        resources_available: true,
        aligns_with_priorities: true,
        executive_visibility: true,
        customer_impact: false,
        competitive_advantage: true,
        innovation_showcase: true,
      });
      setResult(null); // Clear previous result to prompt re-analysis or just analyze immediately? Better to let user click analyze.
  }

  return (
    <div className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-accent-blue">
          AI Opportunity Analyzer
        </h2>
        <div className="space-x-4">
             <button
            onClick={handleFillExample}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Load Example
          </button>
           <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Process Details
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Process Name
                </label>
                <input
                  type="text"
                  name="process_name"
                  value={input.process_name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 focus:outline-none focus:border-accent-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={input.department}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 focus:outline-none focus:border-accent-blue"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Annual Volume
                </label>
                <input
                  type="number"
                  name="annual_volume"
                  value={input.annual_volume}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Avg Time (hours)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="avg_time_per_instance"
                  value={input.avg_time_per_instance}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Num People
                </label>
                <input
                  type="number"
                  name="num_people"
                  value={input.num_people}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Error Rate (0-1)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="error_rate"
                  value={input.error_rate}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Data & Quality
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Consistency
                </label>
                <select
                  name="consistency_level"
                  value={input.consistency_level}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Format</label>
                <select
                  name="data_format"
                  value={input.data_format}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                >
                  <option value="structured">Structured</option>
                  <option value="semi-structured">Semi-Structured</option>
                  <option value="unstructured">Unstructured</option>
                </select>
              </div>
               <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <select
                  name="data_location"
                  value={input.data_location}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                >
                  <option value="single">Single</option>
                  <option value="multiple">Multiple</option>
                  <option value="scattered">Scattered</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quality</label>
                <select
                  name="data_quality"
                  value={input.data_quality}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                >
                  <option value="clean">Clean</option>
                  <option value="moderate">Moderate</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Access</label>
                <select
                  name="data_access"
                  value={input.data_access}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                >
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="difficult">Difficult</option>
                </select>
              </div>
               <div>
                <label className="block text-sm font-medium mb-1">Decision Type</label>
                <select
                  name="decision_type"
                  value={input.decision_type}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                >
                  <option value="rules">Rules</option>
                  <option value="patterns">Patterns</option>
                  <option value="judgment">Judgment</option>
                </select>
              </div>
            </div>
          </div>

             <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Annual Costs</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Labor Cost
                </label>
                <input
                  type="number"
                  name="annual_labor_cost"
                  value={input.annual_labor_cost}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tool Cost
                </label>
                <input
                  type="number"
                  name="annual_tool_cost"
                  value={input.annual_tool_cost}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Error Cost
                </label>
                <input
                  type="number"
                  name="annual_error_cost"
                  value={input.annual_error_cost}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Delay Cost
                </label>
                <input
                  type="number"
                  name="annual_delay_cost"
                  value={input.annual_delay_cost}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                />
              </div>
               <div>
                <label className="block text-sm font-medium mb-1">
                  Opportunity Cost
                </label>
                <input
                  type="number"
                  name="annual_opportunity_cost"
                  value={input.annual_opportunity_cost}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                />
              </div>
               <div>
                <label className="block text-sm font-medium mb-1">
                  Hidden Cost
                </label>
                <input
                  type="number"
                  name="annual_hidden_cost"
                  value={input.annual_hidden_cost}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Characteristics & Readiness
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                    { key: "requires_expertise", label: "Requires Expertise" },
                    { key: "multiple_factors", label: "Multiple Factors" },
                    { key: "unclear_criteria", label: "Unclear Criteria" },
                    { key: "compliance_considerations", label: "Compliance Issues" },
                    { key: "subjective_judgment", label: "Subjective Judgment" },
                    { key: "data_digital", label: "Data is Digital" },
                    { key: "process_ownership_clear", label: "Clear Ownership" },
                    { key: "systems_have_apis", label: "Systems have APIs" },
                    { key: "sample_data_available", label: "Sample Data Ready" },
                    { key: "success_metrics_defined", label: "Metrics Defined" },
                    { key: "executive_sponsor", label: "Executive Sponsor" },
                    { key: "stakeholder_openness", label: "Stakeholder Openness" },
                    { key: "change_capacity", label: "Change Capacity" },
                    { key: "experimentation_culture", label: "Experiment Culture" },
                    { key: "resources_available", label: "Resources Available" },
                    { key: "aligns_with_priorities", label: "Strategic Alignment" },
                    { key: "executive_visibility", label: "Executive Visibility" },
                    { key: "customer_impact", label: "Customer Impact" },
                    { key: "competitive_advantage", label: "Competitive Adv." },
                    { key: "innovation_showcase", label: "Innovation Showcase" },
                ].map((item) => (
                    <div key={item.key} className="flex items-center">
                        <input
                            type="checkbox"
                            name={item.key}
                            checked={(input as any)[item.key]}
                            onChange={handleInputChange}
                            className="mr-2 h-4 w-4 text-accent-blue rounded bg-gray-600 border-gray-500"
                        />
                        <label>{item.label}</label>
                    </div>
                ))}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
          >
            Run Analysis
          </button>
        </div>

        {/* Results Display */}
        <div className="space-y-6">
          {!result && (
            <div className="bg-gray-700 p-8 rounded-lg flex flex-col items-center justify-center h-full text-gray-400">
              <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              <p className="text-xl">Enter process data and click "Run Analysis"</p>
            </div>
          )}

          {result && (
            <>
              <div className={`bg-gray-700 p-6 rounded-lg border-l-4 ${result.opportunity_score.priority_band === 'Critical' ? 'border-red-500' : result.opportunity_score.priority_band === 'High' ? 'border-orange-500' : 'border-green-500'}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{result.process_name}</h3>
                        <p className="text-lg text-gray-300 mb-1">Recommended Capability: <span className="font-bold text-white">{result.recommended_ai_capability}</span></p>
                        <p className="text-gray-400">{result.recommended_action}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-white">{result.opportunity_score.total_score}<span className="text-lg text-gray-400">/70</span></div>
                        <div className="text-sm uppercase tracking-wide font-semibold mt-1 px-2 py-1 bg-gray-800 rounded inline-block">
                            {result.opportunity_score.priority_band}
                        </div>
                    </div>
                </div>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-600 pb-2">ROI Analysis</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-800 p-3 rounded">
                        <div className="text-xs text-gray-400 uppercase">ROI</div>
                        <div className="text-xl font-bold text-green-400">{result.roi_analysis.roi_percentage}%</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                        <div className="text-xs text-gray-400 uppercase">Net Benefit</div>
                        <div className="text-xl font-bold text-green-400">${result.roi_analysis.net_annual_benefit.toLocaleString()}</div>
                    </div>
                     <div className="bg-gray-800 p-3 rounded">
                        <div className="text-xs text-gray-400 uppercase">Payback</div>
                        <div className="text-xl font-bold text-white">{result.roi_analysis.payback_months} mo</div>
                    </div>
                     <div className="bg-gray-800 p-3 rounded">
                        <div className="text-xs text-gray-400 uppercase">Impl. Cost</div>
                        <div className="text-xl font-bold text-red-400">${result.roi_analysis.implementation_cost.toLocaleString()}</div>
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-gray-700 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-600 pb-2">Scores Breakdown</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span>Volume & Time</span>
                            <span className="font-bold">{(result.opportunity_score.volume_score + result.opportunity_score.time_score).toFixed(1)}</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(result.opportunity_score.volume_score + result.opportunity_score.time_score)/20 * 100}%` }}></div>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <span>Data Readiness</span>
                            <span className="font-bold">{result.opportunity_score.data_score}</span>
                        </div>
                         <div className="w-full bg-gray-800 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${result.opportunity_score.data_score * 10}%` }}></div>
                        </div>

                         <div className="flex justify-between items-center mt-2">
                            <span>Business Impact</span>
                            <span className="font-bold">{result.opportunity_score.impact_score}</span>
                        </div>
                         <div className="w-full bg-gray-800 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${result.opportunity_score.impact_score * 10}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-700 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-600 pb-2">Readiness: {result.readiness_score.status.toUpperCase()}</h4>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span>Technical</span>
                            <span className="font-bold">{result.readiness_score.technical_score}</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                            <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${result.readiness_score.technical_score * 10}%` }}></div>
                        </div>

                         <div className="flex justify-between items-center mt-2">
                            <span>Organizational</span>
                            <span className="font-bold">{result.readiness_score.organizational_score}</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${result.readiness_score.organizational_score * 10}%` }}></div>
                        </div>
                    </div>
                </div>
              </div>

               <div className="bg-gray-700 p-6 rounded-lg">
                 <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-600 pb-2">Next Steps</h4>
                 <ul className="list-decimal list-inside space-y-2 text-gray-300">
                    {result.next_steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                    ))}
                 </ul>
               </div>

                <div className="bg-gray-700 p-6 rounded-lg">
                 <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-600 pb-2 text-red-400">Key Risks</h4>
                 <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {result.key_risks.map((risk, idx) => (
                        <li key={idx}>{risk}</li>
                    ))}
                 </ul>
               </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIOpportunityAnalyzer;
