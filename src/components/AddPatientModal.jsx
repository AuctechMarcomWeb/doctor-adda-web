import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const AddPatientModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    number: "",
    weight: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.age) return;
    onSave(form); // direct object bhej do
    setForm({ name: "", age: "", gender: "", number: "", weight: "" }); // reset form

    onClose();
  };


  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} className="text-gray-500" />
          </button>

          {/* Title */}
          <Dialog.Title className="text-2xl font-bold mb-6 text-center text-gray-800">
            🩺 Add New Patient
          </Dialog.Title>

          {/* Form Fields */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Age"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
              />
            </div>

            <input
              type="text"
              placeholder="Gender"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            />

            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-md hover:from-green-600 hover:to-teal-600 transition"
            >
              Add Patient
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddPatientModal;
