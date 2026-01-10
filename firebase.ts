import * as firebaseApp from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBYVG0MDiXU5MYsnzKh__-yPoV-Mj6Up9Y",
  authDomain: "sales-helpbook.firebaseapp.com",
  projectId: "sales-helpbook",
  storageBucket: "sales-helpbook.firebasestorage.app",
  messagingSenderId: "279176649332",
  appId: "1:279176649332:web:18b08be3a38d34bd284f21",
  measurementId: "G-KFLD5M3HDM"
};

// Initialize Firebase
const app = firebaseApp.initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);