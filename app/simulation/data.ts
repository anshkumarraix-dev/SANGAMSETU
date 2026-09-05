import {
  EvaluationStartup,
  ScoredParameter,
  PrototypeTestParameter,
  G2ValueBreakdown,
  FinalSelectionData,
  SimProblem,
} from './types';

export const SIMULATION_PROBLEM: SimProblem = {
  title: 'AI-Powered Peak-Hour Traffic Decongestion & Adaptive Signal Control',
  department: 'Ministry of Road Transport & Highways (MoRTH) & Delhi Traffic Police',
  statement:
    'Need a scalable, edge-AI and camera-integrated traffic prediction and dynamic corridor synchronization solution to reduce peak-hour congestion across high-density Delhi-NCR corridors (ITO, Ring Road, Dhaula Kuan, Vikas Marg).',
  outcome: 'Measurable 30% reduction in average commute delay and corridor congestion',
  budgetMin: 35,
  budgetMax: 60,
  timelineMonths: 6,
  eligibility: 'DPIIT-recognized Startups with working prototype & GFR 2017 compliance',
  deadlineDays: 30,
  isPosted: true,
};

// Helper: Compute weighted AI Overall Score (derived, never hardcoded)
export function computeOverallAIScore(parameters: ScoredParameter[]): number {
  const sum = parameters.reduce((acc, p) => acc + (p.score * p.weight) / 100, 0);
  return Math.round(sum * 10) / 10;
}

// Helper: Compute G2 Value Score
// Formula: G2 Value Score = (Overall Quality Score x 60%) + (Cost Efficiency x 25%) + (Impact Potential x 15%)
export function computeG2ValueScore(
  qualityScore: number,
  costLakhs: number,
  impactScore: number
): G2ValueBreakdown {
  // Benchmark cost: 50 Lakhs. If cost <= 25L, efficiency = 100; if cost >= 50L, efficiency = 60
  const costEff = Math.max(50, Math.min(100, Math.round(100 - (costLakhs - 25) * 1.6)));
  const compQuality = Math.round(qualityScore * 0.6 * 10) / 10;
  const compCost = Math.round(costEff * 0.25 * 10) / 10;
  const compImpact = Math.round(impactScore * 0.15 * 10) / 10;
  const total = Math.round((compQuality + compCost + compImpact) * 10) / 10;

  return {
    overallQualityScore: qualityScore,
    overallQualityComponent: compQuality,
    costEfficiencyScore: costEff,
    costEfficiencyComponent: compCost,
    impactPotentialScore: impactScore,
    impactPotentialComponent: compImpact,
    total,
  };
}

// Helper: Derive prototype overall result from 15 parameters
export function computePrototypeOverallResult(parameters: PrototypeTestParameter[]): {
  overallResult: 'Pass' | 'Conditional Pass' | 'Fail';
  failedMandatoryReason: string | null;
} {
  const mandatoryParams = ['Functional correctness', 'Security', 'Compliance validation', 'Integration'];

  const failedMandatory = parameters.find(
    p => mandatoryParams.includes(p.name) && p.result === 'Fail'
  );

  if (failedMandatory) {
    return {
      overallResult: 'Fail',
      failedMandatoryReason: `Critical mandatory parameter "${failedMandatory.name}" failed lab audit: ${failedMandatory.justification}`,
    };
  }

  const anyFail = parameters.some(p => p.result === 'Fail');
  if (anyFail) {
    return {
      overallResult: 'Fail',
      failedMandatoryReason: 'One or more secondary parameters failed benchmarks without approved exception.',
    };
  }

  const anyConditional = parameters.some(p => p.result === 'Conditional');
  if (anyConditional) {
    return {
      overallResult: 'Conditional Pass',
      failedMandatoryReason: null,
    };
  }

  return {
    overallResult: 'Pass',
    failedMandatoryReason: null,
  };
}

// Helper: Derive final selection checklist & blocking items
export function computeFinalSelectionStatus(
  startup: Partial<EvaluationStartup>
): FinalSelectionData {
  const isEligibilityPass = startup.eligibility?.status === 'Eligible';
  const protoParams = startup.prototypeTesting?.parameters || [];
  const overallProtoResult = startup.prototypeTesting?.overallResult || 'Fail';

  const funcPass = protoParams.find(p => p.name === 'Functional correctness')?.result === 'Pass';
  const secPass = protoParams.find(p => p.name === 'Security')?.result === 'Pass';
  const integPass = protoParams.find(p => p.name === 'Integration')?.result !== 'Fail';
  const costPass = protoParams.find(p => p.name === 'Cost validation')?.result === 'Pass';
  const deptApproved =
    startup.departmentReview?.decision === 'Approve for Prototype' ||
    startup.departmentReview?.decision === 'Keep on Reserve';

  const checklist = [
    {
      key: 'eligibility',
      label: 'Eligibility Gate Cleared',
      isMandatory: true,
      isPassed: isEligibilityPass,
      justification: isEligibilityPass
        ? 'DPIIT certificate verified, zero conflict of interest, GFR 2017 rule 149 compliant.'
        : 'Incomplete compliance declaration or pending DPIIT verification.',
    },
    {
      key: 'prototype_func',
      label: 'Prototype Functionality Pass',
      isMandatory: true,
      isPassed: funcPass,
      justification: funcPass
        ? 'STQC Lab verified all core routing and prediction features.'
        : 'Functional correctness did not meet mandatory lab criteria.',
    },
    {
      key: 'security_pass',
      label: 'Security & Privacy Audit Pass',
      isMandatory: true,
      isPassed: secPass,
      justification: secPass
        ? 'CERT-In vulnerability scan returned zero critical or high findings.'
        : 'Security vulnerability or buffer overflow identified during SAST/DAST audit.',
    },
    {
      key: 'integration_pass',
      label: 'Integration Feasibility Pass',
      isMandatory: true,
      isPassed: integPass,
      justification: integPass
        ? 'Successfully integrated with department signal controller APIs.'
        : 'Signal controller sync latency exceeds acceptable threshold.',
    },
    {
      key: 'cost_validation',
      label: 'Cost Validation Pass',
      isMandatory: true,
      isPassed: costPass,
      justification: costPass
        ? `Quoted cost of ₹${startup.cost} Lakhs is verified against itemized BoM with no hidden fees.`
        : 'Cost validation pending line-item hardware breakdown audit.',
    },
    {
      key: 'budget_available',
      label: 'Pilot Budget Allocation Available',
      isMandatory: true,
      isPassed: (startup.cost || 0) <= SIMULATION_PROBLEM.budgetMax,
      justification: `Requested ₹${startup.cost}L is within MoRTH sanctioned ceiling of ₹${SIMULATION_PROBLEM.budgetMax}L.`,
    },
    {
      key: 'kpi_plan',
      label: 'KPI Measurement & Telemetry Plan',
      isMandatory: true,
      isPassed: true,
      justification: 'Automated 15-minute congestion telemetry and delay metrics pipeline active.',
    },
    {
      key: 'timeline_present',
      label: 'Implementation & Rollout Timeline',
      isMandatory: true,
      isPassed: true,
      justification: '6-month phased rollout plan (1mo sandbox, 2mo corridor, 3mo full pilot) verified.',
    },
    {
      key: 'risk_mitigation',
      label: 'Risk Mitigation & Rollback Protocol',
      isMandatory: true,
      isPassed: true,
      justification: 'Fail-safe manual signal override protocol guaranteed with zero downtime.',
    },
    {
      key: 'human_approval',
      label: 'Departmental Human Officer Approval',
      isMandatory: true,
      isPassed: deptApproved,
      justification: deptApproved
        ? `Recorded by ${startup.departmentReview?.reviewer || 'MoRTH Committee'} under digital signature.`
        : 'Department review decision is currently pending or marked for rejection.',
    },
  ];

  const blockingItems: string[] = [];
  checklist.forEach(item => {
    if (item.isMandatory && !item.isPassed) {
      blockingItems.push(`${item.label}: ${item.justification}`);
    }
  });

  const isEligibleForPilot = blockingItems.length === 0 && overallProtoResult !== 'Fail';

  return {
    isEligibleForPilot,
    isFinallySelected: startup.finalSelection?.isFinallySelected || false,
    blockingItems,
    checklist,
    workOrderNumber: startup.finalSelection?.workOrderNumber,
    sanctionAmount: startup.finalSelection?.sanctionAmount,
  };
}

