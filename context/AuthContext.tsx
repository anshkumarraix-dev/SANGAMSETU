'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  deleteUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
} from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export type UserRole = 'startup' | 'government' | 'testing_org' | 'admin';

export interface UserProfile {
  email: string;
  contactEmail?: string;
  orgId?: string;
  role: UserRole;
  organizationName: string;
  officerName?: string;
  designation?: string;
  department?: string;
  cinNumber?: string;
  sector?: string;
  labCategory?: string;
  createdAt: number;
  updatedAt: number;
  isApproved: boolean;
}

export interface DemoAccountInfo {
  role: UserRole;
  email: string;
  name: string;
  organizationName: string;
  designation: string;
  orgId: string;
}

export const DEMO_ACCOUNTS: Record<UserRole, DemoAccountInfo> = {
  admin: {
    role: 'admin',
    email: 'director-dpiit@nic.in',
    name: 'Dr. S. K. Gupta, IAS',
    organizationName: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
    designation: 'Mission Director & Joint Secretary',
    orgId: 'DPIIT-ADM-001',
  },
  government: {
    role: 'government',
    email: 'r.verma@gov.in',
    name: 'Dr. Rajesh Verma, IAS',
    organizationName: 'Ministry of Road Transport & Highways (NHAI)',
    designation: 'Chief Engineer (Innovation & Procurement)',
    orgId: 'MORTH-ENG-4412',
  },
  startup: {
    role: 'startup',
    email: 'aarav@startup.gov.in',
    name: 'Aarav Sharma',
    organizationName: 'Navgati Spatial Technologies Pvt Ltd',
    designation: 'Founder & Chief Executive Officer',
    orgId: 'DPIIT-STU-9921',
  },
  testing_org: {
    role: 'testing_org',
    email: 'director@stqc.gov.in',
    name: 'Shri K. S. Sundaram',
    organizationName: 'STQC Directorate / C-DAC Certification Lab',
    designation: 'Director & Lead Quality Auditor',
    orgId: 'MEITY-STQC-8821',
  },
};

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (emailOrOrgId: string, password: string, selectedRole?: UserRole) => Promise<{ success: boolean; error?: string }>;
  signInDemo: (role: UserRole) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: {
    email: string;
    orgId: string;
    role: UserRole;
    organizationName: string;
    password: string;
    contactEmail?: string;
    officerName?: string;
    designation?: string;
    cinNumber?: string;
    sector?: string;
    labCategory?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => ({ success: false }),
  signInDemo: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  signOut: async () => {},
  deleteAccount: async () => false,
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        setProfile(data);
        return data;
      }
    } catch {
      console.warn('[AUTH] Firestore profile fetch skipped/errored');
    }
    return null;
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.uid);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const loadedProfile = await fetchProfile(firebaseUser.uid);
        // If profile was not in firestore (e.g. anonymous or demo session), check localStorage session fallback
        if (!loadedProfile) {
          try {
            const cached = localStorage.getItem(`sangam_profile_${firebaseUser.uid}`);
            if (cached) {
              setProfile(JSON.parse(cached));
            }
          } catch {
            // ignore
          }
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (
    emailOrOrgId: string,
    password: string,
    selectedRole?: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      let email = emailOrOrgId.trim();
      if (!email.includes('@')) {
        const roleStr = selectedRole || 'government';
        email = `${email.toLowerCase()}@${roleStr}.sangamsetu.internal`;
      }

      const cred = await signInWithEmailAndPassword(auth, email, password);
      let p = await fetchProfile(cred.user.uid);
      if (!p) {
        // Create baseline profile if not existing
        const role = selectedRole || 'government';
        const newProfile: UserProfile = {
          email,
          contactEmail: email,
          orgId: emailOrOrgId.toUpperCase(),
          role,
          organizationName: DEMO_ACCOUNTS[role]?.organizationName || 'Government Department',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          isApproved: true,
        };
        try {
          await setDoc(doc(db, 'users', cred.user.uid), newProfile);
        } catch {
          // ignore
        }
        setProfile(newProfile);
        try {
          localStorage.setItem(`sangam_profile_${cred.user.uid}`, JSON.stringify(newProfile));
        } catch {
          // ignore
        }
      }
      return { success: true };
    } catch {
      return { success: false, error: 'Invalid credentials. Please verify your email/ID and password.' };
    }
  };

  const signInDemo = async (role: UserRole): Promise<{ success: boolean; error?: string }> => {
    try {
      const demo = DEMO_ACCOUNTS[role];
      const demoEmail = `${role}.demo@sangamsetu.gov.in`;
      const demoPassword = 'GovtInnovation2026!';

      let userCred;
      try {
        userCred = await signInWithEmailAndPassword(auth, demoEmail, demoPassword);
      } catch {
        // If demo user doesn't exist yet, create it
        try {
          userCred = await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
        } catch {
          // Fallback to anonymous auth if email exists or fails
          userCred = await signInAnonymously(auth);
        }
      }

      const demoProfile: UserProfile = {
        email: demo.email,
        contactEmail: demo.email,
        orgId: demo.orgId,
        role: demo.role,
        organizationName: demo.organizationName,
        officerName: demo.name,
        designation: demo.designation,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isApproved: true,
      };

      try {
        await setDoc(doc(db, 'users', userCred.user.uid), demoProfile);
      } catch {
        // ignore
      }

      setProfile(demoProfile);
      try {
        localStorage.setItem(`sangam_profile_${userCred.user.uid}`, JSON.stringify(demoProfile));
      } catch {
        // ignore
      }

      return { success: true };
    } catch {
      return { success: false, error: 'Failed to initialize official demo session.' };
    }
  };

  const signUp = async (data: {
    email: string;
    orgId: string;
    role: UserRole;
    organizationName: string;
    password: string;
    contactEmail?: string;
    officerName?: string;
    designation?: string;
    cinNumber?: string;
    sector?: string;
    labCategory?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      let authEmail = data.email.trim();
      if (!authEmail.includes('@')) {
        authEmail = `${data.orgId.toLowerCase()}@${data.role}.sangamsetu.internal`;
      }

      const cred = await createUserWithEmailAndPassword(auth, authEmail, data.password);

      const newProfile: UserProfile = {
        email: authEmail,
        contactEmail: data.contactEmail || data.email,
        orgId: data.orgId.toUpperCase(),
        role: data.role,
        organizationName: data.organizationName,
        officerName: data.officerName,
        designation: data.designation,
        cinNumber: data.cinNumber,
        sector: data.sector,
        labCategory: data.labCategory,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isApproved: true, // Auto-approved for immediate evaluation & testing
      };

      try {
        await setDoc(doc(db, 'users', cred.user.uid), newProfile);
      } catch {
        // ignore
      }

      setProfile(newProfile);
      try {
        localStorage.setItem(`sangam_profile_${cred.user.uid}`, JSON.stringify(newProfile));
      } catch {
        // ignore
      }

      return { success: true };
    } catch (err: any) {
      if (err?.code === 'auth/email-already-in-use') {
        return { success: false, error: 'An account with this email / Organization ID already exists.' };
      }
      return { success: false, error: 'Failed to create organization account. Please check inputs.' };
    }
  };

  const signOut = async () => {
    try {
      if (user) {
        localStorage.removeItem(`sangam_profile_${user.uid}`);
      }
      await firebaseSignOut(auth);
      setUser(null);
      setProfile(null);
    } catch {
      console.error('[AUTH] Sign out operation failed');
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    if (!user) return false;
    try {
      const uid = user.uid;
      try {
        await deleteDoc(doc(db, 'users', uid));
      } catch {
        console.warn('[AUTH] Firestore user profile record cleanup skipped');
      }
      localStorage.removeItem(`sangam_profile_${uid}`);
      await deleteUser(user);
      setUser(null);
      setProfile(null);
      return true;
    } catch {
      console.error('[AUTH] User account erasure failed');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signInDemo,
        signUp,
        signOut,
        deleteAccount,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
