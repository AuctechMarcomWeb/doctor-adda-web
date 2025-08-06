
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import {
  Calendar,
  Clock,
  Phone,
  MapPin,
  User,
  CreditCard,
  CheckCircle,
  Timer,
} from "lucide-react";
import { getRequest } from "../Helpers";

const AppointmentFlow = ({ open, onClose, id }) => {
  const [clinicData, setClinicData] = useState(null);
   const [doctor, setDoctor] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedFor, setSelectedFor] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
   const selectedClinic = clinicData || {};

 

  const handleClose = () => {
    setStep(1);
    onClose();
  };

   useEffect(() => {
      window.scrollTo(0, 0);
      getRequest(`doctor/${id}`)
        .then((res) => {
          const doc = res?.data?.data;
          setDoctor(doc);
          setClinicData(doc?.clinics?.[0]);
          setSelectedDate(doc?.clinics?.[0]?.availability[0]?.date);
          setSelectedDateData(doc?.clinics?.[0]?.availability[0]);
        
          
        })
        .catch((error) => {
          console.log("error", error);
        });
    }, [id]);

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Centered Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <Dialog.Panel className="bg-white p-5 sm:p-6 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg">
          {/* Step 1: Who for */}
          {step === 1 && (
            <>
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
                Who is this appointment for?
              </Dialog.Title>

              <div className="space-y-4">
                {["self", "other"].map((option) => (
                  <button
                    key={option}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 font-medium text-sm sm:text-base ${
                      selectedFor === option
                        ? "bg-blue-100 border-blue-600 text-blue-800"
                        : "border-gray-300 hover:bg-blue-50 hover:border-blue-600 text-gray-700"
                    }`}
                    onClick={() => setSelectedFor(option)}
                  >
                    {option === "self" ? "Self" : "Other"}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedFor}
                  className={`w-full px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    selectedFor
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <>
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
                Choose Payment Method
              </Dialog.Title>

              <div className="space-y-4">
                {[
                  { id: "online", label: "💳 Pay Online" },
                  { id: "clinic", label: "🏥 Pay at Clinic" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedPayment(id)}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 font-medium text-sm sm:text-base ${
                      selectedPayment === id
                        ? "bg-blue-100 border-blue-600 text-blue-800"
                        : "border-gray-300 hover:bg-blue-50 hover:border-blue-600 text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedPayment}
                  className={`w-full px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    selectedPayment
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <>
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
                Confirm Appointment
              </Dialog.Title>

              <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
                Are you sure you want to book this clinic visit?
              </p>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  Yes, Book
                </button>
              </div>
            </>
          )}

          {/* Step 4: Final Appointment Details */}
          {step === 4 && (
            <>
              <Dialog.Title className="text-2xl font-bold text-center text-green-700 mb-8">
                My Appointment
              </Dialog.Title>

              {/* Status */}
              <div className="bg-red-50 border border-red-200 text-red-600 font-semibold text-sm rounded-xl px-4 py-2 mb-6 shadow-sm text-center">
                ⏳  Awaiting Confirmation
              </div>

              {/* Doctor Info */}
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                <div className="flex items-center gap-4 sm:gap-5">
                  <img
                    src="https://i.pinimg.com/736x/92/eb/b8/92ebb8868a7d96bb48184758f0a76e9f.jpg"
                    alt="Doctor"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      {doctor?.fullName}
                    </h3>
                     {doctor?.clinics?.map((clinic, index) => (
                    <p className="text-sm text-gray-500"> {selectedClinic.clinicAddress}</p>
                     ))}
                  </div>
                </div>
              </div>

              {/* Appointment Time */}
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                <h4 className="text-base font-semibold text-gray-800 mb-4">
                  Scheduled Appointment
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  Appointment ID:{" "}
                  <span className="font-semibold text-gray-700">
                    APT-73673
                  </span>
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <strong>Wednesday, 06 Aug 2025</strong>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <strong>03:50 PM - 04:25 PM</strong>
                </div>
                <span className="inline-block mt-4 px-4 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                  MYSELF
                </span>
              </div>

              {/* Patient Info */}
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                <h4 className="text-base font-semibold text-gray-800 mb-4">
                  Patient Information
                </h4>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    <strong>Name:</strong> Abhishek Yadav
                  </p>
                  <p>
                    <strong>Gender:</strong> Male
                  </p>
                  <p>
                    <strong>Contact:</strong> 8707767805
                  </p>
                </div>
              </div>

              {/* Fee */}
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                <div className="flex justify-between items-center text-base">
                  <span className="flex items-center gap-2 text-blue-700 font-medium">
                      <CreditCard className="w-5 h-5" /> Consultation Fee
                  </span>
                  <span className="font-semibold text-blue-700 text-lg">
                    ₹500
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-between text-sm text-blue-700 font-medium">
                <button
                  onClick={() => alert("Calling clinic...")}
                  className="hover:underline hover:text-blue-800 transition-all flex items-center  gap-2"
                >
                    <Phone className="w-4 h-4" /> Call Clinic
                </button>
                <button
                  onClick={() => alert("Opening map...")}
                  className="hover:underline hover:text-blue-800 transition-all flex items-center  gap-2"
                >
                  <MapPin className="w-4 h-4" /> Get Location
                </button>
              </div>

              {/* Continue */}
              <div className="mt-8">
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base rounded-full transition-all duration-200"
                >
                  Go to Appointments →
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
