import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const AppointmentFlow = ({ open, onClose, id }) => {
  const [step, setStep] = useState(1); // Step 1: Who for

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Centered Panel */}
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          {/* Step 1: Who is this appointment for */}
          {step === 1 && (
            <>
              <Dialog.Title className="text-lg font-medium mb-4">
                Who is this appointment for?
              </Dialog.Title>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 border rounded">Self</button>
                <button className="w-full px-4 py-2 border rounded">Other</button>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {/* Step 2: Choose payment method */}
          {step === 2 && (
            <>
              <Dialog.Title className="text-lg font-medium mb-4">
                Choose Payment Method
              </Dialog.Title>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 border rounded">
                  Pay Online
                </button>
                <button className="w-full px-4 py-2 border rounded">
                  Pay at Clinic
                </button>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {/* Step 3: Confirm Appointment */}
          {step === 3 && (
            <>
              <Dialog.Title className="text-lg font-medium mb-4">
                Confirm Appointment
              </Dialog.Title>
              <p>Are you sure you want to book this appointment?</p>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Yes, Book
                </button>
              </div>
            </>
          )}

          {/* Step 4: Appointment Details */}
          {step === 4 && (
            <>
              <Dialog.Title className="text-lg font-medium mb-4">
                Appointment Confirmed!
              </Dialog.Title>
              <div className="text-sm text-gray-700 space-y-1">
                <p>✅ Doctor ID: <strong>{id}</strong></p>
                <p>📅 Date: Tomorrow</p>
                <p>🕐 Time: 10:00 AM</p>
                <p>📍 Location: ABC Clinic</p>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AppointmentFlow;
