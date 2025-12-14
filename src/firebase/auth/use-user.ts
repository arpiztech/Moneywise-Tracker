'use client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  type Auth,
  type UserCredential,
  type User,
} from 'firebase/auth';
import { useFirebase } from '../provider';

export function useUser() {
  const { auth, user, loading } = useFirebase();

  if (!auth) {
    throw new Error('Firebase Auth has not been initialized.');
  }

  const signup = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = (): Promise<void> => {
    return signOut(auth);
  };

  const resetPassword = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = (user: User, profile: { displayName?: string, photoURL?: string }): Promise<void> => {
    return updateProfile(user, profile);
  }

  return {
    user,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile
  };
}
