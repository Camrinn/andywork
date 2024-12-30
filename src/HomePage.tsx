import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white">
      <div className="text-center space-y-8">
        {/* Logo */}
        <img
          src="/public/handyandy.png" // Replace with the correct path to your logo
          alt="Handy Andy LLC Logo"
          className="mx-auto h-32 w-32 object-contain" // Adjust size as needed
        />

        {/* Title */}
        <h1 className="text-4xl font-bold">Welcome to Handy Andy LLC</h1>

        {/* Subtitle */}
        <p className="text-lg font-medium">
          Manage your estimates seamlessly with just a few clicks.
        </p>

        {/* Buttons */}
        <div className="space-x-4">
          <button
            onClick={() => navigate("/edit")}
            className="py-3 px-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Edit Estimate
          </button>
          <button
            onClick={() => navigate("/estimate")}
            className="py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            View Estimate
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
