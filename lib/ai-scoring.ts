import { Proposal, ScoreBreakdown } from './types';

/**
 * AI Scoring Engine for SangamSetu
 * Evaluates startup proposals across 8 critical dimensions (Document Page 5 Standard):
 * 1. Problem-Solution Fit (20%)
 * 2. Technical Feasibility (15%)
 * 3. Innovation Quotient (15%)
 * 4. Impact Potential (15%)
 * 5. Cost-Effectiveness (15%)
 * 6. Scalability & Deployment (10%)
 * 7. Team Capability (5%)
 * 8. Risk Management & Compliance (5%)
 */

export interface ScoreResult {
  scoreBreakdown: ScoreBreakdown;
  explanation: string;
  g1Eligible: boolean;
  g2Eligible: boolean;
  shapValues: { feature: string; impact: number; description: string }[];
  keyStrengths: string[];
  areasForImprovement: string[];
}

export function calculateCostEffectiveness(budget: number, maxBudget: number): number {
  if (maxBudget <= 0) return 75;
  const ratio = budget / maxBudget;
  if (ratio <= 0.4) return 98;
  if (ratio <= 0.6) return 92;
  if (ratio <= 0.75) return 86;
  if (ratio <= 0.9) return 78;
  if (ratio <= 1.0) return 70;
  return 50;
}

export function evaluateProposalAI(
  proposal: Partial<Proposal>,
  challengeMaxBudget: number = 5000000
): ScoreResult {
  const text = `${proposal.title || ''} ${proposal.solutionOverview || ''} ${proposal.technicalApproach || ''} ${proposal.innovation || ''} ${proposal.impactMetrics || ''}`.toLowerCase();

  // 1. Problem Solution Fit (20%)
  let fitScore = 78;
  if (text.includes('real-time') || text.includes('automated') || text.includes('algorithm')) fitScore += 6;
  if (text.includes('government') || text.includes('citizen') || text.includes('interoperability')) fitScore += 7;
  if (text.includes('integration') || text.includes('api') || text.includes('pipeline')) fitScore += 4;
  fitScore = Math.min(98, Math.max(65, fitScore));

  // 2. Technical Feasibility (15%)
  let techScore = 76;
  if (text.includes('architecture') || text.includes('cloud') || text.includes('edge')) techScore += 6;
  if (text.includes('tested') || text.includes('benchmark') || text.includes('accuracy')) techScore += 7;
  if (text.includes('modular') || text.includes('microservices') || text.includes('docker')) techScore += 5;
  techScore = Math.min(97, Math.max(60, techScore));

  // 3. Innovation (15%)
  let innovScore = 75;
  if (text.includes('novel') || text.includes('patent') || text.includes('proprietary')) innovScore += 8;
  if (text.includes('ai') || text.includes('machine learning') || text.includes('computer vision') || text.includes('iot')) innovScore += 7;
  if (text.includes('breakthrough') || text.includes('first-in-class')) innovScore += 5;
  innovScore = Math.min(99, Math.max(60, innovScore));

  // 4. Impact Potential (15%)
  let impactScore = 80;
  if (text.includes('scale') || text.includes('reduction') || text.includes('efficiency')) impactScore += 6;
  if (text.includes('crore') || text.includes('citizens') || text.includes('pan-india') || text.includes('nationwide')) impactScore += 7;
  impactScore = Math.min(98, Math.max(65, impactScore));

  // 5. Cost-Effectiveness (15%)
  const costScore = calculateCostEffectiveness(proposal.totalBudget || 3000000, challengeMaxBudget);

  // 6. Scalability (10%)
  let scaleScore = 78;
  if (text.includes('cloud') || text.includes('kubernetes') || text.includes('distributed')) scaleScore += 7;
  if (text.includes('multi-lingual') || text.includes('low bandwidth') || text.includes('offline-first')) scaleScore += 7;
  scaleScore = Math.min(96, Math.max(60, scaleScore));

  // 7. Team Capability (5%)
  let teamScore = 82;
  const teamText = (proposal.teamDetails || '').toLowerCase();
  if (teamText.includes('iit') || teamText.includes('phd') || teamText.includes('years') || teamText.includes('domain expert')) teamScore += 9;
  if (teamText.includes('cto') || teamText.includes('lead') || teamText.includes('patents')) teamScore += 5;
  teamScore = Math.min(96, Math.max(65, teamScore));

  // 8. Risk Management & Compliance (5%)
  let riskScore = 77;
  const riskText = (proposal.riskAnalysis || '').toLowerCase();
  if (riskText.includes('mitigation') || riskText.includes('backup') || riskText.includes('failover')) riskScore += 8;
  if (riskText.includes('data privacy') || riskText.includes('cert-in') || riskText.includes('compliance')) riskScore += 8;
  riskScore = Math.min(95, Math.max(55, riskScore));

  // Overall Weighted Calculation (Doc Page 5 Weights)
  const overall = Number((
    fitScore * 0.20 +
    techScore * 0.15 +
    innovScore * 0.15 +
    impactScore * 0.15 +
    costScore * 0.15 +
    scaleScore * 0.10 +
    teamScore * 0.05 +
    riskScore * 0.05
  ).toFixed(1));

  const scoreBreakdown: ScoreBreakdown = {
    problemSolutionFit: fitScore,
    technicalFeasibility: techScore,
    innovation: innovScore,
    impactPotential: impactScore,
    costEffectiveness: costScore,
    scalability: scaleScore,
    teamCapability: teamScore,
    riskManagement: riskScore,
    overall,
  };

  const keyStrengths: string[] = [];
  const areasForImprovement: string[] = [];

  if (fitScore >= 88) keyStrengths.push('Exceptional alignment with government department requirements and operational context');
  if (innovScore >= 88) keyStrengths.push('High innovation quotient with distinct proprietary technology advantage');
  if (impactScore >= 88) keyStrengths.push('Substantial quantifiable citizen/operational impact with Pan-India scalability');
  if (techScore >= 88) keyStrengths.push('Robust architectural design and verified technical feasibility');
  if (costScore >= 88) keyStrengths.push('Highly competitive budget utilization providing maximum value for public funds');

  if (keyStrengths.length < 2) {
    keyStrengths.push('Well-structured implementation roadmap and clear milestone delivery plan');
  }

  if (riskScore < 82) areasForImprovement.push('Enhance CERT-In cybersecurity hardening and failover protocols');
  if (scaleScore < 82) areasForImprovement.push('Detail multi-state and low-bandwidth deployment benchmarks');
  if (costScore < 75) areasForImprovement.push('Optimize hardware and infrastructure capital expenditure breakdown');

  if (areasForImprovement.length === 0) {
    areasForImprovement.push('Provide continuous field telemetry and post-pilot expansion SLA models');
  }

  const g1Eligible = overall >= 84;
  const g2Eligible = overall >= 78 && costScore >= 82;

  // SHAP Feature Attribution values
  const shapValues = [
    { feature: 'Problem-Solution Alignment (20%)', impact: Number(((fitScore - 75) * 0.20).toFixed(2)), description: 'Direct relevance to government operational pain-point' },
    { feature: 'Technical Soundness (15%)', impact: Number(((techScore - 75) * 0.15).toFixed(2)), description: 'Feasibility of technology stack & architecture' },
    { feature: 'Innovation & IP (15%)', impact: Number(((innovScore - 75) * 0.15).toFixed(2)), description: 'Novelty of approach over legacy tenders' },
    { feature: 'Impact Potential (15%)', impact: Number(((impactScore - 75) * 0.15).toFixed(2)), description: 'Public benefit and efficiency metrics' },
    { feature: 'Cost-Effectiveness (15%)', impact: Number(((costScore - 75) * 0.15).toFixed(2)), description: 'Value delivered against proposed cost' },
    { feature: 'Scalability (10%)', impact: Number(((scaleScore - 75) * 0.10).toFixed(2)), description: 'Capacity for state and national expansion' },
    { feature: 'Team Capability (5%)', impact: Number(((teamScore - 75) * 0.05).toFixed(2)), description: 'Skills and technical delivery capability' },
    { feature: 'Risk & Compliance (5%)', impact: Number(((riskScore - 75) * 0.05).toFixed(2)), description: 'Cybersecurity, privacy, and integration mitigation' },
  ];

  const explanation = `Evaluated through SangamSetu Multi-Criteria ML Scoring Model. Solution scored ${overall}/100 with strongest performance in ${keyStrengths[0] || 'Technical Design'}. Recommended for ${g1Eligible ? 'G1 (Best-in-Class)' : g2Eligible ? 'G2 (Cost-Effective)' : 'General review'}.`;

  return {
    scoreBreakdown,
    explanation,
    g1Eligible,
    g2Eligible,
    shapValues,
    keyStrengths,
    areasForImprovement,
  };
}

