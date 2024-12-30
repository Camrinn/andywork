import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white py-8">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Handy Andy</h1>
        <div className="space-x-4">
        <Link
            to="/"
            className="text-white hover:underline"
          >
            Home
          </Link>
        <Link
            to="/edit"
            className="text-white hover:underline"
          >
            Edit Estimate
          </Link>
          <Link
            to="/history"
            className="text-white hover:underline"
          >
            History
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
