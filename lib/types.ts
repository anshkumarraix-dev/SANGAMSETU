export type UserRole = 'PUBLIC' | 'STARTUP' | 'GOVERNMENT' | 'TESTING_ORG' | 'TESTING_LAB' | 'ADMIN';

export type ActiveView =
  | 'home'
  | 'challenges'
  | 'problems'
  | 'workflow'
  | 'success-stories'
  | 'guidelines'
  | 'circulars'
  | 'rti'
  | 'grievance'
  | 'faq'
  | 'sitemap'
  | 'privacy'
  | 'terms'
  | 'copyright'
  | 'hyperlink'
  | 'disclaimer'
  | 'accessibility'
  | 'dashboard';

export type ChallengeStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'APPLICATION_OPEN'
  | 'APPLICATION_CLOSED'
  | 'EVALUATION_IN_PROGRESS'
  | 'SHORTLISTED'
  | 'PROTOTYPE_SUBMISSION'
  | 'TESTING_IN_PROGRESS'
  | 'WINNER_SELECTED'
  | 'PILOT_IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type ProposalStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'REJECTED'
  | 'WITHDRAWN';

export type PrototypeStatus =
  | 'NOT_SUBMITTED'
  | 'SUBMITTED'
  | 'UNDER_TESTING'
  | 'TEST_PASSED'
  | 'TEST_FAILED'
  | 'CONDITIONAL_PASS';

export type TestVerdict = 'PASS' | 'FAIL' | 'CONDITIONAL_PASS';

export type PilotStatus = 'PLANNED' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'FAILED';

export type MilestoneStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export type PaymentStatus = 'PENDING' | 'REQUESTED' | 'APPROVED' | 'PROCESSING' | 'PAID' | 'REJECTED';

export type ShortlistCategory = 'G1_BEST' | 'G2_COST_EFFECTIVE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  organization?: string;
  avatar?: string;
}

export interface StartupProfile {
  id: string;
  userId: string;
  name: string;
  dpiitNumber: string;
  dpiitVerified: boolean;
  panNumber: string;
  gstNumber: string;
  udyamNumber: string;
  website: string;
  description: string;
  foundingYear: number;
  teamSize: number;
  sectors: string[];
  technologies: string[];
  city: string;
  state: string;
  pincode: string;
  bankAccountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}

export interface GovernmentProfile {
  id: string;
  userId: string;
  name: string;
  ministry: string;
  department: string;
  designation: string;
  officeAddress: string;
  city: string;
  state: string;
  pincode: string;
  officialEmail: string;
  officialPhone: string;
  verified: boolean;
}

export interface TestingOrgProfile {
  id: string;
  userId: string;
  name: string;
  type: 'STQC' | 'CDAC' | 'NIELIT' | 'ER&DCI' | 'IIT_LAB';
  address: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  phone: string;
  empanelled: boolean;
  empanelledDate: string;
}

export interface Challenge {
  id: string;
  governmentDeptId: string;
  ministryName: string;
  departmentName: string;
  contactPerson: string;
  title: string;
  slug: string;
  problemStatement: string;
  expectedOutcomes: string;
  sector: string;
  tags: string[];
  budgetMin: number;
  budgetMax: number;
  currency: string;
  timelineMonths: number;
  eligibilityCriteria: string;
  evaluationCriteria: string;
  status: ChallengeStatus;
  applicationDeadline: string;
  publishedAt: string;
  totalApplications: number;
  shortlistedCount: number;
  winnerCount: number;
  pilotLocation?: string;
}

export interface ScoreBreakdown {
  problemSolutionFit: number;
  technicalFeasibility: number;
  innovation: number;
  impactPotential: number;
  teamCapability: number;
  scalability: number;
  riskManagement: number;
  costEffectiveness: number;
  overall: number;
}

export interface Proposal {
  id: string;
  challengeId: string;
  challengeTitle: string;
  startupId: string;
  startupName: string;
  dpiitNumber: string;
  title: string;
  slug: string;
  solutionOverview: string;
  technicalApproach: string;
  innovation: string;
  teamDetails: string;
  budgetBreakdown: {
    rdDevelopment: number;
    hardwareInfrastructure: number;
    pilotTesting: number;
    teamManpower: number;
    contingency: number;
  };
  totalBudget: number;
  timelineMonths: number;
  impactMetrics: string;
  scalability: string;
  riskAnalysis: string;
  documents: { name: string; size: string; url: string }[];
  status: ProposalStatus;
  aiScore?: number;
  aiScoreBreakdown?: ScoreBreakdown;
  aiExplanation?: string;
  g1Category: boolean;
  g2Category: boolean;
  rankG1?: number;
  rankG2?: number;
  submittedAt: string;
  prototypeSubmitted?: boolean;
}

export interface Prototype {
  id: string;
  proposalId: string;
  challengeId: string;
  startupId: string;
  startupName: string;
  solutionTitle: string;
  submissionUrl: string;
  demoVideoUrl?: string;
  repositoryUrl?: string;
  documentation: { title: string; url: string }[];
  architectureNotes: string;
  submissionDate: string;
  status: PrototypeStatus;
  testReportId?: string;
}

export interface TestReport {
  id: string;
  prototypeId: string;
  proposalId: string;
  challengeId: string;
  startupName: string;
  solutionTitle: string;
  testingOrgId: string;
  testingOrgName: string;
  functionalityScore: number; // 1-10
  performanceScore: number; // 1-10
  securityScore: number; // 1-10
  usabilityScore: number; // 1-10
  integrationScore: number; // 1-10
  overallScore: number; // 0-100
  functionalityReport: string;
  performanceReport: string;
  securityReport: string;
  usabilityReport: string;
  integrationReport: string;
  issues: string[];
  recommendations: string;
  verdict: TestVerdict;
  certificateNumber: string;
  submittedAt: string;
}

export interface Winner {
  id: string;
  challengeId: string;
  proposalId: string;
  startupId: string;
  startupName: string;
  solutionTitle: string;
  rank: number;
  prizeAmount: number;
  selectedAt: string;
  notes: string;
  contractNumber: string;
}

export interface Milestone {
  id: string;
  pilotId: string;
  title: string;
  description: string;
  dueDate: string;
  status: MilestoneStatus;
  completedAt?: string;
  paymentAmount: number;
  paymentStatus: PaymentStatus;
  paidAt?: string;
  utrNumber?: string;
  remarks?: string;
}

export interface Pilot {
  id: string;
  challengeId: string;
  challengeTitle: string;
  winnerId: string;
  startupName: string;
  startupId: string;
  location: string;
  startDate: string;
  endDate: string;
  status: PilotStatus;
  kpis: { metric: string; target: string; achieved: string }[];
  progress: number; // 0-100
  currentPhase: string;
  totalBudget: number;
  disbursedAmount: number;
  milestones: Milestone[];
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'DEADLINE_REMINDER' | 'PAYMENT_RECEIVED' | 'PROPOSAL_SHORTLISTED';
  read: boolean;
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
  ipAddress: string;
}
