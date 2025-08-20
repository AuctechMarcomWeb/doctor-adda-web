import React, { useState } from "react";
import {
  Plus,
  Upload,
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
} from "lucide-react";

const HospitalRegistration = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [facilities, setFacilities] = useState([{ name: "", description: "" }]);
  const [formData, setFormData] = useState({
    hospitalName: "",
    officialEmail: "",
    officialContact: "",
    category: "",
    healthCard: "",
    description: "",
    address: "",
    ownerName: "",
    gstNumber: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleProfilePic = (e) => {
   
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacilityChange = (index, field, value) => {
    const updated = [...facilities];
    updated[index][field] = value;
    setFacilities(updated);
  };

  const addFacility = () => {
    setFacilities([...facilities, { name: "", description: "" }]);
  };

  const removeFacility = (index) => {
    if (facilities.length > 1) {
      setFacilities(facilities.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.hospitalName) newErrors.hospitalName = "Hospital name is required";
    if (!formData.officialEmail) newErrors.officialEmail = "Email is required";
    if (!formData.officialContact) newErrors.officialContact = "Contact number is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.healthCard) newErrors.healthCard = "Please select health card type";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.ownerName) newErrors.ownerName = "Owner name is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Verification phone is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const data = { ...formData, facilities, profilePic };
    console.log("Form Submitted:", data);

    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-34 px-4">
      <div className=" sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-4 transform hover:scale-110 transition-transform duration-300">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl  md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Hospital Registration
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Join our healthcare network today</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowSuccess(false)}
          >
            <div className="bg-white rounded-2xl p-8 text-center transform animate-bounce">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Success!</h3>
              <p className="text-gray-600">Hospital registered successfully!</p>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white/70 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20">
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="w-5 h-5 text-blue-600" />
                <label className="text-lg font-semibold text-gray-800">
                  Profile Picture
                </label>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePic}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-full border-4 border-dashed border-blue-300 flex items-center justify-center hover:border-blue-500 transition-colors duration-300 cursor-pointer group-hover:scale-105 transform transition-transform">
                    {profilePic ? (
                      <img
                        src=""
                        alt="Preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-blue-500" />
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Click to upload hospital logo</p>
                  <p className="text-xs">Max size: 5MB</p>
                </div>
              </div>
            </div>

            {/* Basic Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Hospital Name
                </label>
                <input
                  type="text"
                  value={formData.hospitalName}
                  onChange={(e) =>
                    handleInputChange("hospitalName", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter hospital name"
                />
                {errors.hospitalName && (
                  <p className="text-red-500 text-xs">{errors.hospitalName}</p>
                )}
              </div>

              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4 text-green-600" />
                  Official Email
                </label>
                <input
                  type="email"
                  value={formData.officialEmail}
                  onChange={(e) =>
                    handleInputChange("officialEmail", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="hospital@example.com"
                />
                {errors.officialEmail && (
                  <p className="text-red-500 text-xs">{errors.officialEmail}</p>
                )}
              </div>
            </div>

            {/* Contact & Category */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Phone className="w-4 h-4 text-purple-600" />
                 Officail Hospital Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.officialContact}
                  onChange={(e) =>
                    handleInputChange("officialContact", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
                  placeholder="+91 12345 67890"
                />
                {errors.officialContact && (
                  <p className="text-red-500 text-xs">
                    {errors.officialContact}
                  </p>
                )}
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="General">General</option>
                  <option value="Specialized">Specialized</option>
                  <option value="Multispecialty">Multispecialty</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs">{errors.category}</p>
                )}
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700">
                  Health Card
                </label>
                <select
                  value={formData.healthCard}
                  onChange={(e) =>
                    handleInputChange("healthCard", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="Ayushman">Ayushman Bharat</option>
                  <option value="Private">Private</option>
                  <option value="Both">Both</option>
                </select>
                {errors.healthCard && (
                  <p className="text-red-500 text-xs">{errors.healthCard}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 text-red-600" />
                Search Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="Complete hospital address"
              />
              {errors.address && (
                <p className="text-red-500 text-xs">{errors.address}</p>
              )}
            </div>

            {/* Owner Details */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 text-gray-600" />
                  Owner Name
                </label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) =>
                    handleInputChange("ownerName", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-500"
                  placeholder="Full name"
                />
                {errors.ownerName && (
                  <p className="text-red-500 text-xs">{errors.ownerName}</p>
                )}
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700">
                  GST Number
                </label>
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) =>
                    handleInputChange("gstNumber", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
                  placeholder="GST registration number"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700">
                  Verification Phone
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500"
                  placeholder="+91 98765 43210"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Facilities Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Facilities & Services
                </h3>
                <button
                  type="button"
                  onClick={addFacility}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Facility
                </button>
              </div>

              <div className="space-y-3">
                {facilities.map((facility, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <input
                      type="text"
                      placeholder="Facility name (e.g., ICU, X-Ray)"
                      value={facility.name}
                      onChange={(e) =>
                        handleFacilityChange(index, "name", e.target.value)
                      }
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Description"
                        value={facility.description}
                        onChange={(e) =>
                          handleFacilityChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {facilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFacility(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full text-white font-semibold py-4 rounded-xl transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700"
                }`}
              >
                {loading ? "Registering..." : "Register Hospital"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalRegistration;
