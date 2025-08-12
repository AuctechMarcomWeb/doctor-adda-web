import React, { useState } from "react";
import { X, User, CreditCard, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import { postRequest } from "../Helpers";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const HospitalAppointmentFlow = ({ isOpen, onClose, slotDetails,doctorType }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [appointmentFor, setAppointmentFor] = useState("self");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = useSelector((state) => state.user?.userData?.data?._id);


  console.log("slottt detailsss flow page: ",slotDetails)
  console.log("doctorType doctorType flow page: ",doctorType)

  // Helper: derive endTime from selected date/time
  const deriveSelectedSlot = () => {
    try {
      const doctor = slotDetails?.doctor;
      const availability = doctor?.availability || [];
      const targetDateIso = slotDetails?.date
        ? new Date(slotDetails?.date).toISOString().split("T")[0]
        : "";
      const day = availability.find((d) => {
        const dIso = d?.date ? new Date(d.date).toISOString().split("T")[0] : "";
        return dIso === targetDateIso;
      });
      if (!day) return null;
      const slot = day?.slots?.find((s) => s?.startTime === slotDetails?.time);
      return slot || null;
    } catch (e) {
      return null;
    }
  };

  
  

  // Dummy static data
  const dummyData = {
    doctorName: slotDetails?.name || slotDetails?.doctorId?.fullName || "Dr. John Smith",
    specialization: slotDetails?.specialization || slotDetails?.doctorId?.category?.name || "Cardiology",
    hospitalName: "CityCare Hospital",
    selectedDate: "Fri, 4 Jul",
    selectedTime: "09:00 - 09:30",
    consultationFee: "₹500",
    appointmentId: "APT" + Math.random().toString(36).substr(2, 9).toUpperCase()
  };

  const resetSteps = () => {
    setCurrentStep(1);
    setAppointmentFor("self");
    setPaymentMethod("online");
    setPatientName("");
    setPatientPhone("");
    setPatientGender("");
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetSteps();
    onClose();
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmAppointment = async () => {
    try {
      setIsSubmitting(true);
      // Build payload similar to provided CURL
      const hospitalId = slotDetails?.hospitalDetails?._id;
      const doctor = slotDetails?.doctor || {};
      const selectedSlot = deriveSelectedSlot();

      const payload = {
        hospital: hospitalId,
        doctorType: doctorType, // "Internal" | "Registered"
        // doctor id depending on type
        ...(doctorType === "Internal"
          ? { internalDoctorId: doctor?._id }
          : { registeredDoctorId: doctor?._id }),
        patientId: userId,
        fee: 500,
        isSelf: appointmentFor === "self",
        ...(appointmentFor === "other"
          ? {
              otherPatientDetails: {
                name: patientName || "",
                age: "",
                gender: patientGender || "",
                type: "Relative",
              },
            }
          : {}),
        date: slotDetails?.date ? new Date(slotDetails.date).toISOString() : new Date().toISOString(),
        slots: {
          startTime: slotDetails?.time || selectedSlot?.startTime || "",
          endTime: selectedSlot?.endTime || "",
        },
      };

      const res = await postRequest({ url: `hospitalAppointment/add`, cred: payload });
      console.log("Hospital appointment booked:", res);
      setCurrentStep(4);
    } catch (error) {
      console.error("Appointment booking failed:", error);
      toast.error(error?.response?.data?.message || "Failed to book appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const renderStep1 = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
        <User className="w-8 h-8 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Who is this appointment for?</h2>
      
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setAppointmentFor("self")}
          className={`px-6 py-3 rounded-full font-medium transition-all ${
            appointmentFor === "self"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Self
        </button>
        <button
          onClick={() => setAppointmentFor("other")}
          className={`px-6 py-3 rounded-full font-medium transition-all ${
            appointmentFor === "other"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Other
        </button>
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
      >
        Continue as {appointmentFor === "self" ? "Self" : "Other"}
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Choose payment method</h2>
      </div>

      <div className="space-y-4">
        <div
          onClick={() => setPaymentMethod("online")}
          className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
            paymentMethod === "online"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Pay Online</h3>
              <p className="text-sm text-gray-600">Secure payment gateway</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => setPaymentMethod("clinic")}
          className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
            paymentMethod === "clinic"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Pay at Clinic</h3>
              <p className="text-sm text-gray-600">Pay when you visit</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-800">
            We adhere entirely to the data security standards of the payment card industry.
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePrevious}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center space-y-6">
      {/* Illustration */}
      <div className="w-48 h-32 mx-auto mb-4">
        <div className="relative w-full h-full">
          {/* Background shape */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl"></div>
          
          {/* Woman figure */}
          <div className="absolute left-4 top-8 w-8 h-16">
            <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
            <div className="w-8 h-10 bg-blue-500 rounded-t-full mt-1"></div>
          </div>
          
          {/* Smartphone */}
          <div className="absolute left-16 top-4 w-12 h-20 bg-blue-500 rounded-lg">
            <div className="w-10 h-16 bg-white rounded-sm mx-auto mt-1">
              <div className="w-8 h-3 bg-blue-200 rounded mx-auto mt-1"></div>
              <div className="w-6 h-2 bg-blue-400 rounded mx-auto mt-1 text-xs text-white text-center">Mon 9:30</div>
            </div>
          </div>
          
          {/* Clock */}
          <div className="absolute right-6 top-6 w-8 h-8 bg-blue-200 rounded-full">
            <div className="w-1 h-3 bg-blue-600 mx-auto mt-1"></div>
            <div className="w-3 h-1 bg-blue-600 mx-auto mt-1"></div>
          </div>
          
          {/* Plants */}
          <div className="absolute right-4 bottom-2 w-6 h-4 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-1 left-2 right-2 h-2 bg-amber-800 rounded-full"></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900">Confirm Appointment</h2>
      <p className="text-gray-600">Are you sure you want to book this clinic visit?</p>

      <div className="flex gap-4">
        <button
          onClick={handlePrevious}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmAppointment}
          disabled={isSubmitting}
          className={`flex-1 ${isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} text-white py-3 rounded-xl font-medium transition-colors`}
        >
          {isSubmitting ? "Booking..." : "Yes, Book"}
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-600">My Appointment</h2>
      </div>

      {/* Status Banner */}
      <div className="bg-red-100 rounded-lg p-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-red-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
          <span className="text-red-600 font-medium">Awaiting Confirmation</span>
        </div>
      </div>

      {/* Diagnostic Lab Information Card */}
      <div className="bg-white rounded-lg shadow-sm p-4 border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full border-2 border-green-200 flex items-center justify-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-black">City Lab Diagnostics</h3>
            <p className="text-sm text-gray-600">123 Lab Street, Health City</p>
          </div>
        </div>
      </div>

      {/* Scheduled Appointment Card */}
      <div className="bg-white rounded-lg shadow-sm p-4 border">
        <h3 className="font-bold text-black mb-3">Scheduled Appointment</h3>
        <div className="space-y-2">
          <p className="text-sm text-black">Appointment ID: N/A</p>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
            <span className="text-sm text-black">Fri, 4 Jul</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
            <span className="text-sm text-black">09:00 - 09:30</span>
          </div>
        </div>
        <div className="mt-3">
          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">SELF</span>
        </div>
      </div>

      {/* Patient Information Card */}
      <div className="bg-white rounded-lg shadow-sm p-4 border">
        <h3 className="font-bold text-black mb-3">Patient Information</h3>
        <div className="space-y-2 text-sm text-black">
          <p>Name: faiz ahmad</p>
          <p>Gender: male</p>
          <p>Contact: 9999999999</p>
        </div>
      </div>

      {/* Consultation Fee Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded"></div>
            <span className="text-blue-600">Consultation Fee</span>
          </div>
          <span className="font-bold text-blue-600">₹300</span>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button className="flex-1 flex items-center justify-center gap-2 text-blue-600 py-3">
          <div className="w-5 h-5 border-2 border-blue-500 rounded"></div>
          <span>Call Diagnostic</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 text-blue-600 py-3">
          <div className="w-5 h-5 border-2 border-blue-500 rounded"></div>
          <span>Get Location</span>
        </button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Step Content */}
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default HospitalAppointmentFlow; 