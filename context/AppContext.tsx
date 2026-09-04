'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  ActiveView,
  User,
  Challenge,
  Proposal,
  Prototype,
  TestReport,
  Winner,
  Pilot,
  StartupProfile,
  NotificationItem,
  AuditLogItem,
} from '@/lib/types';
import {
  INITIAL_USERS,
  INITIAL_STARTUPS,
  INITIAL_CHALLENGES,
  INITIAL_PROPOSALS,
  INITIAL_PROTOTYPES,
  INITIAL_TEST_REPORTS,
  INITIAL_WINNERS,
  INITIAL_PILOTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
} from '@/lib/store';
import {
  SIMULATION_EXTRA_STARTUPS,
  SIMULATION_EXTRA_CHALLENGES,
  SIMULATION_EXTRA_PROPOSALS,
  SIMULATION_EXTRA_PROTOTYPES,
  SIMULATION_EXTRA_TEST_REPORTS,
  SIMULATION_EXTRA_WINNERS,
  SIMULATION_EXTRA_PILOTS,
  SIMULATION_EXTRA_NOTIFICATIONS,
  SIMULATION_EXTRA_AUDIT_LOGS,
} from '@/lib/simulation-data';
import { evaluateProposalAI, rankAndCategorizeProposals } from '@/lib/ai-scoring';

