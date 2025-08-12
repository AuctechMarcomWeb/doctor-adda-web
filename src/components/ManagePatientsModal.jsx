import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Edit, Trash2, Plus } from "lucide-react";
import AddPatientModal from "./AddPatientModal";

const ManagePatientsModal = ({ isOpen, onClose, setOtherPatientDetails }) => {
  const [patients, setPatients] = useState([]);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

  const handleAddOtherPatient = (newPatient) => {
    const updatedList = [...patients, { id: Date.now(), ...newPatient }];
    setPatients(updatedList);

    if (typeof setOtherPatientDetails === "function") {
      setOtherPatientDetails(newPatient);
    } else {
      console.warn(
        "setOtherPatientDetails is not a function",
        setOtherPatientDetails
      );
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <Dialog.Title className="text-xl font-bold mb-4">
              Manage Patients
            </Dialog.Title>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-600">
                      Age: {patient.age} years • Gender: {patient.gender} •
                      Contact: {patient.number} • Weight: {patient.weight} kg
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      onClick={() =>
                        setPatients((prev) =>
                          prev.filter((p) => p.id !== patient.id)
                        )
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {patients.length === 0 && (
                <p className="text-center text-gray-500">
                  No patients added yet.
                </p>
              )}
            </div>

            <button
              onClick={() => setIsAddPatientOpen(true)}
              className="mt-4 flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700"
            >
              <Plus size={16} /> Add Patient
            </button>

            <div className="mt-4 text-right">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <AddPatientModal
        isOpen={isAddPatientOpen}
        onClose={() => setIsAddPatientOpen(false)}
        onSave={handleAddOtherPatient}
      />
    </>
  );
};

export default ManagePatientsModal;
