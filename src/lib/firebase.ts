// src/lib/firebase.ts — Firebase init for the React frontend
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// same credentials as public/firebase-cfg.js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

const hasConfig = !!firebaseConfig.projectId;
const app = hasConfig ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;

// fetch site config from Firestore
export async function fetchSiteConfig(): Promise<Record<string, any> | null> {
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, 'site', 'config'));
    if (snap.exists()) return snap.data();
    return null;
  } catch (err) {
    console.warn('Firebase config fetch failed, using defaults:', err);
    return null;
  }
}
