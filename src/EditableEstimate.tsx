import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ClientData {
  date: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  jobLocation: string;
  workDetails: string[];
  workMaterials: string[];
  totalCost: string;
}

const EditableEstimate: React.FC = () => {
  const location = useLocation();
  const clientData = location.state?.clientData as ClientData;
  const formRef = useRef<HTMLDivElement>(null);

  const handleSaveAsPDF = async () => {
    if (formRef.current) {
      const buttons = formRef.current.querySelectorAll<HTMLButtonElement>(".no-pdf");
      buttons.forEach((button) => {
        button.style.display = "none";
      });

      try {
        const canvas = await html2canvas(formRef.current, {
          backgroundColor: "#ffffff",
          scale: 2,
          useCORS: true,
          logging: false,
        });
        
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 20;

        pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save("Estimate.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }

      buttons.forEach((button) => {
        button.style.display = "block";
      });
    }
  };

  if (!clientData) {
    return <p>No client data provided. Please go back and fill in the details.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div
        ref={formRef}
        style={{
          width: "8.5in",
          minHeight: "11in",
          padding: "1in",
          margin: "auto",
          backgroundColor: "#ffffff",
          boxSizing: "border-box",
        }}
        className="shadow-lg"
      >
        {/* Header with ESTIMATE title */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">ESTIMATE</h1>
        </div>

        {/* Date and Logo Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <p>Date: {clientData.date}</p>
          </div>
          <div className="w-32 h-32">
            <img
              src="/handyandy.png"
              alt="Handy Andy LLC"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Client Info and Company Info in two columns */}
        <div className="flex justify-between mb-8">
          <div>
            <p className="font-normal">{clientData.clientName}</p>
            <p className="text-sm">Email: {clientData.clientEmail}</p>
            <p className="text-sm">Phone: {clientData.clientPhone}</p>
            <p className="mt-4">Job Location:</p>
            <p>{clientData.jobLocation}</p>
          </div>
          <div className="text-right">
            <p>Handy Andy LLC</p>
            <p>2113 S. Hicks Street</p>
            <p>Philadelphia PA 19145</p>
            <p>Phone: 267-252-4320</p>
            <p>Email: handygonz215@gmail.com</p>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="border-b border-black mb-6"></div>

        {/* Dear Client Section */}
        <div className="mb-6">
          <p>Dear {clientData.clientName.split(' ')[0]},</p>
          <p className="mt-4">
            Please see quotation below for the work discussed. Do reach out via phone or email
            with any questions you may have.
          </p>
        </div>

        {/* Work Details */}
        <div className="mb-8">
            <p>Labor:</p>
          <ul className="list-none space-y-2">
            {clientData.workDetails.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        {/* Materials Cost */}
        <div className="mb-8">
            <p>Materials:</p>
          <ul className="list-none space-y-2">
            {clientData.workMaterials.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        {/* Cost Section */}
        <div className="mb-8">
          <div className="flex justify-between">
            <p>Labor & Materials</p>
            <p>{clientData.totalCost}</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="font-bold">Total:</p>
            <p className="font-bold">{clientData.totalCost}</p>
          </div>
        </div>

        {/* Price Quote Note */}
        <div className="text-center mb-8 border border-black p-2">
          <p className="text-sm">
            Prices quoted are valid for 30 days from the initial date stated on this estimate.
          </p>
        </div>

        {/* Signature Section */}
        <div className="mt-12">
          <div className="flex justify-between">
            <div className="flex-1">
              <div className="border-b border-black"></div>
              <p className="mt-1">Client Signature</p>
            </div>
            <div className="w-24"></div>
            <div className="flex-1">
              <div className="border-b border-black"></div>
              <p className="mt-1">Date</p>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <div className="flex-1">
              <div className="border-b border-black"></div>
              <p className="mt-1">Contractor Signature</p>
            </div>
            <div className="w-24"></div>
            <div className="flex-1">
              <div className="border-b border-black"></div>
              <p className="mt-1">Date</p>
            </div>
          </div>
        </div>

        {/* PDF Button */}
        <button
          onClick={handleSaveAsPDF}
          className="mt-8 w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 no-pdf"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default EditableEstimate;