"""
AI Opportunity Discovery System - Automated Analysis Script

This script takes structured input data about business processes and automatically:

Calculates opportunity scores
Assesses readiness
Calculates ROI
Prioritizes opportunities
Generates recommendations
Usage:
python ai_opportunity_analyzer.py --input data.json --output report.json
"""

import json
import math
from typing import Dict, List, Tuple
from dataclasses import dataclass, asdict
from datetime import datetime

@dataclass
class ProcessInput:
    """Structure for process input data"""
    process_name: str
    department: str

    # Volume metrics
    annual_volume: int
    avg_time_per_instance: float  # hours
    num_people: int

    # Quality metrics
    error_rate: float  # decimal (0.15 = 15%)
    consistency_level: str  # "high", "medium", "low"

    # Data characteristics
    data_format: str  # "structured", "semi-structured", "unstructured"
    data_location: str  # "single", "multiple", "scattered"
    data_quality: str  # "clean", "moderate", "poor"
    data_access: str  # "easy", "moderate", "difficult"

    # Decision complexity
    decision_type: str  # "rules", "patterns", "judgment"
    requires_expertise: bool
    multiple_factors: bool
    unclear_criteria: bool
    compliance_considerations: bool
    subjective_judgment: bool

    # Costs
    annual_labor_cost: float
    annual_tool_cost: float
    annual_error_cost: float
    annual_delay_cost: float
    annual_opportunity_cost: float
    annual_hidden_cost: float

    # Readiness
    data_digital: bool
    process_ownership_clear: bool
    systems_have_apis: bool
    sample_data_available: bool
    success_metrics_defined: bool

    executive_sponsor: bool
    stakeholder_openness: bool
    change_capacity: bool
    experimentation_culture: bool
    resources_available: bool

    # Strategic
    aligns_with_priorities: bool
    executive_visibility: bool
    customer_impact: bool
    competitive_advantage: bool
    innovation_showcase: bool

@dataclass
class OpportunityScore:
    """Calculated opportunity scores"""
    volume_score: float
    time_score: float
    error_score: float
    consistency_score: float
    data_score: float
    complexity_score: float
    impact_score: float
    total_score: float
    priority_band: str

@dataclass
class ReadinessScore:
    """Calculated readiness scores"""
    technical_score: float
    organizational_score: float
    ai_maturity_score: float
    combined_score: float
    status: str # "green", "yellow", "red"

@dataclass
class ROIAnalysis:
    """ROI calculations"""
    total_current_cost: float
    expected_annual_benefit: float
    implementation_cost: float
    annual_ongoing_cost: float
    net_annual_benefit: float
    roi_percentage: float
    payback_months: float
    three_year_npv: float

@dataclass
class OpportunityRecommendation:
    """Complete opportunity analysis"""
    process_name: str
    opportunity_score: OpportunityScore
    readiness_score: ReadinessScore
    roi_analysis: ROIAnalysis
    recommended_ai_capability: str
    priority_score: float
    priority_tier: str
    recommended_action: str
    timeline: str
    key_risks: List[str]
    next_steps: List[str]

