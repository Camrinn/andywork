import React, { useState, useEffect } from "react";

const EstimateHistory: React.FC = () => {
  const [estimates, setEstimates] = useState<any[]>([]);

  useEffect(() => {
    // Load estimates from local storage
    const savedEstimates = JSON.parse(localStorage.getItem("estimates") || "[]");
    setEstimates(savedEstimates);
  }, []);

  return (
    <div className="p-8 mt-6 mx-auto max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Estimate History</h1>
      {estimates.length === 0 ? (
        <p>No estimates saved yet.</p>
      ) : (
        <ul className="space-y-4">
          {estimates.map((estimate, index) => (
            <li key={index} className="p-4 border rounded shadow">
              <h2 className="text-lg font-bold">Estimate #{index + 1}</h2>
              <p><strong>Date:</strong> {estimate.date}</p>
              <p><strong>Client Name:</strong> {estimate.clientName}</p>
              <p><strong>Job Location:</strong> {estimate.jobLocation}</p>
              <p><strong>Total Cost:</strong> {estimate.totalCost}</p>
              <ul className="mt-2">
                {estimate.workDetails.map((detail: string, idx: number) => (
                  <li key={idx}>- {detail}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EstimateHistory;
