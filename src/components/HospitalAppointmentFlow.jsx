import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { getRequest, postRequest } from "../Helpers";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const HospitalAppointmentFlow = ({ open, onClose, slotDetails, doctorType }) => {
  const [step, setStep] = useState(1);
  const [selectedFor, setSelectedFor] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentConfirmData, setAppointmentConfirmData] = useState("");
  const [otherpatients, setOtherpatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  console.log("  selectedPatient ======", selectedPatient)

  const { userProfileData } = useSelector((state) => state.user);
  const userId = userProfileData?._id;
  console.log("  userId   :", userId)
  const navigate = useNavigate();

  // console.log("slottt detailsss flow page: ", slotDetails);
  // console.log("doctorType doctorType flow page: ", doctorType);
  // console.log("appointmentConfirmData ==", appointmentConfirmData);

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

  // Helper formatters for display labels
  const formatDateLabel = (dateIsoString) => {
    if (!dateIsoString) return "";
    const d = new Date(dateIsoString);
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    const day = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "short" });
    return `${weekday}, ${day} ${month}`;
  };

  const formatTimeRange = (start, end) => {
    if (start && end) return `${start} - ${end}`;
    return start || "";
  };

  // Data derived from confirmed appointment (fallbacks to selection)
  const dummyData = {
    doctorName: slotDetails?.doctor?.name || "Doctor",
    specialization: slotDetails?.specialization || slotDetails?.doctorId?.category?.name || "General",
    hospitalName: appointmentConfirmData?.hospital?.name || slotDetails?.hospitalDetails?.name || "N/A",
    hospitalAddress: appointmentConfirmData?.hospital?.address || slotDetails?.hospitalDetails?.address || "",
    selectedDate: formatDateLabel(appointmentConfirmData?.date || slotDetails?.date),
    selectedTime: formatTimeRange(
      appointmentConfirmData?.slots?.startTime || deriveSelectedSlot()?.startTime || slotDetails?.time,
      appointmentConfirmData?.slots?.endTime || deriveSelectedSlot()?.endTime || ""
    ),
    consultationFee: appointmentConfirmData?.fee ?? slotDetails?.doctor?.fee,
    appointmentId: appointmentConfirmData?.appointmentId || ("APT" + Math.random().toString(36).substr(2, 9).toUpperCase()),
    patient: {
      name: appointmentConfirmData?.patientId?.name || "",
      gender: appointmentConfirmData?.patientId?.gender || "",
      phone: appointmentConfirmData?.patientId?.phone || "",
    },
    isSelf: typeof appointmentConfirmData?.isSelf === "boolean" ? appointmentConfirmData.isSelf : selectedFor === "self",
  };

  const handleClose = () => {
    setStep(1);
    setSelectedFor(null);
    setSelectedPayment(null);
    setPatientName("");
    setPatientPhone("");
    setPatientGender("");
    setIsSubmitting(false);
    setAppointmentConfirmData("");
    onClose();
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
        fee: doctor?.fee,
        isSelf: selectedFor === "self",
        ...(selectedFor === "other"
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
          startTime: selectedSlot?.startTime || "",               
          endTime: selectedSlot?.endTime || "",                   
        },
      };

      const res = await postRequest({ url: `hospitalAppointment/add`, cred: payload });
      setAppointmentConfirmData(res?.data?.data);
      console.log("Hospital appointment booked:", res);
      setStep(4);
    } catch (error) {
      console.error("Appointment booking failed:", error);
      toast.error(error?.response?.data?.message || "Failed to book appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);



  const fetchPatients = async () => {
    console.log("userId  ==  ", userId)
    if (!userId) return;
    try {
      const res = await getRequest(`auth/getMembers/${userId}`);
      console.log("Fetched patients:", res?.data?.data || []);
      setOtherpatients(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [userId, open]);



  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50 ">
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

              {selectedFor === "other" && (
               <div className="mt-4">
               <h4 className="text-sm font-medium text-gray-700 mb-2">
                 Other Patients:
               </h4>
               {otherpatients.length > 0 ? (
                 <ul className="space-y-2 text-sm text-gray-700 max-h-40 overflow-auto">
                   {otherpatients.map((p, i) => (
                     <li
                       key={i}
                       className={`border rounded-lg p-2 shadow-sm cursor-pointer ${
                         selectedPatient?.name === p.name
                           ? "border-blue-600 bg-blue-50"
                           : "border-gray-200"
                       }`}
                       onClick={() => {
                         setSelectedPatient(p);
                         setPatientName(p?.name || "");
                         setPatientGender(p?.gender || "");
                         setPatientPhone(p?.phone || "");
                       }}
                     >
                       {p.name} , {p.gender}, {p.age}
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

                <button
                  onClick={() => {
                    if (selectedFor === "self") {
                      setStep(2);
                    } else {
                      navigate("/manage-patients");
                    }
                  }}
                  disabled={!selectedFor}
                  className={`w-full px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    selectedFor
                      ? "bg-[#006fab] hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {selectedFor === "self"
                    ? "Continue as Self"
                    : "Manage Patients"}
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
                  { id: "clinic", label: "🏥 Pay at Hospital" },
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

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800">
                    We adhere entirely to the data security standards of the payment card industry.
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
                >
                  Back
                </button>

                <button
                  onClick={() => setStep(3)}
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

          {/* Step 3: Confirm */}
          {step === 3 && (
            <>
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
                Confirm Appointment
              </Dialog.Title>

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

              <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
                Are you sure you want to book this clinic visit?
              </p>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="w-full px-4 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAppointment}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    isSubmitting ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
                  } text-white`}
                >
                  {isSubmitting ? "Booking..." : "Yes, Book"}
                </button>
              </div>
            </>
          )}

          {/* Step 4: Final Appointment Details */}
          {step === 4 && (
            <div className="h-[90vh] overflow-y-auto">
              <Dialog.Title className="text-2xl font-bold text-center text-green-700 mb-8">
                My Appointment
              </Dialog.Title>

              {/* Status */}
              <div className="bg-red-50 border border-red-200 text-red-600 font-semibold text-sm rounded-xl px-4 py-2 mb-6 shadow-sm text-center">
                ⏳ Awaiting Confirmation
              </div>

              {/* Hospital Info */}
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <img
                      src="https://i.pinimg.com/736x/92/eb/b8/92ebb8868a7d96bb48184758f0a76e9f.jpg"
                      alt="Doctor"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-200 shadow-sm"
                    />  
                  </div>
                  
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      {dummyData.hospitalName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {dummyData.hospitalAddress || "Address not available"}
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
                  Appointment ID:{" "}
                  <span className="font-semibold text-gray-700">{dummyData.appointmentId}</span>
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <strong>{dummyData.selectedDate}</strong>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <strong>{dummyData.selectedTime}</strong>
                </div>
                <span className="inline-block mt-4 px-4 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                  {dummyData.isSelf ? "MYSELF" : "OTHER"}
                </span>
              </div>

              {/* Patient Info */}
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                <h4 className="text-base font-semibold text-gray-800 mb-4">
                  Patient Information
                </h4>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    <strong>Name:</strong> {dummyData.patient?.name || "User"}
                  </p>
                  <p>
                    <strong>Gender:</strong> {dummyData.patient?.gender || "User"}
                  </p>
                  <p>
                    <strong>Contact:</strong> {dummyData.patient?.phone || "User"}
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
                    {typeof dummyData.consultationFee === "number" ? `₹${dummyData.consultationFee}` : (dummyData.consultationFee ? `₹${dummyData.consultationFee}` : "₹0")}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-between text-sm text-blue-700 font-medium">
                <button
                  onClick={() => alert("Calling hospital...")}
                  className="hover:underline hover:text-blue-800 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Call Hospital
                </button>

                <button
                  onClick={() => alert("Opening map...")}
                  className="hover:underline hover:text-blue-800 transition-all flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" /> Get Location
                </button>
              </div>

              {/* Continue */}
              <div className="mt-8">
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 bg-[#006fab] hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base rounded-full transition-all duration-200"
                >
                  Go to Appointments →
                </button>
              </div>
            </div>
          )}
          
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default HospitalAppointmentFlow; 