'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signOut as firebaseSignOut, deleteUser } from 'firebase/auth';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export type UserRole = 'startup' | 'government' | 'testing_org' | 'admin';

export interface UserProfile {
  email: string;
  contactEmail?: string;
  orgId?: string;
  role: UserRole;
  organizationName: string;
  createdAt: number;
  updatedAt: number;
  isApproved: boolean;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
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
        setProfile(docSnap.data() as UserProfile);
      } else {
        setProfile(null);
      }
    } catch {
      // Sanitized: Do not print raw error or user details
      console.error('[AUTH] Failed to fetch authenticated user profile');
      setProfile(null);
    }
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
        await fetchProfile(firebaseUser.uid);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch {
      console.error('[AUTH] Sign out operation failed');
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    if (!user) return false;
    try {
      const uid = user.uid;
      // 1. Delete Firestore user profile document
      try {
        await deleteDoc(doc(db, 'users', uid));
      } catch {
        console.warn('[AUTH] Firestore user profile record cleanup skipped');
      }

      // 2. Delete Firebase Auth user
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
    <AuthContext.Provider value={{ user, profile, loading, signOut, deleteAccount, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
