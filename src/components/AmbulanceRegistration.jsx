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
import toast from "react-hot-toast";

const AmbulanceRegistration = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const { userProfileData, isLoggedIn } = useSelector((state) => state.user);
  const userId = userProfileData?._id;
  // Profile Image states
  const [profileFile, setProfileFile] = useState(null);
  const [uploadProfileImage, setUploadProfileImage] = useState("");
  const [profilePreview, setProfilePreview] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [drivers, setDrivers] = useState([
    { name: "", phone: "", licenseNumber: "" },
  ]);
  const [services, setservices] = useState([{ name: "fdgdf" }]);
  const [formData, setFormData] = useState({
    name: "Fast Aid Ambulance",
    phone: "9876543211",
    address: "123 Emergency Lane, City Center",
    latitude: "28.6139",
    longitude: "77.2090",
    capacity: 4,
    price: 1500,
    description: "Fully equipped ambulance for emergencies.",
    ambulanceType: "ICU",
    ambulanceNumber: "DL01AB1234",

    availabilityStatus: "Available",
    operatingHours: "24/7",
    emergencyContact: "911",
  });
  console.log("form data", formData);

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
      console.log("uploadedUrl", uploadedUrl);
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
      const payload = { ...formData, drivers };
      console.log("Final payload before submit:", payload);
      const response = await postRequest({
        url: `ambulance/registerAmbulances/${userId}`,
        cred: payload,
      });

      console.log("Ambulance Register Response:", response?.data?.data);
      toast.success(response?.data?.message);
      setShowSuccess(true);
    } catch (err) {
      console.error(" Error Registering Hospital:", err);
      toast.error(err?.respone?.data?.message);
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

  const handleDriverChange = (index, field, value) => {
    const updated = [...drivers];
    updated[index][field] = value;
    setDrivers(updated);
  };

  const addDriver = () => {
    setDrivers([...drivers, { name: "", phone: "", licenseNumber: "" }]);
  };

  const removeDriver = (index) => {
    if (drivers.length > 1) {
      setDrivers(drivers.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (currentIndex >= updated.length) {
      setCurrentIndex(0);
    }
  };
  const validateForm = () => {
    const newErrors = {};

    // Basic Info
    if (!formData.name) newErrors.name = "Diagnostic center name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.address) newErrors.address = "Address is required";

    return newErrors;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-34 px-4">
      <div className=" sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-4 transform hover:scale-110 transition-transform duration-300">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl  md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            AMBULANCE Registration
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
              <p className="text-gray-600">
                AMBULANCE registered successfully!
              </p>
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
                  <p>Click to upload Diagnostic logo</p>
                  <p className="text-xs">Max size: 5MB</p>
                </div>
              </div>
            </div>

            {/* Basic Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Diagnostic Center Name
                </label>
                <input
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter diagnostic center name"
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

            {/* Contact & Decription*/}
            <div className="grid md:grid-cols-1 gap-6">
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4 text-green-600" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors?.email}</p>
                )}
              </div>
            </div>

            {/*ambulance*/}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700">
                  Ambulance Type
                </label>
                <select
                  value={formData?.ambulanceType}
                  onChange={(e) =>
                    handleInputChange("ambulanceType", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>
                    Select Options
                  </option>
                  <option value="Emergency Ambulance">
                    Emergency Ambulance
                  </option>
                  <option value="Non-Emergency Ambulance">
                    Non-Emergency Ambulance
                  </option>
                  <option value="ICU Ambulance">ICU Ambulance</option>
                </select>
                {errors?.ambulanceType && (
                  <p className="text-red-500 text-xs">
                    {errors?.ambulanceType}
                  </p>
                )}
              </div>
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700">
                  Number of Ambulance
                </label>
                <select
                  value={formData?.ambulanceNumber}
                  onChange={(e) =>
                    handleInputChange("ambulanceNumber", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>
                    Select Options
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4+">4</option>
                </select>
                {errors?.ambulanceNumber && (
                  <p className="text-red-500 text-xs">
                    {errors?.ambulanceNumber}
                  </p>
                )}
              </div>
            </div>

            {/*Operating Hours*/}
            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Operating Hours
              </label>

              <input
                type="text"
                value={formData?.operatingHours}
                onChange={(e) =>
                  handleInputChange("operatingHours", e.target.value)
                }
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-500"
                placeholder="Operating Hours of ambulance service"
              />
              {/* Validation messages */}
              {errors?.startTime && (
                <p className="text-red-500 text-xs">{errors?.operatingHours}</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 text-red-600" />
                Search Address
              </label>
              <input
                type="text"
                value={formData?.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="Search or enter location address"
              />
              {errors?.address && (
                <p className="text-red-500 text-xs">{errors?.address}</p>
              )}
            </div>

            {/*Decription*/}
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
                placeholder="Brief about your diagonstic services"
              />
              {errors?.description && (
                <p className="text-red-500 text-xs">{errors?.description}</p>
              )}
            </div>
            {/* Packages Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">
                  Driver Information
                </h3>
                <button
                  type="button"
                  onClick={addDriver}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  Add Driver
                </button>
              </div>
              <div className="space-y-3">
                {drivers.map((driver, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Driver name"
                        value={driver.name}
                        onChange={(e) =>
                          handleDriverChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="text"
                        placeholder="Phone number"
                        value={driver.phone}
                        onChange={(e) =>
                          handleDriverChange(index, "phone", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* License Number + Remove */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        License Number
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="License number"
                          value={driver.licenseNumber}
                          onChange={(e) =>
                            handleDriverChange(
                              index,
                              "licenseNumber",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {drivers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDriver(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

               
              </div>
            </div>

            <div className="space-y-2 group">
              <p className="text-gray-700 font-medium font-semibold">
                Select Images to showcase your pharmacy
              </p>

              {/* Preview Area */}
              {images.length > 0 && (
                <div className="relative w-full h-56 border rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden">
                  {/* Current Image */}
                  <img
                    src={images[currentIndex].url}
                    alt="preview"
                    className="h-full object-contain"
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(currentIndex)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    ✕
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-2 flex gap-2">
                    {images.map((_, i) => (
                      <span
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                          currentIndex === i ? "bg-green-600" : "bg-gray-300"
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="flex items-center gap-2">➕ Add Images</span>
              </label>
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
                {loading ? "Registering..." : "Register Ambulance"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceRegistration;