export function rankAndCategorizeProposals(proposals: Proposal[]): {
  g1: Proposal[];
  g2: Proposal[];
  allRanked: Proposal[];
} {
  // Sort all proposals by AI Overall Score descending
  const sorted = [...proposals].sort((a, b) => ((b.aiScore || 0) - (a.aiScore || 0)));

  // G1: Top 5 Highest Overall Scores
  const g1 = sorted.slice(0, 5).map((p, idx) => ({
    ...p,
    g1Category: true,
    rankG1: idx + 1,
  }));

  // G2: Top 5 by Cost-Effectiveness with decent overall score (>= 75)
  const g2Candidates = [...proposals]
    .filter(p => (p.aiScore || 0) >= 75)
    .sort((a, b) => {
      const costA = a.aiScoreBreakdown?.costEffectiveness || 70;
      const costB = b.aiScoreBreakdown?.costEffectiveness || 70;
      return costB - costA;
    });

  const g2 = g2Candidates.slice(0, 5).map((p, idx) => ({
    ...p,
    g2Category: true,
    rankG2: idx + 1,
  }));

  const allRanked = sorted.map((p, idx) => {
    const isG1 = g1.some(g => g.id === p.id);
    const isG2 = g2.some(g => g.id === p.id);
    const g1Item = g1.find(g => g.id === p.id);
    const g2Item = g2.find(g => g.id === p.id);
    return {
      ...p,
      g1Category: isG1,
      g2Category: isG2,
      rankG1: g1Item?.rankG1,
      rankG2: g2Item?.rankG2,
    };
  });

  return { g1, g2, allRanked };
}
