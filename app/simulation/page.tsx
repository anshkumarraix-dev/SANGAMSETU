'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import SimulationToast from '@/components/simulation/SimulationToast';
import ScoreRow from '@/components/simulation/ScoreRow';
import PersonaSwitcher from '@/components/simulation/PersonaSwitcher';
import InteractiveAISandbox from '@/components/simulation/InteractiveAISandbox';
import {
  SimulationStage,
  SimPersona,
  EvaluationStartup,
  ScoredParameter,
  PrototypeTestParameter,
  DepartmentReviewData,
  StartupNotification,
} from './types';
import {
  SIMULATION_PROBLEM,
  INITIAL_EVALUATION_STARTUPS,
  computeOverallAIScore,
  computeG2ValueScore,
  computePrototypeOverallResult,
  computeFinalSelectionStatus,
  generateDefaultDeploymentData,
} from './data';
import { generateStartupNotifications } from './notifications';
import {
  Building2,
  Rocket,
  FlaskConical,
  Shield,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  Clock,
  IndianRupee,
  Layers,
  ChevronRight,
  TrendingUp,
  Award,
  FileCheck2,
  Send,
  Eye,
  Check,
  Building,
  Target,
  FileText,
  BadgeCheck,
  Scale,
  Plus,
  Edit3,
  Info,
  SlidersHorizontal,
  ChevronDown,
  History,
  Lock,
  Search,
  ExternalLink,
  Bell,
  UserCheck,
  CheckCheck,
  BarChart3,
  ShieldAlert,
  CreditCard,
  Receipt,
  Activity,
  Download,
  UploadCloud,
  Server,
  Radio,
  FileSpreadsheet,
  Wallet,
  Banknote,
  CheckSquare,
  MapPin,
  Sliders,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';

function SimulationContent() {
  const searchParams = useSearchParams();
  const initialPersonaParam = searchParams.get('persona') as SimPersona | null;

  const [currentPersona, setCurrentPersona] = useState<SimPersona>(() => {
    if (initialPersonaParam && ['public', 'startup', 'department', 'evaluator', 'admin'].includes(initialPersonaParam)) {
      return initialPersonaParam;
    }
    return 'department';
  });

  const [stage, setStage] = useState<SimulationStage>(2);
  const [startups, setStartups] = useState<EvaluationStartup[]>(INITIAL_EVALUATION_STARTUPS);
  const [selectedStartupId, setSelectedStartupId] = useState<string>('s1');
  const [manualSelectedPilotId, setManualSelectedPilotId] = useState<string>('s1');
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'G1' | 'G2'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeptReviewModalOpen, setIsDeptReviewModalOpen] = useState(false);
  const [isLabTestModalOpen, setIsLabTestModalOpen] = useState(false);
  const [isAddStartupModalOpen, setIsAddStartupModalOpen] = useState(false);
  const [isFloatingSwitcherOpen, setIsFloatingSwitcherOpen] = useState(false);

  // Department Review Form State
  const [deptDecision, setDeptDecision] = useState<DepartmentReviewData['decision']>('Approve for Prototype');
  const [deptOverrideReason, setDeptOverrideReason] = useState('');
  const [deptReviewerName, setDeptReviewerName] = useState('Shri A. K. Sharma (Joint Secretary, MoRTH)');
  const [deptReviewNotes, setDeptReviewNotes] = useState<{ [param: string]: { answer: any; justification: string } }>({});
  const [overrideError, setOverrideError] = useState<string | null>(null);

  // Lab Testing Form State
  const [labParameters, setLabParameters] = useState<PrototypeTestParameter[]>([]);
  const [labName, setLabName] = useState('STQC Testing Laboratory, Delhi');

  // Add Startup Form State
  const [newStartupName, setNewStartupName] = useState('');
  const [newDpiitNumber, setNewDpiitNumber] = useState('');
  const [newCost, setNewCost] = useState(35);
  const [newCategory, setNewCategory] = useState<'G1' | 'G2'>('G1');
  const [newSolutionTitle, setNewSolutionTitle] = useState('');
  const [newSolutionSummary, setNewSolutionSummary] = useState('');

  // Toast
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isSandboxExpanded, setIsSandboxExpanded] = useState(true);

  // Inject startup configured in Interactive AI Sandbox
  const handleInjectStartupFromSandbox = (sandboxData: any) => {
    const newId = `s-sb-${Date.now()}`;
    const newStartup: EvaluationStartup = {
      id: newId,
      name: sandboxData.name || 'Sandbox Custom Startup',
      category: sandboxData.isG1Eligible ? 'G1' : 'G2',
      cost: sandboxData.budget || 35,
      dpiitNumber: `DPIIT${Math.floor(10000 + Math.random() * 90000)}`,
      solutionTitle: `${sandboxData.name} - Dynamic Traffic AI`,
      solutionSummary: 'Custom interactive sandbox-configured solution for urban corridor decongestion.',
      techStack: ['Python', 'OpenCV', 'PyTorch', 'FastAPI'],
      contactEmail: `contact@${(sandboxData.name || 'startup').toLowerCase().replace(/[^a-z0-9]/g, '')}.in`,
      eligibility: {
        status: 'Eligible',
        checks: [
          { parameter: 'Startup recognition', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'DPIIT certificate verified.' },
          { parameter: 'Submission deadline', result: 'Accept', isPassed: true, isMandatory: true, justification: 'Submitted on schedule.' },
          { parameter: 'Mandatory fields complete', result: 'Complete', isPassed: true, isMandatory: true, justification: 'All technical sections filled.' },
          { parameter: 'Required documents uploaded', result: 'Complete', isPassed: true, isMandatory: true, justification: 'All attachments present.' },
          { parameter: 'Challenge-specific eligibility', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'ITS domain match.' },
          { parameter: 'Conflict of interest', result: 'Clear', isPassed: true, isMandatory: true, justification: 'No conflict of interest.' },
          { parameter: 'Duplicate submission check', result: 'Valid', isPassed: true, isMandatory: true, justification: 'Original proposal.' },
          { parameter: 'Mandatory compliance declarations', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Compliant with DPDP Act.' },
        ],
      },
      aiEvaluation: {
        overallScore: sandboxData.overallScore,
        confidence: 'High',
        recommendation: sandboxData.isG1Eligible ? 'G1 candidate' : sandboxData.isG2Eligible ? 'G2 candidate' : 'Review further',
        duplicateFlag: false,
        complianceRiskFlag: false,
        parameters: [],
        strengths: ['Configured via Interactive Sandbox', 'High Problem-Solution alignment'],
        missingInformation: [],
        g2ValueScore: {
          scoreComponent: Number((sandboxData.overallScore * 0.6).toFixed(1)),
          costComponent: Number((sandboxData.costScore * 0.4).toFixed(1)),
          total: Math.round((sandboxData.overallScore * 0.6 + sandboxData.costScore * 0.4) * 10) / 10,
        },
      },
      departmentReview: {
        decision: 'Approve for Prototype',
        overridesAI: false,
        overrideReason: '',
        reviewer: 'Shri A. K. Sharma (Joint Secretary, MoRTH)',
        reviewedAt: new Date().toISOString(),
        notes: [],
        auditLog: [],
      },
      prototypeTesting: {
        overallResult: 'Pass',
        failedMandatoryReason: null,
        testedByLab: 'STQC Testing Laboratory, Delhi',
        testCertificateId: `STQC-2026-VAL-${Math.floor(1000 + Math.random() * 9000)}`,
        parameters: [],
      },
      finalSelection: {
        isEligibleForPilot: true,
        isFinallySelected: false,
        blockingItems: [],
        checklist: [],
      },
    };

    newStartup.finalSelection = computeFinalSelectionStatus(newStartup);
    setStartups(prev => [newStartup, ...prev]);
    setSelectedStartupId(newId);
    setToast({
      show: true,
      message: `"${sandboxData.name}" (Score: ${sandboxData.overallScore}/100) added to active simulation list!`,
      type: 'success',
    });
  };

  // Notifications feed for all startups
  const notificationsByStartup = useMemo(() => {
    return generateStartupNotifications(startups, stage);
  }, [startups, stage]);

  // HARD DATA-FILTERING RULE (Feature C):
  // Filtered startups depending on active persona
  const eligibleOnlyStartups = useMemo(() => {
    return startups.filter(
      s => s.eligibility.status === 'Eligible' && s.aiEvaluation.recommendation !== 'Not shortlisted'
    );
  }, [startups]);

  // G1 Ranked Startups (Filtered for Department & Public: Only Eligible & Shortlisted)
  const g1Shortlist = useMemo(() => {
    return eligibleOnlyStartups
      .filter(s => s.category === 'G1' || s.aiEvaluation.recommendation === 'G1 candidate')
      .sort((a, b) => b.aiEvaluation.overallScore - a.aiEvaluation.overallScore)
      .slice(0, 5);
  }, [eligibleOnlyStartups]);

  // G2 Ranked Startups (Filtered for Department & Public: Min 70/100, Eligible & Shortlisted)
  const g2Shortlist = useMemo(() => {
    return eligibleOnlyStartups
      .filter(s => s.aiEvaluation.overallScore >= 70 && s.aiEvaluation.recommendation === 'G2 candidate')
      .sort((a, b) => (b.aiEvaluation.g2ValueScore?.total || 0) - (a.aiEvaluation.g2ValueScore?.total || 0))
      .slice(0, 5);
  }, [eligibleOnlyStartups]);

  // Evaluator View Blind Data Mapping (Hides startup names and DPIIT IDs, replaces with anonymous Prototype IDs)
  const evaluatorBlindStartups = useMemo(() => {
    return eligibleOnlyStartups.map((s, index) => {
      const anonymousId = `Prototype ${s.category}-${String(index + 1).padStart(2, '0')}`;
      return {
        ...s,
        blindName: anonymousId,
        blindDpiit: 'DPIIT-CONFIDENTIAL-BLIND-MASKED',
        blindEmail: 'evaluator-relay@nic.in',
      };
    });
  }, [eligibleOnlyStartups]);

  // Currently Selected Startup Record
  const selectedStartup = useMemo(() => {
    return startups.find(s => s.id === selectedStartupId) || startups[0];
  }, [startups, selectedStartupId]);

  // Startup isolated notifications for Startup View
  const currentStartupNotifications: StartupNotification[] = useMemo(() => {
    return notificationsByStartup[selectedStartup.id] || [];
  }, [notificationsByStartup, selectedStartup.id]);

  // Filtered startups for Admin table
  const filteredAdminStartups = useMemo(() => {
    return startups.filter(s => {
      const matchCat = filterCategory === 'ALL' || s.category === filterCategory;
      const matchQuery =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.solutionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.dpiitNumber.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [startups, filterCategory, searchQuery]);

  // Inspection log state for Government Stage 7 Live Corridor Monitoring
  const [inspectionNote, setInspectionNote] = useState('');
  const [inspectionLogs, setInspectionLogs] = useState<Array<{ id: string; date: string; officer: string; note: string; corridor: string }>>([
    {
      id: 'insp-1',
      date: '05 Sep 2026, 11:30 AM IST',
      officer: 'Shri R. K. Sharma (Superintending Engineer, MoRTH)',
      note: 'Physical telemetry verification completed for 24 camera nodes on NH-48 Dhaula Kuan corridor. Sub-50ms inference verified.',
      corridor: 'NH-48 Corridor & Ring Road Junctions',
    },
  ]);

  // 7-Stage Definitions
  const STAGES = [
    { step: 0, label: '01. Problem Draft', desc: 'MoRTH corridor challenge in formulation' },
    { step: 1, label: '02. Live Intake', desc: 'Proposals submitted against live problem' },
    { step: 2, label: '03. AI Shortlisting', desc: '8-factor scoring into G1/G2 shortlists' },
    { step: 3, label: '04. Blind Lab Testing', desc: 'STQC 15-parameter independent audit' },
    { step: 4, label: '05. Ministry Review', desc: 'Final shortlist & verdicts sent to Govt' },
    { step: 5, label: '06. Pilot Sanction', desc: 'Selection confirmation & Work Order award' },
    { step: 6, label: '07. Live Deployment & Payments', desc: 'Corridor tracking & Milestone payments' },
  ];

  // 10-Step Demo Walkthrough Steps Definition
  const DEMO_STEPS = [
    {
      step: 1,
      persona: 'department' as SimPersona,
      stage: 0 as SimulationStage,
      personaLabel: 'Government View',
      title: 'Launch Problem Statement',
      actionLabel: 'Click "Submit Problem" to post live',
      desc: 'MoRTH drafts and publishes the national urban corridor challenge live on the platform.',
    },
    {
      step: 2,
      persona: 'startup' as SimPersona,
      stage: 1 as SimulationStage,
      personaLabel: 'Startup View',
      title: 'Propose a Solution',
      actionLabel: 'Submit technical proposal',
      desc: 'Startup reviews live problem statement and submits its dynamic traffic optimization proposal.',
    },
    {
      step: 3,
      persona: 'admin' as SimPersona,
      stage: 1 as SimulationStage,
      personaLabel: 'Platform Admin',
      title: 'View Proposed Solutions',
      actionLabel: 'Inspect 10+ intake proposals',
      desc: 'Platform SuperAdmin monitors all incoming startup submissions, DPIIT IDs, and solution summaries.',
    },
    {
      step: 4,
      persona: 'admin' as SimPersona,
      stage: 1 as SimulationStage,
      personaLabel: 'Platform Admin',
      title: 'Run AI Shortlisting',
      actionLabel: 'Click "Run AI Shortlisting"',
      desc: 'Automated 8-factor explainable AI evaluates all proposals into G1 Quality and G2 Value shortlists.',
    },
    {
      step: 5,
      persona: 'admin' as SimPersona,
      stage: 2 as SimulationStage,
      personaLabel: 'Platform Admin',
      title: 'Send to Evaluator',
      actionLabel: 'Click "Send to Evaluator"',
      desc: 'Shortlisted prototypes are routed to the independent testing laboratory for technical benchmarking.',
    },
    {
      step: 6,
      persona: 'evaluator' as SimPersona,
      stage: 3 as SimulationStage,
      personaLabel: 'Evaluator View',
      title: 'Blind Prototype Review',
      actionLabel: 'Audit 15 STQC lab parameters',
      desc: 'Independent testing lab evaluates anonymous prototypes (Prototype G1-01, etc.) under Blind Review Mode.',
    },
    {
      step: 7,
      persona: 'evaluator' as SimPersona,
      stage: 3 as SimulationStage,
      personaLabel: 'Evaluator View',
      title: 'Submit Test Reports',
      actionLabel: 'Click "Submit Test Reports to Admin"',
      desc: 'Lab completes benchmark certifications and submits verified results to Platform Admin.',
    },
    {
      step: 8,
      persona: 'admin' as SimPersona,
      stage: 4 as SimulationStage,
      personaLabel: 'Platform Admin',
      title: 'Send Final Selection to Govt',
      actionLabel: 'Click "Send Final Selection to Govt"',
      desc: 'Admin forwards the consolidated shortlist with STQC test verdicts to the Ministry (MoRTH).',
    },
    {
      step: 9,
      persona: 'department' as SimPersona,
      stage: 5 as SimulationStage,
      personaLabel: 'Government View',
      title: 'Sanction Pilot & Issue Work Order',
      actionLabel: 'Click "Confirm & Begin Deployment"',
      desc: 'Government sanctions the pilot under GFR 149/194 and initializes PFMS milestone escrow account.',
    },
    {
      step: 10,
      persona: 'department' as SimPersona,
      stage: 6 as SimulationStage,
      personaLabel: 'Govt & Startup Views',
      title: 'Live Deployment & Milestone Payments',
      actionLabel: 'Inspect corridor telemetry & release milestone payments',
      desc: 'MoRTH monitors real-time corridor metrics and approves Milestone 2 PFMS payment release to the startup.',
    },
  ];

  // Helper: Jump to specific walkthrough demo step
  const handleJumpToDemoStep = (stepNum: number) => {
    const target = DEMO_STEPS.find(s => s.step === stepNum);
    if (!target) return;
    setCurrentPersona(target.persona);
    setStage(target.stage);
    setToast({
      show: true,
      message: `Navigated to Demo Step ${target.step}: ${target.title} (${target.personaLabel}).`,
      type: 'info',
    });
  };

  // STEP 1 ACTION: Launch problem statement live (Stage 0 -> 1)
  const handleLaunchProblem = () => {
    setStage(1);
    setToast({
      show: true,
      message: 'Problem Statement successfully published live! Now accessible across Public Portal and Startup View.',
      type: 'success',
    });
  };

  // STEP 4 ACTION: Run AI Shortlisting (Stage 1 -> 2)
  const handleAdvanceToAIShortlisting = () => {
    setStage(2);
    setToast({
      show: true,
      message: 'Explainable AI shortlisting computed. Submissions classified into G1 (Quality) and G2 (Value) shortlists. Notifications dispatched.',
      type: 'success',
    });
  };

  // STEP 5 ACTION: Send shortlisted teams to evaluator (Stage 2 -> 3)
  const handleSendToEvaluator = () => {
    setStage(3);
    setToast({
      show: true,
      message: 'Shortlisted prototypes routed to STQC Testing Laboratory under Blind Review Mode.',
      type: 'info',
    });
  };

  // STEP 7 ACTION: Evaluator submits test reports back to Admin (Stage 3 -> 4)
  const handleSubmitTestReportsToAdmin = () => {
    setStage(4);
    setToast({
      show: true,
      message: 'STQC Lab Test Reports & Certificates successfully submitted to Platform Admin.',
      type: 'success',
    });
  };

  // STEP 8 ACTION: Admin sends final selection to Government (Stage 4)
  const handleSendSelectionToGovt = () => {
    setStage(5);
    setToast({
      show: true,
      message: 'Final Shortlist & STQC Benchmarks dispatched to Ministry of Road Transport and Highways (MoRTH). Stage 06 is now active.',
      type: 'success',
    });
  };

  // STEP 9 ACTION: Government sanctions pilot and initializes deployment & milestones (Stage 5 -> 6 / Stage 07)
  const handleConfirmAndDeploy = (startupIdToSanction?: string) => {
    const targetId = startupIdToSanction || manualSelectedPilotId || selectedStartup.id;
    const target = startups.find(s => s.id === targetId);

    if (!target) return;

    if (!target.finalSelection?.isEligibleForPilot) {
      setToast({
        show: true,
        message: `Cannot sanction pilot for ${target.name}: Mandatory pre-conditions are blocking selection.`,
        type: 'error',
      });
      return;
    }

    const workOrderNumber = `MORTH/DPIIT/2026/WO-${(target.id.charCodeAt(0) * 17 + target.cost * 13) % 900 + 100}`;
    const deployment = generateDefaultDeploymentData(target.cost, workOrderNumber);

    setStartups(prev =>
      prev.map(s => {
        if (s.id === target.id) {
          return {
            ...s,
            finalSelection: {
              ...s.finalSelection,
              isFinallySelected: true,
              workOrderNumber,
              sanctionAmount: s.cost * 100000,
            },
            deployment,
          };
        } else {
          return {
            ...s,
            finalSelection: {
              ...s.finalSelection,
              isFinallySelected: false,
            },
            deployment: undefined,
          };
        }
      })
    );

    setSelectedStartupId(target.id);
    setManualSelectedPilotId(target.id);
    setStage(6); // Advances to Stage 6 (Stage 07: Live Deployment & Milestone Payments)

    setToast({
      show: true,
      message: `Pilot Work Order ${workOrderNumber} officially sanctioned to ${target.name} (₹${target.cost}L). Deployment initialized & Milestone 1 advance released. Stage 07 is now live!`,
      type: 'success',
    });
  };

  // ACTION: Government Approves Milestone & Releases PFMS Treasury Payment
  const handleApproveMilestonePayment = (startupId: string, milestoneNumber: number) => {
    const txnId = `PFMS/2026/TXN-${78400 + milestoneNumber * 123}`;
    const utrNo = `RBIND20269824${milestoneNumber}882`;
    const nowTime = '11:45 AM IST';

    setStartups(prev =>
      prev.map(s => {
        if (s.id === startupId && s.deployment) {
          const updatedMilestones = s.deployment.milestones.map(m => {
            if (m.milestoneNumber === milestoneNumber) {
              return {
                ...m,
                status: 'Disbursed' as const,
                disbursedAt: `Today, ${nowTime}`,
                pfmsTransactionId: txnId,
                utrNumber: utrNo,
                verificationOfficer: 'Shri A. K. Sharma (Joint Secretary & DDO PFMS, MoRTH)',
              };
            }
            return m;
          });

          const totalDisbursed = updatedMilestones
            .filter(m => m.status === 'Disbursed')
            .reduce((acc, m) => acc + m.amountLakhs, 0);
          const roundedDisbursed = Math.round(totalDisbursed * 10) / 10;
          const remainingBalance = Math.round((s.deployment.escrowAccount.sanctionTotalLakhs - roundedDisbursed) * 10) / 10;

          return {
            ...s,
            deployment: {
              ...s.deployment,
              progressPercentage: Math.min(100, s.deployment.progressPercentage + 25),
              milestones: updatedMilestones,
              escrowAccount: {
                ...s.deployment.escrowAccount,
                totalDisbursedLakhs: roundedDisbursed,
                remainingBalanceLakhs: Math.max(0, remainingBalance),
              },
            },
          };
        }
        return s;
      })
    );

    setToast({
      show: true,
      message: `Milestone ${milestoneNumber} Verified & Disbursed! PFMS Ref: ${txnId} | UTR: ${utrNo}. Funds credited to startup escrow.`,
      type: 'success',
    });
  };

  // ACTION: Startup Submits Milestone Deliverables / Telemetry Proof
  const handleSubmitMilestoneProof = (startupId: string, milestoneNumber: number) => {
    setStartups(prev =>
      prev.map(s => {
        if (s.id === startupId && s.deployment) {
          const updatedMilestones = s.deployment.milestones.map(m => {
            if (m.milestoneNumber === milestoneNumber) {
              return {
                ...m,
                proofSubmitted: true,
                proofDocumentName: `Live_Corridor_Telemetry_Logs_M${milestoneNumber}.pdf (5.4 MB)`,
                status: 'Under Verification' as const,
              };
            }
            return m;
          });
          return {
            ...s,
            deployment: {
              ...s.deployment,
              milestones: updatedMilestones,
            },
          };
        }
        return s;
      })
    );

    setToast({
      show: true,
      message: `Milestone ${milestoneNumber} telemetry logs and deliverable proof submitted to MoRTH for audit and fund release.`,
      type: 'info',
    });
  };

  // ACTION: Government Officer Logs Field Inspection
  const handleAddInspection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectionNote.trim()) return;

    const newLog = {
      id: `insp-${Date.now()}`,
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) + ' IST',
      officer: 'Shri A. K. Sharma (Joint Secretary, MoRTH)',
      note: inspectionNote.trim(),
      corridor: 'NH-48 Corridor & Ring Road Junctions',
    };

    setInspectionLogs(prev => [newLog, ...prev]);
    setInspectionNote('');
    setToast({
      show: true,
      message: 'On-site field inspection audit note logged into official statutory record.',
      type: 'success',
    });
  };

  // Helper: Open Department Review Modal
  const handleOpenDeptReview = (startup: EvaluationStartup) => {
    setSelectedStartupId(startup.id);
    setDeptDecision(startup.departmentReview.decision || 'Approve for Prototype');
    setDeptOverrideReason(startup.departmentReview.overrideReason || '');
    setDeptReviewerName(startup.departmentReview.reviewer || 'Shri A. K. Sharma (Joint Secretary, MoRTH)');

    const notesMap: { [param: string]: { answer: any; justification: string } } = {};
    startup.departmentReview.notes.forEach(n => {
      notesMap[n.parameter] = { answer: n.answer, justification: n.justification };
    });
    setDeptReviewNotes(notesMap);
    setOverrideError(null);
    setIsDeptReviewModalOpen(true);
  };

  // Helper: Save Department Review
  const handleSaveDeptReview = () => {
    const aiRec = selectedStartup.aiEvaluation.recommendation;
    const isAiPositive = aiRec === 'G1 candidate' || aiRec === 'G2 candidate';
    const isDeptPositive = deptDecision === 'Approve for Prototype';

    const isOverriding = (isAiPositive && !isDeptPositive) || (!isAiPositive && isDeptPositive);

    if (isOverriding && (!deptOverrideReason || deptOverrideReason.trim().length < 15)) {
      setOverrideError(
        'MANDATORY OVERRIDE JUSTIFICATION REQUIRED: The department decision conflicts with AI recommendation. You must provide a formal written justification (minimum 15 characters) to satisfy statutory audit rules.'
      );
      return;
    }

    const updatedNotes = selectedStartup.departmentReview.notes.map(n => {
      if (deptReviewNotes[n.parameter]) {
        return {
          ...n,
          answer: deptReviewNotes[n.parameter].answer,
          justification: deptReviewNotes[n.parameter].justification,
        };
      }
      return n;
    });

    const newAuditEntry = {
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' IST',
      actor: deptReviewerName,
      action: isOverriding ? 'DECISION_OVERRIDE_RECORDED' : 'DECISION_RECORDED',
      reason: isOverriding
        ? `Overrode AI (${aiRec}) with decision: "${deptDecision}". Justification: ${deptOverrideReason}`
        : `Confirmed decision "${deptDecision}" matching AI scoring baseline.`,
    };

    setStartups(prev =>
      prev.map(s => {
        if (s.id === selectedStartup.id) {
          const updatedReview: DepartmentReviewData = {
            ...s.departmentReview,
            decision: deptDecision,
            overridesAI: isOverriding,
            overrideReason: isOverriding ? deptOverrideReason : '',
            reviewer: deptReviewerName,
            reviewedAt: new Date().toISOString(),
            notes: updatedNotes,
            auditLog: [newAuditEntry, ...s.departmentReview.auditLog],
          };
          const updatedStartup = { ...s, departmentReview: updatedReview };
          updatedStartup.finalSelection = computeFinalSelectionStatus(updatedStartup);
          return updatedStartup;
        }
        return s;
      })
    );

    setIsDeptReviewModalOpen(false);
    setToast({
      show: true,
      message: `Department decision for ${selectedStartup.name} saved and logged to official audit trail.`,
      type: 'success',
    });
  };

  // Helper: Open Lab Testing Modal
  const handleOpenLabTest = (startup: EvaluationStartup) => {
    setSelectedStartupId(startup.id);
    setLabParameters(JSON.parse(JSON.stringify(startup.prototypeTesting.parameters)));
    setLabName(startup.prototypeTesting.testedByLab || 'STQC Testing Laboratory, Delhi');
    setIsLabTestModalOpen(true);
  };

  // Helper: Save Lab Testing Parameters
  const handleSaveLabTest = () => {
    const { overallResult, failedMandatoryReason } = computePrototypeOverallResult(labParameters);

    setStartups(prev =>
      prev.map(s => {
        if (s.id === selectedStartup.id) {
          const updatedTesting = {
            ...s.prototypeTesting,
            parameters: labParameters,
            overallResult,
            failedMandatoryReason,
            testedByLab: labName,
          };
          const updatedStartup = { ...s, prototypeTesting: updatedTesting };
          updatedStartup.finalSelection = computeFinalSelectionStatus(updatedStartup);
          return updatedStartup;
        }
        return s;
      })
    );

    setIsLabTestModalOpen(false);
    setToast({
      show: true,
      message: `Prototype benchmarking updated for ${selectedStartup.name}. Overall Verdict: ${overallResult.toUpperCase()}`,
      type: overallResult === 'Fail' ? 'error' : 'success',
    });
  };

  // Helper: Reset All Data to Baseline
  const handleResetBaseline = () => {
    setStartups(INITIAL_EVALUATION_STARTUPS);
    setStage(2);
    setSelectedStartupId('s1');
    setManualSelectedPilotId('s1');
    setToast({
      show: true,
      message: 'Evaluation dataset restored to clean official baseline.',
      type: 'info',
    });
  };

  // Helper: Add Custom Startup
  const handleCreateStartup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStartupName || !newDpiitNumber) return;

    const newId = `s-${Date.now()}`;
    const baseParams: ScoredParameter[] = [
      {
        name: 'Problem-Solution Fit',
        weight: 20,
        score: 88,
        justification: 'Addresses corridor delay with targeted vehicle queue timing algorithm.',
        evidence: ['Proposal specs match MoRTH outcome'],
        confidence: 'High',
      },
      {
        name: 'Technical Feasibility',
        weight: 15,
        score: 85,
        justification: 'Feasible edge architecture with standard camera RTSP feeds.',
        evidence: ['RTSP video ingest pipeline'],
        confidence: 'High',
      },
      {
        name: 'Innovation and Differentiation',
        weight: 15,
        score: 86,
        justification: 'Unique dynamic cycle adaptation without requiring road inductive loops.',
        evidence: ['Optical queue detection neural net'],
        confidence: 'High',
      },
      {
        name: 'Impact Potential',
        weight: 15,
        score: 89,
        justification: 'Expected 22% reduction in peak-hour intersection delay.',
        evidence: ['Micro-simulation model'],
        confidence: 'High',
      },
      {
        name: 'Cost-Effectiveness',
        weight: 15,
        score: 92,
        justification: `Quoted cost of ₹${newCost} Lakhs fits well within sanctioned budget ceiling.`,
        evidence: ['Itemized BoM breakdown'],
        confidence: 'High',
      },
      {
        name: 'Scalability',
        weight: 10,
        score: 88,
        justification: 'Dockerized microservices allow rapid multi-junction deployment.',
        evidence: ['Kubernetes deployment YAML'],
        confidence: 'High',
      },
      {
        name: 'Team Capability',
        weight: 5,
        score: 84,
        justification: 'Core engineering team with relevant mobility and AI experience.',
        evidence: ['Team profile review'],
        confidence: 'Medium',
      },
      {
        name: 'Risk and Compliance',
        weight: 5,
        score: 90,
        justification: 'DPDP Act 2023 compliance declaration and data localization confirmed.',
        evidence: ['Compliance affidavit'],
        confidence: 'High',
      },
    ];

    const overall = computeOverallAIScore(baseParams);
    const g2Val = computeG2ValueScore(overall, newCost, 89);

    const protoParams: PrototypeTestParameter[] = [
      { name: 'Functional correctness', isMandatory: true, result: 'Pass', evidence: 'Functional test passed.', justification: 'Core signal prediction operational.' },
      { name: 'Accuracy / quality', isMandatory: false, result: 'Pass', evidence: 'Accuracy 90.5%.', justification: 'High predictive accuracy.' },
      { name: 'Performance', isMandatory: false, result: 'Pass', evidence: 'Latency < 140ms.', justification: 'Real-time performance verified.' },
      { name: 'Scalability', isMandatory: false, result: 'Pass', evidence: '20 nodes tested.', justification: 'Scales across intersections.' },
      { name: 'Security', isMandatory: true, result: 'Pass', evidence: 'No CVEs.', justification: 'Clean vulnerability scan.' },
      { name: 'Privacy', isMandatory: false, result: 'Pass', evidence: 'Edge blurring active.', justification: 'No PII stored.' },
      { name: 'Integration', isMandatory: true, result: 'Pass', evidence: 'Signal API connected.', justification: 'Controller communication verified.' },
      { name: 'Usability', isMandatory: false, result: 'Pass', evidence: 'Standard UI.', justification: 'SUS score 84.' },
      { name: 'Accessibility', isMandatory: false, result: 'Pass', evidence: 'WCAG compliant.', justification: 'Accessible design.' },
      { name: 'Deployment readiness', isMandatory: false, result: 'Pass', evidence: 'Docker container ready.', justification: 'Deployment verified.' },
      { name: 'Reliability', isMandatory: false, result: 'Pass', evidence: '48hr soak test passed.', justification: 'Zero crashes.' },
      { name: 'Maintainability', isMandatory: false, result: 'Pass', evidence: 'Documented code.', justification: 'Maintainable.' },
      { name: 'Cost validation', isMandatory: false, result: 'Pass', evidence: `₹${newCost}L verified.`, justification: 'Cost verified.' },
      { name: 'Compliance validation', isMandatory: true, result: 'Pass', evidence: 'DPIIT certificate active.', justification: 'Compliant.' },
      { name: 'Pilot KPI readiness', isMandatory: false, result: 'Pass', evidence: 'Telemetry active.', justification: 'Telemetry verified.' },
    ];

    const newStartup: EvaluationStartup = {
      id: newId,
      name: newStartupName,
      category: newCategory,
      cost: newCost,
      dpiitNumber: newDpiitNumber,
      solutionTitle: newSolutionTitle || `${newStartupName} Traffic AI Engine`,
      solutionSummary: newSolutionSummary || 'AI-driven dynamic signal timing solution.',
      techStack: ['Python', 'OpenCV', 'FastAPI', 'PostgreSQL'],
      contactEmail: `contact@${newStartupName.toLowerCase().replace(/[^a-z0-9]/g, '')}.in`,
      eligibility: {
        status: 'Eligible',
        checks: [
          { parameter: 'Startup recognition', result: 'Eligible', isPassed: true, isMandatory: true, justification: `DPIIT certificate ${newDpiitNumber} verified.` },
          { parameter: 'Submission deadline', result: 'Accept', isPassed: true, isMandatory: true, justification: 'Submitted on schedule.' },
          { parameter: 'Mandatory fields complete', result: 'Complete', isPassed: true, isMandatory: true, justification: 'All technical sections filled.' },
          { parameter: 'Required documents uploaded', result: 'Complete', isPassed: true, isMandatory: true, justification: 'All attachments present.' },
          { parameter: 'Challenge-specific eligibility', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'ITS domain match.' },
          { parameter: 'Conflict of interest', result: 'Clear', isPassed: true, isMandatory: true, justification: 'No conflict of interest.' },
          { parameter: 'Duplicate submission check', result: 'Valid', isPassed: true, isMandatory: true, justification: 'Original proposal.' },
          { parameter: 'Mandatory compliance declarations', result: 'Eligible', isPassed: true, isMandatory: true, justification: 'Compliant with DPDP Act.' },
        ],
      },
      aiEvaluation: {
        overallScore: overall,
        confidence: 'High',
        recommendation: overall >= 90 ? 'G1 candidate' : overall >= 80 ? 'G2 candidate' : 'Review further',
        duplicateFlag: false,
        complianceRiskFlag: false,
        parameters: baseParams,
        strengths: ['Clear problem mapping', 'Cost-effective pricing'],
        missingInformation: [],
        g2ValueScore: g2Val,
      },
      departmentReview: {
        decision: 'Approve for Prototype',
        overridesAI: false,
        overrideReason: '',
        reviewer: 'Shri A. K. Sharma (Joint Secretary, MoRTH)',
        reviewedAt: new Date().toISOString(),
        notes: [
          { parameter: 'Departmental priority alignment', answer: 'Satisfactory', justification: 'Direct alignment with corridor decongestion goals.' },
        ],
        auditLog: [
          {
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' IST',
            actor: 'Shri A. K. Sharma',
            action: 'DECISION_SAVED',
            reason: 'Approved based on AI scoring evaluation.',
          },
        ],
      },
      prototypeTesting: {
        overallResult: 'Pass',
        failedMandatoryReason: null,
        testedByLab: 'STQC Testing Laboratory, Delhi',
        testCertificateId: `STQC-2026-VAL-${Math.floor(1000 + Math.random() * 9000)}`,
        parameters: protoParams,
      },
      finalSelection: {
        isEligibleForPilot: true,
        isFinallySelected: false,
        blockingItems: [],
        checklist: [],
      },
    };

    newStartup.finalSelection = computeFinalSelectionStatus(newStartup);

    setStartups(prev => [newStartup, ...prev]);
    setSelectedStartupId(newId);
    setIsAddStartupModalOpen(false);
    setNewStartupName('');
    setNewDpiitNumber('');
    setToast({
      show: true,
      message: `Proposal for "${newStartupName}" registered with auto-derived AI score: ${overall}/100.`,
      type: 'success',
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <MainNavbar activeTab="simulation" />

      {toast && (
        <SimulationToast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}

      {/* PERSISTENT FLOATING PERSONA SWITCHER TRIGGER (Bottom-Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        {isFloatingSwitcherOpen ? (
          <div className="relative">
            <button
              onClick={() => setIsFloatingSwitcherOpen(false)}
              className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-md z-50 hover:bg-slate-800 cursor-pointer"
            >
              ✕
            </button>
            <PersonaSwitcher
              currentPersona={currentPersona}
              onSelectPersona={(p) => {
                setCurrentPersona(p);
                setIsFloatingSwitcherOpen(false);
              }}
              departmentName={SIMULATION_PROBLEM.department}
              isFloating={true}
            />
          </div>
        ) : (
          <button
            onClick={() => setIsFloatingSwitcherOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-slate-950 via-slate-900 to-blue-700 text-white font-bold text-xs shadow-xl border border-blue-400/30 hover:scale-105 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Persona Switcher</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white">
              {currentPersona.toUpperCase()}
            </span>
          </button>
        )}
      </div>

      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* TOP BANNER WITH INTEGRATED PERSONA SWITCHER */}
        <div className="bg-white rounded-md border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-xs text-[10px] font-black uppercase tracking-wider bg-sangam-blue-600 text-white">
                  Part 3: Multi-Persona Role Simulator
                </span>
                <span className="text-xs text-slate-500 font-mono">GFR 2017 Rules 149 / 194 Compliant</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-sangam-navy-900 mt-1 flex items-center gap-2">
                <Scale className="w-6 h-6 text-sangam-blue-600 shrink-0" />
                <span>Explainable Evaluation & Statutory Procurement Simulation</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Switch between <strong>Public Portal</strong>, <strong>Startup View</strong>, <strong>Department View (MoRTH)</strong>, <strong>Evaluator Blind Review (STQC)</strong>, and <strong>Platform SuperAdmin</strong> with role-enforced data boundaries.
              </p>
            </div>

            {/* Persona Switcher Component Header Integration */}
            <div className="shrink-0 flex items-center gap-2">
              <PersonaSwitcher
                currentPersona={currentPersona}
                onSelectPersona={setCurrentPersona}
                departmentName={SIMULATION_PROBLEM.department}
              />
            </div>
          </div>

          {/* 10-STEP DEMO WALKTHROUGH INTERACTIVE GUIDE */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-sangam-navy-900 rounded-md p-4 text-white shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-amber-400/20 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                    SangamSetu Walkthrough Flow
                  </span>
                  <h2 className="text-xs sm:text-sm font-bold text-white">
                    Step-by-Step 10-Stage Demo Simulation Journey
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <span>Active Persona: <strong className="text-white uppercase">{currentPersona}</strong></span>
                <span>•</span>
                <span>Stage: <strong className="text-amber-300">0{stage + 1}/07</strong></span>
              </div>
            </div>

            {/* 10 Step Pills / Quick Nav */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-1.5">
              {DEMO_STEPS.map(s => {
                const isCurrentStep =
                  currentPersona === s.persona &&
                  ((s.step === 1 && stage === 0) ||
                   (s.step === 2 && stage === 1 && currentPersona === 'startup') ||
                   (s.step === 3 && stage === 1 && currentPersona === 'admin') ||
                   (s.step === 4 && stage === 1 && currentPersona === 'admin') ||
                   (s.step === 5 && stage === 2 && currentPersona === 'admin') ||
                   (s.step === 6 && stage === 3 && currentPersona === 'evaluator') ||
                   (s.step === 7 && stage === 3 && currentPersona === 'evaluator') ||
                   (s.step === 8 && stage === 4 && currentPersona === 'admin') ||
                   (s.step === 9 && stage === 5 && currentPersona === 'department') ||
                   (s.step === 10 && stage === 6));

                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => handleJumpToDemoStep(s.step)}
                    className={`text-left p-2 rounded border transition-all cursor-pointer select-none ${
                      isCurrentStep
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-sm scale-102'
                        : 'bg-white/5 hover:bg-white/10 text-white/90 border-white/10'
                    }`}
                    title={s.desc}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[9px] font-black uppercase ${
                          isCurrentStep ? 'text-slate-950' : 'text-amber-400/90'
                        }`}
                      >
                        {s.step < 10 ? `Step 0${s.step}` : `Step ${s.step}`}
                      </span>
                      <span className={`text-[8px] font-mono px-1 rounded ${
                        isCurrentStep ? 'bg-slate-950 text-white' : 'bg-white/10 text-white/70'
                      }`}>
                        {s.personaLabel.split(' ')[0]}
                      </span>
                    </div>
                    <div className="font-bold text-[10px] mt-0.5 leading-tight truncate">
                      {s.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7-Stage Progress Stepper & Stage Advance Actions */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Procurement Stage Progression:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {stage === 0 && (
                  <button
                    onClick={handleLaunchProblem}
                    className="px-2.5 py-1 rounded bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3 h-3 text-amber-300" />
                    <span>Submit Problem (Launch Live 0→1)</span>
                  </button>
                )}
                {stage === 1 && (
                  <button
                    onClick={handleAdvanceToAIShortlisting}
                    className="px-2.5 py-1 rounded bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Run AI Shortlisting (Advance 1→2)</span>
                  </button>
                )}
                {stage === 2 && (
                  <button
                    onClick={handleSendToEvaluator}
                    className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <FlaskConical className="w-3 h-3" />
                    <span>Send to Evaluator (Advance 2→3)</span>
                  </button>
                )}
                {stage === 3 && (
                  <button
                    onClick={handleSubmitTestReportsToAdmin}
                    className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <CheckCheck className="w-3 h-3 text-amber-300" />
                    <span>Submit Test Reports to Admin (Advance 3→4)</span>
                  </button>
                )}
                {stage === 4 && (
                  <button
                    onClick={handleSendSelectionToGovt}
                    className="px-2.5 py-1 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Building2 className="w-3 h-3 text-amber-300" />
                    <span>Send Selection to Govt (Advance 4→5)</span>
                  </button>
                )}
                {stage === 5 && (
                  <button
                    onClick={() => handleConfirmAndDeploy()}
                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <FileCheck2 className="w-3 h-3 text-amber-300" />
                    <span>Confirm & Begin Deployment (Sanction 5→6)</span>
                  </button>
                )}
                {stage === 6 && (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Stage 07: Live Deployment & Milestone Payments Active</span>
                  </div>
                )}
                <button
                  onClick={handleResetBaseline}
                  className="px-2.5 py-1 rounded border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-slate-500" />
                  <span>Reset Data</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {STAGES.map(s => {
                const isCurrent = stage === s.step;
                const isCompleted = stage > s.step;
                return (
                  <button
                    key={s.step}
                    onClick={() => setStage(s.step as SimulationStage)}
                    className={`text-left p-2.5 rounded-sm border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-sangam-navy-900 text-white border-sangam-navy-900 shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-50 text-slate-800 border-emerald-300 hover:bg-emerald-100/70'
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-black uppercase ${
                          isCurrent ? 'text-amber-400' : isCompleted ? 'text-emerald-700' : 'text-slate-500'
                        }`}
                      >
                        Stage 0{s.step + 1}
                      </span>
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : isCurrent ? (
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                    </div>
                    <div className="font-bold text-xs mt-0.5 truncate">{s.label}</div>
                    <div className={`text-[10px] truncate ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                      {s.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* INTERACTIVE AI EVALUATION SANDBOX (FEATURE: SIMPLE & INTERACTIVE TUNER) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-100 text-indigo-700">
                <SlidersHorizontal className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Live AI Scoring Sandbox & Scenario Presets
              </span>
            </div>
            <button
              onClick={() => setIsSandboxExpanded(!isSandboxExpanded)}
              className="text-xs text-indigo-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              {isSandboxExpanded ? (
                <>
                  <span>Hide Sandbox</span>
                  <ChevronDown className="w-3.5 h-3.5 rotate-180 transition-transform" />
                </>
              ) : (
                <>
                  <span>Open Interactive Sandbox</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                </>
              )}
            </button>
          </div>

          {isSandboxExpanded && (
            <InteractiveAISandbox onInjectStartup={handleInjectStartupFromSandbox} />
          )}
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: PUBLIC PORTAL PERSONA (FEATURE C) */}
        {/* ========================================================= */}
        {currentPersona === 'public' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-sm">
                    <Eye className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-xs">
                      Public Portal • Read-Only Transparency View
                    </span>
                    <h2 className="text-lg font-black text-sangam-navy-900 mt-1">
                      {SIMULATION_PROBLEM.title}
                    </h2>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {stage >= 5 ? 'Pilot Awarded' : 'Active Challenge Cycle'}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">{SIMULATION_PROBLEM.statement}</p>

              {/* High-Level Public Aggregate Counts Only (No Startup Names, Scores, or Verdicts) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Proposals Received</span>
                  <span className="text-base font-black text-slate-900">{startups.length} Submissions</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Sanctioned Budget</span>
                  <span className="text-base font-black text-emerald-700">
                    ₹{SIMULATION_PROBLEM.budgetMin}L – ₹{SIMULATION_PROBLEM.budgetMax}L
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Pilot Timeline</span>
                  <span className="text-base font-black text-blue-700">{SIMULATION_PROBLEM.timelineMonths} Months</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Host Department</span>
                  <span className="text-base font-black text-sangam-navy-900">{SIMULATION_PROBLEM.department}</span>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-sm text-xs text-blue-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Public Transparency & Statutory Procurement Compliance Notice</span>
                </div>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Under the GFR 2017 Innovation Procurement Guidelines, individual startup names, interim AI scorecards, and proprietary laboratory logs remain confidential during active evaluation to maintain competitive fairness and prevent market distortion. Final sanctioned contract awards are published to the public gazette upon completion.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: STARTUP VIEW PERSONA (SCOPED + NOTIFICATIONS - FEATURE C & E) */}
        {/* ========================================================= */}
        {currentPersona === 'startup' && (
          <div className="space-y-6">
            {/* Step 2 Propose Solution / Live Challenge Card */}
            <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-amber-50 text-amber-600 rounded-sm">
                    <Rocket className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-xs">
                      {stage === 0 ? 'Problem In Draft Formulation' : 'Live Challenge • Proposals Open'}
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-sangam-navy-900 mt-0.5">
                      {SIMULATION_PROBLEM.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {stage >= 1 ? (
                    <button
                      onClick={() => setIsAddStartupModalOpen(true)}
                      className="px-3.5 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Propose a Solution (Submit Technical Proposal)</span>
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                      Awaiting Government Launch
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">{SIMULATION_PROBLEM.statement}</p>
            </div>

            {/* Scoped Startup Transparency Dossier */}
            <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-xs">
                    Startup Portal Self-Inspection (Scoped to Your Entity Only)
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-sangam-navy-900 mt-1">
                    {selectedStartup.name} • Evaluation Transparency Dossier
                  </h2>
                  <p className="text-xs text-slate-500 font-mono">DPIIT ID: {selectedStartup.dpiitNumber}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Switch Startup View:</span>
                  <select
                    value={selectedStartup.id}
                    onChange={e => setSelectedStartupId(e.target.value)}
                    className="text-xs font-semibold px-2 py-1 rounded border border-slate-300 bg-white cursor-pointer"
                  >
                    {startups.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Startup In-App Notification Feed (Feature E) */}
              <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                      In-App Official Notifications ({currentStartupNotifications.length})
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Isolated to {selectedStartup.name}</span>
                </div>

                <div className="space-y-2">
                  {currentStartupNotifications.map(notif => (
                    <div
                      key={notif.id}
                      className="p-3 bg-white rounded border border-slate-200 text-xs space-y-1 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{notif.title}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-1.5 py-0.2 rounded-xs text-[10px] font-bold ${
                              notif.badgeColor === 'emerald'
                                ? 'bg-emerald-100 text-emerald-800'
                                : notif.badgeColor === 'amber'
                                ? 'bg-amber-100 text-amber-800'
                                : notif.badgeColor === 'rose'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {notif.badgeText}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{notif.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Startup Own Evaluation Parameters */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Your 8-Factor Explainable AI Scorecard (Overall Score: {selectedStartup.aiEvaluation.overallScore}/100)
                  </h3>
                  <span className="text-xs font-bold text-sangam-blue-600">
                    Track: {selectedStartup.aiEvaluation.recommendation}
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedStartup.aiEvaluation.parameters.map((param, idx) => (
                    <ScoreRow
                      key={idx}
                      id={`startup-ai-param-${idx}`}
                      label={param.name}
                      value={param.score}
                      weight={param.weight}
                      justification={param.justification}
                      evidence={param.evidence}
                      confidence={param.confidence}
                      category="AI Parameter"
                    />
                  ))}
                </div>
              </div>

              {/* Startup Own STQC Lab Test Results (If stage >= 3) */}
              {stage >= 3 && (
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Your STQC Laboratory Benchmarking Report (Result: {selectedStartup.prototypeTesting.overallResult})
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">
                      Cert: {selectedStartup.prototypeTesting.testCertificateId}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedStartup.prototypeTesting.parameters.map((param, idx) => (
                      <ScoreRow
                        key={idx}
                        id={`startup-proto-param-${idx}`}
                        label={param.name}
                        value={param.result}
                        isMandatory={param.isMandatory}
                        justification={param.justification}
                        evidence={param.evidence ? [param.evidence] : []}
                        category="STQC Lab Test"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* STAGE 6 & 7: LIVE DEPLOYMENT PROCESS & MILESTONE PAYMENTS (STARTUP VIEW REFLECTION) */}
            {stage >= 5 && (
              <>
                {selectedStartup.deployment ? (
                  <div className="space-y-6">
                    {/* Sanction Order & PFMS Escrow Card */}
                    <div className="bg-gradient-to-br from-slate-900 via-sangam-navy-900 to-slate-950 rounded-md p-6 text-white border border-slate-800 shadow-md space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="p-2.5 bg-amber-400/20 text-amber-400 rounded-sm">
                            <Award className="w-6 h-6" />
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-xs text-[10px] font-black uppercase bg-amber-400 text-slate-950">
                                Officially Sanctioned Pilot Awardee
                              </span>
                              <span className="text-xs text-slate-300 font-mono">
                                Work Order: {selectedStartup.finalSelection?.workOrderNumber}
                              </span>
                            </div>
                            <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                              {selectedStartup.name} • Stage 07 Live Corridor Deployment
                            </h2>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Sanctioned Amount</span>
                          <span className="text-xl sm:text-2xl font-black text-amber-400">
                            ₹{selectedStartup.cost}.00 Lakhs
                          </span>
                        </div>
                      </div>

                      {/* Escrow Account Overview Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                            <Wallet className="w-3.5 h-3.5 text-amber-400" /> PFMS Escrow Account
                          </span>
                          <span className="font-mono text-xs font-bold text-white block">
                            {selectedStartup.deployment.escrowAccount.virtualAccountNumber}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {selectedStartup.deployment.escrowAccount.bankName} (RBI Direct)
                          </span>
                        </div>

                        <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                            <Banknote className="w-3.5 h-3.5 text-emerald-400" /> Disbursed to Date
                          </span>
                          <span className="text-base font-black text-emerald-400 block">
                            ₹{selectedStartup.deployment.escrowAccount.totalDisbursedLakhs} Lakhs
                          </span>
                          <span className="text-[10px] text-emerald-300/80">
                            {Math.round((selectedStartup.deployment.escrowAccount.totalDisbursedLakhs / selectedStartup.deployment.escrowAccount.sanctionTotalLakhs) * 100)}% of total released
                          </span>
                        </div>

                        <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5 text-blue-400" /> Escrow Balance Locked
                          </span>
                          <span className="text-base font-black text-blue-300 block">
                            ₹{selectedStartup.deployment.escrowAccount.remainingBalanceLakhs} Lakhs
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Held in Treasury for Milestones 2-4
                          </span>
                        </div>

                        <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-purple-400" /> Target Corridor
                          </span>
                          <span className="text-xs font-bold text-white block truncate">
                            {selectedStartup.deployment.corridorName}
                          </span>
                          <span className="text-[10px] text-purple-300 font-mono">
                            MoRTH Pilot Jurisdiction
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Live Corridor Deployment Process Card */}
                    <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="p-2 bg-blue-50 text-blue-600 rounded-sm">
                            <Activity className="w-5 h-5" />
                          </span>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-xs">
                              Physical & Edge Telemetry Process
                            </span>
                            <h3 className="text-base font-black text-sangam-navy-900 mt-0.5">
                              Corridor Deployment Process & IoT Telemetry Health
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-600">Overall Deployment Progress:</span>
                          <span className="px-2.5 py-1 rounded text-xs font-black bg-blue-100 text-blue-900 border border-blue-200">
                            {selectedStartup.deployment.progressPercentage}%
                          </span>
                        </div>
                      </div>

                      {/* 4 Process Telemetry Metrics */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 bg-slate-50 rounded border border-slate-200 text-center">
                          <span className="text-[10px] text-slate-500 uppercase font-bold block flex items-center justify-center gap-1">
                            <Cpu className="w-3 h-3 text-blue-600" /> Edge Vision Units
                          </span>
                          <span className="text-base font-black text-slate-900">
                            {selectedStartup.deployment.activeNodes}/{selectedStartup.deployment.totalNodes} Online
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold block">100% operational</span>
                        </div>

                        <div className="p-3 bg-slate-50 rounded border border-slate-200 text-center">
                          <span className="text-[10px] text-slate-500 uppercase font-bold block flex items-center justify-center gap-1">
                            <Activity className="w-3 h-3 text-purple-600" /> Inference Latency
                          </span>
                          <span className="text-base font-black text-purple-700">
                            {selectedStartup.deployment.latencyMs}ms
                          </span>
                          <span className="text-[10px] text-slate-500 block">SLA Threshold: &lt;50ms</span>
                        </div>

                        <div className="p-3 bg-slate-50 rounded border border-slate-200 text-center">
                          <span className="text-[10px] text-slate-500 uppercase font-bold block flex items-center justify-center gap-1">
                            <Radio className="w-3 h-3 text-emerald-600" /> Corridor Uptime
                          </span>
                          <span className="text-base font-black text-emerald-700">
                            {selectedStartup.deployment.uptimePercentage}%
                          </span>
                          <span className="text-[10px] text-slate-500 block">Real-time sync</span>
                        </div>

                        <div className="p-3 bg-slate-50 rounded border border-slate-200 text-center">
                          <span className="text-[10px] text-slate-500 uppercase font-bold block flex items-center justify-center gap-1">
                            <TrendingUp className="w-3 h-3 text-amber-600" /> Congestion Reduction
                          </span>
                          <span className="text-base font-black text-amber-700">
                            +{selectedStartup.deployment.congestionReductionPct}%
                          </span>
                          <span className="text-[10px] text-slate-500 block">Peak-hour corridor gain</span>
                        </div>
                      </div>

                      {/* 4-Phase Process Timeline */}
                      <div className="border border-slate-200 rounded p-4 bg-slate-50/50 space-y-3">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                          Corridor Execution Lifecycle:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-emerald-900">Phase 1: HW Mounting</span>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            </div>
                            <p className="text-[11px] text-emerald-800">
                              24 edge cameras & AI controllers mounted on gantries.
                            </p>
                          </div>

                          <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-blue-900">Phase 2: Signal Sync</span>
                              <Sparkles className="w-4 h-4 text-blue-600" />
                            </div>
                            <p className="text-[11px] text-blue-800">
                              Adaptive green wave calibration across 6 junction clusters.
                            </p>
                          </div>

                          <div className="p-2.5 rounded bg-white border border-slate-200 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-700">Phase 3: Stress Testing</span>
                              <Clock className="w-4 h-4 text-slate-400" />
                            </div>
                            <p className="text-[11px] text-slate-500">
                              90-day monsoon peak-hour stability & failover testing.
                            </p>
                          </div>

                          <div className="p-2.5 rounded bg-white border border-slate-200 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-700">Phase 4: GeM Listing</span>
                              <Building className="w-4 h-4 text-slate-400" />
                            </div>
                            <p className="text-[11px] text-slate-500">
                              National GeM commercial catalogue listing for pan-India scale.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Milestone Payment Process & Disbursal Tracker */}
                    <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="p-2 bg-emerald-50 text-emerald-700 rounded-sm">
                            <CreditCard className="w-5 h-5" />
                          </span>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-xs">
                              PFMS Milestone-Based Payment Schedule
                            </span>
                            <h3 className="text-base font-black text-sangam-navy-900 mt-0.5">
                              Milestone Payment Tranches & PFMS Treasury Releases
                            </h3>
                          </div>
                        </div>

                        <div className="text-xs text-slate-500 font-mono">
                          Treasury Scheme: {selectedStartup.deployment.escrowAccount.pfmsSchemeCode}
                        </div>
                      </div>

                      {/* List of 4 Milestones */}
                      <div className="space-y-4">
                        {selectedStartup.deployment.milestones.map(m => {
                          const isDisbursed = m.status === 'Disbursed';
                          const isUnderReview = m.status === 'Under Verification';
                          const isPending = m.status === 'Pending Verification';

                          return (
                            <div
                              key={m.milestoneNumber}
                              className={`p-4 rounded-md border text-xs transition-all space-y-3 ${
                                isDisbursed
                                  ? 'bg-emerald-50/50 border-emerald-300'
                                  : isUnderReview
                                  ? 'bg-amber-50/50 border-amber-300'
                                  : isPending
                                  ? 'bg-blue-50/40 border-blue-300'
                                  : 'bg-slate-50 border-slate-200 opacity-80'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`px-2 py-0.5 rounded-xs text-[10px] font-black uppercase ${
                                        isDisbursed
                                          ? 'bg-emerald-700 text-white'
                                          : isUnderReview
                                          ? 'bg-amber-600 text-white'
                                          : isPending
                                          ? 'bg-blue-600 text-white'
                                          : 'bg-slate-300 text-slate-700'
                                      }`}
                                    >
                                      Milestone 0{m.milestoneNumber} ({m.percentage}%)
                                    </span>
                                    <span className="font-bold text-slate-900 text-sm">
                                      {m.title}
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-500 mt-0.5">
                                    Target Timeline: {m.targetTimeline}
                                  </div>
                                </div>

                                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between gap-1">
                                  <span className="text-base font-black text-slate-900">
                                    ₹{m.amountLakhs} Lakhs
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${
                                      isDisbursed
                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                        : isUnderReview
                                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                        : isPending
                                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                        : 'bg-slate-200 text-slate-600'
                                    }`}
                                  >
                                    {m.status}
                                  </span>
                                </div>
                              </div>

                              <p className="text-slate-700 text-[11px] leading-relaxed">{m.description}</p>

                              {/* Deliverables Checklist */}
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                                  Required Statutory Deliverables:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                  {m.deliverables.map((del, dIdx) => (
                                    <div
                                      key={dIdx}
                                      className="flex items-center gap-1.5 text-[11px] text-slate-700 bg-white p-1.5 rounded border border-slate-200"
                                    >
                                      {isDisbursed ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                      ) : (
                                        <div className="w-3.5 h-3.5 rounded-full border border-slate-400 shrink-0" />
                                      )}
                                      <span className="truncate">{del}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Transaction Release Metadata / Action Form */}
                              {isDisbursed && (
                                <div className="p-3 bg-emerald-100/70 border border-emerald-200 rounded text-[11px] space-y-1 text-emerald-950">
                                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono">
                                    <span>
                                      <strong>PFMS Ref:</strong> {m.pfmsTransactionId}
                                    </span>
                                    <span>
                                      <strong>RBI UTR:</strong> {m.utrNumber}
                                    </span>
                                    <span>
                                      <strong>Disbursed:</strong> {m.disbursedAt}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-emerald-800">
                                    Verified & Authorised by: {m.verificationOfficer}
                                  </div>
                                </div>
                              )}

                              {isUnderReview && (
                                <div className="p-3 bg-amber-100/70 border border-amber-200 rounded text-[11px] space-y-2 text-amber-950">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 font-bold">
                                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                                      <span>Deliverables & Telemetry Logs Submitted (Under Review by MoRTH)</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-amber-800">
                                      {m.proofDocumentName}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-amber-800">
                                    MoRTH evaluation officer is verifying corridor telemetry. Once approved in Department View, PFMS payment of ₹{m.amountLakhs}L will be credited automatically.
                                  </p>
                                </div>
                              )}

                              {isPending && (
                                <div className="p-3 bg-blue-100/60 border border-blue-200 rounded text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-blue-950">
                                  <div>
                                    <div className="font-bold flex items-center gap-1.5">
                                      <UploadCloud className="w-4 h-4 text-blue-700" />
                                      <span>Ready to Submit Deliverables for Payment Verification</span>
                                    </div>
                                    <p className="text-[10px] text-blue-800 mt-0.5">
                                      Upload corridor integration logs and audit reports to trigger Ministry payment audit.
                                    </p>
                                  </div>

                                  <button
                                    onClick={() => handleSubmitMilestoneProof(selectedStartup.id, m.milestoneNumber)}
                                    className="px-3.5 py-1.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
                                  >
                                    <Send className="w-3.5 h-3.5 text-amber-300" />
                                    <span>Submit Telemetry Logs for Verification</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Notice if inspecting another startup when someone else was awarded */
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>Pilot Award Sanctioned for this Challenge</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        The Ministry has sanctioned the live corridor pilot for this procurement cycle. Switch startup view to inspect the awarded startup&apos;s active deployment dashboard and PFMS milestone payments.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const awarded = startups.find(s => s.finalSelection?.isFinallySelected);
                        if (awarded) setSelectedStartupId(awarded.id);
                      }}
                      className="px-3 py-1.5 rounded bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs whitespace-nowrap cursor-pointer shrink-0"
                    >
                      Switch to Awarded Startup
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: DEPARTMENT VIEW PERSONA (RESTRICTED + MANUAL PICK - FEATURE C) */}
        {/* ========================================================= */}
        {currentPersona === 'department' && (
          <div className="space-y-6">
            {/* Step 1 Draft Formulation Card (if stage === 0) */}
            {stage === 0 ? (
              <div className="bg-white p-6 rounded-md border-2 border-sangam-blue-600 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-sangam-blue-50 text-sangam-blue-600 rounded-sm">
                      <Building2 className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-xs">
                        Step 1: Department Problem Formulation (Draft)
                      </span>
                      <h2 className="text-lg font-black text-sangam-navy-900 mt-1">
                        {SIMULATION_PROBLEM.title}
                      </h2>
                    </div>
                  </div>

                  <button
                    onClick={handleLaunchProblem}
                    className="px-4 py-2 rounded bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Submit Problem (Post Challenge Live)</span>
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{SIMULATION_PROBLEM.statement}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Ministry</span>
                    <span className="font-bold text-slate-900">{SIMULATION_PROBLEM.department}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Pilot Timeline</span>
                    <span className="font-bold text-slate-900">{SIMULATION_PROBLEM.timelineMonths} Months</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Budget Range</span>
                    <span className="font-bold text-emerald-700">₹{SIMULATION_PROBLEM.budgetMin}L – ₹{SIMULATION_PROBLEM.budgetMax}L</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Status</span>
                    <span className="font-bold text-amber-700">Ready to Publish</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Active Challenge Card (Stage >= 1) */
              <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-sangam-blue-50 text-sangam-blue-600 rounded-sm">
                      <Building2 className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sangam-blue-700">
                        Ministry Evaluation Portal • {SIMULATION_PROBLEM.department}
                      </span>
                      <h2 className="text-base sm:text-lg font-black text-sangam-navy-900">
                        {SIMULATION_PROBLEM.title}
                      </h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 block">Sanctioned Budget Range</span>
                    <span className="text-sm font-black text-slate-900">
                      ₹{SIMULATION_PROBLEM.budgetMin}L – ₹{SIMULATION_PROBLEM.budgetMax}L
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{SIMULATION_PROBLEM.statement}</p>
              </div>
            )}

            {/* Anti-Bias Rule Banner */}
            <div className="bg-slate-900 text-white p-3.5 rounded-md flex items-start gap-3 shadow-xs">
              <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                  Statutory AI Anti-Bias & Objective Scoring Mandate
                </div>
                <p className="text-slate-300 leading-snug">
                  AI scoring excludes founder identity, personal popularity, and unrelated brand recognition. Scores reflect problem fit, technical feasibility, impact potential, cost efficiency, and verified execution evidence only.
                </p>
              </div>
            </div>

            {/* G1 & G2 SHORTLIST TABLES (EXCLUDES ELIMINATED STARTUPS) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* G1 SHORTLIST */}
              <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="px-2 py-0.5 rounded-xs text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
                      G1 Shortlist (Top 5 Best Overall)
                    </span>
                    <h3 className="text-sm font-black text-slate-900 mt-1">
                      Ranked strictly by 8-Factor Weighted AI Score
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500 italic">Eligible teams only</span>
                </div>

                <div className="space-y-3">
                  {g1Shortlist.map((startup, idx) => (
                    <div
                      key={startup.id}
                      onClick={() => {
                        setSelectedStartupId(startup.id);
                        setManualSelectedPilotId(startup.id);
                        setIsDetailModalOpen(true);
                      }}
                      className="p-3.5 rounded-sm border border-slate-200 bg-slate-50 hover:bg-white hover:border-sangam-blue-500 transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-sangam-navy-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            #{idx + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                              {startup.name}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">{startup.dpiitNumber}</div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs sm:text-sm font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm border border-emerald-300">
                            {startup.aiEvaluation.overallScore}/100
                          </span>
                          <div className="text-[10px] text-slate-600 font-semibold mt-0.5">₹{startup.cost} Lakhs</div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                        &quot;{startup.aiEvaluation.parameters[0].justification}&quot;
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200">
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="font-bold text-slate-700">Lab Test:</span>
                          <span
                            className={`px-1.5 py-0.2 rounded-xs font-bold ${
                              startup.prototypeTesting.overallResult === 'Pass'
                                ? 'bg-emerald-100 text-emerald-800'
                                : startup.prototypeTesting.overallResult === 'Conditional Pass'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {startup.prototypeTesting.overallResult}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDeptReview(startup);
                            }}
                            className="text-[11px] font-bold text-sangam-blue-600 hover:text-sangam-blue-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" /> Review
                          </button>
                          <span className="text-slate-300">•</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStartupId(startup.id);
                              setManualSelectedPilotId(startup.id);
                              setIsDetailModalOpen(true);
                            }}
                            className="text-[11px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" /> Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* G2 SHORTLIST */}
              <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="px-2 py-0.5 rounded-xs text-[10px] font-black uppercase bg-blue-100 text-blue-900 border border-blue-300">
                      G2 Shortlist (Top 5 Best Value)
                    </span>
                    <h3 className="text-sm font-black text-slate-900 mt-1">
                      Quality (60%) + Cost Eff. (25%) + Impact (15%)
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold">Min 70/100 Quality</span>
                </div>

                <div className="space-y-3">
                  {g2Shortlist.map((startup, idx) => (
                    <div
                      key={startup.id}
                      onClick={() => {
                        setSelectedStartupId(startup.id);
                        setManualSelectedPilotId(startup.id);
                        setIsDetailModalOpen(true);
                      }}
                      className="p-3.5 rounded-sm border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-500 transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            #{idx + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                              {startup.name}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">{startup.dpiitNumber}</div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs sm:text-sm font-black text-blue-900 bg-blue-100 px-2 py-0.5 rounded-sm border border-blue-300">
                            {startup.aiEvaluation.g2ValueScore?.total}/100
                          </span>
                          <div className="text-[10px] text-slate-600 font-semibold mt-0.5">₹{startup.cost} Lakhs</div>
                        </div>
                      </div>

                      {startup.aiEvaluation.g2ValueScore && (
                        <div className="grid grid-cols-3 gap-1 bg-white p-2 rounded-xs border border-slate-200 text-[10px] text-center">
                          <div>
                            <span className="text-slate-500 block">Quality (60%)</span>
                            <span className="font-bold text-slate-900">
                              {startup.aiEvaluation.g2ValueScore.overallQualityComponent}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Cost Eff (25%)</span>
                            <span className="font-bold text-slate-900">
                              {startup.aiEvaluation.g2ValueScore.costEfficiencyComponent}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Impact (15%)</span>
                            <span className="font-bold text-slate-900">
                              {startup.aiEvaluation.g2ValueScore.impactPotentialComponent}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200">
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="font-bold text-slate-700">Lab Test:</span>
                          <span
                            className={`px-1.5 py-0.2 rounded-xs font-bold ${
                              startup.prototypeTesting.overallResult === 'Pass'
                                ? 'bg-emerald-100 text-emerald-800'
                                : startup.prototypeTesting.overallResult === 'Conditional Pass'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {startup.prototypeTesting.overallResult}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDeptReview(startup);
                            }}
                            className="text-[11px] font-bold text-sangam-blue-600 hover:text-sangam-blue-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" /> Review
                          </button>
                          <span className="text-slate-300">•</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStartupId(startup.id);
                              setManualSelectedPilotId(startup.id);
                              setIsDetailModalOpen(true);
                            }}
                            className="text-[11px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" /> Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MANUAL FINAL SELECTION & SANCTION GATE (FEATURE C EXTENSION) */}
            <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-xs">
                    Layer 5: Manual Pilot Award Selection (GFR 149 / 194)
                  </span>
                  <h3 className="text-base font-black text-sangam-navy-900 mt-1">
                    Select ANY Eligible G1/G2 Shortlisted Team for Pilot Sanction
                  </h3>
                </div>
                <div className="text-xs text-slate-500">
                  Choose from shortlisted candidates who cleared the 10-point checklist:
                </div>
              </div>

              {/* Radio Selector for Manual Pick across ALL Eligible Shortlisted Teams */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {eligibleOnlyStartups.map(s => {
                  const isChosen = manualSelectedPilotId === s.id;
                  const isEligible = s.finalSelection?.isEligibleForPilot;
                  const isAwarded = s.finalSelection?.isFinallySelected;
                  return (
                    <div
                      key={s.id}
                      onClick={() => {
                        setManualSelectedPilotId(s.id);
                        setSelectedStartupId(s.id);
                      }}
                      className={`p-3 rounded border text-xs cursor-pointer transition-all space-y-1 ${
                        isChosen
                          ? 'border-sangam-blue-600 bg-blue-50/50 shadow-xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{s.name}</span>
                        <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-slate-200 text-slate-800">
                          {s.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{s.solutionTitle}</div>
                      <div className="flex items-center justify-between pt-1 text-[10px]">
                        <span className="font-black text-emerald-700">₹{s.cost} Lakhs</span>
                        {isAwarded ? (
                          <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                            Awarded ({s.finalSelection.workOrderNumber})
                          </span>
                        ) : isEligible ? (
                          <span className="font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                            Eligible for Sanction
                          </span>
                        ) : (
                          <span className="font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                            Pre-conditions Blocked
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Bar for Manual Award */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200 bg-slate-50 p-4 rounded-sm">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Selected for Sanction: <span className="text-sangam-blue-700">{selectedStartup.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Cost: ₹{selectedStartup.cost} Lakhs • AI Score: {selectedStartup.aiEvaluation.overallScore}/100 • Lab Result: {selectedStartup.prototypeTesting.overallResult}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedStartup.finalSelection?.isFinallySelected ? (
                    <span className="px-4 py-2 rounded-sm bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs">
                      <CheckCircle2 className="w-4 h-4" /> Sanctioned ({selectedStartup.finalSelection.workOrderNumber})
                    </span>
                  ) : (
                    <button
                      onClick={() => handleConfirmAndDeploy(selectedStartup.id)}
                      disabled={!selectedStartup.finalSelection?.isEligibleForPilot}
                      className={`px-5 py-2.5 rounded-sm font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer ${
                        selectedStartup.finalSelection?.isEligibleForPilot
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <FileCheck2 className="w-4 h-4" />
                      <span>Confirm & Begin Deployment (Sanction Pilot)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* STAGE 6 & 7: GOVERNMENT LIVE DEPLOYMENT & PFMS MILESTONE PAYMENT DISBURSAL DASHBOARD */}
            {stage >= 5 && (
              <div className="space-y-6 pt-2">
                {(() => {
                  const awardedStartup = startups.find(s => s.finalSelection?.isFinallySelected && s.deployment) || startups.find(s => s.deployment);

                  if (!awardedStartup || !awardedStartup.deployment) {
                    return (
                      <div className="p-5 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                        <div>
                          <span className="font-bold block">No Pilot Awarded Yet</span>
                          <p className="text-[11px] text-amber-800 mt-0.5">
                            Select an eligible shortlisted candidate above and click &quot;Confirm & Begin Deployment&quot; to initialize live corridor tracking and PFMS milestone payments.
                          </p>
                        </div>
                      </div>
                    );
                  }

                  const d = awardedStartup.deployment;

                  return (
                    <div className="space-y-6">
                      {/* Header Banner for Stage 07 */}
                      <div className="bg-gradient-to-r from-sangam-navy-900 via-slate-900 to-slate-950 p-6 rounded-md text-white border border-slate-800 shadow-md space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div className="flex items-center gap-3">
                            <span className="p-3 bg-emerald-500/20 text-emerald-400 rounded-sm">
                              <Building2 className="w-7 h-7" />
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-xs text-[10px] font-black uppercase bg-emerald-400 text-slate-950">
                                  Stage 07: Live Department Monitoring
                                </span>
                                <span className="text-xs text-slate-300 font-mono">
                                  Work Order: {awardedStartup.finalSelection?.workOrderNumber}
                                </span>
                              </div>
                              <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                                MoRTH Urban Corridor Pilot • {awardedStartup.name}
                              </h2>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <div className="bg-white/10 border border-white/15 px-3.5 py-2 rounded text-right">
                              <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Sanctioned Budget</span>
                              <span className="text-lg font-black text-amber-400">
                                ₹{awardedStartup.cost}.00 Lakhs
                              </span>
                            </div>
                            <div className="bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded text-right">
                              <span className="text-[10px] text-emerald-300 uppercase font-bold block">Treasury Disbursed</span>
                              <span className="text-lg font-black text-emerald-400">
                                ₹{d.escrowAccount.totalDisbursedLakhs} Lakhs
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Corridor Deployment Telemetry Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                          <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-center">
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">
                              Active Edge Units
                            </span>
                            <span className="text-base font-black text-white block mt-0.5">
                              {d.activeNodes}/{d.totalNodes}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-mono">100% Gantry Online</span>
                          </div>

                          <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-center">
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">
                              Inference Latency
                            </span>
                            <span className="text-base font-black text-purple-300 block mt-0.5">
                              {d.latencyMs}ms
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">SLA &lt;50ms Compliant</span>
                          </div>

                          <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-center">
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">
                              Corridor Uptime
                            </span>
                            <span className="text-base font-black text-emerald-400 block mt-0.5">
                              {d.uptimePercentage}%
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">Continuous Telemetry</span>
                          </div>

                          <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-center">
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">
                              Corridor Flow Gain
                            </span>
                            <span className="text-base font-black text-amber-400 block mt-0.5">
                              +{d.congestionReductionPct}%
                            </span>
                            <span className="text-[10px] text-amber-300 font-mono">Peak Hour Clearance</span>
                          </div>
                        </div>
                      </div>

                      {/* Government PFMS Escrow & Milestone Payment Disbursal Station */}
                      <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="p-2 bg-emerald-50 text-emerald-700 rounded-sm">
                              <Wallet className="w-5 h-5" />
                            </span>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-xs">
                                Ministry PFMS Disbursement Station
                              </span>
                              <h3 className="text-base font-black text-sangam-navy-900 mt-0.5">
                                Milestone Verification & Treasury Fund Releases
                              </h3>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-600 font-bold">Escrow Account:</span>
                            <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                              {d.escrowAccount.virtualAccountNumber}
                            </span>
                          </div>
                        </div>

                        {/* Escrow Balance Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs">
                            <span className="text-slate-500 uppercase font-bold text-[10px] block">
                              Total Sanctioned Limit
                            </span>
                            <span className="text-base font-black text-slate-900 block mt-0.5">
                              ₹{d.escrowAccount.sanctionTotalLakhs} Lakhs
                            </span>
                            <span className="text-[10px] text-slate-500">
                              PFMS Scheme Code: {d.escrowAccount.pfmsSchemeCode}
                            </span>
                          </div>

                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs">
                            <span className="text-emerald-700 uppercase font-bold text-[10px] block">
                              Total Released from Treasury
                            </span>
                            <span className="text-base font-black text-emerald-800 block mt-0.5">
                              ₹{d.escrowAccount.totalDisbursedLakhs} Lakhs
                            </span>
                            <span className="text-[10px] text-emerald-700">
                              Credited directly to {awardedStartup.name}
                            </span>
                          </div>

                          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs">
                            <span className="text-blue-700 uppercase font-bold text-[10px] block">
                              Escrow Balance Remaining
                            </span>
                            <span className="text-base font-black text-blue-900 block mt-0.5">
                              ₹{d.escrowAccount.remainingBalanceLakhs} Lakhs
                            </span>
                            <span className="text-[10px] text-blue-700">
                              Reserved for upcoming milestone tranches
                            </span>
                          </div>
                        </div>

                        {/* Milestone Verification & Disbursal Cards */}
                        <div className="space-y-3 pt-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                            Milestone Tranches & Payment Release Actions:
                          </span>

                          {d.milestones.map(m => {
                            const isDisbursed = m.status === 'Disbursed';
                            const isUnderVerification = m.status === 'Under Verification';
                            const isPending = m.status === 'Pending Verification';

                            return (
                              <div
                                key={m.milestoneNumber}
                                className={`p-4 rounded-md border text-xs space-y-3 transition-all ${
                                  isDisbursed
                                    ? 'bg-emerald-50/40 border-emerald-300'
                                    : isUnderVerification
                                    ? 'bg-amber-50/60 border-amber-300'
                                    : isPending
                                    ? 'bg-blue-50/30 border-blue-200'
                                    : 'bg-slate-50 border-slate-200 opacity-70'
                                }`}
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`px-2 py-0.5 rounded-xs text-[10px] font-black uppercase ${
                                          isDisbursed
                                            ? 'bg-emerald-700 text-white'
                                            : isUnderVerification
                                            ? 'bg-amber-600 text-white'
                                            : isPending
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-300 text-slate-700'
                                        }`}
                                      >
                                        Milestone 0{m.milestoneNumber} ({m.percentage}%)
                                      </span>
                                      <span className="font-bold text-slate-900 text-sm">
                                        {m.title}
                                      </span>
                                    </div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">
                                      Target Timeline: {m.targetTimeline}
                                    </div>
                                  </div>

                                  <div className="text-right flex sm:flex-col items-center sm:items-end justify-between gap-1">
                                    <span className="text-base font-black text-slate-900">
                                      ₹{m.amountLakhs} Lakhs
                                    </span>
                                    <span
                                      className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${
                                        isDisbursed
                                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                          : isUnderVerification
                                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                          : isPending
                                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                          : 'bg-slate-200 text-slate-600'
                                      }`}
                                    >
                                      {m.status}
                                    </span>
                                  </div>
                                </div>

                                <p className="text-[11px] text-slate-600">{m.description}</p>

                                {/* Deliverables */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                  {m.deliverables.map((del, dIdx) => (
                                    <div
                                      key={dIdx}
                                      className="flex items-center gap-1.5 text-[11px] text-slate-700 bg-white p-1.5 rounded border border-slate-200"
                                    >
                                      {isDisbursed ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                      ) : (
                                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                      )}
                                      <span className="truncate">{del}</span>
                                    </div>
                                  ))}
                                </div>

                                {/* Disbursed Receipt */}
                                {isDisbursed && (
                                  <div className="p-3 bg-emerald-100/70 border border-emerald-200 rounded text-[11px] space-y-1 text-emerald-950 font-mono">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                      <span><strong>PFMS Ref:</strong> {m.pfmsTransactionId}</span>
                                      <span><strong>RBI UTR:</strong> {m.utrNumber}</span>
                                      <span><strong>Disbursed:</strong> {m.disbursedAt}</span>
                                    </div>
                                    <div className="text-[10px] text-emerald-800 font-sans">
                                      Verified & Authorised by: {m.verificationOfficer}
                                    </div>
                                  </div>
                                )}

                                {/* Payment Verification / Release Action for Ministry */}
                                {!isDisbursed && (
                                  <div className="p-3 bg-white border border-slate-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="space-y-0.5">
                                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                        <FileCheck2 className="w-4 h-4 text-sangam-blue-600" />
                                        <span>MoRTH Statutory Payment Release Authorization</span>
                                      </div>
                                      <p className="text-[10px] text-slate-500">
                                        Authorizing release will trigger direct electronic transfer of ₹{m.amountLakhs} Lakhs from RBI Escrow to startup bank account.
                                      </p>
                                    </div>

                                    <button
                                      onClick={() => handleApproveMilestonePayment(awardedStartup.id, m.milestoneNumber)}
                                      className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                                    >
                                      <Banknote className="w-4 h-4 text-amber-300" />
                                      <span>Approve Milestone {m.milestoneNumber} & Release ₹{m.amountLakhs}L</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Field Inspection Audit Log Card */}
                      <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="p-2 bg-purple-50 text-purple-700 rounded-sm">
                              <FileSpreadsheet className="w-5 h-5" />
                            </span>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded-xs">
                                On-Site Field Audit Log
                              </span>
                              <h3 className="text-base font-black text-sangam-navy-900 mt-0.5">
                                MoRTH Engineer Field Inspection Reports
                              </h3>
                            </div>
                          </div>
                          <span className="text-xs text-slate-500 font-mono">{inspectionLogs.length} Records</span>
                        </div>

                        {/* Log Entry Form */}
                        <form onSubmit={handleAddInspection} className="flex gap-2">
                          <input
                            type="text"
                            value={inspectionNote}
                            onChange={e => setInspectionNote(e.target.value)}
                            placeholder="Log physical field verification (e.g., 'Inspected camera node 18 on NH-48; frame rate and thermal levels within nominal threshold')..."
                            className="flex-1 text-xs px-3 py-2 rounded border border-slate-300 focus:outline-none focus:border-sangam-blue-600"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 rounded bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shrink-0 shadow-xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Field Log</span>
                          </button>
                        </form>

                        {/* List of Inspection Logs */}
                        <div className="space-y-2">
                          {inspectionLogs.map(log => (
                            <div
                              key={log.id}
                              className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900">{log.officer}</span>
                                <span className="text-[10px] text-slate-400 font-mono">{log.date}</span>
                              </div>
                              <p className="text-[11px] text-slate-700">{log.note}</p>
                              <span className="text-[10px] text-purple-700 font-semibold block">
                                Corridor: {log.corridor}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: EVALUATOR VIEW PERSONA (BLIND REVIEW MODE - FEATURE C) */}
        {/* ========================================================= */}
        {currentPersona === 'evaluator' && (
          <div className="space-y-6">
            {stage < 3 ? (
              <div className="bg-white p-6 rounded-md border border-slate-200 text-center space-y-3 shadow-2xs">
                <FlaskConical className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-base font-black text-slate-900">
                  Awaiting Shortlisted Prototypes from Platform Admin
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Prototypes are currently in Stage 01/02 (Proposal Submission & AI Shortlisting). Once Platform Admin dispatches the shortlisted candidates to STQC Lab in Stage 03, anonymous blind prototype testing will activate here.
                </p>
                <button
                  onClick={() => handleJumpToDemoStep(5)}
                  className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Go to Admin: Send to Evaluator (Step 5)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                {/* Step 6 & 7 Evaluator Testing Banner */}
                <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-2 bg-emerald-50 text-emerald-700 rounded-sm">
                        <UserCheck className="w-5 h-5" />
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-xs">
                          Step 6 & 7: STQC / C-DAC Testing Laboratory • Blind Review Mode Active
                        </span>
                        <h2 className="text-base sm:text-lg font-black text-sangam-navy-900">
                          Standardisation Testing and Quality Certification (STQC)
                        </h2>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleSubmitTestReportsToAdmin}
                      className="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <CheckCheck className="w-4 h-4 text-amber-300" />
                      <span>Submit Test Reports to Admin (Advance 3→4)</span>
                    </button>
                  </div>

                  <div className="text-xs text-slate-600">
                    Anonymous Blind Masking Active: Founder & Entity Identity are cryptographically shielded to guarantee objective technical validation.
                  </div>

                  {/* Blind Prototype Selector */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                    {evaluatorBlindStartups.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedStartupId(s.id)}
                        className={`px-3 py-1.5 rounded-sm text-xs font-bold whitespace-nowrap transition-colors cursor-pointer border ${
                          selectedStartup.id === s.id
                            ? 'bg-emerald-800 text-white border-emerald-800'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {s.blindName} ({s.prototypeTesting.overallResult})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blind Review Evaluation Dossier */}
                <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-slate-900">
                          {evaluatorBlindStartups.find(b => b.id === selectedStartup.id)?.blindName || 'Prototype Blind ID'}
                        </h3>
                        <span className="text-xs text-slate-500 font-mono">
                          Cert: {selectedStartup.prototypeTesting.testCertificateId}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Testing Lab: {selectedStartup.prototypeTesting.testedByLab} • Architecture: {selectedStartup.solutionTitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-sm text-xs font-black uppercase tracking-wider border ${
                          selectedStartup.prototypeTesting.overallResult === 'Pass'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : selectedStartup.prototypeTesting.overallResult === 'Conditional Pass'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-rose-100 text-rose-900 border-rose-300'
                        }`}
                      >
                        Overall Verdict: {selectedStartup.prototypeTesting.overallResult}
                      </span>

                      <button
                        onClick={() => handleOpenLabTest(selectedStartup)}
                        className="px-3 py-1 rounded-sm bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Audit 15 Parameters</span>
                      </button>
                    </div>
                  </div>

                  {/* 15 Parameter Rows */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      15 Independent Laboratory Benchmarking Parameters:
                    </h4>
                    {selectedStartup.prototypeTesting.parameters.map((param, idx) => (
                      <ScoreRow
                        key={idx}
                        id={`evaluator-param-${idx}`}
                        label={param.name}
                        value={param.result}
                        isMandatory={param.isMandatory}
                        justification={param.justification}
                        evidence={param.evidence ? [param.evidence] : []}
                        category="STQC Lab Test"
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 5: PLATFORM ADMIN PERSONA (FULL VISIBILITY + FEATURE D) */}
        {/* ========================================================= */}
        {currentPersona === 'admin' && (
          <div className="space-y-6">
            {/* Step 3/4/5/8 Admin Walkthrough Workflow Stage Bar */}
            <div className="bg-slate-900 text-white p-4 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded bg-amber-400/20 text-amber-400">
                  <Shield className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                    Platform SuperAdmin Controls • Active Stage: 0{stage + 1}
                  </div>
                  <h3 className="text-sm font-black text-white">
                    {stage === 1
                      ? 'Step 3 & 4: Submissions Intake & AI Shortlisting'
                      : stage === 2
                      ? 'Step 5: AI Shortlist Generated • Ready to Dispatch to Evaluator'
                      : stage === 3
                      ? 'Step 6: Evaluator Blind Lab Benchmarking Active'
                      : stage === 4
                      ? 'Step 8: Lab Testing Complete • Send Final Selection to Govt'
                      : 'Stage 5: Final Sanction & Pilot Deployment'}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {stage === 1 && (
                  <button
                    onClick={handleAdvanceToAIShortlisting}
                    className="px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run AI Shortlisting (Stage 1→2)</span>
                  </button>
                )}
                {stage === 2 && (
                  <button
                    onClick={handleSendToEvaluator}
                    className="px-3.5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>Send Shortlisted Teams to Evaluator (Stage 2→3)</span>
                  </button>
                )}
                {stage === 3 && (
                  <button
                    onClick={handleSubmitTestReportsToAdmin}
                    className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Fast-Forward Lab Reports (Stage 3→4)</span>
                  </button>
                )}
                {stage === 4 && (
                  <button
                    onClick={handleSendSelectionToGovt}
                    className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Send Final Selection to Govt (Step 8)</span>
                  </button>
                )}
              </div>
            </div>
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-md border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search startup name, DPIIT #, or tech..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-sm border border-slate-300 focus:border-sangam-blue-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-500 font-semibold">Category:</span>
                <button
                  onClick={() => setFilterCategory('ALL')}
                  className={`px-2.5 py-1 rounded-sm text-xs font-bold cursor-pointer transition-colors ${
                    filterCategory === 'ALL'
                      ? 'bg-slate-950 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All ({startups.length})
                </button>
                <button
                  onClick={() => setFilterCategory('G1')}
                  className={`px-2.5 py-1 rounded-sm text-xs font-bold cursor-pointer transition-colors ${
                    filterCategory === 'G1'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  G1 ({startups.filter(s => s.category === 'G1').length})
                </button>
                <button
                  onClick={() => setFilterCategory('G2')}
                  className={`px-2.5 py-1 rounded-sm text-xs font-bold cursor-pointer transition-colors ${
                    filterCategory === 'G2'
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  G2 ({startups.filter(s => s.category === 'G2').length})
                </button>
              </div>
            </div>

            {/* Master Admin Table */}
            <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-white font-bold border-b border-slate-800">
                      <th className="p-3">Startup & Solution</th>
                      <th className="p-3">DPIIT Recognition</th>
                      <th className="p-3">Eligibility Gate</th>
                      <th className="p-3">AI Score (8-Factor)</th>
                      <th className="p-3">Dept. Review</th>
                      <th className="p-3">STQC Lab Test</th>
                      <th className="p-3">Pilot Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredAdminStartups.map(startup => (
                      <tr key={startup.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{startup.name}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-xs">{startup.solutionTitle}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">₹{startup.cost} Lakhs • {startup.category} Track</div>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-slate-700">
                          {startup.dpiitNumber}
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                              startup.eligibility.status === 'Eligible'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {startup.eligibility.status === 'Eligible' ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : (
                              <XCircle className="w-3 h-3" />
                            )}
                            {startup.eligibility.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="font-black text-slate-900 text-xs">
                            {startup.aiEvaluation.overallScore}/100
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {startup.aiEvaluation.recommendation}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-[11px] font-semibold text-slate-800 truncate max-w-[140px]">
                            {startup.departmentReview.decision}
                          </div>
                          {startup.departmentReview.overridesAI && (
                            <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1 rounded">
                              Override Logged
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                              startup.prototypeTesting.overallResult === 'Pass'
                                ? 'bg-emerald-100 text-emerald-800'
                                : startup.prototypeTesting.overallResult === 'Conditional Pass'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {startup.prototypeTesting.overallResult}
                          </span>
                        </td>
                        <td className="p-3">
                          {startup.finalSelection?.isFinallySelected ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Sanctioned
                            </span>
                          ) : startup.finalSelection?.isEligibleForPilot ? (
                            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              Eligible
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              Blocked
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedStartupId(startup.id);
                              setIsDetailModalOpen(true);
                            }}
                            className="px-2.5 py-1 rounded-sm bg-slate-900 text-white font-bold text-[11px] hover:bg-slate-800 cursor-pointer transition-colors"
                          >
                            Inspect Audit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ========================================================= */}
            {/* FEATURE D: AI FILTRATION TRANSPARENCY SECTION (NEW ADMIN EXTENSION) */}
            {/* ========================================================= */}
            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-purple-100 text-purple-800 rounded-sm">
                    <ShieldAlert className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded-xs">
                      Feature D • Admin Exclusive Audit Section
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-sangam-navy-900 mt-1">
                      AI Filtration Transparency & Elimination Audit
                    </h2>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Full granular inspection across all <strong>{startups.length} submitted proposals</strong>. Audits every &quot;Not shortlisted&quot; and &quot;Fail&quot; entity, highlighting exact pull-down factors and the G1/G2 mathematical basis for selection.
                </p>
              </div>

              {/* Full Inspection Across All Startups */}
              <div className="space-y-6">
                {startups.map((st, index) => {
                  const isNotShortlisted = st.aiEvaluation.recommendation === 'Not shortlisted';
                  const isShortlistedG1 = st.aiEvaluation.recommendation === 'G1 candidate';
                  const isShortlistedG2 = st.aiEvaluation.recommendation === 'G2 candidate';

                  // Identify lowest pull-down parameters
                  const pullDownParams = [...st.aiEvaluation.parameters].sort((a, b) => a.score - b.score).slice(0, 2);

                  return (
                    <div
                      key={st.id}
                      className={`p-4 rounded-md border space-y-4 ${
                        isNotShortlisted
                          ? 'bg-rose-50/40 border-rose-200'
                          : isShortlistedG1
                          ? 'bg-emerald-50/30 border-emerald-200'
                          : 'bg-blue-50/30 border-blue-200'
                      }`}
                    >
                      {/* Header Strip */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                              #{index + 1}
                            </span>
                            <h3 className="font-black text-sm text-slate-900">{st.name}</h3>
                            <span className="text-xs text-slate-500 font-mono">({st.dpiitNumber})</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{st.solutionTitle}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black px-2 py-0.5 rounded bg-white border text-slate-800">
                            Overall AI Score: {st.aiEvaluation.overallScore}/100
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-sm text-xs font-black uppercase ${
                              isNotShortlisted
                                ? 'bg-rose-100 text-rose-900 border border-rose-300'
                                : isShortlistedG1
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-blue-100 text-blue-900 border border-blue-300'
                            }`}
                          >
                            {st.aiEvaluation.recommendation}
                          </span>
                        </div>
                      </div>

                      {/* Pull-Down Highlight for Eliminated Startups */}
                      {isNotShortlisted && (
                        <div className="p-3 bg-rose-100/70 border border-rose-300 rounded text-xs text-rose-900 space-y-1">
                          <strong className="font-bold block flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            Primary Factor(s) Pulling Score Below Shortlist Threshold:
                          </strong>
                          <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                            {pullDownParams.map((p, pidx) => (
                              <li key={pidx}>
                                <strong>{p.name} ({p.score}/100):</strong> {p.justification}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Selection Basis for Shortlisted Startups */}
                      {!isNotShortlisted && (
                        <div className="p-3 bg-white border border-slate-200 rounded text-xs space-y-1.5">
                          <strong className="font-bold text-slate-900 block flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Selection Basis ({st.category} Track):
                          </strong>
                          {isShortlistedG1 && (
                            <p className="text-[11px] text-slate-700">
                              Selected for G1 Quality Shortlist by achieving high 8-factor score ({st.aiEvaluation.overallScore}/100) with robust problem-solution fit and verified technical feasibility.
                            </p>
                          )}
                          {isShortlistedG2 && st.aiEvaluation.g2ValueScore && (
                            <div className="space-y-1 text-[11px] text-slate-700">
                              <p>
                                Selected for G2 Value Shortlist via 3-component formula: Total Score = <strong>{st.aiEvaluation.g2ValueScore.total}/100</strong>
                              </p>
                              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded text-center font-mono">
                                <div>Quality (60%): {st.aiEvaluation.g2ValueScore.overallQualityComponent}</div>
                                <div>Cost Eff (25%): {st.aiEvaluation.g2ValueScore.costEfficiencyComponent}</div>
                                <div>Impact (15%): {st.aiEvaluation.g2ValueScore.impactPotentialComponent}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 8 AI Parameters Rendered using ScoreRow Component */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase text-slate-600 tracking-wider block">
                          8-Factor Parameter Scores & Justifications:
                        </span>
                        {st.aiEvaluation.parameters.map((param, idx) => (
                          <ScoreRow
                            key={idx}
                            id={`admin-param-${st.id}-${idx}`}
                            label={param.name}
                            value={param.score}
                            weight={param.weight}
                            justification={param.justification}
                            evidence={param.evidence}
                            confidence={param.confidence}
                            category="AI Parameter"
                          />
                        ))}
                      </div>

                      {/* STQC Testing Pipeline Status */}
                      <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs flex items-center justify-between">
                        <div>
                          <span className="text-slate-500 font-semibold block text-[10px] uppercase">STQC Testing Pipeline Status</span>
                          <span className="font-bold text-slate-900">
                            {st.prototypeTesting.overallResult === 'Pass'
                              ? 'Testing Complete (Cleared 15 Parameters)'
                              : st.prototypeTesting.overallResult === 'Conditional Pass'
                              ? 'Conditional Pass (Optimization Notice)'
                              : 'Testing Audit: FAIL (Mandatory Check Unmet)'}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            st.prototypeTesting.overallResult === 'Pass'
                              ? 'bg-emerald-100 text-emerald-800'
                              : st.prototypeTesting.overallResult === 'Conditional Pass'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {st.prototypeTesting.overallResult}
                        </span>
                      </div>

                      {/* Final Department Award & Override Log (If Awarded) */}
                      {st.finalSelection?.isFinallySelected && (
                        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs space-y-1 text-emerald-900">
                          <div className="font-bold flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-emerald-700" />
                            <span>Awarded Pilot Contract ({st.finalSelection.workOrderNumber})</span>
                          </div>
                          <p className="text-[11px] text-emerald-800">
                            Sanction Amount: ₹{st.cost} Lakhs • Allocated by Ministry of Road Transport and Highways.
                          </p>
                          {st.departmentReview.overridesAI && (
                            <div className="mt-1 p-2 bg-white rounded border border-emerald-200 text-[11px]">
                              <strong>Audited Override Reason:</strong> {st.departmentReview.overrideReason}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FULL EVALUATION DETAIL MODAL */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-100">
          <div className="bg-white rounded-md max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-xs bg-sangam-navy-900 text-white">
                    {selectedStartup.category} Shortlist Candidate
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{selectedStartup.dpiitNumber}</span>
                </div>
                <h2 className="text-xl font-black text-sangam-navy-900 mt-1">{selectedStartup.name}</h2>
                <p className="text-xs text-slate-600">{selectedStartup.solutionTitle}</p>
              </div>

              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* LAYER 1: ELIGIBILITY CHECKS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Layer 1: Mandatory Eligibility Gates (8 Checks)
                </h3>
                <span className="text-[11px] font-bold text-emerald-700">{selectedStartup.eligibility.status}</span>
              </div>
              <div className="space-y-2">
                {selectedStartup.eligibility.checks.map((check, idx) => (
                  <ScoreRow
                    key={idx}
                    label={check.parameter}
                    value={check.result}
                    isMandatory={check.isMandatory}
                    justification={check.justification}
                    evidence={check.evidence}
                    category="Eligibility Gate"
                  />
                ))}
              </div>
            </div>

            {/* LAYER 2: 8 AI SCORING PARAMETERS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Layer 2: 8 Weighted AI Scoring Parameters (Derived Score: {selectedStartup.aiEvaluation.overallScore}/100)
                </h3>
                <span className="text-[11px] font-bold text-sangam-blue-600">
                  Recommendation: {selectedStartup.aiEvaluation.recommendation}
                </span>
              </div>
              <div className="space-y-2">
                {selectedStartup.aiEvaluation.parameters.map((param, idx) => (
                  <ScoreRow
                    key={idx}
                    label={param.name}
                    value={param.score}
                    weight={param.weight}
                    justification={param.justification}
                    evidence={param.evidence}
                    confidence={param.confidence}
                    category="AI Scoring"
                  />
                ))}
              </div>
            </div>

            {/* LAYER 3: DEPARTMENT REVIEW & AUDIT LOG */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Layer 3: Department Evaluation & Statutory Audit Trail
                </h3>
                <span className="text-[11px] font-bold text-slate-800">
                  Decision: {selectedStartup.departmentReview.decision}
                </span>
              </div>

              {selectedStartup.departmentReview.overridesAI && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-sm text-xs space-y-1">
                  <span className="font-bold text-amber-900 block">RECORDED OVERRIDE OF AI RECOMMENDATION:</span>
                  <p className="text-amber-800">{selectedStartup.departmentReview.overrideReason}</p>
                </div>
              )}

              {/* Audit Log Entries */}
              <div className="bg-slate-50 p-3 rounded-sm border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Official Audit Trail</span>
                {selectedStartup.departmentReview.auditLog.map((log, idx) => (
                  <div key={idx} className="text-xs text-slate-700 border-l-2 border-sangam-blue-600 pl-2 space-y-0.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{log.actor}</span>
                      <span>{log.timestamp}</span>
                    </div>
                    <div className="font-semibold text-slate-900">{log.action}</div>
                    <div className="text-[11px]">{log.reason}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-200">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 rounded-sm bg-slate-900 text-white font-bold text-xs cursor-pointer"
              >
                Close Audit Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEPARTMENT REVIEW MODAL */}
      {isDeptReviewModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-100">
          <div className="bg-white rounded-md max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sangam-blue-600">
                Departmental Officer Scrutiny (GFR 149)
              </span>
              <h3 className="text-lg font-black text-sangam-navy-900 mt-0.5">
                Record Department Decision for {selectedStartup.name}
              </h3>
              <p className="text-xs text-slate-500">AI Recommendation: <strong>{selectedStartup.aiEvaluation.recommendation}</strong> (Score: {selectedStartup.aiEvaluation.overallScore}/100)</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Evaluating Officer Designation & Authority
                </label>
                <input
                  type="text"
                  value={deptReviewerName}
                  onChange={e => setDeptReviewerName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:border-sangam-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department Statutory Decision
                </label>
                <select
                  value={deptDecision}
                  onChange={e => setDeptDecision(e.target.value as any)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded border border-slate-300 bg-white focus:border-sangam-blue-500 outline-none cursor-pointer"
                >
                  <option value="Approve for Prototype">Approve for Prototype (Move to STQC Lab Testing)</option>
                  <option value="Request Clarification">Request Clarification (Clarification notice to startup)</option>
                  <option value="Keep on Reserve">Keep on Reserve (Secondary shortlist standby)</option>
                  <option value="Reject with Reason">Reject with Reason (Formal rejection with audited justification)</option>
                </select>
              </div>

              <div className="p-3.5 bg-amber-50 rounded border border-amber-300 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Shield className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Statutory Override Reason (Mandatory if decision conflicts with AI Recommendation)</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  If your decision differs from the AI scoring recommendation, audit regulations require a mandatory written justification before saving.
                </p>
                <textarea
                  rows={3}
                  placeholder="Enter specific factual rationale and evidentiary basis for overriding the AI recommendation..."
                  value={deptOverrideReason}
                  onChange={e => {
                    setDeptOverrideReason(e.target.value);
                    setOverrideError(null);
                  }}
                  className="w-full text-xs p-2.5 rounded border border-amber-300 bg-white focus:border-sangam-blue-600 outline-none"
                />
              </div>

              {overrideError && (
                <div className="p-3 bg-rose-100 border border-rose-300 text-rose-900 text-xs font-bold rounded">
                  {overrideError}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsDeptReviewModalOpen(false)}
                className="px-3.5 py-2 rounded-sm border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDeptReview}
                className="px-4 py-2 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Save Decision & Append Audit Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LAB TESTING BENCHMARKING MODAL */}
      {isLabTestModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-100">
          <div className="bg-white rounded-md max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 space-y-5">
            <div className="border-b border-slate-200 pb-3 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Independent Laboratory Evaluation
                </span>
                <h3 className="text-lg font-black text-sangam-navy-900 mt-0.5">
                  Conduct 15-Parameter Testing for {selectedStartup.name}
                </h3>
              </div>
              <button
                onClick={() => setIsLabTestModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Testing Laboratory Authority
                </label>
                <input
                  type="text"
                  value={labName}
                  onChange={e => setLabName(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded border border-slate-300"
                />
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Update Parameter Verdicts & Audited Evidence:
                </div>
                {labParameters.map((param, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        {param.name}
                        {param.isMandatory && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 border border-rose-200">
                            Mandatory
                          </span>
                        )}
                      </span>
                      <select
                        value={param.result}
                        onChange={e => {
                          const newParams = [...labParameters];
                          newParams[idx].result = e.target.value as any;
                          setLabParameters(newParams);
                        }}
                        className={`text-xs font-bold px-2.5 py-1 rounded border cursor-pointer ${
                          param.result === 'Pass'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : param.result === 'Conditional'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                      >
                        <option value="Pass">Pass</option>
                        <option value="Conditional">Conditional Pass</option>
                        <option value="Fail">Fail</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Audited Evidence:</span>
                        <input
                          type="text"
                          value={param.evidence}
                          onChange={e => {
                            const newParams = [...labParameters];
                            newParams[idx].evidence = e.target.value;
                            setLabParameters(newParams);
                          }}
                          className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Specific Justification:</span>
                        <input
                          type="text"
                          value={param.justification}
                          onChange={e => {
                            const newParams = [...labParameters];
                            newParams[idx].justification = e.target.value;
                            setLabParameters(newParams);
                          }}
                          className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsLabTestModalOpen(false)}
                className="px-3.5 py-2 rounded-sm border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveLabTest}
                className="px-4 py-2 rounded-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Save & Compute Overall Result
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD STARTUP / PROPOSAL MODAL */}
      {isAddStartupModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-100">
          <div className="bg-white rounded-md max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sangam-blue-600">
                  Startup Proposal Intake
                </span>
                <h3 className="text-base font-black text-sangam-navy-900">Submit New Innovation Proposal</h3>
              </div>
              <button onClick={() => setIsAddStartupModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStartup} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Registered Startup Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AeroMobility AI Labs"
                  value={newStartupName}
                  onChange={e => setNewStartupName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded border border-slate-300 focus:border-sangam-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">DPIIT Recognition Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DIPP-99881-DL"
                    value={newDpiitNumber}
                    onChange={e => setNewDpiitNumber(e.target.value)}
                    className="w-full px-3 py-1.5 rounded border border-slate-300 focus:border-sangam-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Proposed Cost (₹ Lakhs)</label>
                  <input
                    type="number"
                    min={10}
                    max={100}
                    value={newCost}
                    onChange={e => setNewCost(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded border border-slate-300 focus:border-sangam-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Solution Title</label>
                <input
                  type="text"
                  placeholder="e.g. EdgeAI Adaptive Corridor Synchronization Matrix"
                  value={newSolutionTitle}
                  onChange={e => setNewSolutionTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded border border-slate-300 focus:border-sangam-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Technical Architecture Summary</label>
                <textarea
                  rows={2}
                  placeholder="Explain edge computer vision model, synchronization protocols, and outcome targets..."
                  value={newSolutionSummary}
                  onChange={e => setNewSolutionSummary(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 focus:border-sangam-blue-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddStartupModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold cursor-pointer shadow-xs"
                >
                  Run Explainable AI Evaluation & Ingest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <GovernmentFooter />
    </div>
  );
}

export default function SimulationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">Loading SangamSetu Simulation...</div>}>
      <SimulationContent />
    </Suspense>
  );
}
