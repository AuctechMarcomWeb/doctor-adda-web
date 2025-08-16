/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Camera,
  Calendar,
  User,
  Phone,
  Mail,
  Settings,
  Users,
  Heart,
  PawPrint,
  MapPin,
  Home,
  Edit3,
  Check,
  X,
  Upload,
} from "lucide-react";
import SidebarNav from "./SidebarNav";
import { useSelector } from "react-redux";
import { getRequest } from "../Helpers";

const UserProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const { userProfileData, isLoggedIn } = useSelector((state) => state.user);
  const UserId = userProfileData?._id;

  console.log("user", userProfileData);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    age: null,
    profileImage: null,
  });

  // Fetch user data by ID
  useEffect(() => {
    if (!UserId) return;

    const fetchUserData = async () => {
      try {
        const data = await getRequest(`auth/getUserById/${UserId}`);
        console.log("data", data?.data?.data);

        const userData = data?.data?.data;

        setFormData({
          name: userData?.name || "",
          email: userData?.email || "",
          phone: userData?.phone || "",
          dob: userData?.dob || "11/8/1998",
          gender: userData?.gender || "",
          age:
            userData?.age ||
            (userData?.dob ? calculateAge(userData.dob) : null),
          profileImage: userData?.profileImage || null,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [UserId]);

  const [originalData, setOriginalData] = useState(formData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = "Please enter a valid age";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleChange = (field, value) => {
    let updatedData = { ...formData, [field]: value };

    // Auto-calculate age when DOB changes
    if (field === "dob" && value) {
      updatedData.age = calculateAge(value);
    }

    setFormData(updatedData);

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleEdit = () => {
    setOriginalData(formData);
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setEditMode(false);
    setErrors({});
  };

  const handleUpdate = () => {
    if (validateForm()) {
      console.log("Updated Profile Data:", formData);
      setEditMode(false);
      setErrors({});
      // Show success message or handle API call here
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, profileImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 pt-42">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <SidebarNav
            formData={formData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleEdit={handleEdit}
          />

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-[#006ca7] p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold">Profile Information</h1>
                    <p className="text-blue-100 mt-1">
                      Manage your personal details
                    </p>
                  </div>
                  {!editMode && (
                    <button
                      className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all border border-white/30 cursor-pointer"
                      onClick={handleEdit}
                    >
                      <Edit3 size={16} className="inline mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-8">
                {/* Profile Picture Section */}
                <div className="flex items-center gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-4xl text-white font-bold shadow-lg">
                      {formData.profileImage ? (
                        <img
                          src={formData.profileImage}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        getInitials(formData.name)
                      )}
                    </div>
                    {editMode && (
                      <label className="absolute -bottom-2 -right-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 cursor-pointer shadow-lg transition-all">
                        <Camera size={16} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">
                      Hi, {formData.name}!
                    </h3>
                    <p className="text-gray-600 mt-1">{formData.email}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {formData.gender}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formData.age || "24"} years old
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">
                      Full Name
                    </label>
                    {editMode ? (
                      <div>
                        <input
                          type="text"
                          value={formData?.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                            errors.name
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 focus:border-blue-500"
                          }`}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border-2 border-transparent">
                        {formData.name}
                      </div>
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">
                      Mobile Number
                    </label>
                    <div className="px-4 py-3 bg-gray-100 rounded-lg border-2 border-transparent text-gray-500">
                      <Phone size={16} className="inline mr-2" />
                      +91 {formData?.phone}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">
                      Email Address
                    </label>
                    <div className="px-4 py-3 bg-gray-100 rounded-lg border-2 border-transparent text-gray-500">
                      <Mail size={16} className="inline mr-2" />
                      {formData?.email|| "abc@gmail.com"}
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">
                      Gender
                    </label>
                    {editMode ? (
                      <div className="flex gap-6 px-4 py-3">
                        {["Male", "Female", "Other"].map((gender) => (
                          <label
                            key={gender}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              value={gender}
                              checked={formData?.gender === gender}
                              onChange={(e) =>
                                handleChange("gender", e.target.value)
                              }
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-gray-700">{gender}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border-2 border-transparent">
                        <User size={16} className="inline mr-2" />
                        {formData?.gender}
                      </div>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">
                      Date of Birth
                    </label>
                    {editMode ? (
                      <div>
                        <input
                          type="date"
                          value={formData.dob || "11/8/1998" }
                          onChange={(e) => handleChange("dob", e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                            errors.dob
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 focus:border-blue-500"
                          }`}
                        />
                        {errors.dob && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.dob}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border-2 border-transparent">
                        <Calendar size={16} className="inline mr-2" />
                        {formatDate(formData.dob)}
                      </div>
                    )}
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">
                      Age
                    </label>
                    {editMode ? (
                      <div>
                        <input
                          type="number"
                          value={formData.age || 24}
                          onChange={(e) =>
                            handleChange("age", parseInt(e.target.value))
                          }
                          min="1"
                          max="120"
                          className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all ${
                            errors.age
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 focus:border-blue-500"
                          }`}
                          placeholder="Enter age"
                        />
                        {errors.age && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.age}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border-2 border-transparent">
                        {formData?.age || 24} years
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {editMode && (
                  <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleCancel}
                      className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all font-medium cursor-pointer"
                    >
                      <X size={16} className="inline mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg font-medium cursor-pointer"
                    >
                      <Check size={16} className="inline mr-2 cursor-pointer" />
                      Update Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      

    </div>
  );
};

export default UserProfile;
