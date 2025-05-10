import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBMtj57Qm-IFxWC4hqnkuwfjKiKYeH-kug",
  authDomain: "student-dashboard-5cb0e.firebaseapp.com",
  projectId: "student-dashboard-5cb0e",
  storageBucket: "student-dashboard-5cb0e.firebasestorage.app",
  messagingSenderId: "749249125418",
  appId: "1:749249125418:web:5b6e8b58d4bf7beb027753"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
