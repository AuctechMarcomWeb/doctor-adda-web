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
  Calendar,
} from "lucide-react";
import { getRequest, postRequest } from "../Helpers/index";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LocationSearchInput from "./LocationSearchInput";

const DoctorsRegistration = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const { userProfileData, isLoggedIn } = useSelector((state) => state.user);
  const userId = userProfileData?._id;
  // Profile Image states
  const [profileFile, setProfileFile] = useState(null);
  const [uploadProfileImage, setUploadProfileImage] = useState("");
  const [profilePreview, setProfilePreview] = useState(null);
  // Add new states for documents
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const [documents, setDocuments] = useState([]);
  const [docIndex, setDocIndex] = useState(0);
  // Clinic state
  const [clinics, setClinics] = useState([
    {
      clinicName: "fghfgh",
      clinicAddress: "fghf",
      consultationFee: "200",
      startTime: "6:00 am",
      endTime: "7:00am",
      duration: "",
      videoStartTime: "6:00 PM",
      videoEndTime: "6:15PM",
      videoDuration: "",
      location: {
        type: "Point",
        coordinates: [77.5946, 12.9716], // Static default (Bangalore)
      },
      availability: [
        {
          date: "24/08/2025",
          isAvailable: true,
          slots: [{ startTime: "", endTime: "", isBooked: false }],
        },
      ],
      videoAvailability: [
        {
          date: "24/08/2025",
          isAvailable: true,
          slots: [{ startTime: "", endTime: "", isBooked: false }],
        },
      ],
    },
  ]);
  console.log("clinic", clinics);

  const [formData, setFormData] = useState({
    phone: "1153348863",
    fullName: "Dr. Jane Doe",
    gender: "",
    dob: "",
    accountType: "Doctor",
    email: "abc@gmail.com",
    latitude: "26.8853856",
    longitude: "80.99742805555556",
    profilepic: "",
    experience: "10 years",
    serviceType: "",
    address: "123 Main Street, Bangalore",
    about:
      "Experienced physician with a focus on primary care and chronic disease management.",
    education: "MBBS, MD",
    category: [],
    documentImage: [],
    veterinaryserviceType: "",
  });
  console.log("form data", formData);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getRequest("category");
        console.log("fetched category", response?.data?.data?.categories);
        setCategories(response?.data?.data?.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await getRequest("hospital");
        console.log("Fetched hospitals:", response?.data?.data?.hospitals);
        setHospitalList(response?.data?.data?.hospitals || []);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  const handleSubmit = async () => {
    console.log("start submit data");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("step 2");

    if (!formData?.profilepic) {
      setErrors({ profilepic: "Please upload a profile image" });
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const payload = {
        ...formData,
        clinics,
        documentImage: documents.map((doc) => doc.url),
      };
      console.log("Final payload before submit:", payload);
      const response = await postRequest({
        url: `doctor/registers/${userId}`,
        cred: payload,
      });

      console.log("Doctors Register Response:", response);
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

  const validateForm = () => {
    const newErrors = {};

    // Required Fields Validation
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.category) newErrors.category = "Category is required";
    // clinics.forEach((clinic, i) => {
    //   if (!clinic.clinicName)
    //     newErrors[`clinicName_${i}`] = "Clinic name is required";
    //   if (!clinic.consultationFee)
    //     newErrors[`consultationFee_${i}`] = "Consultation fee is required";
    // });
    if (
      formData.serviceType === "In-clinic" ||
      formData.serviceType === "Video Consultation"
    )
    console.log("step3", newErrors);

    return newErrors;
  };
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
      setFormData((prev) => ({ ...prev, profilepic: uploadedUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
    uploadImage(file);
  };

  // handle input changes
  const handleClinicChange = (index, field, value) => {
    setClinics((prevClinics) => {
      const updatedClinics = [...prevClinics];
      updatedClinics[index] = { ...updatedClinics[index], [field]: value };
      return updatedClinics;
    });
  };

  // Add new clinic
  const addClinic = () => {
    setClinics([
      ...clinics,
      {
        clinicName: "",
        clinicAddress: "",
        consultationFee: "",
        startTime: "",
        endTime: "",
        duration: "",
        videoStartTime: "",
        videoEndTime: "",
        videoDuration: "",
        location: {
          type: "Point",
          coordinates: [],
        },
      },
    ]);
  };

  // Remove clinic
  const removeClinic = (index) => {
    const updatedClinics = [...clinics];
    updatedClinics.splice(index, 1);
    setClinics(updatedClinics);
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gallery handlers
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newFiles = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setGalleryImages((prev) => [...prev, ...newFiles]);
  };

  const removeGalleryImage = (index) => {
    const updated = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updated);
    if (galleryIndex >= updated.length) setGalleryIndex(0);
  };

  // Document handlers
  const uploadDocument = async (file) => {
    try {
      const formDataData = new FormData();
      formDataData.append("file", file);

      const response = await postRequest({
        url: `upload/uploadImage`,
        cred: formDataData,
      });
      console.log("doc uploaded successfully:", response?.data?.data?.imageUrl);
      const uploadedUrl = response?.data?.data?.imageUrl;
      if (uploadedUrl) {
        setDocuments((prev) => [
          ...prev,
          {
            url: uploadedUrl, // make sure it's 'url' here
            name: file.name,
          },
        ]);
      }
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  // multiple upload handler
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach((file) => {
      uploadDocument(file);
    });
  };

  // remove doc
  const removeDocument = (index) => {
    const updated = documents.filter((_, i) => i !== index);
    setDocuments(updated);
    if (docIndex >= updated.length) setDocIndex(0);
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
            Doctor Registration
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
              <p className="text-gray-600">Doctor registered successfully!</p>
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
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Center Name
                </label>
                <input
                  type="text"
                  value={formData?.fullName}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter diagnostic center name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs">{errors?.fullName}</p>
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

            {/* BIRTH Date*/}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Birth Date */}
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4 text-red-600" />
                  Birth Date
                </label>
                <input
                  type="date"
                  value={formData?.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                />
                {errors?.dob && (
                  <p className="text-red-500 text-xs">{errors?.dob}</p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 text-red-600" />
                  Gender
                </label>
                <select
                  value={formData?.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors?.gender && (
                  <p className="text-red-500 text-xs">{errors?.gender}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700">
                  Select Your Specialization
                </label>
                <select
                  value={formData?.category[0] || ""}
                  onChange={(e) =>
                    handleInputChange("category", [e.target.value])
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Your Specialization
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                {errors?.categories && (
                  <p className="text-red-500 text-xs">{errors?.category}</p>
                )}
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700">
                  Provide Services
                </label>
                <select
                  value={formData?.serviceType}
                  onChange={(e) =>
                    handleInputChange("serviceType", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>
                    Provide Services
                  </option>
                  <option value="In-clinic">In-clinic</option>
                  <option value="Video Consultation">Video Consultation</option>
                </select>
                {errors?.serviceType && (
                  <p className="text-red-500 text-xs">{errors?.serviceType}</p>
                )}
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {/* <FileText className="w-4 h-4 text-red-600" /> */}
                Experience
              </label>
              <input
                type="text"
                value={formData?.experience}
                onChange={(e) =>
                  handleInputChange("experience", e.target.value)
                }
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="e.g.,5"
              />
              {errors?.experience && (
                <p className="text-red-500 text-xs">{errors?.experience}</p>
              )}
            </div>

            {/* Clinics Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Clinics</h3>
                <button
                  type="button"
                  onClick={addClinic}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Clinic
                </button>
              </div>

              <div className="space-y-3">
                {clinics.map((clinic, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl space-y-6 relative"
                  >
                    {/* Remove button */}
                    {clinics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeClinic(index)}
                        className="absolute top-2 right-2 text-red-600 hover:bg-red-100 rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}

                    {/* Row 1 → Clinic Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Clinic Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Clinic Name"
                        value={clinic?.clinicName}
                        onChange={(e) =>
                          handleClinicChange(
                            index,
                            "clinicName",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Row 2 → Clinic Availability */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Clinic Availability
                      </label>
                      <div className="grid md:grid-cols-3 gap-4">
                        <input
                          type="time"
                          value={clinic?.startTime}
                          onChange={(e) =>
                            handleClinicChange(
                              index,
                              "startTime",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500"
                          placeholder="Select Time"
                        />
                        <input
                          type="time"
                          value={clinic?.endTime}
                          onChange={(e) =>
                            handleClinicChange(index, "endTime", e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500"
                          placeholder="Select Time"
                        />
                        <select
                          value={clinic?.duration}
                          onChange={(e) =>
                            handleClinicChange(
                              index,
                              "duration",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Duration Per Patient</option>
                          <option value="15">15 min</option>
                          <option value="30">30 min</option>
                          <option value="45">45 min</option>
                          <option value="60">60 min</option>
                          <option value="90">90 min</option>
                          <option value="120">120 min</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3 → Video Consulting Availability */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Video Consulting Availability
                      </label>
                      <div className="grid md:grid-cols-3 gap-4">
                        <input
                          type="time"
                          value={clinic?.videoStartTime}
                          onChange={(e) =>
                            handleClinicChange(
                              index,
                              "videoStartTime",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="Select Time"
                        />
                        <input
                          type="time"
                          value={clinic?.videoEndTime}
                          onChange={(e) =>
                            handleClinicChange(
                              index,
                              "videoEndTime",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="Select Time"
                        />
                        <select
                          value={clinic?.videoDuration}
                          onChange={(e) =>
                            handleClinicChange(
                              index,
                              "videoDuration",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Duration Per Patient</option>
                          <option value="15">15 min</option>
                          <option value="30">30 min</option>
                          <option value="45">45 min</option>
                          <option value="60">60 min</option>
                          <option value="90">90 min</option>
                          <option value="120">120 min</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4 → Consultation Fee */}
                    <div className="grid md:grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Consultation Fee
                        </label>
                        <input
                          type="number"
                          placeholder="₹ Fee"
                          value={clinic?.consultationFee}
                          onChange={(e) =>
                            handleClinicChange(
                              index,
                              "consultationFee",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Row 5  Location + Address */}
                    <div className="grid md:grid-cols-1 gap-4">
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
                          <p className="text-red-500 text-xs">
                            {errors?.address}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-700">
                Affiliated Hospital
              </label>
              <select
                value={formData?.hospitalId || ""}
                onChange={(e) =>
                  handleInputChange("hospitalId", e.target.value)
                }
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
              >
                <option value="" disabled>
                  Select Hospital
                </option>
                {hospitalList.map((hospital) => (
                  <option key={hospital._id} value={hospital._id}>
                    {hospital.name}
                  </option>
                ))}
              </select>

              {errors?.hospitalId && (
                <p className="text-red-500 text-xs">{errors?.hospitalId}</p>
              )}
            </div>

            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {/* <FileText className="w-4 h-4 text-red-600" /> */}
                About
              </label>
              <input
                type="text"
                value={formData?.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="Tell us about yourself"
              />
              {errors?.about && (
                <p className="text-red-500 text-xs">{errors?.about}</p>
              )}
            </div>

            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {/* <FileText className="w-4 h-4 text-red-600" /> */}
                Education
              </label>
              <input
                type="text"
                value={formData?.education}
                onChange={(e) => handleInputChange("education", e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="Tell us about yourself"
              />
              {errors?.education && (
                <p className="text-red-500 text-xs">{errors?.education}</p>
              )}
            </div>

            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {/* <FileText className="w-4 h-4 text-red-600" /> */}
                MCI Registration Number
              </label>
              <input
                type="number"
                value={formData?.mci}
                onChange={(e) => handleInputChange("mci", e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="Tell us about yourself"
              />
              {errors?.mci && (
                <p className="text-red-500 text-xs">{errors?.mci}</p>
              )}
            </div>

            <div className="space-y-2 group">
              <p className="text-gray-700 font-medium font-semibold">
                Select Images to showcase your pharmacy
              </p>

              {galleryImages.length > 0 && (
                <div className="relative w-full h-56 border rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden">
                  <img
                    src={galleryImages[galleryIndex].url}
                    alt="preview"
                    className="h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(galleryIndex)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-2 flex gap-2">
                    {galleryImages.map((_, i) => (
                      <span
                        key={i}
                        onClick={() => setGalleryIndex(i)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                          galleryIndex === i ? "bg-green-600" : "bg-gray-300"
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>
              )}

              <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
                <span className="flex items-center gap-2">➕ Add Images</span>
              </label>
            </div>

            <div className="space-y-2 group">
              <p className="text-gray-700 font-medium font-semibold">
                Upload Documents
              </p>

              {documents.length > 0 && (
                <div className="relative w-full h-56 border rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden">
                  <img
                    src={documents[docIndex].url}
                    alt="document"
                    className="h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => removeDocument(docIndex)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-2 flex gap-2">
                    {documents.map((_, i) => (
                      <span
                        key={i}
                        onClick={() => setDocIndex(i)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                          docIndex === i ? "bg-green-600" : "bg-gray-300"
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>
              )}

              <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleDocumentUpload}
                  className="hidden"
                />
                <span className="flex items-center gap-2">
                  📄 Upload Documents
                </span>
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
                {loading ? "Registering..." : "Register Doctors"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsRegistration;
