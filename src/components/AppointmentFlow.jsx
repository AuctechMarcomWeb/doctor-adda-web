
import React from "react";
import { MessageCircle } from "lucide-react";
import { AppointmentDateFormat } from "../Utils";

const AppointmentFlow = ({
  step,
  setStep,
  doctor,
  clinicData,
  selectedDate,
  selectedSlot,
}) => {
  return (
    step > 0 && (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-6 relative">
          {/* Close Button */}
          <button
            onClick={() => setStep(0)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>

          {/* Step 1: Who is this appointment for */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Who is this appointment for?
              </h2>
              <div className="flex flex-col gap-3">
                <button
                  className="py-3 px-4 rounded-xl bg-blue-100 hover:bg-blue-200 font-medium"
                  onClick={() => setStep(2)}
                >
                  Self
                </button>
                <button
                  className="py-3 px-4 rounded-xl bg-blue-100 hover:bg-blue-200 font-medium"
                  onClick={() => setStep(2)}
                >
                  Other
                </button>
              </div>
              <ActionButton className="w-full mt-4" onClick={() => setStep(2)}>
                Continue
              </ActionButton>
            </>
          )}

          {/* Step 2: Choose Payment Method */}
          {step === 2 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Choose Payment Method
              </h2>
              <div className="flex flex-col gap-3">
                <button
                  className="py-3 px-4 rounded-xl bg-green-100 hover:bg-green-200 font-medium"
                  onClick={() => setStep(3)}
                >
                  Pay Online
                </button>
                <button
                  className="py-3 px-4 rounded-xl bg-yellow-100 hover:bg-yellow-200 font-medium"
                  onClick={() => setStep(3)}
                >
                  Pay at Clinic
                </button>
              </div>
              <div className="flex justify-between gap-4 mt-4">
                <button
                  className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded-xl font-bold hover:bg-gray-400"
                  onClick={() => setStep(0)}
                >
                  Cancel
                </button>
                <ActionButton className="w-1/2" onClick={() => setStep(3)}>
                  Continue
                </ActionButton>
              </div>
            </>
          )}

          {/* Step 3: Confirm Appointment */}
          {step === 3 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Confirm Appointment
              </h2>
              <p className="text-gray-600 mb-6">
                Do you want to confirm this appointment?
              </p>
              <div className="flex justify-between gap-4">
                <button
                  className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded-xl font-bold hover:bg-gray-400"
                  onClick={() => setStep(0)}
                >
                  Cancel
                </button>
                <ActionButton className="w-1/2" onClick={() => setStep(4)}>
                  Yes, Book
                </ActionButton>
              </div>
            </>
          )}

          {/* Step 4: Appointment Details */}
          {step === 4 && (
            <>
              <h2 className="text-xl font-bold text-green-600 mb-4">
                Appointment Confirmed 🎉
              </h2>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong>Doctor:</strong> {doctor?.fullName}
                </p>
                <p>
                  <strong>Clinic:</strong> {clinicData?.clinicName}
                </p>
                <p>
                  <strong>Date:</strong> {AppointmentDateFormat(selectedDate)}
                </p>
                <p>
                  <strong>Time Slot:</strong> {selectedSlot}
                </p>
                <p>
                  <strong>Fee:</strong> ₹{clinicData?.consultationFee}
                </p>
              </div>
              <ActionButton className="w-full mt-4" onClick={() => setStep(0)}>
                Close
              </ActionButton>
            </>
          )}
        </div>
        
      </div>
    )
  );
};

export default AppointmentFlow;
