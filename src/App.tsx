import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import EditClientDetails from "./EditClientDetails";
import EditableEstimate from "./EditableEstimate";
import EstimateHistory from "./EstimateHistory";
import PasswordPage from "./PasswordPage";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Password Page (Unprotected) */}
        <Route path="/password" element={<PasswordPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <EditClientDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estimate"
          element={
            <ProtectedRoute>
              <EditableEstimate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <EstimateHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
