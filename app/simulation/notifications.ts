import { EvaluationStartup, StartupNotification } from './types';

/**
 * Generates isolated in-app notification feeds for each startup based on the current simulation stage and state.
 */
export function generateStartupNotifications(
  startups: EvaluationStartup[],
  currentStage: number
): Record<string, StartupNotification[]> {
  const notificationsMap: Record<string, StartupNotification[]> = {};

  startups.forEach(startup => {
    const list: StartupNotification[] = [];

    // Stage 1+: Intake & Eligibility Notice
    list.push({
      id: `notif-intake-${startup.id}`,
      startupId: startup.id,
      timestamp: '10 Aug 2026, 11:30 AM IST',
      stage: 1,
      type: 'INFO',
      title: 'Proposal Intake Confirmed',
      message: `Your technical proposal for "${startup.solutionTitle}" was successfully received and verified against DPIIT startup eligibility criteria.`,
      badgeText: 'Intake Complete',
      badgeColor: 'blue',
    });

    // Stage 2+: AI Shortlisting Notification
    if (currentStage >= 2) {
      const isG1 = startup.aiEvaluation.recommendation === 'G1 candidate';
      const isG2 = startup.aiEvaluation.recommendation === 'G2 candidate';
      const isShortlisted = isG1 || isG2;

      if (isShortlisted) {
        list.push({
          id: `notif-shortlist-${startup.id}`,
          startupId: startup.id,
          timestamp: '14 Aug 2026, 04:15 PM IST',
          stage: 2,
          type: 'SHORTLIST',
          title: isG1 ? 'Shortlisted: G1 Quality Track' : 'Shortlisted: G2 Value Track',
          message: isG1
            ? `Your proposal scored ${startup.aiEvaluation.overallScore}/100 in the 8-factor explainable AI evaluation and has been shortlisted under the G1 Quality Track.`
            : `Your proposal scored ${startup.aiEvaluation.overallScore}/100 with high cost-efficiency (₹${startup.cost}L) and is shortlisted under the G2 Value Track (G2 Score: ${startup.aiEvaluation.g2ValueScore?.total || 78}/100).`,
          badgeText: isG1 ? 'G1 Shortlisted' : 'G2 Shortlisted',
          badgeColor: 'emerald',
        });
      } else {
        const lowestParam = [...startup.aiEvaluation.parameters].sort((a, b) => a.score - b.score)[0];
        list.push({
          id: `notif-not-shortlist-${startup.id}`,
          startupId: startup.id,
          timestamp: '14 Aug 2026, 04:15 PM IST',
          stage: 2,
          type: 'SHORTLIST',
          title: 'AI Evaluation Outcome: Not Shortlisted',
          message: `Evaluation completed (Overall Score: ${startup.aiEvaluation.overallScore}/100). Primary factor affecting ranking: ${lowestParam.name} (${lowestParam.score}/100) - ${lowestParam.justification}`,
          badgeText: 'Not Shortlisted',
          badgeColor: 'rose',
        });
      }
    }

    // Stage 3-4+: Prototype Lab Testing Notification
    if (currentStage >= 3) {
      const isShortlisted =
        startup.aiEvaluation.recommendation === 'G1 candidate' ||
        startup.aiEvaluation.recommendation === 'G2 candidate';

      if (isShortlisted) {
        const result = startup.prototypeTesting.overallResult;
        const certId = startup.prototypeTesting.testCertificateId || 'STQC-2026-VAL';
        list.push({
          id: `notif-lab-${startup.id}`,
          startupId: startup.id,
          timestamp: '22 Aug 2026, 02:45 PM IST',
          stage: 4,
          type: 'LAB_TEST',
          title: `STQC Lab Benchmarking: ${result}`,
          message:
            result === 'Pass'
              ? `Independent testing by STQC Laboratory cleared all 15 parameters with verified evidence. Certificate: ${certId}.`
              : result === 'Conditional Pass'
              ? `STQC Laboratory reported Conditional Pass. Minor latency optimization required before deployment sanction.`
              : `Testing audit completed. Mandatory parameter requirements were not fully satisfied (${startup.prototypeTesting.failedMandatoryReason || 'Security/Functional check'}).`,
          badgeText: result,
          badgeColor: result === 'Pass' ? 'emerald' : result === 'Conditional Pass' ? 'amber' : 'rose',
        });
      }
    }

    // Stage 5: Final Award / Non-selection Notification
    if (currentStage >= 5) {
      if (startup.finalSelection?.isFinallySelected) {
        list.push({
          id: `notif-award-${startup.id}`,
          startupId: startup.id,
          timestamp: '01 Sep 2026, 11:00 AM IST',
          stage: 5,
          type: 'AWARD',
          title: 'Pilot Contract Sanctioned & Awarded',
          message: `Congratulations! Ministry of Road Transport and Highways (MoRTH) has sanctioned the pilot deployment under Work Order ${startup.finalSelection.workOrderNumber || 'MORTH/2026/WO-101'} for ₹${startup.cost} Lakhs.`,
          badgeText: 'Awarded',
          badgeColor: 'emerald',
        });
      } else {
        const isShortlisted =
          startup.aiEvaluation.recommendation === 'G1 candidate' ||
          startup.aiEvaluation.recommendation === 'G2 candidate';

        if (isShortlisted) {
          list.push({
            id: `notif-not-awarded-${startup.id}`,
            startupId: startup.id,
            timestamp: '01 Sep 2026, 11:00 AM IST',
            stage: 5,
            type: 'AWARD',
            title: 'Procurement Cycle Concluded',
            message: `The MoRTH corridor pilot allocation has been sanctioned for this cycle. Your verified prototype profile remains preserved on the DPIIT National Innovation Repository for subsequent state and municipal procurement fast-tracks.`,
            badgeText: 'Not Selected This Round',
            badgeColor: 'blue',
          });
        }
      }
    }

    // Stage 6: Live Deployment & Milestone Payments Release Notification
    if (currentStage >= 6 && startup.finalSelection?.isFinallySelected) {
      list.push({
        id: `notif-deployment-${startup.id}`,
        startupId: startup.id,
        timestamp: '05 Sep 2026, 09:30 AM IST',
        stage: 6,
        type: 'AWARD',
        title: 'Corridor Deployment Active & Milestone 1 Disbursed',
        message: `Field deployment active on NH-48 corridor. Mobilization advance Tranche 1 (20% = ₹${Math.round(startup.cost * 0.2 * 10) / 10}L) has been credited to your PFMS Escrow virtual account. Milestone 2 verification is in progress.`,
        badgeText: 'Deployment Active',
        badgeColor: 'emerald',
      });
    }

    // Sort newest first
    notificationsMap[startup.id] = list.reverse();
  });

  return notificationsMap;
}
