import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setUser, clearUser } from "./features/authSlice";
import StyledLoginPage from "./components/StyledLogin";
import ProjectCostLayout from "./components/ProjectCostLayout";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import './App.css'

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [authLoading, setAuthLoading] = useState(true);
  const [delayComplete, setDelayComplete] = useState(false);

  // Simulate minimum 3 seconds delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser(firebaseUser));
      } else {
        dispatch(clearUser());
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (authLoading || !delayComplete) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StyledLoginPage />} />
        <Route
          path="/dashboard"
          element={user ? <ProjectCostLayout /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
