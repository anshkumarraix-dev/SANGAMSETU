import {
  Challenge,
  Proposal,
  Prototype,
  TestReport,
  Winner,
  Pilot,
  StartupProfile,
  GovernmentProfile,
  TestingOrgProfile,
  NotificationItem,
  AuditLogItem,
  User,
  UserRole,
} from './types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-startup-1',
    name: 'Aarav Sharma',
    email: 'aarav@startup.gov.in',
    role: 'STARTUP',
    organization: 'DPIIT Registered Startup',
    phone: '+91 98187 74144',
  },
  {
    id: 'user-govt-1',
    name: 'Dr. Rajesh Verma, IAS',
    email: 'r.verma@gov.in',
    role: 'GOVERNMENT',
    organization: 'Ministry of Road Transport & Highways',
    phone: '+91 11 2371 4500',
  },
  {
    id: 'user-test-1',
    name: 'Shri K. S. Sundaram',
    email: 'director@stqc.gov.in',
    role: 'TESTING_ORG',
    organization: 'STQC Directorate (MeitY)',
    phone: '+91 11 2436 0000',
  },
  {
    id: 'user-admin-1',
    name: 'DPIIT Mission Director',
    email: 'director-dpiit@nic.in',
    role: 'ADMIN',
    organization: 'Department for Promotion of Industry & Internal Trade',
    phone: '+91 11 2306 1234',
  },
];

export const INITIAL_STARTUPS: StartupProfile[] = [];

export const INITIAL_CHALLENGES: Challenge[] = [];

export const INITIAL_PROPOSALS: Proposal[] = [];

export const INITIAL_PROTOTYPES: Prototype[] = [];

export const INITIAL_TEST_REPORTS: TestReport[] = [];

export const INITIAL_WINNERS: Winner[] = [];

export const INITIAL_PILOTS: Pilot[] = [];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [];
