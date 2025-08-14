/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Calendar, Clock, Phone, MapPin, CreditCard } from "lucide-react";
import { getRequest, postRequest } from "../Helpers";
import { useSelector } from "react-redux";
import { AppointmentDateFormat } from "../Utils";
import toast from "react-hot-toast";

const DiagonsticsAppointmentFlow = ({
  open,
  onClose,
  id,
  appointmentData,
  otherPatientDetails = [],
  setOtherPatientDetails,
  onOpenManagePatients = () => {},
}) => {
  const [diagnostics, setDiagnostics] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedFor, setSelectedFor] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const userProfileData = useSelector((state) => state.user.userProfileData);
  const UserId = userProfileData?._id;
  console.log("UserId", UserId);
  console.log("userProfileData:", userProfileData);

  const [patients, setPatients] = useState([]);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const otherPatients = patients.length > 0 ? patients : otherPatientDetails;

  // Extract appointment data
  const { diagnostic, slots, amount, appointmentId, date } =
    appointmentData || {};

  console.log("appointmentData====>", appointmentData);

  // Show patient info based on selectedFor
  const isSelf = selectedFor === "self";
  const patientDetails = isSelf
    ? {
        name: userProfileData?.name,
        gender: userProfileData?.gender,
        phone: userProfileData?.phone,
      }
    : otherPatientDetails;

  const handleClose = () => {
    setStep(1);
    setSelectedFor(null);
    setSelectedPayment(null);
    onClose();
    // onOpenManagePatients();
  };

  const fetchDiagnosticsDetails = async () => {
    try {
      const res = await getRequest(`diagnostics/${id}`);
      setDiagnostics(res?.data?.data);
    } catch (error) {
      console.error("Error fetching diagnostics:", error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchDiagnosticsDetails();
    }
  }, [id]);

 
  const handleConfirmBooking = async () => {
    try {
          setOtherPatientDetails({ patient: selectedPatient }); // ensure UI syncs

      const res = await postRequest({
        url: `diagnosticBooking/add`,
        cred: { ...appointmentData, otherPatientDetails: { patient: selectedPatient } }
      });
      console.log("Booking success:", res?.data?.data);
      setDiagnostics(res?.data?.data?.diagnostic || null);
      setStep(4); // Success step
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error(
        error?.response?.data?.message || "Failed to book appointment"
      );
    }
  };

  useEffect(() => {
    console.log("Step changed:", step);
  }, [step]);

  const fetchPatients = async () => {
    if (!UserId) return;
    try {
      const res = await getRequest(`auth/getMembers/${UserId}`);
      console.log("Fetched patients:", res?.data?.data || []);
      setPatients(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [UserId]);

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <Dialog.Panel className="bg-white p-5 sm:p-6 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg">
          {/* Step 1: Who is this appointment for */}
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
                    onClick={() => {
                      setSelectedFor(option);
                      setSelectedPatient(null); // Reset selected patient when option changes
                    }}
                  >
                    {option === "self" ? "Self" : "Other"}
                  </button>
                ))}
              </div>

              {/* If 'Other' selected show patients list */}
              {selectedFor === "other" && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Other Patients:
                  </h4>
                  {otherPatients.length > 0 ? (
                    <ul className="space-y-2 text-sm text-gray-700 max-h-40 overflow-auto">
                      {otherPatients.map((p, i) => (
                        <li
                          key={i}
                          className={`border rounded-lg p-2 shadow-sm cursor-pointer ${
                            selectedPatient?.name === p.name
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200"
                          }`}
                          onClick={() =>{ setSelectedPatient(p);
                            setOtherPatientDetails({ patient: p }); // update parent state
                          }}
                              

                        >
                          {p.name} , {p.gender}, {p.age}{" "}
                          {p.weight ? p.weight + "yrs" : ""}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No data available</p>
                  )}
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>

                {/* Buttons logic: */}
                {selectedFor === "self" && (
                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedFor}
                    className={`w-full px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                      selectedFor
                        ? "bg-[#006fab] hover:bg-blue-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue as Self
                  </button>
                )}

                {selectedFor === "other" && (
                  <>
                    {selectedPatient ? (
                      // If patient selected, show Continue button
                      <button
                        onClick={() => setStep(2)}
                        className="w-full px-4 py-3 bg-[#006fab] hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
                      >
                        Continue as Other
                      </button>
                    ) : (
                      // No patient selected, show Manage Patients button
                      <button
                        onClick={() => {
                          onClose();
                          onOpenManagePatients();
                        }}
                        className="w-full px-4 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-200 hover:bg-gray-400"
                      >
                        Manage Patients
                      </button>
                    )}
                  </>
                )}
              </div>
            </>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <>
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
                Choose Payment Method
              </Dialog.Title>

              <div className="space-y-4">
                {[
                  { id: "online", label: "💳 Pay Online" },
                  { id: "diagonstics", label: "🏥 Pay at Diagnostics" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedPayment(id)}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm transition-all font-medium text-sm sm:text-base ${
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
                  onClick={() => {
                    if (selectedPayment === "diagonstics") {
                      setStep(3); // Diagnostics payment → directly go to step 3
                    } else if (selectedPayment === "online") {
                      console.log("Pay Online");
                      alert("Redirecting to Online Payment");
                      // Yaha payment gateway ka code aa sakta hai
                    }
                  }}
                  disabled={!selectedPayment}
                  className={`w-full px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    selectedPayment
                      ? "bg-[#006fab] hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <>
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
                Confirm Appointment
              </Dialog.Title>

              <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
                Are you sure you want to book this diagonstics visit?
              </p>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
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

              <div className="bg-red-50 border border-red-200 text-red-600 font-semibold text-sm rounded-xl px-4 py-2 mb-6 text-center">
                ⏳ Awaiting Confirmation
              </div>

              {/* Diagnostic Info */}
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                <div className="flex items-center gap-4 sm:gap-5">
                  <img
                    src={diagnostics?.profileImage}
                    alt="Diagnostic"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      {diagnostics?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {diagnostics?.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Appointment Time */}
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                <h4 className="text-base font-semibold text-gray-800 mb-4">
                  Scheduled Appointment
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  Appointment ID:
                  <strong className="text-gray-700">
                    {appointmentId || "N/A"}
                  </strong>
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <strong>{AppointmentDateFormat(date) || "N/A"}</strong>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <strong>
                    {slots?.startTime || "N/A"} - {slots?.endTime || "N/A"}
                  </strong>
                </div>
                <span className="inline-block mt-4 px-4 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                  {selectedFor?.toUpperCase() || "MYSELF"}
                </span>
              </div>

              {/* Patient Info */}
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6 w-full max-w-md mx-auto">
  <h4 className="text-base  font-semibold text-gray-800 mb-4">
    Patient Information
  </h4>

  <div className="space-y-1 text-sm text-gray-700">
    <p className="flex flex-wrap">
      <strong className="mr-1">Name:</strong>
      <span>
        {otherPatientDetails?.patient?.name ||
          patientDetails?.name ||
          "N/A"}
      </span>
    </p>
    <p className="flex flex-wrap">
      <strong className="mr-1">Gender:</strong>
      <span>
        {otherPatientDetails?.patient?.gender ||
          patientDetails?.gender ||
          "N/A"}
      </span>
    </p>
    <p className="flex flex-wrap">
      <strong className="mr-1">Contact:</strong>
      <span>
        {otherPatientDetails?.patient?.phone ||
          patientDetails?.phone ||
          "N/A"}
      </span>
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
                    ₹{amount || "N/A"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-between text-sm text-blue-700 font-medium">
                <button
                  onClick={() => alert("Calling clinic...")}
                  className="hover:underline hover:text-blue-800 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Call Diagnostic
                </button>
                <button
                  onClick={() => alert("Opening map...")}
                  className="hover:underline hover:text-blue-800 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" /> Get Location
                </button>
              </div>

              {/* Final CTA */}
              <div className="mt-8">
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base rounded-full"
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

export default DiagonsticsAppointmentFlow;
