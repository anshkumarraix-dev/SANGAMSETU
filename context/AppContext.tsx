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
import { evaluateProposalAI, rankAndCategorizeProposals } from '@/lib/ai-scoring';

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
  const [startups] = useState<StartupProfile[]>(INITIAL_STARTUPS);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [prototypes, setPrototypes] = useState<Prototype[]>(INITIAL_PROTOTYPES);
  const [testReports, setTestReports] = useState<TestReport[]>(INITIAL_TEST_REPORTS);
  const [winners, setWinners] = useState<Winner[]>(INITIAL_WINNERS);
  const [pilots, setPilots] = useState<Pilot[]>(INITIAL_PILOTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

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

  const resetAllData = () => {
    setChallenges(INITIAL_CHALLENGES);
    setProposals(INITIAL_PROPOSALS);
    setPrototypes(INITIAL_PROTOTYPES);
    setTestReports(INITIAL_TEST_REPORTS);
    setWinners(INITIAL_WINNERS);
    setPilots(INITIAL_PILOTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
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
