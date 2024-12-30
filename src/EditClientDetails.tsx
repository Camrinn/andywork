import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditClientDetails: React.FC = () => {
  const navigate = useNavigate();

  const [clientData, setClientData] = useState({
    date: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    jobLocation: "",
    workDetails: [
      "",
      "",
      "",
    ],
    workMaterials: [
        "",
        "",
        "",
      ],
    totalCost: "$",
  });

  // Handle changes for inputs (non-array fields)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for individual work details
  const handleWorkDetailChange = (index: number, value: string) => {
    setClientData((prev) => {
      const updatedWorkDetails = [...prev.workDetails];
      updatedWorkDetails[index] = value;
      return { ...prev, workDetails: updatedWorkDetails };
    });
  };

  // Handle changes for individual work details
  const handleWorkMaterialChange = (index: number, value: string) => {
    setClientData((prev) => {
      const updatedWorkMaterials = [...prev.workMaterials];
      updatedWorkMaterials[index] = value;
      return { ...prev, workMaterials: updatedWorkMaterials };
    });
  };

  // Add a new work detail
  const handleAddWorkDetail = () => {
    setClientData((prev) => ({
      ...prev,
      workDetails: [...prev.workDetails, ""], // Add an empty string for a new detail
    }));
  };

  // Remove a work detail
  const handleRemoveWorkDetail = (index: number) => {
    setClientData((prev) => {
      const updatedWorkDetails = prev.workDetails.filter((_, i) => i !== index);
      return { ...prev, workDetails: updatedWorkDetails };
    });
  };

  // Add a material detail
  const handleAddWorkMaterials = () => {
    setClientData((prev) => ({
      ...prev,
      workMaterials: [...prev.workMaterials, ""], // Add an empty string for a new detail
    }));
  };

  // Remove a material detail
  const handleRemoveWorkMaterial = (index: number) => {
    setClientData((prev) => {
      const updatedWorkMaterials = prev.workMaterials.filter((_, i) => i !== index);
      return { ...prev, workDetails: updatedWorkMaterials };
    });
  };
  

  // Save the client data to Local Storage for history and navigate to the estimate page
  const handleSave = () => {
    // Retrieve existing estimates from local storage
    const existingEstimates = JSON.parse(localStorage.getItem("estimates") || "[]");

    // Add the current estimate to the array
    const updatedEstimates = [...existingEstimates, clientData];

    // Save the updated array to local storage
    localStorage.setItem("estimates", JSON.stringify(updatedEstimates));

    // Navigate to the estimate view page
    navigate("/estimate", { state: { clientData } });
  };

  return (
    <div className="p-8 mt-8 mx-auto max-w-xl border border-gray-300 rounded bg-white shadow text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Edit Client Details</h1>

      <label className="block font-bold mb-1">Date:</label>
      <input
        type="text"
        name="date"
        value={clientData.date}
        onChange={handleChange}
        className="block w-full mb-4 p-2 border rounded"
      />

      <label className="block font-bold mb-1">Client Name:</label>
      <input
        type="text"
        name="clientName"
        value={clientData.clientName}
        onChange={handleChange}
        className="block w-full mb-4 p-2 border rounded"
      />

      <label className="block font-bold mb-1">Client Email:</label>
      <input
        type="email"
        name="clientEmail"
        value={clientData.clientEmail}
        onChange={handleChange}
        className="block w-full mb-4 p-2 border rounded"
      />

      <label className="block font-bold mb-1">Client Phone:</label>
      <input
        type="tel"
        name="clientPhone"
        value={clientData.clientPhone}
        onChange={handleChange}
        className="block w-full mb-4 p-2 border rounded"
      />

      <label className="block font-bold mb-1">Job Location:</label>
      <input
        type="text"
        name="jobLocation"
        value={clientData.jobLocation}
        onChange={handleChange}
        className="block w-full mb-4 p-2 border rounded"
      />

      {/* Editable Work Details */}
      <label className="block font-bold mb-1">Work Details:</label>
      <ul className="mb-4">
        {clientData.workDetails.map((detail, index) => (
          <li key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={detail}
              onChange={(e) => handleWorkDetailChange(index, e.target.value)}
              className="block w-full p-2 border rounded mr-2"
            />
            <button
              onClick={() => handleRemoveWorkDetail(index)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddWorkDetail}
        className="mb-4 py-2 px-4 bg-green-600 text-white font-bold rounded hover:bg-green-700"
      >
        Add Work Detail
      </button>
    

      {/* Editable Material Details */}
      <label className="block font-bold mb-1">Material Details:</label>
      <ul className="mb-4">
        {clientData.workMaterials.map((detail, index) => (
          <li key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={detail}
              onChange={(e) => handleWorkMaterialChange(index, e.target.value)}
              className="block w-full p-2 border rounded mr-2"
            />
            <button
              onClick={() => handleRemoveWorkMaterial(index)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddWorkMaterials}
        className="mb-4 py-2 px-4 bg-green-600 text-white font-bold rounded hover:bg-green-700"
      >
        Add Material Detail
      </button>

      <label className="block font-bold mb-1">Total Cost:</label>
      <input
        type="text"
        name="totalCost"
        value={clientData.totalCost}
        onChange={handleChange}
        className="block w-full mb-4 p-2 border rounded"
      />

      <button
        onClick={handleSave}
        className="mt-6 w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
      >
        Save and View Estimate
      </button>
    </div>
  );
};

export default EditClientDetails;