class AIOpportunityAnalyzer:
    """Main analyzer class"""

    def __init__(self):
        self.opportunities: List[OpportunityRecommendation] = []

    def calculate_volume_score(self, annual_volume: int) -> float:
        """Calculate volume score (0-10)"""
        if annual_volume < 50:
            return 1 + (annual_volume / 50)
        elif annual_volume < 100:
            return 3 + ((annual_volume - 50) / 50)
        elif annual_volume < 500:
            return 5 + ((annual_volume - 100) / 400)
        elif annual_volume < 1000:
            return 7 + ((annual_volume - 500) / 500)
        else:
            return min(10, 9 + ((annual_volume - 1000) / 1000))

    def calculate_time_score(self, hours: float) -> float:
        """Calculate time cost score (0-10)"""
        if hours < 0.5:
            return 2 + (hours / 0.5)
        elif hours < 1:
            return 3 + ((hours - 0.5) / 0.5)
        elif hours < 2:
            return 5 + ((hours - 1) / 1)
        elif hours < 4:
            return 7 + ((hours - 2) / 2)
        else:
            return min(10, 9 + ((hours - 4) / 4))

    def calculate_error_score(self, error_rate: float) -> float:
        """Calculate error rate score (0-10)"""
        if error_rate < 0.02:
            return 1 + (error_rate / 0.02)
        elif error_rate < 0.05:
            return 3 + ((error_rate - 0.02) / 0.03)
        elif error_rate < 0.10:
            return 5 + ((error_rate - 0.05) / 0.05)
        elif error_rate < 0.20:
            return 7 + ((error_rate - 0.10) / 0.10)
        else:
            return min(10, 9 + ((error_rate - 0.20) / 0.20))

    def calculate_consistency_score(self, consistency: str) -> float:
        """Calculate consistency score (0-10)"""
        mapping = {
            "high": 2,
            "medium": 6,
            "low": 9
        }
        return mapping.get(consistency.lower(), 6)

    def calculate_data_score(self, data_format: str, data_location: str,
                            data_quality: str, data_access: str) -> float:
        """Calculate data availability score (0-10)"""
        score = 0

        # Format
        format_map = {"structured": 3, "semi-structured": 2, "unstructured": 1}
        score += format_map.get(data_format.lower(), 1)

        # Location
        location_map = {"single": 3, "multiple": 2, "scattered": 1}
        score += location_map.get(data_location.lower(), 1)

        # Quality
        quality_map = {"clean": 3, "moderate": 2, "poor": 1}
        score += quality_map.get(data_quality.lower(), 1)

        # Access
        access_map = {"easy": 1, "moderate": 0.5, "difficult": 0}
        score += access_map.get(data_access.lower(), 0.5)

        return min(10, score)

    def calculate_complexity_score(self, process: ProcessInput) -> float:
        """Calculate decision complexity score (0-10)"""
        base_map = {
            "rules": 2,
            "patterns": 6,
            "judgment": 8
        }
        score = base_map.get(process.decision_type.lower(), 5)

        # Add complexity factors
        if process.requires_expertise:
            score += 1
        if process.multiple_factors:
            score += 0.5
        if process.unclear_criteria:
            score += 0.5
        if process.compliance_considerations:
            score += 0.5
        if process.subjective_judgment:
            score += 0.5

        return min(10, score)

    def calculate_impact_score(self, total_cost: float, process: ProcessInput) -> float:
        """Calculate business impact score (0-10)"""
        # Base score from cost
        if total_cost < 25000:
            score = 1 + (total_cost / 25000)
        elif total_cost < 50000:
            score = 3 + ((total_cost - 25000) / 25000)
        elif total_cost < 100000:
            score = 5 + ((total_cost - 50000) / 50000)
        elif total_cost < 250000:
            score = 7 + ((total_cost - 100000) / 150000)
        else:
            score = min(10, 9 + ((total_cost - 250000) / 250000))

        # Add strategic factors
        if process.customer_impact:
            score += 0.5
        if process.competitive_advantage:
            score += 0.5
        if process.executive_visibility:
            score += 0.3

        return min(10, score)

    def calculate_opportunity_score(self, process: ProcessInput) -> OpportunityScore:
        """Calculate complete opportunity score"""
        total_cost = (
            process.annual_labor_cost +
            process.annual_tool_cost +
            process.annual_error_cost +
            process.annual_delay_cost +
            process.annual_opportunity_cost +
            process.annual_hidden_cost
        )

        volume = self.calculate_volume_score(process.annual_volume)
        time = self.calculate_time_score(process.avg_time_per_instance)
        error = self.calculate_error_score(process.error_rate)
        consistency = self.calculate_consistency_score(process.consistency_level)
        data = self.calculate_data_score(
            process.data_format, process.data_location,
            process.data_quality, process.data_access
        )
        complexity = self.calculate_complexity_score(process)
        impact = self.calculate_impact_score(total_cost, process)

        total = volume + time + error + consistency + data + complexity + impact

        # Determine priority band
        if total >= 50:
            band = "Critical"
        elif total >= 40:
            band = "High"
        elif total >= 30:
            band = "Medium"
        elif total >= 20:
            band = "Low"
        else:
            band = "Defer"

        return OpportunityScore(
            volume_score=round(volume, 1),
            time_score=round(time, 1),
            error_score=round(error, 1),
            consistency_score=round(consistency, 1),
            data_score=round(data, 1),
            complexity_score=round(complexity, 1),
            impact_score=round(impact, 1),
            total_score=round(total, 1),
            priority_band=band
        )

    def calculate_readiness(self, process: ProcessInput) -> ReadinessScore:
        """Calculate readiness scores"""
        # Technical readiness (0-10)
        technical = sum([
            2 if process.data_digital else 0,
            2 if process.process_ownership_clear else 0,
            2 if process.systems_have_apis else 0,
            2 if process.sample_data_available else 0,
            2 if process.success_metrics_defined else 0
        ])

        # Organizational readiness (0-10)
        organizational = sum([
            2 if process.executive_sponsor else 0,
            2 if process.stakeholder_openness else 0,
            2 if process.change_capacity else 0,
            2 if process.experimentation_culture else 0,
            2 if process.resources_available else 0
        ])

        # AI maturity readiness (0-10)
        # Simplified - would need more context in real implementation
        ai_maturity = 7.0  # Assume good fit for proven capabilities

        combined = (technical + organizational + ai_maturity) / 3

        # Determine status
        if combined >= 8:
            status = "green"
        elif combined >= 5:
            status = "yellow"
        else:
            status = "red"

        return ReadinessScore(
            technical_score=round(technical, 1),
            organizational_score=round(organizational, 1),
            ai_maturity_score=round(ai_maturity, 1),
            combined_score=round(combined, 1),
            status=status
        )

    def calculate_roi(self, process: ProcessInput,
                     readiness: ReadinessScore) -> ROIAnalysis:
        """Calculate ROI metrics"""
        # Total current cost
        total_current = (
            process.annual_labor_cost +
            process.annual_tool_cost +
            process.annual_error_cost +
            process.annual_delay_cost +
            process.annual_opportunity_cost +
            process.annual_hidden_cost
        )

        # Expected improvements (conservative)
        time_savings = 0.60
        error_reduction = 0.50
        throughput_improvement = 0.50

        # Calculate benefit
        benefit = (
            (process.annual_labor_cost * time_savings) +
            (process.annual_error_cost * error_reduction) +
            (process.annual_delay_cost * throughput_improvement) +
            (process.annual_opportunity_cost * 0.5)
        )

        # Apply readiness risk adjustment
        risk_multiplier = {
            "green": 1.0,
            "yellow": 0.8,
            "red": 0.6
        }
        benefit *= risk_multiplier.get(readiness.status, 0.8)

        # Implementation costs (estimates based on complexity)
        if total_current < 50000:
            impl_cost = 30000
            ongoing = 8000
        elif total_current < 150000:
            impl_cost = 60000
            ongoing = 15000
        else:
            impl_cost = 100000
            ongoing = 25000

        # Calculate metrics
        net_benefit = benefit - ongoing
        roi = (net_benefit / impl_cost) * 100 if impl_cost > 0 else 0
        payback = (impl_cost / net_benefit * 12) if net_benefit > 0 else float('inf')
        npv_3yr = (net_benefit * 2.5) - impl_cost

        return ROIAnalysis(
            total_current_cost=round(total_current, 2),
            expected_annual_benefit=round(benefit, 2),
            implementation_cost=round(impl_cost, 2),
            annual_ongoing_cost=round(ongoing, 2),
            net_annual_benefit=round(net_benefit, 2),
            roi_percentage=round(roi, 1),
            payback_months=round(payback, 1) if payback != float('inf') else None,
            three_year_npv=round(npv_3yr, 2)
        )

    def recommend_ai_capability(self, process: ProcessInput) -> str:
        """Recommend AI capability based on process characteristics"""
        # Simple rule-based recommendation
        # In production, this would be more sophisticated

        if "document" in process.process_name.lower() or "contract" in process.process_name.lower():
            return "Document Analysis"
        elif "extract" in process.process_name.lower() or "data entry" in process.process_name.lower():
            return "Data Extraction"
        elif "classify" in process.process_name.lower() or "categorize" in process.process_name.lower():
            return "Classification"
        elif "support" in process.process_name.lower() or "inquiry" in process.process_name.lower():
            return "Conversational AI"
        elif process.decision_type == "patterns":
            return "Pattern Recognition"
        else:
            return "Workflow Automation"

    def calculate_priority_score(self, opp_score: OpportunityScore,
                                readiness: ReadinessScore,
                                roi: ROIAnalysis,
                                process: ProcessInput) -> float:
        """Calculate overall priority score"""
        # Strategic alignment score
        strategic = sum([
            3 if process.aligns_with_priorities else 0,
            2 if process.executive_visibility else 0,
            2 if process.customer_impact else 0,
            2 if process.competitive_advantage else 0,
            1 if process.innovation_showcase else 0
        ])

        # Combined priority
        priority = (
            (opp_score.total_score * 0.4) +
            (readiness.combined_score * 0.3) +
            (min(roi.roi_percentage, 500) / 500 * 10 * 0.2) +
            (strategic * 0.1)
        )

        return round(priority, 1)

    def determine_recommendation(self, priority_score: float,
                                opp_score: OpportunityScore,
                                readiness: ReadinessScore) -> Tuple[str, str, str]:
        """Determine priority tier, action, and timeline"""
        # Priority tier
        if priority_score >= 8:
            tier = "Q1 - Quick Win"
        elif priority_score >= 6.5:
            tier = "Q1 - Strategic Project"
        elif priority_score >= 5:
            tier = "Q2-Q3 - Fill-in"
        else:
            tier = "Future - Defer"

        # Recommended action
        if opp_score.total_score >= 40 and readiness.status == "green":
            action = "Immediate implementation recommended"
            timeline = "Start within 30 days, complete in 8-12 weeks"
        elif opp_score.total_score >= 40 and readiness.status == "yellow":
            action = "Address readiness gaps, then implement"
            timeline = "2-4 months prep, then 8-12 weeks implementation"
        elif opp_score.total_score >= 30 and readiness.status == "green":
            action = "Schedule for Q2 implementation"
            timeline = "Start in 3-4 months, complete in 8-10 weeks"
        elif readiness.status == "red":
            action = "Improve readiness before proceeding"
            timeline = "4-6 months readiness building, then reassess"
        else:
            action = "Monitor and revisit in 6-12 months"
            timeline = "Reassess in H2"

        return tier, action, timeline

    def identify_risks(self, process: ProcessInput,
                      readiness: ReadinessScore) -> List[str]:
        """Identify key risks"""
        risks = []

        if not process.data_digital:
            risks.append("Data not fully digitized - requires data migration")

        if not process.systems_have_apis:
            risks.append("Limited system integration capabilities")

        if not process.executive_sponsor:
            risks.append("No executive sponsor - may face adoption challenges")

        if process.error_rate > 0.15:
            risks.append("High current error rate - may indicate process complexity")

        if not process.change_capacity:
            risks.append("Limited change management capacity")

        if readiness.status == "red":
            risks.append("Low readiness score - significant preparation needed")

        return risks if risks else ["No major risks identified"]

    def generate_next_steps(self, readiness: ReadinessScore) -> List[str]:
        """Generate next steps"""
        steps = []

        if readiness.technical_score < 8:
            steps.append("Complete technical readiness assessment")
            steps.append("Identify data sources and access methods")

        if readiness.organizational_score < 8:
            steps.append("Secure executive sponsorship")
            steps.append("Conduct stakeholder workshops")

        steps.extend([
            "Schedule discovery session with process owner",
            "Develop detailed process documentation",
            "Create proof-of-concept scope",
            "Build initial ROI model with stakeholders",
            "Present findings and recommendation"
        ])

        return steps[:5]  # Return top 5

    def analyze_process(self, process: ProcessInput) -> OpportunityRecommendation:
        """Complete analysis of a single process"""
        # Calculate scores
        opp_score = self.calculate_opportunity_score(process)
        readiness = self.calculate_readiness(process)
        roi = self.calculate_roi(process, readiness)

        # Recommendations
        ai_capability = self.recommend_ai_capability(process)
        priority_score = self.calculate_priority_score(
            opp_score, readiness, roi, process
        )

        tier, action, timeline = self.determine_recommendation(
            priority_score, opp_score, readiness
        )

        risks = self.identify_risks(process, readiness)
        next_steps = self.generate_next_steps(readiness)

        return OpportunityRecommendation(
            process_name=process.process_name,
            opportunity_score=opp_score,
            readiness_score=readiness,
            roi_analysis=roi,
            recommended_ai_capability=ai_capability,
            priority_score=priority_score,
            priority_tier=tier,
            recommended_action=action,
            timeline=timeline,
            key_risks=risks,
            next_steps=next_steps
        )

    def analyze_portfolio(self, processes: List[ProcessInput]) -> List[OpportunityRecommendation]:
        """Analyze multiple processes and prioritize"""
        recommendations = []

        for process in processes:
            rec = self.analyze_process(process)
            recommendations.append(rec)

        # Sort by priority score
        recommendations.sort(key=lambda x: x.priority_score, reverse=True)

        self.opportunities = recommendations
        return recommendations

    def generate_summary(self) -> Dict:
        """Generate portfolio summary"""
        if not self.opportunities:
            return {"error": "No opportunities analyzed"}

        total_current_cost = sum(o.roi_analysis.total_current_cost
                                for o in self.opportunities)
        total_benefit = sum(o.roi_analysis.net_annual_benefit
                           for o in self.opportunities)
        total_impl_cost = sum(o.roi_analysis.implementation_cost
                             for o in self.opportunities)

        portfolio_roi = (total_benefit / total_impl_cost * 100) if total_impl_cost > 0 else 0

        # Count by tier
        tier_counts = {}
        for opp in self.opportunities:
            tier = opp.priority_tier.split(" - ")[0]
            tier_counts[tier] = tier_counts.get(tier, 0) + 1

        return {
            "analysis_date": datetime.now().isoformat(),
            "total_opportunities": len(self.opportunities),
            "total_current_cost": round(total_current_cost, 2),
            "total_expected_benefit": round(total_benefit, 2),
            "total_implementation_cost": round(total_impl_cost, 2),
            "portfolio_roi_percentage": round(portfolio_roi, 1),
            "opportunities_by_tier": tier_counts,
            "top_3_opportunities": [
                {
                    "process": o.process_name,
                    "priority_score": o.priority_score,
                    "roi": o.roi_analysis.roi_percentage
                }
                for o in self.opportunities[:3]
            ]
        }

    def export_results(self, filename: str = "ai_opportunity_analysis.json"):
        """Export results to JSON"""
        output = {
            "summary": self.generate_summary(),
            "opportunities": [
                {
                    "process_name": o.process_name,
                    "opportunity_score": asdict(o.opportunity_score),
                    "readiness_score": asdict(o.readiness_score),
                    "roi_analysis": asdict(o.roi_analysis),
                    "recommended_ai_capability": o.recommended_ai_capability,
                    "priority_score": o.priority_score,
                    "priority_tier": o.priority_tier,
                    "recommended_action": o.recommended_action,
                    "timeline": o.timeline,
                    "key_risks": o.key_risks,
                    "next_steps": o.next_steps
                }
                for o in self.opportunities
            ]
        }

        with open(filename, 'w') as f:
            json.dump(output, f, indent=2)

        return filename

