'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  GovernmentSolution,
  AlternativeSolution,
  AlternativeStatus,
  ReviewScore,
} from '@/lib/innovation-exchange/types';
import {
  INITIAL_GOVERNMENT_SOLUTIONS,
  INITIAL_ALTERNATIVES,
} from '@/lib/innovation-exchange/mockData';

interface InnovationExchangeContextType {
  governmentSolutions: GovernmentSolution[];
  alternatives: AlternativeSolution[];
  addAlternative: (
    newAlternative: Omit<
      AlternativeSolution,
      | 'id'
      | 'costReductionPercent'
      | 'timeReductionPercent'
      | 'aiFeasibilityScore'
      | 'aiJustification'
      | 'review'
      | 'likes'
      | 'comments'
      | 'pilot'
      | 'submittedAt'
      | 'updatedAt'
    >
  ) => string;
  updateAlternativeStatus: (id: string, newStatus: AlternativeStatus) => void;
  updateReviewScores: (
    id: string,
    scores: Partial<ReviewScore>,
    newStatus?: AlternativeStatus
  ) => void;
  likeAlternative: (id: string) => void;
  addComment: (
    id: string,
    text: string,
    author: string,
    role: 'Startup Founder' | 'Department Official' | 'Evaluator' | 'Observer'
  ) => void;
  addGovernmentSolution: (solution: Omit<GovernmentSolution, 'id'>) => string;
  getAlternativeById: (id: string) => AlternativeSolution | undefined;
  getSolutionById: (id: string) => GovernmentSolution | undefined;
  calculateFeasibilityScore: (
    proposedCost: number,
    govCost: number,
    proposedTimeline: number,
    govTimeline: number,
    techStack: string[]
  ) => { score: number; justification: string };
  checkDuplicateWarning: (targetSolutionId: string, proposedCost: number) => string | null;
  stats: {
    totalAlternatives: number;
    totalCostSavingsLakhs: number;
    averageCostReductionPercent: number;
    averageTimeReductionPercent: number;
  };
}

const InnovationExchangeContext = createContext<InnovationExchangeContextType | undefined>(
  undefined
);

