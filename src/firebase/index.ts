'use client';
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  type Auth,
} from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// App and service instances
let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

// A promise to ensure persistence is set before using auth.
let persistenceInitialized = false;
let persistencePromise: Promise<void> | null = null;


function initializeFirebase(): {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  if (!getApps().length) {
    try {
      firebaseApp = initializeApp(firebaseConfig);
    } catch (error) {
      console.error('Failed to initialize Firebase', error);
      // Handle the error appropriately
      throw new Error('Firebase initialization failed');
    }
  } else {
    firebaseApp = getApp();
  }
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);

  if (!persistenceInitialized) {
    persistencePromise = setPersistence(auth, browserLocalPersistence).then(() => {
      persistenceInitialized = true;
    }).catch((error) => {
      console.error("Firebase persistence error:", error);
    });
  }

  return { firebaseApp, auth, firestore };
}


export async function getInitializedFirebase() {
  if (!persistenceInitialized && persistencePromise) {
    await persistencePromise;
  }
  return initializeFirebase();
}


export { initializeFirebase };
export * from './provider';
export * from './auth/use-user';