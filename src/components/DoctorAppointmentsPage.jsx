import React, { useState, useEffect } from "react";
import { Calendar, Clock, Phone, MessageSquare, Trash2, Info } from "lucide-react";

const initialAppointments = [
  {
    id: 1,
    status: "Pending",
    type: "Medical Consultation",
    doctorName: "Dr. Aditya Kumar",
    specialization: "Skin & Hair Specialist",
    date: "Today",
    time: "04:23 PM",
    service: "In-clinic",
  },
  {
    id: 2,
    status: "Pending",
    type: "Medical Consultation",
    doctorName: "Dr. Ramesh Chandra",
    specialization: "General Physician",
    date: "Tomorrow",
    time: "10:30 AM",
    service: "In-clinic",
  },
];

const DoctorAppointmentsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState("All");
  const [notification, setNotification] = useState("");

  const filteredAppointments = appointments.filter((appt) => {
    if (filter === "All") return true;
    if (filter === "Video") return appt.service === "Video";
    if (filter === "In-Clinic") return appt.service === "In-clinic";
    return true;
  });

  const handleCancelAppointment = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    showNotification("Appointment cancelled successfully");
  };

  const handleDeleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    showNotification("Appointment deleted");
  };

  const handleCall = (doctorName) => {
    showNotification(`Calling ${doctorName}...`);
  };

  const handleMessage = (doctorName) => {
    showNotification(`Opening chat with ${doctorName}...`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const getFilterCounts = () => {
    return {
      all: appointments.length,
      video: appointments.filter((appt) => appt.service === "Video").length,
      inClinic: appointments.filter((appt) => appt.service === "In-clinic").length,
    };
  };

  const counts = getFilterCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Container now max-w for better responsiveness */}
      <div className="max-w-5xl mx-auto px-4 py-28 sm:px-6 lg:px-8 sm:py-38">
        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg">
            {notification}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8 px-2">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            My Appointments
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your upcoming medical consultations
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 sm:gap-4 mb-8 flex-wrap justify-center">
          {[
            { label: "All", value: "All", count: counts.all },
            { label: "Video", value: "Video", count: counts.video },
            { label: "In-Clinic", value: "In-Clinic", count: counts.inClinic },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-5 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-md sm:shadow-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ${
                filter === btn.value
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  : "bg-white/70 backdrop-blur-sm border border-blue-200 text-blue-600 hover:bg-white hover:shadow-md"
              }`}
            >
              {btn.label} ({btn.count})
            </button>
          ))}
        </div>

        <p className="text-gray-500 mb-8 text-center text-sm sm:text-base">
          Showing {filteredAppointments.length} appointments
        </p>

        {/* No Appointments Message */}
        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl sm:text-6xl mb-4">🏥</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              No appointments found
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              {filter === "All"
                ? "You don't have any appointments scheduled."
                : `No ${filter.toLowerCase()} appointments found.`}
            </p>
          </div>
        )}

        {/* Appointment Cards */}
        <div className="space-y-6 sm:space-y-8">
          {filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-1"
            >
              {/* Status Header */}
              <div className="flex justify-between items-center px-4 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-gray-50/90 to-blue-50/90 border-b border-gray-200/50">
                <span
                  className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm ${
                    appt.status === "Pending"
                      ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300"
                      : "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
                  }`}
                >
                  {appt.status}
                </span>
                <button
                  onClick={() => handleDeleteAppointment(appt.id)}
                  className="p-2 sm:p-3 bg-red-50 rounded-full text-red-500 hover:bg-red-100 hover:scale-110 transition-all duration-300 opacity-70 group-hover:opacity-100"
                >
                  <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>

              {/* Doctor Info */}
              <div className="px-4 sm:px-8 py-5">
                <p className="text-xs sm:text-sm text-gray-500 mb-1 font-medium uppercase tracking-wide">
                  {appt.type}
                </p>
                <h2 className="font-bold text-xl sm:text-2xl text-gray-900 mb-1">
                  {appt.doctorName}
                </h2>
                <p className="text-gray-600 text-sm sm:text-lg">{appt.specialization}</p>
              </div>

              {/* Appointment Details */}
              <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 px-4 sm:px-8 py-5 mx-4 sm:mx-6 rounded-xl mb-6 border border-blue-200/50 shadow-sm">
                <h3 className="font-semibold flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 text-blue-800 text-base sm:text-lg">
                  <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                    <Info size={16} className="sm:w-[18px] sm:h-[18px] text-blue-600" />
                  </div>
                  Appointment Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  {[
                    { icon: Calendar, label: "Date", value: appt.date },
                    { icon: Clock, label: "Time", value: appt.time },
                    { icon: Info, label: "Service", value: appt.service },
                  ].map((detail, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-white/50"
                    >
                      <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                        <detail.icon size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{detail.value}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">{detail.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cancel Button */}
              <div className="px-4 sm:px-8 mb-6">
                <button
                  onClick={() => handleCancelAppointment(appt.id)}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:from-red-600 hover:to-red-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                >
                  Cancel Appointment
                </button>
              </div>

              {/* Call & Message */}
              <div className="flex border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50 flex-col sm:flex-row">
                <button
                  onClick={() => handleCall(appt.doctorName)}
                  className="flex-1 py-4 sm:py-5 flex items-center justify-center gap-2 sm:gap-3 text-blue-600 hover:bg-blue-50/80 transition-all duration-300 text-sm sm:text-base font-semibold"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Phone size={14} className="sm:w-[16px] sm:h-[16px]" />
                  </div>
                  Call
                </button>
                <div className="h-px sm:w-px sm:h-auto bg-gray-300/50"></div>
                <button
                  onClick={() => handleMessage(appt.doctorName)}
                  className="flex-1 py-4 sm:py-5 flex items-center justify-center gap-2 sm:gap-3 text-blue-600 hover:bg-blue-50/80 transition-all duration-300 text-sm sm:text-base font-semibold"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageSquare size={14} className="sm:w-[16px] sm:h-[16px]" />
                  </div>
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentsPage;
