import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import EditableEstimate from "./EditableEstimate";
import EditClientDetails from "./EditClientDetails";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<EditClientDetails />} />
          <Route path="/estimate" element={<EditableEstimate />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
