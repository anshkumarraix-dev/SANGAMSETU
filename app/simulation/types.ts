export type SimulationStage = 0 | 1 | 2 | 3 | 4 | 5;
export type SimTab = 'admin' | 'government' | 'startup' | 'testing_org';

export interface ScoredParameter {
  name: string;
  weight: number; // e.g., 20
  score: number; // 0-100
  justification: string;
  evidence: string[];
  confidence: 'High' | 'Medium' | 'Low';
}

export interface EligibilityCheck {
  parameter: string;
  result:
    | 'Eligible'
    | 'Ineligible'
    | 'Accept'
    | 'Reject'
    | 'Complete'
    | 'Incomplete'
    | 'Pending'
    | 'Clear'
    | 'Escalate'
    | 'Valid'
    | 'Duplicate';
  isPassed: boolean;
  isMandatory: boolean;
  justification: string;
  evidence?: string[];
}

export interface EligibilityData {
  status: 'Eligible' | 'Ineligible' | 'Needs Clarification';
  checks: EligibilityCheck[];
  blockingReason?: string | null;
}

export interface G2ValueBreakdown {
  overallQualityScore: number; // base quality score (0-100)
  overallQualityComponent: number; // 60%
  costEfficiencyScore: number; // calculated cost efficiency (0-100)
  costEfficiencyComponent: number; // 25%
  impactPotentialScore: number; // calculated impact potential (0-100)
  impactPotentialComponent: number; // 15%
  total: number;
}

export interface AIEvaluationData {
  overallScore: number; // Automatically derived weighted sum
  confidence: 'High' | 'Medium' | 'Low';
  recommendation: 'G1 candidate' | 'G2 candidate' | 'Review further' | 'Not shortlisted';
  duplicateFlag: boolean;
  complianceRiskFlag: boolean;
  parameters: ScoredParameter[]; // Exactly 8 parameters
  strengths: string[];
  missingInformation: string[];
  g2ValueScore?: G2ValueBreakdown;
}

export interface DepartmentReviewNote {
  parameter: string;
  answer: 'Satisfactory' | 'Needs Clarification' | 'Concern' | 'Exemplary' | 'High Risk' | 'Approved';
  justification: string;
  evidence?: string[];
}

export interface DepartmentAuditLogEntry {
  timestamp: string;
  actor: string;
  action: string;
  reason: string;
}

export interface DepartmentReviewData {
  decision:
    | 'Approve for Prototype'
    | 'Request Clarification'
    | 'Keep on Reserve'
    | 'Reject with Reason'
    | 'Pending Review';
  overridesAI: boolean;
  overrideReason: string; // Mandatory if overridesAI is true
  reviewer: string;
  reviewedAt: string;
  notes: DepartmentReviewNote[];
  auditLog: DepartmentAuditLogEntry[];
}

export interface PrototypeTestParameter {
  name: string;
  isMandatory: boolean;
  result: 'Pass' | 'Conditional' | 'Fail';
  evidence: string;
  justification: string;
}

export interface PrototypeTestingData {
  overallResult: 'Pass' | 'Conditional Pass' | 'Fail';
  failedMandatoryReason?: string | null;
  parameters: PrototypeTestParameter[]; // Exactly 15 parameters
  testedByLab?: string;
  testCertificateId?: string;
}

export interface FinalSelectionItem {
  key: string;
  label: string;
  isMandatory: boolean;
  isPassed: boolean;
  justification: string;
}

export interface FinalSelectionData {
  isEligibleForPilot: boolean;
  isFinallySelected: boolean;
  blockingItems: string[];
  checklist: FinalSelectionItem[];
  workOrderNumber?: string;
  sanctionAmount?: number;
}

export interface EvaluationStartup {
  id: string;
  category: 'G1' | 'G2';
  name: string;
  cost: number; // in Lakhs
  dpiitNumber: string;
  solutionTitle: string;
  solutionSummary: string;
  techStack: string[];
  contactEmail: string;
  eligibility: EligibilityData;
  aiEvaluation: AIEvaluationData;
  departmentReview: DepartmentReviewData;
  prototypeTesting: PrototypeTestingData;
  finalSelection: FinalSelectionData;
}

export interface SimProblem {
  title: string;
  department: string;
  statement: string;
  outcome: string;
  budgetMin: number; // in Lakhs
  budgetMax: number; // in Lakhs
  timelineMonths: number;
  eligibility: string;
  deadlineDays: number;
  isPosted: boolean;
}
