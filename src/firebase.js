import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDstU60BMiEifvafRIsHbQ8S6_ZPC0bI3A",
  authDomain: "project-cost-tracker-9cdb3.firebaseapp.com",
  projectId: "project-cost-tracker-9cdb3",
  storageBucket: "project-cost-tracker-9cdb3.firebasestorage.app",
  messagingSenderId: "812075330289",
  appId: "1:812075330289:web:d6f0f00adc36c327b91750"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);