export const InnovationExchangeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [governmentSolutions, setGovernmentSolutions] = useState<GovernmentSolution[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sangamsetu_gov_solutions');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_GOVERNMENT_SOLUTIONS;
  });

  const [alternatives, setAlternatives] = useState<AlternativeSolution[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sangamsetu_alternatives');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_ALTERNATIVES;
  });

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sangamsetu_gov_solutions', JSON.stringify(governmentSolutions));
    }
  }, [governmentSolutions]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sangamsetu_alternatives', JSON.stringify(alternatives));
    }
  }, [alternatives]);

  // AI Feasibility Evaluator (Deterministic & instant)
  const calculateFeasibilityScore = (
    proposedCost: number,
    govCost: number,
    proposedTimeline: number,
    govTimeline: number,
    techStack: string[]
  ) => {
    const costSavingsPct = Math.max(0, ((govCost - proposedCost) / govCost) * 100);
    const timeSavingsPct = Math.max(0, ((govTimeline - proposedTimeline) / govTimeline) * 100);

    let score = 70;
    if (costSavingsPct >= 30) score += 12;
    else if (costSavingsPct >= 15) score += 8;
    else if (costSavingsPct >= 5) score += 4;

    if (timeSavingsPct >= 40) score += 10;
    else if (timeSavingsPct >= 20) score += 6;

    if (techStack.length >= 3) score += 8;
    else if (techStack.length >= 1) score += 4;

    score = Math.min(99, Math.max(40, score));

    let justification = `Provides a projected ${Math.round(costSavingsPct)}% public treasury savings and ${Math.round(timeSavingsPct)}% deployment acceleration.`;
    if (costSavingsPct < 10) {
      justification +=
        ' Note: Minimum 10% cost reduction recommended under Rule 149(iv) for fast-track pilot authorization.';
    } else {
      justification +=
        ' Meets and exceeds Rule 149(iv) fast-track criteria for public sector modernization.';
    }

    return { score, justification };
  };

  // Duplicate warning detection (if proposal is within 7% cost of an existing alternative)
  const checkDuplicateWarning = (targetSolutionId: string, proposedCost: number): string | null => {
    const existing = alternatives.filter((a) => a.targetSolutionId === targetSolutionId);
    for (const alt of existing) {
      const diff = Math.abs(alt.proposedCost - proposedCost);
      const diffPct = (diff / alt.proposedCost) * 100;
      if (diffPct <= 7) {
        return `A similar proposal "${alt.title}" from ${alt.startupName} already exists with a closely matched pricing model (₹${alt.proposedCost} Lakhs). Consider highlighting unique architectural or operational differentiators.`;
      }
    }
    return null;
  };

  // Add Alternative
  const addAlternative = (
    newAlt: Omit<
      AlternativeSolution,
      | 'id'
      | 'costReductionPercent'
      | 'timeReductionPercent'
      | 'aiFeasibilityScore'
      | 'aiJustification'
      | 'review'
      | 'likes'
      | 'comments'
      | 'pilot'
      | 'submittedAt'
      | 'updatedAt'
    >
  ) => {
    const govSol = governmentSolutions.find((g) => g.id === newAlt.targetSolutionId);
    const govCost = govSol ? govSol.currentCost : 100;
    const govTime = govSol ? govSol.currentImplementationTime : 6;

    const costReductionPercent = Math.max(
      0,
      Math.round(((govCost - newAlt.proposedCost) / govCost) * 100)
    );
    const timeReductionPercent = Math.max(
      0,
      Math.round(((govTime - newAlt.proposedTimelineMonths) / govTime) * 100)
    );

    const { score, justification } = calculateFeasibilityScore(
      newAlt.proposedCost,
      govCost,
      newAlt.proposedTimelineMonths,
      govTime,
      newAlt.technologyStack
    );

    const id = `alt-sol-${Date.now().toString().slice(-4)}`;
    const fullAlternative: AlternativeSolution = {
      ...newAlt,
      id,
      costReductionPercent,
      timeReductionPercent,
      aiFeasibilityScore: score,
      aiJustification: justification,
      review: {
        technicalScore: 8.0,
        feasibilityScore: 8.0,
        impactScore: 8.0,
        innovationScore: 8.0,
        overallScore: 8.0,
        comments: 'Initial baseline submission. Technical Committee review pending.',
      },
      likes: 0,
      comments: [],
      pilot: {
        approved: false,
      },
      submittedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setAlternatives((prev) => [fullAlternative, ...prev]);
    return id;
  };

  // Add Government Solution
  const addGovernmentSolution = (sol: Omit<GovernmentSolution, 'id'>) => {
    const id = `gov-sol-${Date.now().toString().slice(-4)}`;
    const newGovSol: GovernmentSolution = {
      ...sol,
      id,
    };
    setGovernmentSolutions((prev) => [newGovSol, ...prev]);
    return id;
  };

  const updateAlternativeStatus = (id: string, newStatus: AlternativeStatus) => {
    setAlternatives((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: newStatus,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : a
      )
    );
  };

  const updateReviewScores = (
    id: string,
    scores: Partial<ReviewScore>,
    newStatus?: AlternativeStatus
  ) => {
    setAlternatives((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const updatedReview = {
            ...a.review,
            ...scores,
            evaluatedAt: new Date().toISOString().split('T')[0],
          };
          return {
            ...a,
            review: updatedReview,
            status: newStatus || a.status,
            updatedAt: new Date().toISOString().split('T')[0],
          };
        }
        return a;
      })
    );
  };

  const likeAlternative = (id: string) => {
    setAlternatives((prev) =>
      prev.map((a) => (a.id === id ? { ...a, likes: a.likes + 1 } : a))
    );
  };

  const addComment = (
    id: string,
    text: string,
    author: string,
    role: 'Startup Founder' | 'Department Official' | 'Evaluator' | 'Observer'
  ) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      author,
      role,
      text,
      date: new Date().toISOString().split('T')[0],
    };

    setAlternatives((prev) =>
      prev.map((a) => (a.id === id ? { ...a, comments: [...a.comments, newComment] } : a))
    );
  };

  const getAlternativeById = (id: string) => alternatives.find((a) => a.id === id);
  const getSolutionById = (id: string) => governmentSolutions.find((g) => g.id === id);

  // Computed Aggregates
  const stats = useMemo(() => {
    const totalAlternatives = alternatives.length;

    let totalCostSavingsLakhs = 0;
    let totalCostReductionPctSum = 0;
    let totalTimeReductionPctSum = 0;

    alternatives.forEach((alt) => {
      const govSol = governmentSolutions.find((g) => g.id === alt.targetSolutionId);
      if (govSol) {
        totalCostSavingsLakhs += Math.max(0, govSol.currentCost - alt.proposedCost);
      }
      totalCostReductionPctSum += alt.costReductionPercent;
      totalTimeReductionPctSum += alt.timeReductionPercent;
    });

    const averageCostReductionPercent =
      totalAlternatives > 0 ? Math.round(totalCostReductionPctSum / totalAlternatives) : 0;
    const averageTimeReductionPercent =
      totalAlternatives > 0 ? Math.round(totalTimeReductionPctSum / totalAlternatives) : 0;

    return {
      totalAlternatives,
      totalCostSavingsLakhs,
      averageCostReductionPercent,
      averageTimeReductionPercent,
    };
  }, [alternatives, governmentSolutions]);

  return (
    <InnovationExchangeContext.Provider
      value={{
        governmentSolutions,
        alternatives,
        addAlternative,
        updateAlternativeStatus,
        updateReviewScores,
        likeAlternative,
        addComment,
        addGovernmentSolution,
        getAlternativeById,
        getSolutionById,
        calculateFeasibilityScore,
        checkDuplicateWarning,
        stats,
      }}
    >
      {children}
    </InnovationExchangeContext.Provider>
  );
};

export const useInnovationExchange = () => {
  const context = useContext(InnovationExchangeContext);
  if (!context) {
    throw new Error('useInnovationExchange must be used within an InnovationExchangeProvider');
  }
  return context;
};
