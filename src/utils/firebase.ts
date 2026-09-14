import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  projectId: "directed-truck-449711-g4",
  appId: "1:493861483579:web:a3cf69657631e035bf581e",
  apiKey: "AIzaSyAKzsrciYv6yaHKdDioJ408BhvGJTOQ4jw",
  authDomain: "directed-truck-449711-g4.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-ourlittlelovesto-520d24c2-80db-4277-8720-b466680a91e7",
  storageBucket: "directed-truck-449711-g4.firebasestorage.app",
  messagingSenderId: "493861483579",
  oAuthClientId: "493861483579-9d697sjegl4qk15d24pj13v3kqsrohrm.apps.googleusercontent.com",
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore with custom databaseId if present
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
