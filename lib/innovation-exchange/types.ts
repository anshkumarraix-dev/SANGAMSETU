export type AlternativeStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved_for_pilot'
  | 'pilot_ongoing'
  | 'approved'
  | 'rejected';

export interface GovernmentSolution {
  id: string;
  name: string;
  department: string;
  ministry: string;
  category: string;
  description: string;
  currentCost: number; // in Lakhs/year
  annualMaintenanceCost: number; // in Lakhs/year
  currentImplementationTime: number; // in Months
  currentTechnology: string;
  currentVendor: string;
  contractExpiryDays: number;
  painPoints: string[];
  opportunityScore: number; // 0 - 100
  location: string;
}

export interface ReviewScore {
  technicalScore: number; // 0-10
  feasibilityScore: number; // 0-10
  impactScore: number; // 0-10
  innovationScore: number; // 0-10
  overallScore: number; // 0-10
  comments: string;
  reviewerName?: string;
  reviewerDesignation?: string;
  evaluatedAt?: string;
}

export interface AlternativeComment {
  id: string;
  author: string;
  role: 'Startup Founder' | 'Department Official' | 'Evaluator' | 'Observer';
  text: string;
  date: string;
}

export interface AlternativeSolution {
  id: string;
  title: string;
  startupName: string;
  startupDpiitNumber: string;
  startupFoundedYear: number;
  startupLocation: string;
  targetSolutionId: string;
  proposedCost: number; // in Lakhs/year
  costReductionPercent: number; // calculated %
  proposedTimelineMonths: number; // in Months
  timeReductionPercent: number; // calculated %
  technologyStack: string[];
  description: string;
  howItWorks: string;
  architectureDetails?: string;
  uploadedDocuments: {
    name: string;
    size: string;
    type: string;
  }[];
  aiFeasibilityScore: number; // 0 - 100
  aiJustification: string;
  review: ReviewScore;
  status: AlternativeStatus;
  likes: number;
  comments: AlternativeComment[];
  pilot: {
    approved: boolean;
    pilotSite?: string;
    budgetLakhs?: number;
    startDate?: string;
    status?: string;
    progressPct?: number;
    monitoringAgency?: string;
  };
  recognition?: {
    governmentApproved?: boolean;
    recognitionLevel?: string;
    fundingAmountLakhs?: number;
  };
  submittedAt: string;
  updatedAt: string;
}
