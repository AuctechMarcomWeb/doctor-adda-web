/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
import { getRequest, postRequest } from "../Helpers/index";
import { useSelector } from "react-redux";
import LocationSearchInput from "./LocationSearchInput";

const PharmacyRegistration = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { userProfileData, isLoggedIn } = useSelector((state) => state.user);
  const userId = userProfileData?._id;
  // Profile Image states
  const [profileFile, setProfileFile] = useState(null);
  const [uploadProfileImage, setUploadProfileImage] = useState(""); 
  const [profilePreview, setProfilePreview] = useState(null);
  const [services, setservices] = useState([
    { name: "fdgdf", discription: "" },
  ]);
  const [formData, setFormData] = useState({
    name: "jhgjg",
    address: "dfd",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
    storeTiming: "",
    services: [{ name: "", }],
    description: "",
    accountType: "Pharmacy",
    latitude: "",
    longitude: "",
  });
  console.log("formData", formData);

  const uploadImage = async (file) => {
  try {
    const formDataData = new FormData();
    formDataData.append("file", file);
    const response = await postRequest({
      url: `upload/uploadImage`,
      cred: formDataData,
    });
    console.log("Image uploaded successfully:", response);
    const uploadedUrl = response?.data?.data?.imageUrl;
    setUploadProfileImage(uploadedUrl);
    console.log("uploadedUrl",uploadedUrl);
    
    setFormData((prev) => ({ ...prev, profileImage: uploadedUrl }));
    
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

  const handleSubmit = async () => {
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  if (!formData?.profileImage) {
    setErrors({ profileImage: "Please upload a profile image" });
    return;
  }
  setErrors({});
  setLoading(true);

  try {
    const payload = { ...formData, services };
    console.log("Final payload before submit:", payload);
    const response = await postRequest({
      url: `pharmacy/registerPharmacy/${userId}`,
      cred: payload,
    });

    console.log("Pharmacy Register Response:", response?.data?.data);
    setShowSuccess(true);
  } catch (err) {
    console.error(" Error Registering Pharmacy:", err);
  } finally {
    console.log(" Finally block executed");
    setLoading(false);
  }
};

  // Profile Pic Handler
const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file)); 
    }
    uploadImage(file);
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleServiceChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setservices(updated);
  };

  const addService = () => {
    setservices([...services, { name: "", description: "" }]);
  };

  const removeService = (index) => {
    if (services.length > 1) {
      setservices(services.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Pharmacy name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Contact number is required";
    if (!formData.storeTiming) newErrors.storeTiming = "Please select a storeTiming";
   // if (!formData.healthCard)
     // newErrors.healthCard = "Please select health card type";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.ownerName) newErrors.ownerName = "Owner name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Verification phone is required";
    return newErrors;
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
            Pharmacy Registration
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Join our healthcare network today
          </p>
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
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Success!
              </h3>
              <p className="text-gray-600">Pharmacy registered successfully!</p>
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
                <div className="relative w-24 h-24">
                  <input
                    type="file"
                    id="profilePic"
                    accept="image/*"
                    onChange={handleProfilePic}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-full border-4 border-dashed border-blue-300 flex items-center justify-center hover:border-blue-500 transition-colors duration-300 cursor-pointer group-hover:scale-105 transform transition-transform">
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-blue-500" />
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Click to upload Pharmacy logo</p>
                  <p className="text-xs">Max size: 5MB</p>
                </div>
              </div>
            </div>

            {/* Basic Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Pharmacy Name
                </label>
                <input
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Pharmacy name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors?.name}</p>
                )}
              </div>
               <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Phone className="w-4 h-4 text-purple-600" />
                  Phone Number
                </label>
                <input
                  type="number"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
                  placeholder="+91 12345 67890"
                />
                {errors?.phone && (
                  <p className="text-red-500 text-xs">{errors?.phone}</p>
                )}
              </div>
            </div>

            {/* Email & Description */}
            <div className="grid md:grid-cols-2 gap-6">
             <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4 text-green-600" />
                  Official Email
                </label>
                <input
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="abc@example.com"
                />
                {errors.officialEmail && (
                  <p className="text-red-500 text-xs">{errors?.email}</p>
                )}
              </div>

               <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4 text-red-600" />
                Decription
              </label>
              <input
                type="text"
                value={formData?.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="Complete Pharmacy address"
              />
              {errors?.description && (
                <p className="text-red-500 text-xs">{errors?.description}</p>
              )}
            </div>

            </div>

           
            {/* Address & timings*/}
            <div className="space-y-2 group">
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <MapPin className="w-4 h-4 text-red-600" />
                            Search Address
                          </label>
                          <LocationSearchInput
                            value={formData.address}
                            onSelect={
                              (place) => setFormData({ ...formData, ...place }) // address + lat/lng update
                            }
                          />
                          {errors?.address && (
                            <p className="text-red-500 text-xs">{errors?.address}</p>
                          )}
            </div>
            

            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {/* <MapPin className="w-4 h-4 text-red-600" /> */}
                Store Timings
              </label>
              <input
                type="text"
                value={formData?.storeTiming}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="Ex: 9:00 AM - 9:00 PM"
              />
              {errors?.storeTiming && (
                <p className="text-red-500 text-xs">{errors?.storeTiming}</p>
              )}
            </div>


            {/* services Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                    Services Offered
                </h3>
                <button
                  type="button"
                  onClick={addService}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  <Plus className="w-4 h-4" />
                  Add More
                </button>
              </div>

              <div className="space-y-3">
                {services.map((Service, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <input
                      type="text"
                      placeholder="Services Offered Name"
                      value={Service?.name}
                      onChange={(e) =>
                        handleServiceChange(index, "name", e.target.value)
                      }
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Services Offered Description"
                        value={Service?.discription}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "discription",
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
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

         {/* Owner Details */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 text-gray-600" />
                  Owner Name
                </label>
                <input
                  type="text"
                  value={formData?.ownerName}
                  onChange={(e) =>
                    handleInputChange("ownerName", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-500"
                  placeholder="Full name"
                />
                {errors?.ownerName && (
                  <p className="text-red-500 text-xs">{errors?.ownerName}</p>
                )}
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700">
                  GST Number
                </label>
                <input
                  type="number"
                  value={formData?.gstNumber}
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
                  type="number"
                  value={formData?.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500"
                  placeholder="+91 98765 43210"
                />
                {errors?.phoneNumber && (
                  <p className="text-red-500 text-xs">{errors?.phoneNumber}</p>
                )}
              </div>
            </div>

      <div className="space-y-2 group">
  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
    COD Preference
  </label>
  <div className="flex gap-4">
    <button
      type="button"
      onClick={() => handleInputChange("codPreference", "yes")}
      className={`w-full px-4 py-3 border rounded-xl font-medium transition-all duration-200
        ${formData?.codPreference === "yes" 
          ? "bg-green-500 text-white border-green-500" 
          : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"}`}
    >
      Yes
    </button>
    <button
      type="button"
      onClick={() => handleInputChange("codPreference", "no")}
      className={`w-full px-4 py-3 border rounded-xl font-medium transition-all duration-200
        ${formData?.codPreference === "no" 
          ? "bg-red-500 text-white border-red-500" 
          : "bg-white text-gray-700 border-gray-300 hover:bg-red-50"}`}
    >
      No
    </button>
  </div>
  {errors?.codPreference && (
    <p className="text-red-500 text-xs">{errors?.codPreference}</p>
  )}
</div>

<div className="space-y-2 group">
  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
    Online Payment
  </label>
  <div className="flex gap-4">
    <button
      type="button"
      onClick={() => handleInputChange("onlinePayment", "true")}
      className={`flex-1 px-4 py-3 border rounded-xl font-medium transition-all duration-200
        ${formData?.onlinePayment === "true" 
          ? "bg-green-500 text-white border-green-500" 
          : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"}`}
    >
      Yes
    </button>
    <button
      type="button"
      onClick={() => handleInputChange("onlinePayment", "false")}
      className={`flex-1 px-4 py-3 border rounded-xl font-medium transition-all duration-200
        ${formData?.onlinePayment === "false" 
          ? "bg-red-500 text-white border-red-500" 
          : "bg-white text-gray-700 border-gray-300 hover:bg-red-50"}`}
    >
      No
    </button>
  </div>
  {errors?.onlinePayment && (
    <p className="text-red-500 text-xs">{errors?.onlinePayment}</p>
  )}
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
                {loading ? "Registering..." : "Register Pharmacy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyRegistration;
