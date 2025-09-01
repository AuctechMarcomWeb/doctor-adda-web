import React, { useState } from "react";
import { Truck, Building, User, Activity } from "lucide-react";
import logo from "../assets/dr-adda-logo.png";

const HealthcareRegistrationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedCard, setSelectedCard] = useState("");
  const [formData, setFormData] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);

  const cardTypes = [
    {
      id: "ambulance",
      title: "Ambulance Service",
      icon: <Truck className="w-10 h-10" />,
      gradient: "from-[#005b8e] to-[#005A8C]",
      description: "Register your ambulance service",
    },
    {
      id: "hospital",
      title: "Hospital",
      icon: <Building className="w-10 h-10" />,
      gradient: "from-[#005b8e] to-[#005A8C]",
      description: "Register your hospital facility",
    },
    {
      id: "doctor",
      title: "Doctor",
      icon: <User className="w-10 h-10" />,
      gradient: "from-[#005b8e] to-[#005A8C]",
      description: "Register as a medical practitioner",
    },
    {
      id: "diagnostic",
      title: "Diagnostic Center",
      icon: <Activity className="w-10 h-10" />,
      gradient: "from-[#005b8e] to-[#005A8C]",
      description: "Register your diagnostic services",
    },
    {
      id: "pharmacy",
      title: "Pharmacy  ",
      icon: <Activity className="w-10 h-10" />,
      gradient: "from-[#005b8e] to-[#005A8C]",
      description: "Register your pharmacy services",
    },
  ];

  const handleInputChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    const requiredFields = getRequiredFields(selectedCard);
    const isComplete = requiredFields.every(
      (field) => newFormData[field] && newFormData[field].trim() !== ""
    );
    setIsFormComplete(isComplete);
  };

  const getRequiredFields = (type) => {
    const commonFields = ["name", "email", "phone", "address"];
    switch (type) {
      case "ambulance":
        return [...commonFields, "licenseNumber", "vehicleCount"];
      case "hospital":
        return [...commonFields, "hospitalName", "bedCapacity", "specializations"];
      case "doctor":
        return [...commonFields, "qualification", "specialization", "experience"];
      case "diagnostic":
        return [...commonFields, "centerName", "services", "equipments"];
        case "pharmacy":
        return [...commonFields, "centerName", "services", "equipments"];
      default:
        return commonFields;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete) {
      alert("Registration submitted successfully!");
      setIsModalOpen(false);
    }
  };

  const renderInput = (label, type, field, placeholder, rows) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          rows={rows || 3}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      )}
    </div>
  );

  const renderForm = () => {
    if (!selectedCard) return null;

    const forms = {
      ambulance: (
        <>
          <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
            Ambulance Service Registration
          </h3>
          {renderInput("Service Name", "text", "name", "Enter service name")}
          {renderInput("Email", "email", "email", "Enter email address")}
          {renderInput("Phone", "tel", "phone", "Enter phone number")}
          {renderInput("Address", "textarea", "address", "Enter full address")}
          {renderInput("License Number", "text", "licenseNumber", "Enter license no.")}
          {renderInput("Number of Vehicles", "number", "vehicleCount", "Enter count")}
        </>
      ),
      hospital: (
        <>
          <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
            Hospital Registration
          </h3>
          {renderInput("Hospital Name", "text", "hospitalName", "Enter hospital name")}
          {renderInput("Official Email", "email", "email", "Enter email address")}
          {renderInput("Contact Number", "tel", "phone", "Enter contact number")}
          {renderInput("Hospital Address", "textarea", "address", "Enter address")}
          {renderInput("Administrator Name", "text", "name", "Enter name")}
          {renderInput("Bed Capacity", "number", "bedCapacity", "Enter capacity")}
          {renderInput("Specializations", "textarea", "specializations", "Comma separated")}
        </>
      ),
      doctor: (
        <>
          <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
            Doctor Registration
          </h3>
          {renderInput("Full Name", "text", "name", "Enter full name")}
          {renderInput("Email", "email", "email", "Enter email address")}
          {renderInput("Phone", "tel", "phone", "Enter phone number")}
          {renderInput("Clinic/Practice Address", "textarea", "address", "Enter address")}
          {renderInput("Medical Qualification", "text", "qualification", "Enter qualification")}
          {renderInput("Specialization", "text", "specialization", "Enter specialization")}
          {renderInput("Years of Experience", "number", "experience", "Enter experience")}
        </>
      ),
      diagnostic: (
        <>
          <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
            Diagnostic Center Registration
          </h3>
          {renderInput("Center Name", "text", "centerName", "Enter name")}
          {renderInput("Official Email", "email", "email", "Enter email")}
          {renderInput("Contact Number", "tel", "phone", "Enter number")}
          {renderInput("Center Address", "textarea", "address", "Enter address")}
          {renderInput("Director/Manager Name", "text", "name", "Enter name")}
          {renderInput("Available Services", "textarea", "services", "Comma separated")}
          {renderInput("Equipment Details", "textarea", "equipments", "List equipment")}
        </>
      ),
       pharmacy: (
        <>
          <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
            Pharmacy Registration
          </h3>
          {renderInput("Pharmacy Name", "text", "pharmacyName", "Enter name")}
          {renderInput("Official Email", "email", "email", "Enter email")}
          {renderInput("Contact Number", "tel", "phone", "Enter number")}
          {renderInput("Center Address", "textarea", "address", "Enter address")}
          {renderInput("Director/Manager Name", "text", "name", "Enter name")}
          {renderInput("Available Services", "textarea", "services", "Comma separated")}
          {renderInput("Equipment Details", "textarea", "equipments", "List equipment")}
        </>
      ),
    };

    return forms[selectedCard];
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#007BBD] to-[#005A8C] p-6 rounded-t-2xl text-center">
          <img src={logo} alt="Logo" className="h-14 mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-white">
            Registration for Pre-Launch
          </h2>
          <p className="text-indigo-100 mt-2">
            Join our healthcare network early and get exclusive benefits
          </p>
        </div>

        {/* Content */}
        <div className="py-6 px-8">
          {!selectedCard ? (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Choose Your Registration Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cardTypes.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCard(card.id)}
                    className={`bg-gradient-to-br ${card.gradient} p-6 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-white`}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="bg-[#007abb] bg-opacity-20 p-4 rounded-full shadow-md">
                        {card.icon}
                      </div>
                      <h4 className="text-lg font-semibold">{card.title}</h4>
                      <p className="text-sm opacity-90">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <button
                onClick={() => setSelectedCard("")}
                className="text-[#005b8e] hover:text-indigo-800 font-medium mb-6 flex items-center gap-2"
              >
                <img
                  width="28"
                  height="28"
                  src="https://img.icons8.com/fluency/48/circled-left-2--v1.png"
                  alt="Back"
                />
                Back to selection
              </button>

              <form onSubmit={handleSubmit} className="space-y-5">
                {renderForm()}
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    disabled={!isFormComplete}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                      isFormComplete
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isFormComplete
                      ? "Complete Registration"
                      : "Please fill all fields"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 rounded-b-2xl text-center text-sm text-gray-600">
          Registration is required to access our platform. All information is secure and confidential.
        </div>
      </div>
    </div>
  );
};

export default HealthcareRegistrationModal;
