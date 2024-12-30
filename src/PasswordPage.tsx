import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcoded password check
    if (password === "Andy123") {
      localStorage.setItem("isAuthenticated", "true"); // Store authentication state
      navigate("/"); // Redirect to the homepage
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white">
      <div className="bg-white text-gray-900 p-8 rounded shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Enter Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPage;