# Example usage
if __name__ == "__main__":

    # Example: Contract review process
    contract_process = ProcessInput(
        process_name="Contract Review Process",
        department="Legal/Procurement",
        annual_volume=200,
        avg_time_per_instance=3.0,
        num_people=3,
        error_rate=0.17,
        consistency_level="medium",
        data_format="unstructured",
        data_location="single",
        data_quality="clean",
        data_access="easy",
        decision_type="judgment",
        requires_expertise=True,
        multiple_factors=True,
        unclear_criteria=False,
        compliance_considerations=True,
        subjective_judgment=True,
        annual_labor_cost=90000,
        annual_tool_cost=5000,
        annual_error_cost=180000,
        annual_delay_cost=135000,
        annual_opportunity_cost=45000,
        annual_hidden_cost=0,
        data_digital=True,
        process_ownership_clear=True,
        systems_have_apis=True,
        sample_data_available=True,
        success_metrics_defined=True,
        executive_sponsor=True,
        stakeholder_openness=True,
        change_capacity=True,
        experimentation_culture=True,
        resources_available=True,
        aligns_with_priorities=True,
        executive_visibility=True,
        customer_impact=False,
        competitive_advantage=True,
        innovation_showcase=True
    )

    # Analyze
    analyzer = AIOpportunityAnalyzer()
    result = analyzer.analyze_process(contract_process)

    # Print summary
    print("=" * 60)
    print(f"AI OPPORTUNITY ANALYSIS: {result.process_name}")
    print("=" * 60)
    print(f"\nOpportunity Score: {result.opportunity_score.total_score}/70")
    print(f"Priority Band: {result.opportunity_score.priority_band}")
    print(f"Readiness Status: {result.readiness_score.status.upper()}")
    print(f"\nROI: {result.roi_analysis.roi_percentage}%")
    print(f"Payback Period: {result.roi_analysis.payback_months} months")
    print(f"\nPriority Score: {result.priority_score}/10")
    print(f"Priority Tier: {result.priority_tier}")
    print(f"\nRecommended Action: {result.recommended_action}")
    print(f"Timeline: {result.timeline}")
    print(f"\nRecommended AI Capability: {result.recommended_ai_capability}")
    print("\nKey Risks:")
    for risk in result.key_risks:
        print(f"  - {risk}")
    print("\nNext Steps:")
    for i, step in enumerate(result.next_steps, 1):
        print(f"  {i}. {step}")
    print("=" * 60)

    # Export results
    analyzer.opportunities = [result]
    filename = analyzer.export_results()
    print(f"\nFull analysis exported to: {filename}")
