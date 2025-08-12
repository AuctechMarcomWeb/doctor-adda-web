import React from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, Microscope, Home, HelpCircle,  ArrowRight, Calendar, Clock } from "lucide-react";

const AppointmentTypeCard = ({ icon: Icon, title, description, color, onClick, stats }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${color.bg} ${color.border} bg-gradient-to-br`}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <Icon size={128} className="text-current" />
      </div>
      
      <div className="relative z-10">
        {/* Icon and Stats Row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`flex items-center justify-center w-16 h-16 rounded-2xl ${color.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`${color.iconText}`} size={32} />
          </div>
          
          
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${color.iconText}`}>
            Manage appointments
          </span>
          <ArrowRight 
            className={`${color.iconText} group-hover:translate-x-1 transition-transform duration-300`} 
            size={20} 
          />
        </div>
      </div>

      {/* Hover Gradient Overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${color.hoverOverlay}`}></div>
    </div>
  );
};






const AppointmentSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      <div className="max-w-6xl mx-auto px-6 py-32">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-15 h-15 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-6">
            <Calendar className="text-white" size={36} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Choose Appointment Type
          </h1>
          <p className=" text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Select the type of appointment you want to manage
          </p>
        </div>

      

        {/* Appointment Types */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <AppointmentTypeCard
            icon={Stethoscope}
            title="Doctor Appointments"
            description="Schedule and manage consultations with healthcare professionals, specialists, and primary care physicians"
           
            color={{
              bg: "from-blue-50 to-blue-100/50",
              border: "border-blue-200/50",
              iconBg: "bg-white shadow-blue-100",
              iconText: "text-blue-600",
              hoverOverlay: "bg-blue-600"
            }}
            onClick={() => navigate("/doctor-appointments")}
          />
          <AppointmentTypeCard
            icon={Microscope}
            title="Diagnostic Appointments"
            description="Book laboratory tests, imaging studies, and specialized diagnostic procedures with certified facilities"
            
            color={{
              bg: "from-emerald-50 to-emerald-100/50",
              border: "border-emerald-200/50",
              iconBg: "bg-white shadow-emerald-100",
              iconText: "text-emerald-600",
              hoverOverlay: "bg-emerald-600"
            }}
          />
          <AppointmentTypeCard
            icon={Home}
            title="Hospital Appointments"
            description="Coordinate hospital admissions, outpatient procedures, and specialized medical services"
           
            color={{
              bg: "from-rose-50 to-rose-100/50",
              border: "border-rose-200/50",
              iconBg: "bg-white shadow-rose-100",
              iconText: "text-rose-600",
              hoverOverlay: "bg-rose-600"
            }}
          />
        </div>

        {/* Support Section */}
        <div className="relative overflow-hidden p-8 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-3xl shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32">
              <HelpCircle size={128} className="text-white" />
            </div>
            <div className="absolute bottom-4 left-4 w-24 h-24">
              <Calendar size={96} className="text-white" />
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Need Assistance?
                </h3>
                <p className="text-blue-100 leading-relaxed max-w-lg">
                  Our dedicated support team is available 24/7 to help you navigate your appointments, 
                  answer questions, and ensure your healthcare experience is seamless.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl">
                  <HelpCircle size={20} className="mr-2" />
                  Contact Support
                </button>
                <button className="flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-indigo-600 transition-colors duration-300">
                  View FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSelection;
