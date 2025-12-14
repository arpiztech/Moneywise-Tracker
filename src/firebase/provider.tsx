'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { getInitializedFirebase } from '.';
import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from '@/components/ui/toaster';

interface FirebaseContextValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  user: User | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  app: null,
  auth: null,
  db: null,
  user: null,
  loading: true,
});

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [db, setDb] = useState<Firestore | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const { firebaseApp, auth, firestore } = await getInitializedFirebase();
        setApp(firebaseApp);
        setAuth(auth);
        setDb(firestore);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("FirebaseProvider initialization error:", error);
        setLoading(false);
      }
    };
    
    init();

  }, []);

  const value = useMemo(
    () => ({ app, auth, db, user, loading }),
    [app, auth, db, user, loading]
  );

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
      <Toaster />
    </FirebaseContext.Provider>
  );
}