export type SimulationStep =
  | 'SUBMIT_PROPOSAL'
  | 'ISSUE_LAB_CERT'
  | 'SANCTION_PILOT'
  | 'PAY_MILESTONE';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
  startups: StartupProfile[];
  challenges: Challenge[];
  proposals: Proposal[];
  prototypes: Prototype[];
  testReports: TestReport[];
  winners: Winner[];
  pilots: Pilot[];
  notifications: NotificationItem[];
  auditLogs: AuditLogItem[];

  // Simulation controls
  isSimulationLoaded: boolean;
  isSimulationModalOpen: boolean;
  setIsSimulationModalOpen: (open: boolean) => void;
  simulationToast: { show: boolean; message: string; type: 'success' | 'info' } | null;
  dismissSimulationToast: () => void;
  loadSimulationData: () => void;
  simulateStep: (step: SimulationStep) => { success: boolean; message: string };

  // Action methods
  addChallenge: (challengeData: Omit<Challenge, 'id' | 'slug' | 'publishedAt' | 'totalApplications' | 'shortlistedCount' | 'winnerCount'>) => Challenge;
  submitProposal: (proposalData: Omit<Proposal, 'id' | 'slug' | 'submittedAt' | 'g1Category' | 'g2Category' | 'status'>) => Proposal;
  runAIScoring: (challengeId: string) => { g1: Proposal[]; g2: Proposal[] };
  submitPrototype: (protoData: Omit<Prototype, 'id' | 'submissionDate' | 'status'>) => Prototype;
  submitTestReport: (reportData: Omit<TestReport, 'id' | 'submittedAt' | 'certificateNumber'>) => TestReport;
  selectWinner: (challengeId: string, proposalId: string, prizeAmount: number, notes: string) => Winner;
  requestMilestonePayment: (pilotId: string, milestoneId: string) => void;
  approveMilestonePayment: (pilotId: string, milestoneId: string, utrNumber: string) => void;
  updatePilotProgress: (pilotId: string, progress: number, currentPhase: string) => void;
  markNotificationRead: (id: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('PUBLIC');
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);

  const [users] = useState<User[]>(INITIAL_USERS);
  const [startups, setStartups] = useState<StartupProfile[]>(INITIAL_STARTUPS);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [prototypes, setPrototypes] = useState<Prototype[]>(INITIAL_PROTOTYPES);
  const [testReports, setTestReports] = useState<TestReport[]>(INITIAL_TEST_REPORTS);
  const [winners, setWinners] = useState<Winner[]>(INITIAL_WINNERS);
  const [pilots, setPilots] = useState<Pilot[]>(INITIAL_PILOTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

  // Simulation states
  const [isSimulationLoaded, setIsSimulationLoaded] = useState<boolean>(false);
  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState<boolean>(false);
  const [simulationToast, setSimulationToast] = useState<{ show: boolean; message: string; type: 'success' | 'info' } | null>(null);

  const dismissSimulationToast = () => {
    setSimulationToast(null);
  };

  // Sync current user when role changes
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'STARTUP') {
      setCurrentUser(INITIAL_USERS[0]);
    } else if (newRole === 'GOVERNMENT') {
      setCurrentUser(INITIAL_USERS[1]);
    } else if (newRole === 'TESTING_ORG' || newRole === 'TESTING_LAB') {
      setCurrentUser(INITIAL_USERS[2]);
    } else if (newRole === 'ADMIN') {
      setCurrentUser(INITIAL_USERS[3]);
    }
  };

  const addChallenge = (data: Omit<Challenge, 'id' | 'slug' | 'publishedAt' | 'totalApplications' | 'shortlistedCount' | 'winnerCount'>) => {
    const id = `ch-${Date.now()}`;
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newChallenge: Challenge = {
      ...data,
      id,
      slug,
      publishedAt: new Date().toISOString(),
      totalApplications: 0,
      shortlistedCount: 0,
      winnerCount: 0,
    };

    setChallenges(prev => [newChallenge, ...prev]);

    // Add Audit Log
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'CHALLENGE_CREATED',
        entity: 'Challenge',
        entityId: id,
        timestamp: new Date().toISOString(),
        ipAddress: '10.14.22.9 (NIC Govt Portal)',
      },
      ...prev,
    ]);

    // Send Notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: 'user-startup-1',
        title: `New Challenge Published: ${data.title.slice(0, 40)}...`,
        message: `${data.ministryName} has published a new procurement challenge with budget up to ₹${(data.budgetMax / 100000).toFixed(1)} Lakhs.`,
        type: 'INFO',
        read: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    return newChallenge;
  };

  const submitProposal = (data: Omit<Proposal, 'id' | 'slug' | 'submittedAt' | 'g1Category' | 'g2Category' | 'status'>) => {
    const id = `prop-${Date.now()}`;
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Run initial AI scoring
    const targetChallenge = challenges.find(c => c.id === data.challengeId);
    const maxBudget = targetChallenge?.budgetMax || 5000000;
    const aiResult = evaluateProposalAI(data, maxBudget);

    const newProposal: Proposal = {
      ...data,
      id,
      slug,
      submittedAt: new Date().toISOString(),
      status: 'SUBMITTED',
      aiScore: aiResult.scoreBreakdown.overall,
      aiScoreBreakdown: aiResult.scoreBreakdown,
      aiExplanation: aiResult.explanation,
      g1Category: aiResult.g1Eligible,
      g2Category: aiResult.g2Eligible,
    };

    setProposals(prev => [newProposal, ...prev]);

    // Update challenge count
    setChallenges(prev =>
      prev.map(c => (c.id === data.challengeId ? { ...c, totalApplications: c.totalApplications + 1 } : c))
    );

    // Audit Log
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        userId: currentUser.id,
        userName: data.startupName,
        action: 'PROPOSAL_SUBMITTED',
        entity: 'Proposal',
        entityId: id,
        timestamp: new Date().toISOString(),
        ipAddress: '103.21.14.88',
      },
      ...prev,
    ]);

    // Notify Department
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: 'user-govt-1',
        title: `New Proposal Received: ${data.startupName}`,
        message: `Solution "${data.title.slice(0, 35)}..." submitted for challenge. AI initial score: ${aiResult.scoreBreakdown.overall}/100.`,
        type: 'SUCCESS',
        read: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    return newProposal;
  };

  const runAIScoring = (challengeId: string) => {
    const challengeProps = proposals.filter(p => p.challengeId === challengeId);
    const targetChallenge = challenges.find(c => c.id === challengeId);
    const maxBudget = targetChallenge?.budgetMax || 5000000;

    // Evaluate each proposal
    const evaluated = challengeProps.map(p => {
      const res = evaluateProposalAI(p, maxBudget);
      return {
        ...p,
        aiScore: res.scoreBreakdown.overall,
        aiScoreBreakdown: res.scoreBreakdown,
        aiExplanation: res.explanation,
      };
    });

    const { g1, g2, allRanked } = rankAndCategorizeProposals(evaluated);

    // Update state
    setProposals(prev =>
      prev.map(p => {
        if (p.challengeId === challengeId) {
          const ranked = allRanked.find(r => r.id === p.id);
          return ranked || p;
        }
        return p;
      })
    );

    // Update Challenge Status to SHORTLISTED
    setChallenges(prev =>
      prev.map(c =>
        c.id === challengeId
          ? {
              ...c,
              status: 'SHORTLISTED',
              shortlistedCount: Math.min(5, g1.length),
            }
          : c
      )
    );

    // Audit Log
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        userId: currentUser.id,
        userName: 'SangamSetu AI Scoring Engine',
        action: 'AI_G1_G2_SHORTLIST_GENERATED',
        entity: 'Challenge',
        entityId: challengeId,
        timestamp: new Date().toISOString(),
        ipAddress: 'System Engine',
      },
      ...prev,
    ]);

    return { g1, g2 };
  };

  const submitPrototype = (protoData: Omit<Prototype, 'id' | 'submissionDate' | 'status'>) => {
    const id = `proto-${Date.now()}`;
    const newPrototype: Prototype = {
      ...protoData,
      id,
      submissionDate: new Date().toISOString(),
      status: 'SUBMITTED',
    };

    setPrototypes(prev => [newPrototype, ...prev]);

    // Update proposal & challenge
    setProposals(prev =>
      prev.map(p => (p.id === protoData.proposalId ? { ...p, prototypeSubmitted: true } : p))
    );

    setChallenges(prev =>
      prev.map(c => (c.id === protoData.challengeId ? { ...c, status: 'TESTING_IN_PROGRESS' } : c))
    );

    // Notifications
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: 'user-test-1',
        title: `Prototype Submitted: ${protoData.startupName}`,
        message: `Prototype ready for lab evaluation for "${protoData.solutionTitle.slice(0, 35)}...".`,
        type: 'INFO',
        read: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    return newPrototype;
  };

  const submitTestReport = (reportData: Omit<TestReport, 'id' | 'submittedAt' | 'certificateNumber'>) => {
    const id = `rep-${Date.now()}`;
    const certNum = `STQC/DEL/2026/INNOV-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReport: TestReport = {
      ...reportData,
      id,
      certificateNumber: certNum,
      submittedAt: new Date().toISOString(),
    };

    setTestReports(prev => [newReport, ...prev]);

    // Update Prototype status
    setPrototypes(prev =>
      prev.map(p =>
        p.id === reportData.prototypeId
          ? {
              ...p,
              status: reportData.verdict === 'PASS' ? 'TEST_PASSED' : reportData.verdict === 'CONDITIONAL_PASS' ? 'CONDITIONAL_PASS' : 'TEST_FAILED',
              testReportId: id,
            }
          : p
      )
    );

    // Audit Log
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        userId: currentUser.id,
        userName: reportData.testingOrgName,
        action: 'LAB_TEST_REPORT_SUBMITTED',
        entity: 'TestReport',
        entityId: id,
        timestamp: new Date().toISOString(),
        ipAddress: '14.139.58.12 (STQC Lab)',
      },
      ...prev,
    ]);

    return newReport;
  };

  const selectWinner = (challengeId: string, proposalId: string, prizeAmount: number, notes: string) => {
    const prop = proposals.find(p => p.id === proposalId);
    const challenge = challenges.find(c => c.id === challengeId);
    const id = `win-${Date.now()}`;
    const contractNumber = `${challenge?.ministryName.slice(0, 4).toUpperCase() || 'GOI'}/INNOV/${new Date().getFullYear()}/SETU-${Math.floor(100 + Math.random() * 900)}`;

    const newWinner: Winner = {
      id,
      challengeId,
      proposalId,
      startupId: prop?.startupId || 'startup-1',
      startupName: prop?.startupName || 'Startup Innovation',
      solutionTitle: prop?.title || 'Innovation Solution',
      rank: 1,
      prizeAmount,
      selectedAt: new Date().toISOString(),
      notes,
      contractNumber,
    };

    setWinners(prev => [newWinner, ...prev]);

    // Automatically initialize Pilot
    const pilotId = `pilot-${Date.now()}`;
    const newPilot: Pilot = {
      id: pilotId,
      challengeId,
      challengeTitle: challenge?.title || 'Government Pilot Program',
      winnerId: id,
      startupId: prop?.startupId || 'startup-1',
      startupName: prop?.startupName || 'Startup Innovation',
      location: challenge?.pilotLocation || 'Designated National Pilot Corridor',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'IN_PROGRESS',
      kpis: [
        { metric: 'Deployment Readiness', target: '100% On-schedule', achieved: 'Initiated' },
        { metric: 'Operational Uptime', target: '>99.5%', achieved: '99.8%' },
        { metric: 'Cost Savings Impact', target: '>50%', achieved: 'Verified' },
      ],
      progress: 25,
      currentPhase: 'Phase 1: Mobilization, Hardware Setup & Field Deployment',
      totalBudget: prizeAmount,
      disbursedAmount: 0,
      milestones: [
        {
          id: `ms-${Date.now()}-1`,
          pilotId,
          title: 'Milestone 1: Prototype Fabrication & Initial Site Calibration',
          description: 'Delivery of field-ready units and baseline calibration with government engineers.',
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'IN_PROGRESS',
          paymentAmount: Math.round(prizeAmount * 0.3),
          paymentStatus: 'PENDING',
        },
        {
          id: `ms-${Date.now()}-2`,
          pilotId,
          title: 'Milestone 2: 90-Day Continuous Operational Field Trial',
          description: 'Continuous real-world trial with live data telemetry into department servers.',
          dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'PENDING',
          paymentAmount: Math.round(prizeAmount * 0.4),
          paymentStatus: 'PENDING',
        },
        {
          id: `ms-${Date.now()}-3`,
          pilotId,
          title: 'Milestone 3: Final Acceptance Testing & National Scale-up Blueprint',
          description: 'Comprehensive performance audit and GeM procurement specifications delivery.',
          dueDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'PENDING',
          paymentAmount: Math.round(prizeAmount * 0.3),
          paymentStatus: 'PENDING',
        },
      ],
    };

    setPilots(prev => [newPilot, ...prev]);

    // Update challenge
    setChallenges(prev =>
      prev.map(c => (c.id === challengeId ? { ...c, status: 'PILOT_IN_PROGRESS', winnerCount: 1 } : c))
    );

    return newWinner;
  };

  const requestMilestonePayment = (pilotId: string, milestoneId: string) => {
    setPilots(prev =>
      prev.map(p => {
        if (p.id === pilotId) {
          return {
            ...p,
            milestones: p.milestones.map(m =>
              m.id === milestoneId ? { ...m, paymentStatus: 'REQUESTED' as const } : m
            ),
          };
        }
        return p;
      })
    );

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: 'user-govt-1',
        title: 'Milestone Payment Release Requested',
        message: `Startup has submitted milestone deliverables and requested fund release.`,
        type: 'INFO',
        read: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const approveMilestonePayment = (pilotId: string, milestoneId: string, utrNumber: string) => {
    let paymentAmount = 0;
    setPilots(prev =>
      prev.map(p => {
        if (p.id === pilotId) {
          const updatedMilestones = p.milestones.map(m => {
            if (m.id === milestoneId) {
              paymentAmount = m.paymentAmount;
              return {
                ...m,
                status: 'COMPLETED' as const,
                paymentStatus: 'PAID' as const,
                paidAt: new Date().toISOString(),
                utrNumber: utrNumber || `RBI-NEFT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
              };
            }
            return m;
          });
          return {
            ...p,
            disbursedAmount: p.disbursedAmount + paymentAmount,
            progress: Math.min(100, p.progress + 30),
            milestones: updatedMilestones,
          };
        }
        return p;
      })
    );

    // Notify Startup
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: 'user-startup-1',
        title: `Payment Disbursed (₹${(paymentAmount / 100000).toFixed(2)} Lakhs)`,
        message: `Your milestone payment has been authorized and credited via RBI-NEFT. UTR: ${utrNumber}.`,
        type: 'PAYMENT_RECEIVED',
        read: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const updatePilotProgress = (pilotId: string, progress: number, currentPhase: string) => {
    setPilots(prev =>
      prev.map(p => (p.id === pilotId ? { ...p, progress, currentPhase } : p))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const loadSimulationData = () => {
    // Merge startups
    setStartups(prev => {
      const existingIds = new Set(prev.map(s => s.id));
      const toAdd = SIMULATION_EXTRA_STARTUPS.filter(s => !existingIds.has(s.id));
      return [...prev, ...toAdd];
    });

    // Merge challenges
    setChallenges(prev => {
      const existingIds = new Set(prev.map(c => c.id));
      const toAdd = SIMULATION_EXTRA_CHALLENGES.filter(c => !existingIds.has(c.id));
      return [...prev, ...toAdd];
    });

    // Merge proposals
    setProposals(prev => {
      const existingIds = new Set(prev.map(p => p.id));
      const toAdd = SIMULATION_EXTRA_PROPOSALS.filter(p => !existingIds.has(p.id));
      return [...prev, ...toAdd];
    });

    // Merge prototypes
    setPrototypes(prev => {
      const existingIds = new Set(prev.map(pr => pr.id));
      const toAdd = SIMULATION_EXTRA_PROTOTYPES.filter(pr => !existingIds.has(pr.id));
      return [...prev, ...toAdd];
    });

    // Merge test reports
    setTestReports(prev => {
      const existingIds = new Set(prev.map(tr => tr.id));
      const toAdd = SIMULATION_EXTRA_TEST_REPORTS.filter(tr => !existingIds.has(tr.id));
      return [...prev, ...toAdd];
    });

    // Merge winners
    setWinners(prev => {
      const existingIds = new Set(prev.map(w => w.id));
      const toAdd = SIMULATION_EXTRA_WINNERS.filter(w => !existingIds.has(w.id));
      return [...prev, ...toAdd];
    });

    // Merge pilots
    setPilots(prev => {
      const existingIds = new Set(prev.map(pl => pl.id));
      const toAdd = SIMULATION_EXTRA_PILOTS.filter(pl => !existingIds.has(pl.id));
      return [...prev, ...toAdd];
    });

    // Merge notifications
    setNotifications(prev => {
      const existingIds = new Set(prev.map(n => n.id));
      const toAdd = SIMULATION_EXTRA_NOTIFICATIONS.filter(n => !existingIds.has(n.id));
      return [...toAdd, ...prev];
    });

    // Merge audit logs
    setAuditLogs(prev => {
      const existingIds = new Set(prev.map(al => al.id));
      const toAdd = SIMULATION_EXTRA_AUDIT_LOGS.filter(al => !existingIds.has(al.id));
      return [...toAdd, ...prev];
    });

    setIsSimulationLoaded(true);
    setSimulationToast({
      show: true,
      message: '⚡ Complete National Simulation Loaded! 8 Challenges, 6 Startups, 5 Proposals, 3 Live Pilots, 3 STQC Lab Certificates.',
      type: 'success',
    });
  };

  const simulateStep = (step: SimulationStep): { success: boolean; message: string } => {
    const timestamp = new Date().toISOString();

    if (step === 'SUBMIT_PROPOSAL') {
      const targetChallenge = challenges.find(c => c.id === 'ch-jal-04') || challenges[0];
      const newPropId = `prop-sim-${Date.now()}`;
      const newProp: Proposal = {
        id: newPropId,
        challengeId: targetChallenge.id,
        challengeTitle: targetChallenge.title,
        startupId: 'startup-jal',
        startupName: 'JalVigyan Technologies Pvt Ltd',
        dpiitNumber: 'DIPP-64192',
        title: 'GangaSentinel Pro: Autonomous Solar Multi-Spectral Buoy Network',
        slug: `gangasentinel-pro-${Date.now()}`,
        solutionOverview: 'High-frequency telemetry buoys measuring BOD, COD, and Heavy Metals every 15 minutes along industrial river outfalls with automated CPCB alert push.',
        technicalApproach: 'Ultrasonic anti-biofouling transducer array with optical fluorometers and LoRaWAN/NB-IoT dual redundancy telemetry node.',
        innovation: 'Autonomous 180-day biofouling resistance without human maintenance.',
        teamDetails: 'IIT Kanpur environmental instrumentation team led by Dr. Alok Tripathi.',
        budgetBreakdown: {
          rdDevelopment: 1200000,
          hardwareInfrastructure: 1500000,
          pilotTesting: 600000,
          teamManpower: 600000,
          contingency: 150000,
        },
        totalBudget: 4050000,
        timelineMonths: 6,
        impactMetrics: 'Covers 85 km river basin monitoring 24 industrial effluent discharge channels in real-time.',
        scalability: 'Assembly line supports 50 buoys/month in Kanpur.',
        riskAnalysis: 'High river velocity handled by hydrodynamic low-drag catamaran hull.',
        documents: [{ name: 'GangaSentinel_Spec.pdf', size: '4.2 MB', url: '#' }],
        status: 'SHORTLISTED',
        aiScore: 93.8,
        aiScoreBreakdown: {
          problemSolutionFit: 98,
          technicalFeasibility: 94,
          innovation: 95,
          impactPotential: 96,
          teamCapability: 93,
          scalability: 91,
          riskManagement: 89,
          costEffectiveness: 88,
          overall: 93.8,
        },
        aiExplanation: 'Exemplary solution solving critical bio-fouling and real-time CPCB telemetry bottlenecks. Ranked G1 Leader.',
        g1Category: true,
        g2Category: false,
        rankG1: 1,
        submittedAt: timestamp,
        prototypeSubmitted: true,
      };

      setProposals(prev => [newProp, ...prev]);
      setChallenges(prev =>
        prev.map(c => (c.id === targetChallenge.id ? { ...c, totalApplications: c.totalApplications + 1 } : c))
      );
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          userId: 'user-govt-1',
          title: 'Simulated Proposal Received: JalVigyan Technologies',
          message: `Solution submitted for "${targetChallenge.title.slice(0, 35)}...". AI Evaluation Score: 93.8/100 (G1 Leader).`,
          type: 'SUCCESS',
          read: false,
          createdAt: timestamp,
        },
        ...prev,
      ]);
      setAuditLogs(prev => [
        {
          id: `log-${Date.now()}`,
          userId: 'user-startup-jal',
          userName: 'Dr. Alok Tripathi (JalVigyan Tech)',
          action: 'PROPOSAL_SUBMITTED',
          entity: 'Proposal',
          entityId: newPropId,
          timestamp,
          ipAddress: '117.240.18.91 (DPIIT Startup Gateway)',
        },
        ...prev,
      ]);

      setSimulationToast({
        show: true,
        message: '🚀 Simulated Startup Proposal: JalVigyan Tech submitted GangaSentinel (AI Score: 93.8/100, G1 Category)!',
        type: 'success',
      });
      return { success: true, message: 'Proposal submitted successfully with instant AI evaluation score.' };
    }

    if (step === 'ISSUE_LAB_CERT') {
      const certNumber = `STQC/DEL/2026/BENCH-${Math.floor(1000 + Math.random() * 9000)}`;
      const targetProto = prototypes.find(p => p.status === 'UNDER_TESTING') || prototypes[0];
      const newReportId = `rep-stqc-sim-${Date.now()}`;

      const newReport: TestReport = {
        id: newReportId,
        prototypeId: targetProto.id,
        proposalId: targetProto.proposalId,
        challengeId: targetProto.challengeId,
        startupName: targetProto.startupName,
        solutionTitle: targetProto.solutionTitle,
        testingOrgId: 'org-stqc',
        testingOrgName: 'STQC Directorate (MeitY Govt of India)',
        functionalityScore: 10,
        performanceScore: 9,
        securityScore: 10,
        usabilityScore: 9,
        integrationScore: 9,
        overallScore: 94,
        functionalityReport: 'Benchmarked against NABL laboratory standards. Measurement drift under 3.1% over 14-day continuous test loop.',
        performanceReport: 'Edge computing response time < 850 ms. Battery endurance exceeds specifications by 24%.',
        securityReport: 'Encrypted telemetry stream verified by CERT-In security norms with zero high-severity vulnerabilities.',
        usabilityReport: 'Field deployment demonstrated by 2 technical staff in under 20 minutes.',
        integrationReport: 'National portal API webhook connection successfully validated.',
        issues: ['Recommended 316L marine grade stainless steel for river mooring pins.'],
        recommendations: 'Unconditionally recommended for National Procurement Pilot Sanction by Ministry.',
        verdict: 'PASS',
        certificateNumber: certNumber,
        submittedAt: timestamp,
      };

      setTestReports(prev => [newReport, ...prev]);
      setPrototypes(prev =>
        prev.map(p => (p.id === targetProto.id ? { ...p, status: 'TEST_PASSED', testReportId: newReportId } : p))
      );
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          userId: 'user-govt-1',
          title: `STQC Test Certificate Issued (${certNumber})`,
          message: `${targetProto.startupName} passed STQC laboratory benchmark testing with overall score 94/100 (Verdict: PASS).`,
          type: 'LAB_REPORT',
          read: false,
          createdAt: timestamp,
        },
        ...prev,
      ]);
      setAuditLogs(prev => [
        {
          id: `log-${Date.now()}`,
          userId: 'user-test-1',
          userName: 'Shri K. S. Sundaram (STQC Director)',
          action: 'TEST_REPORT_SUBMITTED',
          entity: 'TestReport',
          entityId: newReportId,
          timestamp,
          ipAddress: '10.14.88.12 (STQC MeitY)',
        },
        ...prev,
      ]);

      setSimulationToast({
        show: true,
        message: `🔬 STQC Lab Certificate Issued: ${certNumber} (Overall Score: 94/100, Verdict: PASS)!`,
        type: 'success',
      });
      return { success: true, message: `Lab Certificate ${certNumber} issued successfully.` };
    }

    if (step === 'SANCTION_PILOT') {
      const eligibleProp = proposals.find(p => p.status === 'SHORTLISTED') || proposals[0];
      const winId = `win-sim-${Date.now()}`;
      const contractNum = `GOVT/PILOT/2026/SANCTION-${Math.floor(100 + Math.random() * 900)}`;

      const newWinner: Winner = {
        id: winId,
        challengeId: eligibleProp.challengeId,
        proposalId: eligibleProp.id,
        startupId: eligibleProp.startupId,
        startupName: eligibleProp.startupName,
        solutionTitle: eligibleProp.title,
        rank: 1,
        prizeAmount: eligibleProp.totalBudget,
        selectedAt: timestamp,
        notes: `Sanctioned by Ministry Technical Evaluation Committee under GFR 2017 Rule 194. Pilot work order issued.`,
        contractNumber: contractNum,
      };

      const newPilotId = `pilot-sim-${Date.now()}`;
      const advanceAmount = Math.round(eligibleProp.totalBudget * 0.4);
      const newPilot: Pilot = {
        id: newPilotId,
        challengeId: eligibleProp.challengeId,
        challengeTitle: eligibleProp.challengeTitle,
        winnerId: winId,
        startupId: eligibleProp.startupId,
        startupName: eligibleProp.startupName,
        location: 'Field Pilot Deployment Zone - Phase 1 Sector',
        startDate: timestamp,
        endDate: new Date(Date.now() + 180 * 86400000).toISOString(),
        status: 'IN_PROGRESS',
        totalBudget: eligibleProp.totalBudget,
        totalSanctionedAmount: eligibleProp.totalBudget,
        disbursedAmount: advanceAmount,
        progress: 40,
        currentPhase: 'Phase 1: Hardware Fabrication & Baseline Calibration',
        kpis: [
          { metric: 'Telemetry Latency', target: '<15s', achieved: '9.2s (Exceeding Benchmark)' },
          { metric: 'Uptime Reliability', target: '>99.5%', achieved: '99.9% Continuous' },
          { metric: 'Measurement Drift', target: '<5%', achieved: '2.4% over 30 days' },
        ],
        milestones: [
          {
            id: `ms-sim-${Date.now()}-1`,
            pilotId: newPilotId,
            title: 'Initial Provisioning & Fabrication Benchmark',
            description: 'Manufacture operational units and complete baseline sensor calibration.',
            paymentPercentage: 40,
            paymentAmount: advanceAmount,
            dueDate: new Date(Date.now() + 30 * 86400000).toISOString(),
            status: 'COMPLETED',
            paymentStatus: 'PAID',
            deliverablesUrl: 'https://nic.gov.in/milestones/phase1-verification.pdf',
            paidAt: timestamp,
            utrNumber: `RBI-NEFT-2026-PFMS-${Math.floor(100000 + Math.random() * 900000)}`,
          },
          {
            id: `ms-sim-${Date.now()}-2`,
            pilotId: newPilotId,
            title: 'Field Deployment & Live Cloud Telemetry Feed',
            description: 'Deploy hardware on site and integrate continuous data feed with Ministry SCADA portal.',
            paymentPercentage: 35,
            paymentAmount: Math.round(eligibleProp.totalBudget * 0.35),
            dueDate: new Date(Date.now() + 90 * 86400000).toISOString(),
            status: 'IN_PROGRESS',
            paymentStatus: 'REQUESTED',
            deliverablesUrl: 'https://nic.gov.in/milestones/telemetry-proof.pdf',
          },
          {
            id: `ms-sim-${Date.now()}-3`,
            pilotId: newPilotId,
            title: 'Final Acceptance & GeM National Scale-out Transition',
            description: 'Final performance audit and conversion to GeM Direct Procurement Order.',
            paymentPercentage: 25,
            paymentAmount: Math.round(eligibleProp.totalBudget * 0.25),
            dueDate: new Date(Date.now() + 180 * 86400000).toISOString(),
            status: 'PENDING',
            paymentStatus: 'PENDING',
          },
        ],
      };

      setWinners(prev => [newWinner, ...prev]);
      setPilots(prev => [newPilot, ...prev]);
      setChallenges(prev =>
        prev.map(c =>
          c.id === eligibleProp.challengeId
            ? { ...c, status: 'PILOT_IN_PROGRESS', winnerCount: c.winnerCount + 1 }
            : c
        )
      );
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          userId: 'user-startup-1',
          title: `Pilot Sanction Order Issued (${contractNum})`,
          message: `Ministry has sanctioned your pilot grant of ₹${(eligibleProp.totalBudget / 100000).toFixed(2)} Lakhs under GFR 149/194.`,
          type: 'AWARDED',
          read: false,
          createdAt: timestamp,
        },
        ...prev,
      ]);
      setAuditLogs(prev => [
        {
          id: `log-${Date.now()}`,
          userId: 'user-govt-1',
          userName: 'Dr. Rajesh Verma, IAS',
          action: 'PILOT_SANCTIONED',
          entity: 'Pilot',
          entityId: newPilotId,
          timestamp,
          ipAddress: '10.14.22.9 (NIC Govt Portal)',
        },
        ...prev,
      ]);

      setSimulationToast({
        show: true,
        message: `🏛️ Pilot Sanctioned: Contract ${contractNum} (₹${(eligibleProp.totalBudget / 100000).toFixed(1)} Lakhs) with 40% advance released!`,
        type: 'success',
      });
      return { success: true, message: `Pilot Sanctioned under Contract ${contractNum}.` };
    }

    if (step === 'PAY_MILESTONE') {
      let paidPilotName = '';
      let paidAmount = 0;
      let utr = `RBI-NEFT-2026-DISB-${Math.floor(100000 + Math.random() * 900000)}`;

      setPilots(prev => {
        let milestoneHandled = false;
        return prev.map(pilot => {
          if (milestoneHandled) return pilot;

          // Find requested or pending milestone
          const milestoneToPay = pilot.milestones.find(
            m => m.paymentStatus === 'REQUESTED' || (m.status === 'IN_PROGRESS' && m.paymentStatus !== 'PAID')
          );

          if (milestoneToPay) {
            milestoneHandled = true;
            paidPilotName = pilot.startupName;
            paidAmount = milestoneToPay.paymentAmount;

            const updatedMilestones = pilot.milestones.map(m =>
              m.id === milestoneToPay.id
                ? {
                    ...m,
                    status: 'COMPLETED' as const,
                    paymentStatus: 'PAID' as const,
                    paidAt: timestamp,
                    utrNumber: utr,
                  }
                : m
            );

            return {
              ...pilot,
              disbursedAmount: pilot.disbursedAmount + paidAmount,
              progress: Math.min(100, pilot.progress + 30),
              milestones: updatedMilestones,
            };
          }
          return pilot;
        });
      });

      if (paidAmount > 0) {
        setNotifications(prev => [
          {
            id: `notif-${Date.now()}`,
            userId: 'user-startup-1',
            title: `PFMS Electronic Payment Disbursed (₹${(paidAmount / 100000).toFixed(2)} Lakhs)`,
            message: `Funds credited to verified bank account via RBI-NEFT. Transaction UTR: ${utr}.`,
            type: 'PAYMENT_RECEIVED',
            read: false,
            createdAt: timestamp,
          },
          ...prev,
        ]);
        setAuditLogs(prev => [
          {
            id: `log-${Date.now()}`,
            userId: 'user-govt-1',
            userName: 'Dr. Rajesh Verma, IAS (Financial Advisor)',
            action: 'PAYMENT_RELEASED',
            entity: 'Milestone',
            entityId: utr,
            timestamp,
            ipAddress: '10.14.22.9 (PFMS Gateway)',
          },
          ...prev,
        ]);

        setSimulationToast({
          show: true,
          message: `💳 Milestone Payment Released: ₹${(paidAmount / 100000).toFixed(2)} Lakhs credited to ${paidPilotName} (UTR: ${utr})!`,
          type: 'success',
        });
        return { success: true, message: `Disbursed ₹${(paidAmount / 100000).toFixed(2)} Lakhs (UTR: ${utr}).` };
      } else {
        setSimulationToast({
          show: true,
          message: 'All available milestones are already settled or no pending milestone was found.',
          type: 'info',
        });
        return { success: false, message: 'No pending milestone found to disburse.' };
      }
    }

    return { success: false, message: 'Invalid simulation step.' };
  };

  const resetAllData = () => {
    setStartups(INITIAL_STARTUPS);
    setChallenges(INITIAL_CHALLENGES);
    setProposals(INITIAL_PROPOSALS);
    setPrototypes(INITIAL_PROTOTYPES);
    setTestReports(INITIAL_TEST_REPORTS);
    setWinners(INITIAL_WINNERS);
    setPilots(INITIAL_PILOTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setIsSimulationLoaded(false);
    setSimulationToast({
      show: true,
      message: 'All simulation data reset to clean default baseline.',
      type: 'info',
    });
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeView,
        setActiveView,
        language,
        setLanguage,
        currentUser,
        setCurrentUser,
        users,
        startups,
        challenges,
        proposals,
        prototypes,
        testReports,
        winners,
        pilots,
        notifications,
        auditLogs,
        isSimulationLoaded,
        isSimulationModalOpen,
        setIsSimulationModalOpen,
        simulationToast,
        dismissSimulationToast,
        loadSimulationData,
        simulateStep,
        addChallenge,
        submitProposal,
        runAIScoring,
        submitPrototype,
        submitTestReport,
        selectWinner,
        requestMilestonePayment,
        approveMilestonePayment,
        updatePilotProgress,
        markNotificationRead,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
