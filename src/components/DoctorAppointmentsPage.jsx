import React, { useState } from "react";
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
    setAppointments(prev => prev.filter(appt => appt.id !== id));
    showNotification("Appointment cancelled successfully");
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(prev => prev.filter(appt => appt.id !== id));
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
      video: appointments.filter(appt => appt.service === "Video").length,
      inClinic: appointments.filter(appt => appt.service === "In-clinic").length
    };
  };

  const counts = getFilterCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-6 py-42">
        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300">
            {notification}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            My Appointments
          </h2>
          <p className="text-gray-600 ">Manage your upcoming medical consultations</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <button 
            onClick={() => setFilter("All")}
            className={`px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ${
              filter === "All" 
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" 
                : "bg-white/70 backdrop-blur-sm border border-blue-200 text-blue-600 hover:bg-white hover:shadow-md"
            }`}
          >
            All ({counts.all})
          </button>
          <button 
            onClick={() => setFilter("Video")}
            className={`px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ${
              filter === "Video" 
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" 
                : "bg-white/70 backdrop-blur-sm border border-blue-200 text-blue-600 hover:bg-white hover:shadow-md"
            }`}
          >
            Video ({counts.video})
          </button>
          <button 
            onClick={() => setFilter("In-Clinic")}
            className={`px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ${
              filter === "In-Clinic" 
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" 
                : "bg-white/70 backdrop-blur-sm border border-blue-200 text-blue-600 hover:bg-white hover:shadow-md"
            }`}
          >
            In-Clinic ({counts.inClinic})
          </button>
        </div>

        <p className="text-gray-500 mb-8 text-center">
          Showing {filteredAppointments.length} appointments
        </p>

        {/* No Appointments Message */}
        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏥</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No appointments found</h3>
            <p className="text-gray-500">
              {filter === "All" 
                ? "You don't have any appointments scheduled." 
                : `No ${filter.toLowerCase()} appointments found.`
              }
            </p>
          </div>
        )}

        {/* Appointment Cards */}
        <div className="space-y-8">
          {filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-1"
            >
              {/* Status Header */}
              <div className="flex justify-between items-center px-8 py-5 bg-gradient-to-r from-gray-50/90 to-blue-50/90 backdrop-blur-sm border-b border-gray-200/50">
                <span
                  className={`px-5 py-2 rounded-full text-sm font-semibold shadow-sm ${
                    appt.status === "Pending"
                      ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300"
                      : "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
                  }`}
                >
                  {appt.status}
                </span>
                <button 
                  onClick={() => handleDeleteAppointment(appt.id)}
                  className="p-3 bg-red-50 rounded-full text-red-500 hover:bg-red-100 hover:scale-110 transition-all duration-300 opacity-70 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Doctor Info */}
              <div className="px-8 py-6">
                <p className="text-sm text-gray-500 mb-2 font-medium uppercase tracking-wide">
                  {appt.type}
                </p>
                <h2 className="font-bold text-2xl text-gray-900 mb-2">
                  {appt.doctorName}
                </h2>
                <p className="text-gray-600 text-lg">{appt.specialization}</p>
              </div>

              {/* Appointment Details */}
              <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm px-8 py-6 mx-6 rounded-xl mb-6 border border-blue-200/50 shadow-sm">
                <h3 className="font-semibold flex items-center gap-3 mb-5 text-blue-800 text-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Info size={18} className="text-blue-600" />
                  </div>
                  Appointment Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Calendar size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{appt.date}</p>
                      <p className="text-gray-500 text-sm">Date</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Clock size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{appt.time}</p>
                      <p className="text-gray-500 text-sm">Time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Info size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{appt.service}</p>
                      <p className="text-gray-500 text-sm">Service</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancel Button */}
              <div className="px-8 mb-6">
                <button 
                  onClick={() => handleCancelAppointment(appt.id)}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                >
                  Cancel Appointment
                </button>
              </div>

              {/* Call & Message */}
              <div className="flex border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
                <button 
                  onClick={() => handleCall(appt.doctorName)}
                  className="flex-1 py-5 flex items-center justify-center gap-3 text-blue-600 hover:bg-blue-50/80 transition-all duration-300 font-semibold"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Phone size={16} />
                  </div>
                  Call
                </button>
                <div className="w-px bg-gray-300/50"></div>
                <button 
                  onClick={() => handleMessage(appt.doctorName)}
                  className="flex-1 py-5 flex items-center justify-center gap-3 text-blue-600 hover:bg-blue-50/80 transition-all duration-300 font-semibold"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageSquare size={16} />
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