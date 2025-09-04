/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Upload, Zap, Check, Plus, ShoppingCart } from "lucide-react";

const PharmacyOrder = ({ onUploadSubmit, onCartSubmit }) => {
  const [mode, setMode] = useState("upload"); // "upload" or "select"
  const [prescription, setPrescription] = useState(null);
  const [description, setDescription] = useState("");
  const [medicineList, setMedicineList] = useState([]); // selected medicines
  const [searchTerm, setSearchTerm] = useState("");

  // handle prescription upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setPrescription(file);
    } else {
      alert("File must be less than 5MB (JPG, PNG, PDF)");
    }
  };

  // handle medicine add
  const handleAddMedicine = () => {
    if (searchTerm.trim() === "") return;
    setMedicineList([...medicineList, searchTerm]);
    setSearchTerm("");
  };

  const handleRemoveMedicine = (index) => {
    setMedicineList(medicineList.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Zap className="w-6 h-6 text-blue-600" />
        Order Medicines
      </h3>

      {/* Mode Switch */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            mode === "upload"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
          onClick={() => setMode("upload")}
        >
          Upload Prescription
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            mode === "select"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
          onClick={() => setMode("select")}
        >
          Select Medicines
        </button>
      </div>

      {/* Upload Flow */}
      {mode === "upload" && (
        <div>
          <label className="block mb-3 font-medium text-gray-700">
            Upload Your Prescription
          </label>
          <div className="relative group">
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300">
              <input
                type="file"
                className="hidden"
                id="prescription"
                onChange={handleFileChange}
              />
              <label
                htmlFor="prescription"
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <span className="font-medium text-gray-700 mb-1">
                  Click to Upload Prescription
                </span>
                <span className="text-sm text-gray-500">
                  JPG, PNG, PDF (Max 5MB)
                </span>
              </label>
            </div>
            {prescription && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Uploaded: {prescription.name}
                  </span>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => onUploadSubmit(prescription)}
            disabled={!prescription}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            Continue with Prescription
          </button>
        </div>
      )}

      {/* Select Medicines Flow */}
      {mode === "select" && (
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Search and Add Medicines
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter medicine name"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <button
              onClick={handleAddMedicine}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* List of added medicines */}
          {medicineList.length > 0 && (
            <div className="mt-4 space-y-2">
              {medicineList.map((med, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-white p-3 rounded-lg border"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {med}
                  </span>
                  <button
                    onClick={() => handleRemoveMedicine(idx)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => onCartSubmit(medicineList)}
            disabled={medicineList.length === 0}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default PharmacyOrder;
