/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useState } from "react";
import { Truck, Building, User, Activity, Plus, MapPin } from "lucide-react";
import logo from "../../assets/dr-adda-logo.png";
import { postRequest } from "../../Helpers";
import LocationSearchInput from "../LocationSearchInput";
import DoctorsRegistration from "../DoctorsRegistration";
import DoctorRegistrationForm from "./DoctorForms/DoctorRegistrationForms";
import HospitalRegistrationForm from "./HospitalForms/HospitalregistrationForms";
import AmbulanceRegistrationForm from "./AmbulanceForms/AmbulanceRegistrationForms";
import DiagnosticsRegistrationForms from "./DiagnosticsForms/DiagnosticsRegistrationForms";
import PharmacyRegistrationForms from "./PharmacyForms/PharmacyRegistrationForms";

const HealthcareRegistrationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedCard, setSelectedCard] = useState("");
  const [formData, setFormData] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [imagesPreview, setImagesPreview] = useState([]);
  const [imagesFiles, setImagesFiles] = useState([]);

  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [errors, setErrors] = useState({});

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

  // const handleProfileSelect = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   setProfileFile(file);
  //   setProfilePreview(URL.createObjectURL(file));
  // };
  const handleProfileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
    await handleUploadProfile(file); // auto upload after select
  };

  const handleUploadProfile = async (file) => {
    if (!file) return;
    setUploadingProfile(true);
    try {
      const formDataData = new FormData();
      formDataData.append("file", file);
      const response = await postRequest({
        url: `upload/uploadImage`,
        cred: formDataData,
      });
      const uploadedUrl = response?.data?.data?.imageUrl;
      setFormData((prev) => ({ ...prev, profileImage: uploadedUrl }));
      console.log("Profile uploaded:", uploadedUrl);
    } catch (err) {
      console.error("Error uploading profile image:", err);
    } finally {
      setUploadingProfile(false);
    }
  };

  const handleImagesSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setImagesFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagesPreview(previews);
    await handleUploadImages(files); // auto upload after select
  };

  const handleUploadImages = async (files) => {
    setUploadingImages(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const formDataData = new FormData();
        formDataData.append("file", file);
        const response = await postRequest({
          url: `upload/uploadImage`,
          cred: formDataData,
        });
        uploadedUrls.push(response?.data?.data?.imageUrl);
      }

      setFormData((prev) => ({
        ...prev,
        profileImages: [...(prev.profileImages || []), ...uploadedUrls],
      }));

      console.log("Images uploaded:", uploadedUrls);
    } catch (err) {
      console.error("Error uploading images:", err);
    } finally {
      setUploadingImages(false);
    }
  };

  // Remove a gallery image
  const handleRemoveImage = (index) => {
    setImagesPreview((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      profileImages: prev.profileImages?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleInputChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // Run validation for this field (only for scalars)
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));

    // Re-check completeness
    const requiredFields = getRequiredFields(selectedCard);
    const isComplete = requiredFields.every((f) => {
      const val = newFormData[f];

      if (Array.isArray(val)) {
        // ✅ array must have at least 1 item with no empty required subfields
        return (
          val.length > 0 &&
          val.every((obj) =>
            Object.values(obj).every((v) => v && v.toString().trim() !== "")
          )
        );
      }

      if (typeof val === "object" && val !== null) {
        // ✅ object must not be empty
        return Object.values(val).every((v) => v && v.toString().trim() !== "");
      }

      // ✅ scalar (string/number) check
      return val && val.toString().trim() !== "" && !validateField(f, val);
    });

    setIsFormComplete(isComplete);
  };

  // utils/getRequiredFields.js

  const getRequiredFields = (type) => {
    switch (type) {
      case "doctor":
        return [
          "name",
          "email",
          "phone",
          "gender",
          "dob",
          "specialization",
          "category",
          "services", // must have at least 1
          "location", // Google API location
          "clinics", // must have at least 1
        ];

      case "hospital":
        return [
          "name",
          "email",
          "phone",
          "address",
          "description",
          "services", // must have at least 1
          "departments", // must have at least 1
          "operatingHours",
          "location",
        ];

      case "pharmacy":
        return [
          "name",
          "email",
          "phone",
          "address",
          "description",
          "operatingHours",
          "location",
        ];

      case "ambulance":
        return [
          "name",
          "email",
          "phone",
          "address",
          "description",
          "operatingHours",
          "ambulanceType",
          "ambulanceNumber",
          "drivers", // must have at least 1
        ];

      default:
        return [];
    }
  };

  const validateField = (field, value) => {
    let error = "";

    if (!value || value.trim() === "") {
      error = "This field is required";
    } else {
      if (field === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "Invalid email format";
        }
      }
      if (field === "phone") {
        const phoneRegex = /^[0-9]{10}$/; // 10 digits only
        if (!phoneRegex.test(value)) {
          error = "Invalid phone number";
        }
      }
    }

    return error;
  };

  const renderInput = (label, type, field, placeholder, rows) => (
    <div className="space-y-1 relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {type === "textarea" && field !== "address" ? (
        <textarea
          placeholder={placeholder}
          rows={rows || 3}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      ) : field === "address" ? (
        <LocationSearchInput
          value={formData[field] || ""}
          onSelect={(locData) => {
            // locData contains address, latitude, longitude, location
            setFormData((prev) => ({
              ...prev,
              address: locData.address,
              latitude: locData.latitude,
              longitude: locData.longitude,
              location: locData.location,
            }));

            // Check if form is complete
            const requiredFields = getRequiredFields(selectedCard);
            const isComplete = requiredFields.every(
              (f) => formData[f] && formData[f].trim() !== ""
            );
            setIsFormComplete(isComplete);
          }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      )}
      {errors[field] && (
        <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const renderForm = () => {
    switch (selectedCard) {
      case "ambulance":
        return (
          <AmbulanceRegistrationForm
            renderInput={renderInput}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "hospital":
        return (
          <HospitalRegistrationForm
            renderInput={renderInput}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "doctor":
        return (
          <DoctorRegistrationForm
            renderInput={renderInput}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "diagnostic":
        return (
          <DiagnosticsRegistrationForms
            renderInput={renderInput}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "pharmacy":
        return <PharmacyRegistrationForms renderInput={renderInput} />;
      default:
        return null;
    }
  };

  if (!isModalOpen) return null;

  const validateForm = () => {
    const requiredFields = getRequiredFields(selectedCard);
    let newErrors = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setIsFormComplete(isValid);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!isFormComplete) {
    //   alert("Please fill all required fields");
    //   return;
    // }

    try {
      let payload = {};

      switch (selectedCard) {
        case "doctor":
          payload = {
            schemaType: "Doctor",
            phone: formData?.phone || null,
            fullName: formData?.name || null,
            gender: formData?.gender || null,
            dob: formData?.dob || null,
            email: formData?.email || null,
            profilepic: formData?.profileImage || null,
            experience: formData?.experience || null,
            serviceType: formData?.serviceType || null,
            about: formData?.about || null,
            education: formData?.education || null,
            category: formData?.category || null,
            hospital: formData?.hospital || null,
            profileImages: formData?.profileImages || [], // ✅ unified gallery
            clinics: formData?.clinics || [],
            latitude: formData?.clinics[0]?.location?.coordinates[0],
            longitude: formData?.clinics[0]?.location?.coordinates[1],
          };
          break;

        case "hospital":
          payload = {
            schemaType: "Hospital",
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            latitude: formData.latitude,
            longitude: formData.longitude,
            address: formData.address,
            profileImage: formData.profileImage,
            description: formData.description,
            doctors: formData.doctors || [],
            categories: formData.categories || [],
            healthCard: formData.healthCard || [],
            facilities: [{ name: "", discription: "" }],
            ownerDetails: formData.ownerDetails || {},
            profileImages: formData.profileImages || [],
          };
          break;

        case "ambulance":
          payload = {
            schemaType: "Ambulance",
            name: formData?.name,
            email: formData?.email,
            phone: formData?.phone,
            address: formData?.address || "1090 chauraha",
            latitude: formData?.latitude || "26.8469242",
            longitude: formData?.longitude || "80.9659187",
            description: formData?.description,
            operatingHours: formData?.operatingHours,
            ambulanceType: formData?.ambulanceType,
            ambulanceNumber: formData?.ambulanceNumber,
            capacity: formData?.capacity,
            price: formData?.price,
            emergencyContact: formData?.emergencyContact,
            availabilityStatus: formData?.availabilityStatus,
            profilepic: formData?.profileImage,
            profileImages: formData?.profileImages || [],
            drivers: formData?.drivers || [],
            ownerDetails: formData?.ownerDetails || [],
          };
          break;

        case "diagnostic":
          payload = {
            schemaType: "Diagnostic",
            name: formData?.name, // ✅ not centerName
            email: formData?.email,
            phone: formData?.phone,
            email: formData?.email,
            latitude: formData?.latitude,
            longitude: formData?.longitude,
            address: formData?.address,
            description: formData?.description,
            services: formData?.services || [],
            packages: formData?.packages || [],
            storeTiming: formData?.storeTiming,
            startTime: formData?.startTime,
            endTime: formData?.endTime,
            profileImage: formData?.profileImage,
            profileImages: formData?.profileImages || [], // ✅ not images
          };
          break;

        case "pharmacy":
          payload = {
            schemaType: "Pharmacy",
            name: formData?.name, // ✅ not pharmacyName
            email: formData?.email,
            phone: formData?.phone,
            email: formData?.email,
            latitude: formData?.latitude,
            longitude: formData?.longitude,
            address: formData?.address,
            storeTiming: formData?.storeTiming,
            services: formData?.services || [], // ✅ synced from form state
            ownerDetails: {
              ownerName: formData?.ownerName,
              gstNumber: formData?.gstNumber,
              phoneNumber: formData?.phoneNumber,
            },
            profileImage: formData?.profileImage,
            profileImages: formData?.profileImages || [], // ✅ consistent
            onlinePayment: formData?.onlinePayment === "true", // ✅ from form
            cod: formData?.cod === "true", // ✅ from form
          };
          break;

        default:
          break;
      }
      console.log("Payload prelaunch", payload);

      // Send API request
      const response = await postRequest({
        url: "preLaunch",
        cred: payload,
      });

      const result = response;
      console.log("Registration success:", result);
      alert("Registration submitted successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("Failed to submit registration. Please try again.");
    }
  }; //8707767805

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
                    onClick={() => {
                      setSelectedCard(card.id);
                      // reset profile + gallery images
                      setProfilePreview(null);
                      setProfileFile(null);
                      setImagesPreview([]);
                      setImagesFiles([]);
                      setFormData((prev) => ({
                        ...prev,
                        profileImage: null,
                        profileImages: [],
                      }));
                    }}
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
                {/* Profile Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileSelect}
                  />
                  {profilePreview && (
                    <div className="mt-2 relative inline-block">
                      <img
                        src={profilePreview}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover border"
                      />
                      {uploadingProfile && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-full">
                          <span className="loader border-t-2 border-indigo-600 w-6 h-6 rounded-full animate-spin"></span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setProfilePreview(null);
                          setProfileFile(null);
                          setFormData((prev) => ({
                            ...prev,
                            profileImage: null,
                          }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Multiple Images Upload */}
                <div className="space-y-2 mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Gallery Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesSelect}
                  />
                  {imagesPreview.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {imagesPreview.map((src, idx) => (
                        <div key={idx} className="relative w-20 h-20">
                          <img
                            src={src}
                            alt={`preview-${idx}`}
                            className="w-20 h-20 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {uploadingImages && (
                        <div className="flex items-center justify-center w-20 h-20 border rounded">
                          <span className="loader border-t-2 border-indigo-600 w-6 h-6 rounded-full animate-spin"></span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    // disabled={!isFormComplete}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                      // isFormComplete
                      //   ? 
                        "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                        // : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {/* {isFormComplete ?*/}
                       "Complete Registration"
                      {/* : "Please fill all fields"} */}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 rounded-b-2xl text-center text-sm text-gray-600">
          Registration is required to access our platform. All information is
          secure and confidential.
        </div>
      </div>
    </div>
  );
};

export default HealthcareRegistrationModal;