// 10 PRE-LOADED STARTUPS WITH COMPLETE JUSTIFICATIONS ACROSS ALL 5 LAYERS
export const INITIAL_EVALUATION_STARTUPS: EvaluationStartup[] = [
  // 1. TechStart Solutions (Exact Worked Example from Master Prompt)
  {
    id: 's1',
    category: 'G1',
    name: 'TechStart Solutions',
    cost: 45,
    dpiitNumber: 'DIPP-89210-DL',
    solutionTitle: 'UrbanFlow AI: Dynamic Reinforcement Learning Signal Synchronizer',
    solutionSummary:
      'Edge-AI cameras coupled with decentralized reinforcement learning signal controllers for real-time congestion mitigation.',
    techStack: ['YOLOv8 Edge', 'PyTorch RL', 'gRPC API', 'Kubernetes'],
    contactEmail: 'contact@techstartsolutions.in',
    eligibility: {
      status: 'Eligible',
      checks: [
        {
          parameter: 'Startup recognition',
          result: 'Eligible',
          isPassed: true,
          isMandatory: true,
          justification: 'DPIIT recognition certificate #DIPP-89210-DL verified active on Startup India API.',
          evidence: ['Startup India certificate valid until 2031', 'MCA CIN: U72900DL2022PTC398120'],
        },
        {
          parameter: 'Submission deadline',
          result: 'Accept',
          isPassed: true,
          isMandatory: true,
          justification: 'Submitted 12 days before the published portal deadline with complete cryptographic signature.',
          evidence: ['Timestamp: 2026-08-20T14:22:10 IST', 'Server ingest token verified'],
        },
        {
          parameter: 'Mandatory fields complete',
          result: 'Complete',
          isPassed: true,
          isMandatory: true,
          justification: 'All 14 technical specification blocks, BoM breakdown, and milestone milestones fully articulated.',
        },
        {
          parameter: 'Required documents uploaded',
          result: 'Complete',
          isPassed: true,
          isMandatory: true,
          justification: 'Audited balance sheet, DPIIT certificate, architecture blueprint, and GST registration uploaded.',
        },
        {
          parameter: 'Challenge-specific eligibility',
          result: 'Eligible',
          isPassed: true,
          isMandatory: true,
          justification: 'Direct domain match in Intelligent Transportation Systems (ITS) & Edge Computing for Delhi-NCR.',
        },
        {
          parameter: 'Conflict of interest',
          result: 'Clear',
          isPassed: true,
          isMandatory: true,
          justification: 'Self-declaration clear: zero kinship or commercial ties with MoRTH evaluating committee members.',
        },
        {
          parameter: 'Duplicate submission check',
          result: 'Valid',
          isPassed: true,
          isMandatory: true,
          justification: 'Vector cosine similarity score 0.12 against portal corpus; completely original proposal.',
        },
        {
          parameter: 'Mandatory compliance declarations',
          result: 'Eligible',
          isPassed: true,
          isMandatory: true,
          justification: 'Explicit adherence to DPDP Act 2023, GFR 2017 Rule 149 exemption, and CERT-In guidelines.',
        },
      ],
      blockingReason: null,
    },
    aiEvaluation: {
      overallScore: 95,
      confidence: 'High',
      recommendation: 'G1 candidate',
      duplicateFlag: false,
      complianceRiskFlag: false,
      parameters: [
        {
          name: 'Problem-Solution Fit',
          weight: 20,
          score: 98,
          justification:
            'Directly targets peak-hour corridor congestion with a measurable 30% reduction target matching the department stated outcome.',
          evidence: [
            'Problem mapping to MoRTH corridor specs',
            'Field telemetry data from ITO-Vikas Marg',
            '30% congestion KPI reduction baseline model',
          ],
          confidence: 'High',
        },
        {
          name: 'Technical Feasibility',
          weight: 15,
          score: 92,
          justification:
            'Working MVP demonstrated with clear architecture and a realistic phased rollout plan.',
          evidence: [
            'Edge computing node specs',
            'Microservices API documentation',
            'Phased 3-stage deployment blueprint',
          ],
          confidence: 'High',
        },
        {
          name: 'Innovation and Differentiation',
          weight: 15,
          score: 94,
          justification:
            'Proprietary predictive routing model, not a generic traffic-camera dashboard; no similarity flags against other proposals.',
          evidence: [
            'Proprietary RL routing neural net',
            'Prior-art patent search clear',
            'Zero duplicate embeddings against corpus',
          ],
          confidence: 'High',
        },
        {
          name: 'Impact Potential',
          weight: 15,
          score: 97,
          justification:
            'KPIs defined (congestion %, average commute time, fuel savings) with a credible beneficiary-reach estimate across major corridors.',
          evidence: [
            'Commute time reduction simulation',
            'Fuel consumption & CO2 savings model',
            '500,000 daily commuter catchment',
          ],
          confidence: 'High',
        },
        {
          name: 'Cost-Effectiveness',
          weight: 15,
          score: 90,
          justification:
            'Cost breakup itemized (hardware, cloud, maintenance); proposed cost is realistic for the scope, not underpriced.',
          evidence: [
            'Detailed BoM (Hardware: 18L, Cloud: 12L, Team: 15L)',
            'No hidden recurring vendor lock-in',
          ],
          confidence: 'High',
        },
        {
          name: 'Scalability',
          weight: 10,
          score: 96,
          justification:
            'Cloud architecture designed for multi-district rollout with a repeatable deployment/training model.',
          evidence: [
            'Containerized Kubernetes multi-cluster',
            'District rollout runbook',
            'Edge OTA firmware update support',
          ],
          confidence: 'High',
        },
        {
          name: 'Team Capability',
          weight: 5,
          score: 95,
          justification:
            'Team has prior traffic-analytics deployments and named domain advisors.',
          evidence: [
            'IIT Delhi ITS lab alumni founders',
            'Ex-NHAI technical advisor on board',
            '12 full-time AI/IoT engineers',
          ],
          confidence: 'High',
        },
        {
          name: 'Risk and Compliance',
          weight: 5,
          score: 98,
          justification:
            'Data privacy plan, cybersecurity controls, and IP ownership terms all present and clearly stated.',
          evidence: [
            'CERT-In L1 audit readiness plan',
            'DPDP Act 2023 compliance checklist',
            '100% GoI IP ownership agreement',
          ],
          confidence: 'High',
        },
      ],
      strengths: [
        'Proprietary edge reinforcement learning algorithms',
        'Demonstrated working hardware in lab environment',
        'Complete end-to-end data residency on NIC MeghRaj cloud',
      ],
      missingInformation: [],
      g2ValueScore: computeG2ValueScore(95, 45, 97),
    },
    departmentReview: {
      decision: 'Approve for Prototype',
      overridesAI: false,
      overrideReason: '',
      reviewer: 'Shri A. K. Sharma (Joint Secretary, MoRTH Tech Committee)',
      reviewedAt: '2026-08-28T11:30:00 IST',
      notes: [
        {
          parameter: 'Departmental priority alignment',
          answer: 'Exemplary',
          justification: 'Aligned directly with PM GatiShakti National Master Plan for urban bottleneck resolution.',
        },
        {
          parameter: 'Problem relevance',
          answer: 'Exemplary',
          justification: 'Targets high-frequency commuter corridors with severe peak-hour bottlenecks.',
        },
        {
          parameter: 'Government workflow fit',
          answer: 'Satisfactory',
          justification: 'Provides dedicated officer dashboard with role-based access control.',
        },
        {
          parameter: 'Procurement/pilot feasibility',
          answer: 'Satisfactory',
          justification: 'Exempt under GFR 149 for innovative prototype deployment.',
        },
        {
          parameter: 'Budget availability',
          answer: 'Approved',
          justification: 'Within central urban decongestion pilot grant allocation.',
        },
        {
          parameter: 'Public value for money',
          answer: 'Exemplary',
          justification: 'Delivers estimated 3.8x socio-economic return in saved fuel and commuter hours.',
        },
        {
          parameter: 'Data readiness',
          answer: 'Satisfactory',
          justification: 'Camera feeds from Delhi Traffic Police command center can be bridged securely.',
        },
        {
          parameter: 'Integration feasibility',
          answer: 'Satisfactory',
          justification: 'Uses standard NTCIP and Modbus protocols compatible with traffic signal controllers.',
        },
        {
          parameter: 'Data privacy',
          answer: 'Approved',
          justification: 'Edge blurring of license plates and pedestrian faces guarantees zero PII storage.',
        },
        {
          parameter: 'Cybersecurity',
          answer: 'Approved',
          justification: 'TLS 1.3 encrypted data pipes and mTLS hardware authentication.',
        },
        {
          parameter: 'IP and ownership',
          answer: 'Approved',
          justification: 'Govt retains perpetual royalty-free non-exclusive license for national scaling.',
        },
        {
          parameter: 'Implementation timeline',
          answer: 'Satisfactory',
          justification: 'Phase 1 live within 45 days at designated ITO test corridor.',
        },
        {
          parameter: 'Training requirements',
          answer: 'Satisfactory',
          justification: '2-week operator training program included in scope of work.',
        },
        {
          parameter: 'Support and maintenance',
          answer: 'Approved',
          justification: '24/7 SLA with 4-hour MTTR included for 12 months.',
        },
        {
          parameter: 'Startup execution capacity',
          answer: 'Exemplary',
          justification: 'Dedicated 12-member engineering team based in Okhla, New Delhi.',
        },
        {
          parameter: 'Risk management',
          answer: 'Satisfactory',
          justification: 'Fallback to fixed-cycle timer mode on any sensor or network dropout.',
        },
        {
          parameter: 'Inclusiveness/accessibility',
          answer: 'Satisfactory',
          justification: 'Special priority lane optimization for emergency vehicles (ambulances/fire engines).',
        },
        {
          parameter: 'Conflict of interest',
          answer: 'Approved',
          justification: 'Independent scrutiny confirmed zero pecuniary conflict.',
        },
      ],
      auditLog: [
        {
          timestamp: '2026-08-28T11:30:00 IST',
          actor: 'Shri A. K. Sharma (Joint Secretary)',
          action: 'DECISION_SAVED',
          reason: 'Consensus approval based on highest AI score (95/100) and verified MVP feasibility.',
        },
      ],
    },
    prototypeTesting: {
      overallResult: 'Pass',
      failedMandatoryReason: null,
      testedByLab: 'Standardisation Testing and Quality Certification (STQC) Directorate, Delhi',
      testCertificateId: 'STQC-2026-ITS-0941',
      parameters: [
        {
          name: 'Functional correctness',
          isMandatory: true,
          result: 'Pass',
          evidence: '100% automated regression test suite passed (48/48 test vectors).',
          justification: 'All core routing and prediction features worked in the demo against the defined test cases.',
        },
        {
          name: 'Accuracy / quality',
          isMandatory: false,
          result: 'Pass',
          evidence: 'STQC test corridor sensor comparison.',
          justification: 'Vehicle density prediction achieved 94.2% accuracy against ground truth loops.',
        },
        {
          name: 'Performance',
          isMandatory: false,
          result: 'Pass',
          evidence: 'JMeter load test telemetry log.',
          justification: 'Handled 10,000 concurrent simulated users within target response time (<120ms).',
        },
        {
          name: 'Scalability',
          isMandatory: false,
          result: 'Pass',
          evidence: 'CloudWatch auto-scale audit.',
          justification: 'Dynamic auto-scaling scaled from 2 to 16 nodes within 45 seconds without packet drops.',
        },
        {
          name: 'Security',
          isMandatory: true,
          result: 'Pass',
          evidence: 'OWASP Top 10 & SAST/DAST report with zero high CVEs.',
          justification: 'Vulnerability scan returned no critical or high findings.',
        },
        {
          name: 'Privacy',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Edge blur filter validation log.',
          justification: 'All video streams anonymized at edge before cloud ingest; no license plate PII stored.',
        },
        {
          name: 'Integration',
          isMandatory: true,
          result: 'Pass',
          evidence: 'REST/gRPC traffic controller harness log.',
          justification: 'Successfully connected to a mock traffic-signal API with <50ms sync latency.',
        },
        {
          name: 'Usability',
          isMandatory: false,
          result: 'Pass',
          evidence: '3 MoRTH traffic operator usability trials.',
          justification: 'Department control room UI scored 88/100 on System Usability Scale (SUS).',
        },
        {
          name: 'Accessibility',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Axe Accessibility audit clean report.',
          justification: 'Meets GIGW 3.0 & WCAG 2.1 AA contrast and screen-reader standards.',
        },
        {
          name: 'Deployment readiness',
          isMandatory: false,
          result: 'Pass',
          evidence: 'NIC MeghRaj deployment test run.',
          justification: 'Single-command Docker-compose and Helm charts tested on MeghRaj cloud sandbox.',
        },
        {
          name: 'Reliability',
          isMandatory: false,
          result: 'Pass',
          evidence: '72hr MTBF endurance run report.',
          justification: '72-hour continuous stress soak test with zero crashes or memory leaks.',
        },
        {
          name: 'Maintainability',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Code coverage 89% with SonarQube Quality Gate A.',
          justification: 'Comprehensive Swagger API specs, modular code documentation, and CI/CD pipelines.',
        },
        {
          name: 'Cost validation',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Finance committee itemized quotation audit.',
          justification: 'Rs 45 Lakh proposed cost matches itemized hardware/cloud breakup with no hidden costs found.',
        },
        {
          name: 'Compliance validation',
          isMandatory: true,
          result: 'Pass',
          evidence: 'Statutory compliance certificate #STQC-2026-9081.',
          justification: 'Fully verified against GFR 2017 Rule 149/194 and DPIIT guidelines.',
        },
        {
          name: 'Pilot KPI readiness',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Live Grafana KPI stream verification.',
          justification: 'Real-time telemetry dashboards for MoRTH officers are fully operational.',
        },
      ],
    },
    finalSelection: {
      isEligibleForPilot: true,
      isFinallySelected: true,
      blockingItems: [],
      checklist: [],
      workOrderNumber: 'MORTH/DPIIT/2026/WO-882',
      sanctionAmount: 4500000,
    },
  },

  // 2. InnovateX Pvt Ltd (G1 Rank #2)
  {
    id: 's2',
    category: 'G1',
    name: 'InnovateX Pvt Ltd',
    cost: 28,
    dpiitNumber: 'DIPP-77412-KA',
    solutionTitle: 'OptiGrid: Lightweight Edge Sensor Matrix & Traffic Flow Orchestrator',
    solutionSummary:
      'Solar-powered IoT sensors with micro-radar arrays for vehicle queue tracking and dynamic signal green-wave tuning.',
    techStack: ['Micro-Radar IoT', 'MQTT Broker', 'Rust Backend', 'TimescaleDB'],
    contactEmail: 'contact@innovatex.tech',
    eligibility: {
      status: 'Eligible',
      checks: [
        {
          parameter: 'Startup recognition',
          result: 'Eligible',
          isPassed: true,
          isMandatory: true,
          justification: 'Active DPIIT registration verified with Karnataka Startup Cell endorsement.',
        },
        {
          parameter: 'Submission deadline',
          result: 'Accept',
          isPassed: true,
          isMandatory: true,
          justification: 'Submitted on time with complete technical annexures.',
        },
        {
          parameter: 'Mandatory fields complete',
          result: 'Complete',
          isPassed: true,
          isMandatory: true,
          justification: 'All sections filled in detail.',
        },
        {
          parameter: 'Required documents uploaded',
          result: 'Complete',
          isPassed: true,
          isMandatory: true,
          justification: 'Hardware spec sheets and electrical safety certificates provided.',
        },
        {
          parameter: 'Challenge-specific eligibility',
          result: 'Eligible',
          isPassed: true,
          isMandatory: true,
          justification: 'Meets all criteria for IoT sensors and green-wave signal tuning.',
        },
        {
          parameter: 'Conflict of interest',
          result: 'Clear',
          isPassed: true,
          isMandatory: true,
          justification: 'Zero conflict identified.',
        },
        {
          parameter: 'Duplicate submission check',
          result: 'Valid',
          isPassed: true,
          isMandatory: true,
          justification: 'Novel hardware radar approach with unique schematic designs.',
        },
        {
          parameter: 'Mandatory compliance declarations',
          result: 'Eligible',
          isPassed: true,
          isMandatory: true,
          justification: 'BIS and WPC wireless compliance declared.',
        },
      ],
      blockingReason: null,
    },
    aiEvaluation: {
      overallScore: 93,
      confidence: 'High',
      recommendation: 'G1 candidate',
      duplicateFlag: false,
      complianceRiskFlag: false,
      parameters: [
        {
          name: 'Problem-Solution Fit',
          weight: 20,
          score: 95,
          justification:
            'Radar-based vehicle detection eliminates camera occlusion during Delhi winter smog and fog conditions.',
          evidence: ['Micro-radar performance in 0-visibility fog', 'Corridor vehicle queue length telemetry'],
          confidence: 'High',
        },
        {
          name: 'Technical Feasibility',
          weight: 15,
          score: 94,
          justification:
            'Self-contained solar nodes simplify installation without digging up road asphalt for wiring.',
          evidence: ['Pole-mounted solar battery unit', 'IP67 weatherproofing certificate'],
          confidence: 'High',
        },
        {
          name: 'Innovation and Differentiation',
          weight: 15,
          score: 92,
          justification:
            'Combines radar telemetry with decentralized edge green-wave consensus across junctions.',
          evidence: ['Peer-to-peer LoRaWAN signal coordination protocol'],
          confidence: 'High',
        },
        {
          name: 'Impact Potential',
          weight: 15,
          score: 93,
          justification:
            'Simulations demonstrate 26% reduction in stop-and-go delays on Ring Road arterial stretches.',
          evidence: ['Traffic micro-simulation in SUMO simulator'],
          confidence: 'High',
        },
        {
          name: 'Cost-Effectiveness',
          weight: 15,
          score: 96,
          justification:
            'Remarkably low initial CapEx of ₹28 Lakhs with minimal recurring cloud and power expenses.',
          evidence: ['Itemized hardware BOM (₹14L for 20 junctions, ₹8L software, ₹6L pilot ops)'],
          confidence: 'High',
        },
        {
          name: 'Scalability',
          weight: 10,
          score: 91,
          justification:
            'Modular junction units can be expanded independently across 100+ intersections.',
          evidence: ['Plug-and-play junction controller architecture'],
          confidence: 'High',
        },
        {
          name: 'Team Capability',
          weight: 5,
          score: 90,
          justification:
            'Team has deployed radar sensors with Bengaluru Traffic Police on Outer Ring Road.',
          evidence: ['Bengaluru BBMP trial certificate of completion'],
          confidence: 'Medium',
        },
        {
          name: 'Risk and Compliance',
          weight: 5,
          score: 88,
          justification:
            'Requires WPC frequency allocation clearance for 24GHz radar bands.',
          evidence: ['ETA clearance application copy submitted'],
          confidence: 'Medium',
        },
      ],
      strengths: ['Fog-resistant radar sensing', 'Extremely attractive price point (₹28L)', 'Rapid installation without road digging'],
      missingInformation: [],
      g2ValueScore: computeG2ValueScore(93, 28, 93),
    },
    departmentReview: {
      decision: 'Approve for Prototype',
      overridesAI: false,
      overrideReason: '',
      reviewer: 'Dr. V. Ramanathan (Technical Member, MoRTH)',
      reviewedAt: '2026-08-28T14:15:00 IST',
      notes: [
        {
          parameter: 'Departmental priority alignment',
          answer: 'Exemplary',
          justification: 'Crucial for Delhi winter fog where optical cameras routinely fail.',
        },
        {
          parameter: 'Public value for money',
          answer: 'Exemplary',
          justification: 'Top-tier cost-to-benefit ratio at ₹28 Lakhs.',
        },
        {
          parameter: 'Integration feasibility',
          answer: 'Needs Clarification',
          justification: 'Legacy SCATS controllers require specialized RS-485 interface card.',
        },
      ],
      auditLog: [
        {
          timestamp: '2026-08-28T14:15:00 IST',
          actor: 'Dr. V. Ramanathan',
          action: 'DECISION_SAVED',
          reason: 'Approved for secondary pilot trial due to all-weather fog reliability.',
        },
      ],
    },
    prototypeTesting: {
      overallResult: 'Conditional Pass',
      failedMandatoryReason: null,
      testedByLab: 'C-DAC Electronics Quality Testing Lab, Noida',
      testCertificateId: 'CDAC-2026-TST-8812',
      parameters: [
        {
          name: 'Functional correctness',
          isMandatory: true,
          result: 'Pass',
          evidence: 'Vehicle counting accuracy verified at 93.8%.',
          justification: 'All detection algorithms executed successfully.',
        },
        {
          name: 'Accuracy / quality',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Benchmarked against inductive loop ground truth.',
          justification: 'Speed estimation accurate within ±2.5 km/h.',
        },
        {
          name: 'Performance',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Telemetry sync latency < 80ms.',
          justification: 'Edge compute cycles well within 250ms control loop.',
        },
        {
          name: 'Scalability',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Mesh network sustained 50 concurrent nodes.',
          justification: 'LoRa mesh scales across multi-hop corridor topology.',
        },
        {
          name: 'Security',
          isMandatory: true,
          result: 'Pass',
          evidence: 'Firmware cryptographic signature verification enabled.',
          justification: 'No open ports or unauthorized telnet access.',
        },
        {
          name: 'Privacy',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Zero optical video captured; only point-cloud velocity vectors.',
          justification: 'Total privacy compliance by design.',
        },
        {
          name: 'Integration',
          isMandatory: true,
          result: 'Conditional',
          evidence: 'RS-485 handshake timed out on legacy 1998 signal models.',
          justification: 'Requires minor firmware patch to support legacy 9600 baud SCATS signals.',
        },
        {
          name: 'Usability',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Clean web portal for field technicians.',
          justification: 'Diagnostic portal functional and intuitive.',
        },
        {
          name: 'Accessibility',
          isMandatory: false,
          result: 'Pass',
          evidence: 'High-contrast mobile UI for field linemen.',
          justification: 'Meets basic outdoor viewing accessibility.',
        },
        {
          name: 'Deployment readiness',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Field installation completed in under 25 minutes per pole.',
          justification: 'Rapid mounting bracket verified.',
        },
        {
          name: 'Reliability',
          isMandatory: false,
          result: 'Pass',
          evidence: '48hr environmental thermal chamber test (-5°C to 50°C).',
          justification: 'Zero thermal throttling observed.',
        },
        {
          name: 'Maintainability',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Modular battery and transceiver replacement.',
          justification: 'Quick-release design enables 5-minute field swaps.',
        },
        {
          name: 'Cost validation',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Quotation verified against direct manufacturer invoices.',
          justification: 'Price validated with high component margin transparency.',
        },
        {
          name: 'Compliance validation',
          isMandatory: true,
          result: 'Pass',
          evidence: 'WPC Equipment Type Approval (ETA) received.',
          justification: 'Complies with Indian wireless telegraphy standards.',
        },
        {
          name: 'Pilot KPI readiness',
          isMandatory: false,
          result: 'Pass',
          evidence: 'Queue length stream verified.',
          justification: 'Telemetry feeds directly into MoRTH analytics bridge.',
        },
      ],
    },
    finalSelection: {
      isEligibleForPilot: true,
      isFinallySelected: false,
      blockingItems: [],
      checklist: [],
    },
  },

  // 3. SmartCity Labs (G1 Rank #3, but FAILS security testing)
  {
    id: 's3',
    category: 'G1',
    name: 'SmartCity Labs',
    cost: 40,
    dpiitNumber: 'DIPP-66129-MH',
    solutionTitle: 'CitySense: Multi-Spectral Vision & Deep Traffic Prediction Platform',
    solutionSummary:
      'Thermal-RGB vision cameras with centralized cloud neural net for predictive traffic signal scheduling.',
    techStack: ['PyTorch', 'TensorRT', 'Flask', 'PostgreSQL'],
    contactEmail: 'info@smartcitylabs.org',
    eligibility: {
      status: 'Eligible',
      checks: [
        { parameter: 'Startup recognition', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Valid DPIIT certificate.' },
        { parameter: 'Submission deadline', result: 'Accept', isPassed: true, isMandatory: true, justification: 'Submitted on schedule.' },
        { parameter: 'Mandatory fields complete', result: 'Complete', isPassed: true, isMandatory: true, justification: 'All technical sections complete.' },
        { parameter: 'Required documents uploaded', result: 'Complete', isPassed: true, isMandatory: true, justification: 'All mandatory attachments present.' },
        { parameter: 'Challenge-specific eligibility', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'ITS domain match.' },
        { parameter: 'Conflict of interest', result: 'Clear', isPassed: true, isMandatory: true, justification: 'No conflict reported.' },
        { parameter: 'Duplicate submission check', result: 'Valid', isPassed: true, isMandatory: true, justification: 'Original algorithm architecture.' },
        { parameter: 'Mandatory compliance declarations', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Signed statutory declarations.' },
      ],
      blockingReason: null,
    },
    aiEvaluation: {
      overallScore: 91,
      confidence: 'High',
      recommendation: 'G1 candidate',
      duplicateFlag: false,
      complianceRiskFlag: false,
      parameters: [
        { name: 'Problem-Solution Fit', weight: 20, score: 94, justification: 'Strong problem-solution alignment with multi-spectral cameras.', evidence: ['Multi-spectral camera specs'], confidence: 'High' },
        { name: 'Technical Feasibility', weight: 15, score: 90, justification: 'Centralized model requires high-bandwidth fiber optic connectivity.', evidence: ['Bandwidth calculation doc'], confidence: 'Medium' },
        { name: 'Innovation and Differentiation', weight: 15, score: 92, justification: 'Thermal camera integration provides night vision clarity.', evidence: ['Thermal camera night test dataset'], confidence: 'High' },
        { name: 'Impact Potential', weight: 15, score: 91, justification: 'Demonstrates 24% travel time improvement in simulation.', evidence: ['Simulation test run report'], confidence: 'High' },
        { name: 'Cost-Effectiveness', weight: 15, score: 88, justification: 'Thermal cameras drive higher hardware unit costs.', evidence: ['Thermal sensor BOM (₹22L)'], confidence: 'Medium' },
        { name: 'Scalability', weight: 10, score: 89, justification: 'Scalable across high-bandwidth metro corridors.', evidence: ['Cloud ingest architecture'], confidence: 'Medium' },
        { name: 'Team Capability', weight: 5, score: 92, justification: 'Strong computer vision PhD team from IIT Bombay.', evidence: ['Team publication list'], confidence: 'High' },
        { name: 'Risk and Compliance', weight: 5, score: 86, justification: 'Heavy cloud streaming poses data transmission vulnerability risks.', evidence: ['Data in-transit security architecture'], confidence: 'Medium' },
      ],
      strengths: ['Multi-spectral thermal night vision', 'Strong computer vision team from IIT Bombay'],
      missingInformation: [],
      g2ValueScore: computeG2ValueScore(91, 40, 91),
    },
    departmentReview: {
      decision: 'Approve for Prototype',
      overridesAI: false,
      overrideReason: '',
      reviewer: 'Shri S. K. Meena (Director, MoRTH)',
      reviewedAt: '2026-08-29T10:00:00 IST',
      notes: [
        { parameter: 'Departmental priority alignment', answer: 'Satisfactory', justification: 'Multi-spectral capability aligns with night traffic monitoring.' },
      ],
      auditLog: [],
    },
    prototypeTesting: {
      overallResult: 'Fail',
      failedMandatoryReason:
        'CRITICAL SECURITY FAILURE: Hardcoded root credentials and buffer overflow found in edge camera firmware during STQC CERT-In audit.',
      testedByLab: 'STQC Testing Laboratory, Delhi',
      testCertificateId: 'STQC-2026-REJ-019',
      parameters: [
        { name: 'Functional correctness', isMandatory: true, result: 'Pass', evidence: 'Core signal timing functional.', justification: 'Passed functional suite.' },
        { name: 'Accuracy / quality', isMandatory: false, result: 'Pass', evidence: 'Thermal detection 92% accurate.', justification: 'Vision accuracy acceptable.' },
        { name: 'Performance', isMandatory: false, result: 'Pass', evidence: 'FPS rate 30fps steady.', justification: 'Meets frame rate standards.' },
        { name: 'Scalability', isMandatory: false, result: 'Pass', evidence: 'Stream broker handled 20 streams.', justification: 'Scalable streaming.' },
        {
          name: 'Security',
          isMandatory: true,
          result: 'Fail',
          evidence: 'CERT-In SAST scan detected hardcoded backdoor credentials and unpatched OpenSSL buffer overflow (CVE-2024-3094 vector).',
          justification: 'Failed mandatory security benchmark; vulnerable to unauthorized remote root hijack.',
        },
        { name: 'Privacy', isMandatory: false, result: 'Conditional', evidence: 'Thermal images store raw IR data.', justification: 'Thermal facial reconstruction risk.' },
        { name: 'Integration', isMandatory: true, result: 'Pass', evidence: 'NTCIP protocol connected.', justification: 'Signal controller integration working.' },
        { name: 'Usability', isMandatory: false, result: 'Pass', evidence: 'Control panel functional.', justification: 'UI meets requirements.' },
        { name: 'Accessibility', isMandatory: false, result: 'Pass', evidence: 'Standard web interface.', justification: 'Basic accessibility.' },
        { name: 'Deployment readiness', isMandatory: false, result: 'Conditional', evidence: 'Requires fiber pull at each junction.', justification: 'High civil infrastructure requirement.' },
        { name: 'Reliability', isMandatory: false, result: 'Pass', evidence: 'Thermal cameras ran for 48 hrs.', justification: 'No hardware overheating.' },
        { name: 'Maintainability', isMandatory: false, result: 'Pass', evidence: 'Modular Python codebase.', justification: 'Standard documentation.' },
        { name: 'Cost validation', isMandatory: false, result: 'Pass', evidence: 'Thermal hardware BoM matched.', justification: 'No budget discrepancy.' },
        { name: 'Compliance validation', isMandatory: true, result: 'Pass', evidence: 'DPIIT registration verified.', justification: 'Statutory papers valid.' },
        { name: 'Pilot KPI readiness', isMandatory: false, result: 'Pass', evidence: 'Dashboard streams data.', justification: 'Live monitoring ready.' },
      ],
    },
    finalSelection: {
      isEligibleForPilot: false,
      isFinallySelected: false,
      blockingItems: [
        'Security & Privacy Audit Pass: Failed mandatory security benchmark (CVE buffer overflow in edge firmware).',
      ],
      checklist: [],
    },
  },

  // 4. AI Traffic Co (G1 Rank #4)
  {
    id: 's4',
    category: 'G1',
    name: 'AI Traffic Co',
    cost: 38,
    dpiitNumber: 'DIPP-55201-HR',
    solutionTitle: 'NeuralSignal: Transformer-based Corridor Travel Time Minimizer',
    solutionSummary:
      'Spatial-temporal graph neural networks predicting traffic waves 20 minutes in advance across connecting junctions.',
    techStack: ['ST-GCN', 'FastAPI', 'Redis', 'Docker'],
    contactEmail: 'contact@aitraffic.in',
    eligibility: {
      status: 'Eligible',
      checks: [
        { parameter: 'Startup recognition', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'DPIIT certificate active.' },
        { parameter: 'Submission deadline', result: 'Accept', isPassed: true, isMandatory: true, justification: 'Timely submission verified.' },
        { parameter: 'Mandatory fields complete', result: 'Complete', isPassed: true, isMandatory: true, justification: 'Full specs provided.' },
        { parameter: 'Required documents uploaded', result: 'Complete', isPassed: true, isMandatory: true, justification: 'All documents present.' },
        { parameter: 'Challenge-specific eligibility', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'ITS domain match.' },
        { parameter: 'Conflict of interest', result: 'Clear', isPassed: true, isMandatory: true, justification: 'Clean declaration.' },
        { parameter: 'Duplicate submission check', result: 'Valid', isPassed: true, isMandatory: true, justification: 'Original graph neural network.' },
        { parameter: 'Mandatory compliance declarations', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Compliant.' },
      ],
      blockingReason: null,
    },
    aiEvaluation: {
      overallScore: 89,
      confidence: 'High',
      recommendation: 'G1 candidate',
      duplicateFlag: false,
      complianceRiskFlag: false,
      parameters: [
        { name: 'Problem-Solution Fit', weight: 20, score: 92, justification: 'Anticipatory signal tuning mitigates bottleneck shockwaves.', evidence: ['ST-GCN model simulation'], confidence: 'High' },
        { name: 'Technical Feasibility', weight: 15, score: 88, justification: 'Requires calibrated sensor inputs across whole arterial chain.', evidence: ['Sensor coverage map'], confidence: 'High' },
        { name: 'Innovation and Differentiation', weight: 15, score: 91, justification: 'Graph neural network maps inter-junction dependencies.', evidence: ['ArXiv paper citation'], confidence: 'High' },
        { name: 'Impact Potential', weight: 15, score: 90, justification: 'Simulated 22% delay reduction on Mathura Road corridor.', evidence: ['SUMO simulation file'], confidence: 'High' },
        { name: 'Cost-Effectiveness', weight: 15, score: 87, justification: 'Competitive pricing at ₹38 Lakhs.', evidence: ['Quotation breakdown'], confidence: 'High' },
        { name: 'Scalability', weight: 10, score: 88, justification: 'Graph models retrainable for new city grids.', evidence: ['Model transferability report'], confidence: 'Medium' },
        { name: 'Team Capability', weight: 5, score: 86, justification: 'Ex-Uber routing engineers on team.', evidence: ['Team resume audit'], confidence: 'High' },
        { name: 'Risk and Compliance', weight: 5, score: 88, justification: 'All data kept on local Indian VPS.', evidence: ['Data residency declaration'], confidence: 'High' },
      ],
      strengths: ['Graph neural network inter-junction synchronization', 'Experienced mobility team'],
      missingInformation: [],
      g2ValueScore: computeG2ValueScore(89, 38, 90),
    },
    departmentReview: {
      decision: 'Approve for Prototype',
      overridesAI: false,
      overrideReason: '',
      reviewer: 'Shri A. K. Sharma (Joint Secretary)',
      reviewedAt: '2026-08-29T12:00:00 IST',
      notes: [{ parameter: 'Departmental priority alignment', answer: 'Satisfactory', justification: 'Solid engineering approach.' }],
      auditLog: [],
    },
    prototypeTesting: {
      overallResult: 'Pass',
      failedMandatoryReason: null,
      testedByLab: 'STQC Testing Laboratory, Delhi',
      testCertificateId: 'STQC-2026-ITS-0955',
      parameters: [
        { name: 'Functional correctness', isMandatory: true, result: 'Pass', evidence: 'Passed 36 test scenarios.', justification: 'Prediction pipeline operational.' },
        { name: 'Accuracy / quality', isMandatory: false, result: 'Pass', evidence: 'Accuracy 91.4%.', justification: 'High predictive fidelity.' },
        { name: 'Performance', isMandatory: false, result: 'Pass', evidence: 'Latency < 150ms.', justification: 'Quick response time.' },
        { name: 'Scalability', isMandatory: false, result: 'Pass', evidence: 'Scales to 100 junctions.', justification: 'Cloud scalable.' },
        { name: 'Security', isMandatory: true, result: 'Pass', evidence: 'Zero vulnerabilities.', justification: 'Clean security audit.' },
        { name: 'Privacy', isMandatory: false, result: 'Pass', evidence: 'Anonymized count vectors.', justification: 'No PII stored.' },
        { name: 'Integration', isMandatory: true, result: 'Pass', evidence: 'NTCIP protocol connected.', justification: 'Signal sync verified.' },
        { name: 'Usability', isMandatory: false, result: 'Pass', evidence: 'Intuitive dashboard.', justification: 'SUS score 82.' },
        { name: 'Accessibility', isMandatory: false, result: 'Pass', evidence: 'WCAG compliant.', justification: 'Accessible design.' },
        { name: 'Deployment readiness', isMandatory: false, result: 'Pass', evidence: 'Dockerized images tested.', justification: 'Ready for pilot.' },
        { name: 'Reliability', isMandatory: false, result: 'Pass', evidence: '48hr endurance test clean.', justification: 'Zero crashes.' },
        { name: 'Maintainability', isMandatory: false, result: 'Pass', evidence: 'Comprehensive docs.', justification: 'Well-structured codebase.' },
        { name: 'Cost validation', isMandatory: false, result: 'Pass', evidence: 'BOM verified.', justification: 'Cost matches deliverables.' },
        { name: 'Compliance validation', isMandatory: true, result: 'Pass', evidence: 'DPIIT certified.', justification: 'Statutory rules satisfied.' },
        { name: 'Pilot KPI readiness', isMandatory: false, result: 'Pass', evidence: 'Real-time telemetry.', justification: 'Metrics active.' },
      ],
    },
    finalSelection: {
      isEligibleForPilot: true,
      isFinallySelected: false,
      blockingItems: [],
      checklist: [],
    },
  },

  // 5. GreenTech Innovations (G1 Rank #5)
  {
    id: 's5',
    category: 'G1',
    name: 'GreenTech Innovations',
    cost: 35,
    dpiitNumber: 'DIPP-44910-TS',
    solutionTitle: 'EcoGreen: Dynamic Signal Prioritization & Emissions Reduction Engine',
    solutionSummary:
      'Eco-routing algorithms prioritizing public transit buses and EV fleets to minimize idle fuel burn at major intersections.',
    techStack: ['Python', 'OpenCV', 'Django', 'PostgreSQL'],
    contactEmail: 'info@greentechinnovations.in',
    eligibility: {
      status: 'Eligible',
      checks: [
        { parameter: 'Startup recognition', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'DPIIT verified.' },
        { parameter: 'Submission deadline', result: 'Accept', isPassed: true, isMandatory: true, justification: 'Submitted on time.' },
        { parameter: 'Mandatory fields complete', result: 'Complete', isPassed: true, isMandatory: true, justification: 'All sections filled.' },
        { parameter: 'Required documents uploaded', result: 'Complete', isPassed: true, isMandatory: true, justification: 'All attachments present.' },
        { parameter: 'Challenge-specific eligibility', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'ITS & green transit domain.' },
        { parameter: 'Conflict of interest', result: 'Clear', isPassed: true, isMandatory: true, justification: 'No conflict.' },
        { parameter: 'Duplicate submission check', result: 'Valid', isPassed: true, isMandatory: true, justification: 'Original green priority routing.' },
        { parameter: 'Mandatory compliance declarations', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Compliant.' },
      ],
      blockingReason: null,
    },
    aiEvaluation: {
      overallScore: 87,
      confidence: 'High',
      recommendation: 'G1 candidate',
      duplicateFlag: false,
      complianceRiskFlag: false,
      parameters: [
        { name: 'Problem-Solution Fit', weight: 20, score: 88, justification: 'Transit signal priority decreases bus commute times.', evidence: ['DTC bus route simulation'], confidence: 'High' },
        { name: 'Technical Feasibility', weight: 15, score: 86, justification: 'GPS transponder integration with Delhi Transport Corporation buses.', evidence: ['DIMTS bus GPS feed API test'], confidence: 'High' },
        { name: 'Innovation and Differentiation', weight: 15, score: 89, justification: 'Direct carbon emissions accounting engine.', evidence: ['CO2 reduction model based on CPCB norms'], confidence: 'High' },
        { name: 'Impact Potential', weight: 15, score: 92, justification: 'Significant fuel reduction and public transit mode-share boost.', evidence: ['Commuter modal shift study'], confidence: 'High' },
        { name: 'Cost-Effectiveness', weight: 15, score: 89, justification: 'Good pricing at ₹35 Lakhs.', evidence: ['Cost itemization'], confidence: 'High' },
        { name: 'Scalability', weight: 10, score: 85, justification: 'Replicable across all BRT corridors in India.', evidence: ['BRT scaling blueprint'], confidence: 'Medium' },
        { name: 'Team Capability', weight: 5, score: 84, justification: 'Clean-tech founders from IIT Hyderabad.', evidence: ['Founder bios'], confidence: 'Medium' },
        { name: 'Risk and Compliance', weight: 5, score: 86, justification: 'Secure GPS ingestion pipeline.', evidence: ['Data encryption spec'], confidence: 'High' },
      ],
      strengths: ['Public transit bus priority', 'Carbon emission reduction KPI tracking'],
      missingInformation: [],
      g2ValueScore: computeG2ValueScore(87, 35, 92),
    },
    departmentReview: {
      decision: 'Approve for Prototype',
      overridesAI: false,
      overrideReason: '',
      reviewer: 'Shri A. K. Sharma (Joint Secretary)',
      reviewedAt: '2026-08-29T15:00:00 IST',
      notes: [{ parameter: 'Departmental priority alignment', answer: 'Exemplary', justification: 'Aligns with clean air initiatives.' }],
      auditLog: [],
    },
    prototypeTesting: {
      overallResult: 'Pass',
      failedMandatoryReason: null,
      testedByLab: 'STQC Testing Laboratory, Delhi',
      testCertificateId: 'STQC-2026-ITS-0968',
      parameters: [
        { name: 'Functional correctness', isMandatory: true, result: 'Pass', evidence: 'Bus priority trigger verified in 25/25 runs.', justification: 'Green wave trigger functional.' },
        { name: 'Accuracy / quality', isMandatory: false, result: 'Pass', evidence: 'GPS geofence accuracy within 5m.', justification: 'Geofencing verified.' },
        { name: 'Performance', isMandatory: false, result: 'Pass', evidence: 'Response latency < 100ms.', justification: 'Timely green extension.' },
        { name: 'Scalability', isMandatory: false, result: 'Pass', evidence: '500 bus feeds simulated.', justification: 'High throughput.' },
        { name: 'Security', isMandatory: true, result: 'Pass', evidence: 'No vulnerabilities detected.', justification: 'Passed security audit.' },
        { name: 'Privacy', isMandatory: false, result: 'Pass', evidence: 'Only bus fleet IDs used.', justification: 'Zero personal data.' },
        { name: 'Integration', isMandatory: true, result: 'Pass', evidence: 'DIMTS GPS API connected.', justification: 'Transit integration working.' },
        { name: 'Usability', isMandatory: false, result: 'Pass', evidence: 'Clean UI.', justification: 'SUS score 85.' },
        { name: 'Accessibility', isMandatory: false, result: 'Pass', evidence: 'Accessible design.', justification: 'Meets standards.' },
        { name: 'Deployment readiness', isMandatory: false, result: 'Pass', evidence: 'Cloud-ready deploy.', justification: 'Ready for deployment.' },
        { name: 'Reliability', isMandatory: false, result: 'Pass', evidence: '48hr soak test passed.', justification: 'Reliable execution.' },
        { name: 'Maintainability', isMandatory: false, result: 'Pass', evidence: 'Documented code.', justification: 'Maintainable structure.' },
        { name: 'Cost validation', isMandatory: false, result: 'Pass', evidence: 'Quotation verified.', justification: 'Cost verified.' },
        { name: 'Compliance validation', isMandatory: true, result: 'Pass', evidence: 'DPIIT compliant.', justification: 'Statutory compliance complete.' },
        { name: 'Pilot KPI readiness', isMandatory: false, result: 'Pass', evidence: 'Emission dashboards active.', justification: 'KPIs streaming.' },
      ],
    },
    finalSelection: {
      isEligibleForPilot: true,
      isFinallySelected: false,
      blockingItems: [],
      checklist: [],
    },
  },

  // 6. BudgetTraffic Co (G2 Rank #1 - Best Value Score)
  {
    id: 's6',
    category: 'G2',
    name: 'BudgetTraffic Co',
    cost: 25,
    dpiitNumber: 'DIPP-33821-UP',
    solutionTitle: 'LiteTraffic: Low-Cost Camera Sensor & Adaptive Green Timer Unit',
    solutionSummary:
      'Ultra low-cost edge processing modules utilizing existing CCTV cameras to modulate traffic light duration.',
    techStack: ['C++ Edge', 'ONNX Runtime', 'ESP32 IoT', 'Node.js'],
    contactEmail: 'contact@budgettraffic.co.in',
    eligibility: {
      status: 'Eligible',
      checks: [
        { parameter: 'Startup recognition', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Active DPIIT startup recognition.' },
        { parameter: 'Submission deadline', result: 'Accept', isPassed: true, isMandatory: true, justification: 'Submitted on time.' },
        { parameter: 'Mandatory fields complete', result: 'Complete', isPassed: true, isMandatory: true, justification: 'All sections complete.' },
        { parameter: 'Required documents uploaded', result: 'Complete', isPassed: true, isMandatory: true, justification: 'All documents present.' },
        { parameter: 'Challenge-specific eligibility', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Meets ITS criteria.' },
        { parameter: 'Conflict of interest', result: 'Clear', isPassed: true, isMandatory: true, justification: 'Zero conflict.' },
        { parameter: 'Duplicate submission check', result: 'Valid', isPassed: true, isMandatory: true, justification: 'Original low-power embedded software.' },
        { parameter: 'Mandatory compliance declarations', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Compliant.' },
      ],
      blockingReason: null,
    },
    aiEvaluation: {
      overallScore: 88,
      confidence: 'High',
      recommendation: 'G2 candidate',
      duplicateFlag: false,
      complianceRiskFlag: false,
      parameters: [
        { name: 'Problem-Solution Fit', weight: 20, score: 88, justification: 'Retrofits existing traffic cameras without buying new optical hardware.', evidence: ['Compatibility list for 12 CCTV brands'], confidence: 'High' },
        { name: 'Technical Feasibility', weight: 15, score: 89, justification: 'Low-power edge AI runs on ₹4,000 embedded compute boxes.', evidence: ['Embedded edge hardware benchmark'], confidence: 'High' },
        { name: 'Innovation and Differentiation', weight: 15, score: 82, justification: 'Pragmatic optimization rather than cutting-edge novel research.', evidence: ['ONNX quantization pipeline'], confidence: 'Medium' },
        { name: 'Impact Potential', weight: 15, score: 86, justification: 'Delivers 20% congestion relief across mid-tier junctions.', evidence: ['Field trial in Noida Sector 62'], confidence: 'High' },
        { name: 'Cost-Effectiveness', weight: 15, score: 98, justification: 'Exceptional cost efficiency at only ₹25 Lakhs total budget.', evidence: ['Detailed BOM (₹10L hardware, ₹8L dev, ₹7L deployment)'], confidence: 'High' },
        { name: 'Scalability', weight: 10, score: 92, justification: 'Can be deployed across 1,000 junctions on a shoestring municipal budget.', evidence: ['Municipal scaling plan'], confidence: 'High' },
        { name: 'Team Capability', weight: 5, score: 82, justification: 'Scrappy embedded engineering team with prior municipal IoT experience.', evidence: ['Team portfolio'], confidence: 'Medium' },
        { name: 'Risk and Compliance', weight: 5, score: 86, justification: 'Secure local network with zero external cloud dependencies.', evidence: ['Air-gapped deployment architecture'], confidence: 'High' },
      ],
      strengths: ['Best value-for-money score on portal', 'Reuses existing CCTV infrastructure', 'Air-gapped operation capability'],
      missingInformation: [],
      g2ValueScore: computeG2ValueScore(88, 25, 86),
    },
    departmentReview: {
      decision: 'Approve for Prototype',
      overridesAI: false,
      overrideReason: '',
      reviewer: 'Shri S. K. Meena (Director, MoRTH)',
      reviewedAt: '2026-08-30T11:00:00 IST',
      notes: [
        { parameter: 'Public value for money', answer: 'Exemplary', justification: 'Ideal for Tier-2 city scaling where capital budgets are constrained.' },
      ],
      auditLog: [],
    },
    prototypeTesting: {
      overallResult: 'Pass',
      failedMandatoryReason: null,
      testedByLab: 'C-DAC Electronics Quality Testing Lab, Noida',
      testCertificateId: 'CDAC-2026-VAL-1102',
      parameters: [
        { name: 'Functional correctness', isMandatory: true, result: 'Pass', evidence: 'Signal timing adjusted correctly across 30 trial runs.', justification: 'Passed functional test suite.' },
        { name: 'Accuracy / quality', isMandatory: false, result: 'Pass', evidence: 'Vehicle detection accuracy 89.2%.', justification: 'Sufficient for queue estimation.' },
        { name: 'Performance', isMandatory: false, result: 'Pass', evidence: 'Inference latency 180ms on embedded box.', justification: 'Real-time performance adequate.' },
        { name: 'Scalability', isMandatory: false, result: 'Pass', evidence: 'Tested with 25 cameras.', justification: 'Scalable architecture.' },
        { name: 'Security', isMandatory: true, result: 'Pass', evidence: 'Air-gapped local subnet.', justification: 'No vulnerabilities found.' },
        { name: 'Privacy', isMandatory: false, result: 'Pass', evidence: 'No images saved to disk.', justification: 'Ephemeral frame processing.' },
        { name: 'Integration', isMandatory: true, result: 'Pass', evidence: 'Relay board connected to signal lights.', justification: 'Hardware switching functional.' },
        { name: 'Usability', isMandatory: false, result: 'Pass', evidence: 'Simple touch kiosk.', justification: 'Simple operator interface.' },
        { name: 'Accessibility', isMandatory: false, result: 'Pass', evidence: 'Meets basic standards.', justification: 'Accessible design.' },
        { name: 'Deployment readiness', isMandatory: false, result: 'Pass', evidence: 'Plug-and-play install in 15 mins.', justification: 'Ready for quick rollout.' },
        { name: 'Reliability', isMandatory: false, result: 'Pass', evidence: '72hr continuous run.', justification: 'Zero hardware crashes.' },
        { name: 'Maintainability', isMandatory: false, result: 'Pass', evidence: 'Well-documented C++ code.', justification: 'Maintainable codebase.' },
        { name: 'Cost validation', isMandatory: false, result: 'Pass', evidence: '₹25L budget verified.', justification: 'Cost verified.' },
        { name: 'Compliance validation', isMandatory: true, result: 'Pass', evidence: 'DPIIT certificate active.', justification: 'Compliant.' },
        { name: 'Pilot KPI readiness', isMandatory: false, result: 'Pass', evidence: 'Telemetry active.', justification: 'KPI stream working.' },
      ],
    },
    finalSelection: {
      isEligibleForPilot: true,
      isFinallySelected: false,
      blockingItems: [],
      checklist: [],
    },
  },

  // 7. EconoRoute Systems (G2 Rank #2)
  {
    id: 's7',
    category: 'G2',
    name: 'EconoRoute Systems',
    cost: 27,
    dpiitNumber: 'DIPP-22910-GJ',
    solutionTitle: 'FlowSense: Bluetooth & Wi-Fi Sniffer Corridor Travel Time Tracker',
    solutionSummary:
      'Anonymous MAC probe sniffers calculating travel times along corridors to dynamically balance split timings.',
    techStack: ['ESP32', 'Bluetooth 5.0', 'Go Backend', 'InfluxDB'],
    contactEmail: 'contact@econoroute.in',
    eligibility: {
      status: 'Eligible',
      checks: [
        { parameter: 'Startup recognition', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'DPIIT recognized.' },
        { parameter: 'Submission deadline', result: 'Accept', isPassed: true, isMandatory: true, justification: 'Submitted on schedule.' },
        { parameter: 'Mandatory fields complete', result: 'Complete', isPassed: true, isMandatory: true, justification: 'Complete documentation.' },
        { parameter: 'Required documents uploaded', result: 'Complete', isPassed: true, isMandatory: true, justification: 'All files present.' },
        { parameter: 'Challenge-specific eligibility', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'ITS domain.' },
        { parameter: 'Conflict of interest', result: 'Clear', isPassed: true, isMandatory: true, justification: 'No conflict.' },
        { parameter: 'Duplicate submission check', result: 'Valid', isPassed: true, isMandatory: true, justification: 'Original probe hashing method.' },
        { parameter: 'Mandatory compliance declarations', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Compliant.' },
      ],
      blockingReason: null,
    },
    aiEvaluation: {
      overallScore: 86,
      confidence: 'High',
      recommendation: 'G2 candidate',
      duplicateFlag: false,
      complianceRiskFlag: false,
      parameters: [
        { name: 'Problem-Solution Fit', weight: 20, score: 86, justification: 'Bluetooth travel time estimation provides accurate macro corridor speed trends.', evidence: ['Corridor probe sampling rate'], confidence: 'High' },
        { name: 'Technical Feasibility', weight: 15, score: 88, justification: 'Extremely simple pole-mounted probe hardware.', evidence: ['Probe hardware schematic'], confidence: 'High' },
        { name: 'Innovation and Differentiation', weight: 15, score: 80, justification: 'Standard probe sniffing technology with one-way MAC hashing.', evidence: ['SHA-256 MAC rotation spec'], confidence: 'High' },
        { name: 'Impact Potential', weight: 15, score: 85, justification: 'Gives 18% improvement in arterial green waves.', evidence: ['Arterial speed improvement model'], confidence: 'High' },
        { name: 'Cost-Effectiveness', weight: 15, score: 94, justification: 'Very affordable at ₹27 Lakhs.', evidence: ['Cost itemization sheet'], confidence: 'High' },
        { name: 'Scalability', weight: 10, score: 90, justification: 'Highly scalable due to low component price.', evidence: ['Probe deployment manual'], confidence: 'High' },
        { name: 'Team Capability', weight: 5, score: 82, justification: 'Solid IoT embedded background from Gujarat Tech University.', evidence: ['Team experience audit'], confidence: 'Medium' },
        { name: 'Risk and Compliance', weight: 5, score: 86, justification: 'One-way salt-hashed MAC addresses guarantee zero user tracking.', evidence: ['Privacy cryptographic proof'], confidence: 'High' },
      ],
      strengths: ['Low cost hardware deployment', 'Macro corridor travel-time precision'],
      missingInformation: [],
      g2ValueScore: computeG2ValueScore(86, 27, 85),
    },
    departmentReview: {
      decision: 'Keep on Reserve',
      overridesAI: false,
      overrideReason: '',
      reviewer: 'Dr. V. Ramanathan (Technical Member, MoRTH)',
      reviewedAt: '2026-08-30T14:00:00 IST',
      notes: [{ parameter: 'Public value for money', answer: 'Satisfactory', justification: 'Good backup option for long arterial corridors.' }],
      auditLog: [],
    },
    prototypeTesting: {
      overallResult: 'Conditional Pass',
      failedMandatoryReason: null,
      testedByLab: 'C-DAC Electronics Quality Testing Lab, Noida',
      testCertificateId: 'CDAC-2026-VAL-1115',
      parameters: [
        { name: 'Functional correctness', isMandatory: true, result: 'Pass', evidence: 'Corridor travel time tracked.', justification: 'Travel time calculation verified.' },
        { name: 'Accuracy / quality', isMandatory: false, result: 'Conditional', evidence: 'Sampling rate drops below 5% late at night when traffic is sparse.', justification: 'Sparse night traffic reduces statistical sample size.' },
        { name: 'Performance', isMandatory: false, result: 'Pass', evidence: 'Latency < 200ms.', justification: 'Fast telemetry.' },
        { name: 'Scalability', isMandatory: false, result: 'Pass', evidence: '50 probes sustained.', justification: 'Scales easily.' },
        { name: 'Security', isMandatory: true, result: 'Pass', evidence: 'Encrypted probe packets.', justification: 'No vulnerabilities.' },
        { name: 'Privacy', isMandatory: false, result: 'Pass', evidence: 'SHA-256 salted hash rotated every 15 mins.', justification: 'Strong privacy protection.' },
        { name: 'Integration', isMandatory: true, result: 'Pass', evidence: 'REST API connected.', justification: 'API integration works.' },
        { name: 'Usability', isMandatory: false, result: 'Pass', evidence: 'Web UI.', justification: 'Good dashboard.' },
        { name: 'Accessibility', isMandatory: false, result: 'Pass', evidence: 'Standards met.', justification: 'Accessible.' },
        { name: 'Deployment readiness', isMandatory: false, result: 'Pass', evidence: 'Tested on site.', justification: 'Ready.' },
        { name: 'Reliability', isMandatory: false, result: 'Pass', evidence: 'Zero crashes in 48 hrs.', justification: 'Reliable.' },
        { name: 'Maintainability', isMandatory: false, result: 'Pass', evidence: 'Modular Go backend.', justification: 'Clean code.' },
        { name: 'Cost validation', isMandatory: false, result: 'Pass', evidence: '₹27L verified.', justification: 'Verified.' },
        { name: 'Compliance validation', isMandatory: true, result: 'Pass', evidence: 'DPIIT certified.', justification: 'Compliant.' },
        { name: 'Pilot KPI readiness', isMandatory: false, result: 'Pass', evidence: 'Live telemetry.', justification: 'KPIs streaming.' },
      ],
    },
    finalSelection: {
      isEligibleForPilot: true,
      isFinallySelected: false,
      blockingItems: [],
      checklist: [],
    },
  },

  // 8. ValueFlow Tech (G2 Rank #3)
  {
    id: 's8',
    category: 'G2',
    name: 'ValueFlow Tech',
    cost: 30,
    dpiitNumber: 'DIPP-11920-TN',
    solutionTitle: 'SyncFlow: Acoustic Vehicle Density & Emergency Siren Preemption System',
    solutionSummary:
      'Acoustic microphone arrays detecting ambulance/fire sirens with micro-radar density measurement for low-cost signal switching.',
    techStack: ['Acoustic DSP', 'Cortex-M4', 'Python', 'WebSockets'],
    contactEmail: 'contact@valueflow.co.in',
    eligibility: {
      status: 'Eligible',
      checks: [
        { parameter: 'Startup recognition', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Active DPIIT startup recognition.' },
        { parameter: 'Submission deadline', result: 'Accept', isPassed: true, isMandatory: true, justification: 'On time.' },
        { parameter: 'Mandatory fields complete', result: 'Complete', isPassed: true, isMandatory: true, justification: 'Complete.' },
        { parameter: 'Required documents uploaded', result: 'Complete', isPassed: true, isMandatory: true, justification: 'Complete.' },
        { parameter: 'Challenge-specific eligibility', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Eligible.' },
        { parameter: 'Conflict of interest', result: 'Clear', isPassed: true, isMandatory: true, justification: 'Clear.' },
        { parameter: 'Duplicate submission check', result: 'Valid', isPassed: true, isMandatory: true, justification: 'Valid.' },
        { parameter: 'Mandatory compliance declarations', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Eligible.' },
      ],
      blockingReason: null,
    },
    aiEvaluation: {
      overallScore: 85,
      confidence: 'High',
      recommendation: 'G2 candidate',
      duplicateFlag: false,
      complianceRiskFlag: false,
      parameters: [
        { name: 'Problem-Solution Fit', weight: 20, score: 85, justification: 'Emergency vehicle green corridors save critical golden-hour medical time.', evidence: ['Siren audio frequency DSP filter test'], confidence: 'High' },
        { name: 'Technical Feasibility', weight: 15, score: 87, justification: 'Acoustic micro-controllers deployable at low unit cost.', evidence: ['Microphone hardware test report'], confidence: 'High' },
        { name: 'Innovation and Differentiation', weight: 15, score: 84, justification: 'Acoustic frequency fingerprinting distinguishes Indian sirens from honking.', evidence: ['Frequency spectrogram test'], confidence: 'High' },
        { name: 'Impact Potential', weight: 15, score: 88, justification: 'Reduces ambulance transit time across major hospital corridors by 35%.', evidence: ['AIIMS to Safdarjung corridor simulation'], confidence: 'High' },
        { name: 'Cost-Effectiveness', weight: 15, score: 92, justification: 'Economical at ₹30 Lakhs.', evidence: ['Itemized cost breakdown'], confidence: 'High' },
        { name: 'Scalability', weight: 10, score: 84, justification: 'Scalable across hospital zones.', evidence: ['Hospital corridor rollout plan'], confidence: 'Medium' },
        { name: 'Team Capability', weight: 5, score: 80, justification: 'Acoustic engineering graduates from NIT Trichy.', evidence: ['Team CVs'], confidence: 'Medium' },
        { name: 'Risk and Compliance', weight: 5, score: 82, justification: 'Microphone filters strictly discard human speech frequencies.', evidence: ['Bandpass filter privacy audit'], confidence: 'High' },
      ],
      strengths: ['Emergency ambulance siren priority', 'Bandpass filter preserves complete speech privacy'],
      missingInformation: [],
      g2ValueScore: computeG2ValueScore(85, 30, 88),
    },
    departmentReview: {
      decision: 'Keep on Reserve',
      overridesAI: false,
      overrideReason: '',
      reviewer: 'Shri A. K. Sharma (Joint Secretary)',
      reviewedAt: '2026-08-30T16:00:00 IST',
      notes: [{ parameter: 'Departmental priority alignment', answer: 'Satisfactory', justification: 'Great for golden-hour medical corridor pilots.' }],
      auditLog: [],
    },
    prototypeTesting: {
      overallResult: 'Conditional Pass',
      failedMandatoryReason: null,
      testedByLab: 'STQC Testing Laboratory, Delhi',
      testCertificateId: 'STQC-2026-VAL-0977',
      parameters: [
        { name: 'Functional correctness', isMandatory: true, result: 'Pass', evidence: 'Siren preemption triggered in 28/30 trials.', justification: 'Emergency green triggered reliably.' },
        { name: 'Accuracy / quality', isMandatory: false, result: 'Conditional', evidence: 'High-decibel truck air-horns occasionally caused 2 false triggers in heavy noise testing.', justification: 'Requires slight threshold calibration against truck air-horns.' },
        { name: 'Performance', isMandatory: false, result: 'Pass', evidence: 'Preemption latency < 120ms.', justification: 'Fast response.' },
        { name: 'Scalability', isMandatory: false, result: 'Pass', evidence: 'Scales across 30 junctions.', justification: 'Scalable.' },
        { name: 'Security', isMandatory: true, result: 'Pass', evidence: 'No network ports exposed.', justification: 'Secure.' },
        { name: 'Privacy', isMandatory: false, result: 'Pass', evidence: 'Hardware bandpass filter blocks human vocal frequencies (300Hz-3kHz).', justification: 'Privacy guaranteed.' },
        { name: 'Integration', isMandatory: true, result: 'Pass', evidence: 'Relay override functional.', justification: 'Signal interface works.' },
        { name: 'Usability', isMandatory: false, result: 'Pass', evidence: 'Clean UI.', justification: 'Good UI.' },
        { name: 'Accessibility', isMandatory: false, result: 'Pass', evidence: 'WCAG compliant.', justification: 'Accessible.' },
        { name: 'Deployment readiness', isMandatory: false, result: 'Pass', evidence: 'Field installable.', justification: 'Ready.' },
        { name: 'Reliability', isMandatory: false, result: 'Pass', evidence: 'Passed 48hr soak test.', justification: 'Reliable.' },
        { name: 'Maintainability', isMandatory: false, result: 'Pass', evidence: 'Well-structured codebase.', justification: 'Maintainable.' },
        { name: 'Cost validation', isMandatory: false, result: 'Pass', evidence: '₹30L verified.', justification: 'Cost verified.' },
        { name: 'Compliance validation', isMandatory: true, result: 'Pass', evidence: 'DPIIT certified.', justification: 'Compliant.' },
        { name: 'Pilot KPI readiness', isMandatory: false, result: 'Pass', evidence: 'Telemetry active.', justification: 'KPIs streaming.' },
      ],
    },
    finalSelection: {
      isEligibleForPilot: true,
      isFinallySelected: false,
      blockingItems: [],
      checklist: [],
    },
  },

  // 9. SmartSavings Traffic (G2 Rank #4 - Fails Functional Testing)
  {
    id: 's9',
    category: 'G2',
    name: 'SmartSavings Traffic',
    cost: 32,
    dpiitNumber: 'DIPP-10029-RJ',
    solutionTitle: 'SolarPuck: Magnetometer In-Pavement Vehicle Sensor Matrix',
    solutionSummary:
      'In-pavement wireless magnetic pucks glued to road surfaces to count vehicle occupancy.',
    techStack: ['Magnetometer', 'Sub-GHz RF', 'Node.js', 'MySQL'],
    contactEmail: 'info@smartsavingstraffic.in',
    eligibility: {
      status: 'Eligible',
      checks: [
        { parameter: 'Startup recognition', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Valid registration.' },
        { parameter: 'Submission deadline', result: 'Accept', isPassed: true, isMandatory: true, justification: 'On time.' },
        { parameter: 'Mandatory fields complete', result: 'Complete', isPassed: true, isMandatory: true, justification: 'Complete.' },
        { parameter: 'Required documents uploaded', result: 'Complete', isPassed: true, isMandatory: true, justification: 'Complete.' },
        { parameter: 'Challenge-specific eligibility', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Eligible.' },
        { parameter: 'Conflict of interest', result: 'Clear', isPassed: true, isMandatory: true, justification: 'Clear.' },
        { parameter: 'Duplicate submission check', result: 'Valid', isPassed: true, isMandatory: true, justification: 'Valid.' },
        { parameter: 'Mandatory compliance declarations', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Compliant.' },
      ],
      blockingReason: null,
    },
    aiEvaluation: {
      overallScore: 84,
      confidence: 'Medium',
      recommendation: 'G2 candidate',
      duplicateFlag: false,
      complianceRiskFlag: false,
      parameters: [
        { name: 'Problem-Solution Fit', weight: 20, score: 84, justification: 'In-pavement magnetic sensors measure vehicle presence.', evidence: ['Magnetometer test sheet'], confidence: 'Medium' },
        { name: 'Technical Feasibility', weight: 15, score: 82, justification: 'Pucks prone to displacement during heavy truck transit.', evidence: ['Road adhesive durability test'], confidence: 'Medium' },
        { name: 'Innovation and Differentiation', weight: 15, score: 81, justification: 'Standard commercial magnetometer.', evidence: ['Product data sheet'], confidence: 'Medium' },
        { name: 'Impact Potential', weight: 15, score: 85, justification: '17% flow improvement.', evidence: ['Simulation data'], confidence: 'Medium' },
        { name: 'Cost-Effectiveness', weight: 15, score: 90, justification: 'Cost ₹32 Lakhs.', evidence: ['Cost itemization'], confidence: 'High' },
        { name: 'Scalability', weight: 10, score: 80, justification: 'Road drilling required for epoxy gluing.', evidence: ['Installation guide'], confidence: 'Low' },
        { name: 'Team Capability', weight: 5, score: 82, justification: 'Team has civil road experience.', evidence: ['Company profile'], confidence: 'Medium' },
        { name: 'Risk and Compliance', weight: 5, score: 80, justification: 'Epoxy failure poses flying road debris risk.', evidence: ['Civil safety assessment'], confidence: 'Low' },
      ],
      strengths: ['Low cost magnetic sensing', 'Sub-GHz battery longevity'],
      missingInformation: [],
      g2ValueScore: computeG2ValueScore(84, 32, 85),
    },
    departmentReview: {
      decision: 'Request Clarification',
      overridesAI: false,
      overrideReason: '',
      reviewer: 'Dr. V. Ramanathan (Technical Member)',
      reviewedAt: '2026-08-31T11:00:00 IST',
      notes: [{ parameter: 'Procurement/pilot feasibility', answer: 'Concern', justification: 'Concern regarding road damage and puck detachment under heavy multi-axle trucks.' }],
      auditLog: [],
    },
    prototypeTesting: {
      overallResult: 'Fail',
      failedMandatoryReason:
        'FUNCTIONAL FAILURE: In-pavement wireless pucks suffered 62% packet drop under heavy rain/waterlogging and detachment under 40-tonne truck load simulation.',
      testedByLab: 'STQC Testing Laboratory, Delhi',
      testCertificateId: 'STQC-2026-REJ-023',
      parameters: [
        {
          name: 'Functional correctness',
          isMandatory: true,
          result: 'Fail',
          evidence: 'Sub-GHz RF transmission attenuation exceeded 28dB in 3-inch standing water test.',
          justification: 'Failed mandatory functional benchmark: sensor lost connectivity in simulated monsoon waterlogging.',
        },
        { name: 'Accuracy / quality', isMandatory: false, result: 'Conditional', evidence: 'Accuracy 78%.', justification: 'Degrades in rain.' },
        { name: 'Performance', isMandatory: false, result: 'Pass', evidence: 'Latency 300ms.', justification: 'Acceptable in dry conditions.' },
        { name: 'Scalability', isMandatory: false, result: 'Conditional', evidence: 'Road maintenance disruption.', justification: 'Road cutting needed.' },
        { name: 'Security', isMandatory: true, result: 'Pass', evidence: 'Encrypted RF.', justification: 'No security breach.' },
        { name: 'Privacy', isMandatory: false, result: 'Pass', evidence: 'Magnetic field only.', justification: 'Zero privacy issue.' },
        { name: 'Integration', isMandatory: true, result: 'Pass', evidence: 'Receiver gateway works.', justification: 'Gateway functional.' },
        { name: 'Usability', isMandatory: false, result: 'Pass', evidence: 'Web UI.', justification: 'UI acceptable.' },
        { name: 'Accessibility', isMandatory: false, result: 'Pass', evidence: 'Standards met.', justification: 'Accessible.' },
        { name: 'Deployment readiness', isMandatory: false, result: 'Fail', evidence: 'Adhesive epoxy detached under wheel shear stress.', justification: 'Failed mechanical stress test.' },
        { name: 'Reliability', isMandatory: false, result: 'Fail', evidence: '3 out of 10 pucks failed in water immersion.', justification: 'Water ingress failure.' },
        { name: 'Maintainability', isMandatory: false, result: 'Fail', evidence: 'Failed puck requires road re-drilling.', justification: 'High maintenance cost.' },
        { name: 'Cost validation', isMandatory: false, result: 'Pass', evidence: 'Cost matched.', justification: 'Budget verified.' },
        { name: 'Compliance validation', isMandatory: true, result: 'Pass', evidence: 'DPIIT certified.', justification: 'Compliant.' },
        { name: 'Pilot KPI readiness', isMandatory: false, result: 'Conditional', evidence: 'Intermittent telemetry.', justification: 'Unstable data.' },
      ],
    },
    finalSelection: {
      isEligibleForPilot: false,
      isFinallySelected: false,
      blockingItems: [
        'Prototype Functionality Pass: Failed mandatory functional benchmark (waterlogging transmission failure).',
      ],
      checklist: [],
    },
  },

  // 10. OptimalFlow Systems (G2 Rank #5 - Fails Compliance Validation)
  {
    id: 's10',
    category: 'G2',
    name: 'OptimalFlow Systems',
    cost: 35,
    dpiitNumber: 'DIPP-09941-WB',
    solutionTitle: 'CrowdFlow: Mobile App Telemetry Ingestion for Signal Cycle Tuning',
    solutionSummary:
      'Aggregated crowdsourced mobile location SDK telemetry to predict intersection queue growth.',
    techStack: ['Kafka', 'Flink', 'Python', 'ClickHouse'],
    contactEmail: 'contact@optimalflow.in',
    eligibility: {
      status: 'Needs Clarification',
      checks: [
        { parameter: 'Startup recognition', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'DPIIT verified.' },
        { parameter: 'Submission deadline', result: 'Accept', isPassed: true, isMandatory: true, justification: 'Submitted on time.' },
        { parameter: 'Mandatory fields complete', result: 'Complete', isPassed: true, isMandatory: true, justification: 'Complete.' },
        { parameter: 'Required documents uploaded', result: 'Complete', isPassed: true, isMandatory: true, justification: 'Complete.' },
        { parameter: 'Challenge-specific eligibility', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Eligible.' },
        { parameter: 'Conflict of interest', result: 'Clear', isPassed: true, isMandatory: true, justification: 'Clear.' },
        { parameter: 'Duplicate submission check', result: 'Valid', isPassed: true, isMandatory: true, justification: 'Valid.' },
        {
          parameter: 'Mandatory compliance declarations',
          result: 'Incomplete',
          isPassed: false,
          isMandatory: true,
          justification: 'Missing explicit end-user consent audit trail for third-party commercial SDK mobile telemetry under DPDP Act 2023.',
        },
      ],
      blockingReason: 'Mandatory compliance declarations incomplete: DPDP Act 2023 mobile SDK consent audit pending.',
    },
    aiEvaluation: {
      overallScore: 83,
      confidence: 'Medium',
      recommendation: 'Review further',
      duplicateFlag: false,
      complianceRiskFlag: true,
      parameters: [
        { name: 'Problem-Solution Fit', weight: 20, score: 85, justification: 'Crowdsourced telemetry gives high-level traffic speed maps.', evidence: ['Sample mobile SDK trace data'], confidence: 'Medium' },
        { name: 'Technical Feasibility', weight: 15, score: 84, justification: 'Kafka ingest pipeline handles high event throughput.', evidence: ['Kafka stress test metrics'], confidence: 'High' },
        { name: 'Innovation and Differentiation', weight: 15, score: 80, justification: 'Standard mobility SDK aggregation.', evidence: ['SDK documentation'], confidence: 'Medium' },
        { name: 'Impact Potential', weight: 15, score: 82, justification: 'Provides city-wide overview but lacks lane-level precision.', evidence: ['City overview map'], confidence: 'Medium' },
        { name: 'Cost-Effectiveness', weight: 15, score: 88, justification: 'Priced at ₹35 Lakhs.', evidence: ['Cost itemization'], confidence: 'High' },
        { name: 'Scalability', weight: 10, score: 89, justification: 'City-wide software ingest without physical hardware.', evidence: ['Cloud ingest architecture'], confidence: 'High' },
        { name: 'Team Capability', weight: 5, score: 82, justification: 'Data engineering team from Kolkata.', evidence: ['Team CVs'], confidence: 'Medium' },
        {
          name: 'Risk and Compliance',
          weight: 5,
          score: 65,
          justification: 'High regulatory risk: unresolved third-party app consent mechanism under DPDP Act 2023.',
          evidence: ['DPDP Act 2023 compliance advisory note'],
          confidence: 'High',
        },
      ],
      strengths: ['Zero road infrastructure requirements', 'High-throughput Kafka streaming pipeline'],
      missingInformation: ['Consent audit log from third-party mobile app publishers under DPDP Act 2023'],
      g2ValueScore: computeG2ValueScore(83, 35, 82),
    },
    departmentReview: {
      decision: 'Reject with Reason',
      overridesAI: true,
      overrideReason:
        'STATUTORY COMPLIANCE BLOCK: Startup relies on third-party mobile app background location data without explicit consent architecture compliant with DPDP Act 2023 and CERT-In privacy mandates.',
      reviewer: 'Shri A. K. Sharma (Joint Secretary, MoRTH)',
      reviewedAt: '2026-08-31T15:30:00 IST',
      notes: [
        { parameter: 'Data privacy', answer: 'High Risk', justification: 'Unresolved mobile user tracking consent poses statutory regulatory liability.' },
        { parameter: 'Cybersecurity', answer: 'Concern', justification: 'Third-party SDK supply chain risk.' },
      ],
      auditLog: [
        {
          timestamp: '2026-08-31T15:30:00 IST',
          actor: 'Shri A. K. Sharma (Joint Secretary)',
          action: 'DECISION_OVERRIDE_SAVED',
          reason: 'Overrode AI recommendation: Rejected due to DPDP Act 2023 statutory privacy violation risk.',
        },
      ],
    },
    prototypeTesting: {
      overallResult: 'Fail',
      failedMandatoryReason:
        'COMPLIANCE VALIDATION FAILURE: Failed statutory DPDP Act 2023 audit. Mobile SDK telemetry collection lacks verifiable opt-in consent records.',
      testedByLab: 'STQC Testing Laboratory, Delhi',
      testCertificateId: 'STQC-2026-REJ-031',
      parameters: [
        { name: 'Functional correctness', isMandatory: true, result: 'Pass', evidence: 'Ingest pipeline works.', justification: 'Pipeline functional.' },
        { name: 'Accuracy / quality', isMandatory: false, result: 'Conditional', evidence: 'Accuracy degrades on non-smartphone users.', justification: 'Sample bias towards smartphone owners.' },
        { name: 'Performance', isMandatory: false, result: 'Pass', evidence: 'Latency < 250ms.', justification: 'Speed acceptable.' },
        { name: 'Scalability', isMandatory: false, result: 'Pass', evidence: 'Handles 100k events/sec.', justification: 'Highly scalable.' },
        { name: 'Security', isMandatory: true, result: 'Pass', evidence: 'TLS encryption.', justification: 'Security compliant.' },
        { name: 'Privacy', isMandatory: false, result: 'Fail', evidence: 'Raw GPS coordinates transmitted before cloud hashing.', justification: 'Privacy vulnerability during transit.' },
        { name: 'Integration', isMandatory: true, result: 'Pass', evidence: 'REST API works.', justification: 'Integration operational.' },
        { name: 'Usability', isMandatory: false, result: 'Pass', evidence: 'Good portal.', justification: 'Usable.' },
        { name: 'Accessibility', isMandatory: false, result: 'Pass', evidence: 'WCAG compliant.', justification: 'Accessible.' },
        { name: 'Deployment readiness', isMandatory: false, result: 'Pass', evidence: 'Cloud deployable.', justification: 'Ready.' },
        { name: 'Reliability', isMandatory: false, result: 'Pass', evidence: '48hr test passed.', justification: 'Reliable.' },
        { name: 'Maintainability', isMandatory: false, result: 'Pass', evidence: 'Clean Python code.', justification: 'Maintainable.' },
        { name: 'Cost validation', isMandatory: false, result: 'Pass', evidence: 'Cost matched.', justification: 'Cost verified.' },
        {
          name: 'Compliance validation',
          isMandatory: true,
          result: 'Fail',
          evidence: 'Audit by STQC legal team confirmed lack of verifiable user consent chain under DPDP Act 2023.',
          justification: 'Failed mandatory compliance validation: non-compliant with Indian data privacy law.',
        },
        { name: 'Pilot KPI readiness', isMandatory: false, result: 'Pass', evidence: 'Telemetry active.', justification: 'Active.' },
      ],
    },
    finalSelection: {
      isEligibleForPilot: false,
      isFinallySelected: false,
      blockingItems: [
        'Eligibility Gate Cleared: Missing mandatory DPDP Act 2023 compliance declaration.',
        'Compliance Validation: Failed mandatory compliance validation under Indian privacy law.',
        'Departmental Human Officer Approval: Rejected by MoRTH due to statutory regulatory liability.',
      ],
      checklist: [],
    },
  },
];

// Initialize final selection for all startups
INITIAL_EVALUATION_STARTUPS.forEach(startup => {
  startup.finalSelection = computeFinalSelectionStatus(startup);
});
