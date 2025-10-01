import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

// Detect environment mode
const envMode = process.env.NEXT_PUBLIC_ENV
const isEnvLocal = envMode !== "local";

const firebaseConfig = {
    apiKey: isEnvLocal
        ? "AIzaSyCZZLJIf2k_ns95cYQIRKxnGa7DSSHRi18"
        : "AIzaSyCqGhZPEpKftylPghxr2zv2OlibyaMbgqU",
    authDomain: isEnvLocal
        ? "fc-pos.firebaseapp.com"
        : "reactcrud-3727c.firebaseapp.com",
    databaseURL: isEnvLocal
        ? "https://fc-pos-default-rtdb.firebaseio.com"
        : "https://reactcrud-3727c.firebaseio.com",
    projectId: isEnvLocal
        ? "fc-pos" : "reactcrud-3727c",
    storageBucket: isEnvLocal
        ? "fc-pos.appspot.com"
        : "reactcrud-3727c.appspot.com",
    messagingSenderId: isEnvLocal
        ? "449131243075" : "156098307367",
    appId: isEnvLocal
        ? "1:449131243075:web:9ca95c914dd683e23f56f6"
        : "1:156098307367:web:bab5b6ecc5996394dcb502",
    // measurementId: "G-QRJ0Z3G5MP"
};

// Initialize Firebase app with a named instance
const app: FirebaseApp = initializeApp(firebaseConfig, 'primary');

// Get Realtime Database instance
const db: Database = getDatabase(app);

export default db;
