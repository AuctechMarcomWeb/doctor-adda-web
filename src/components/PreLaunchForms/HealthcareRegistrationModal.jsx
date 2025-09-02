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

  const handleProfileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleUploadProfile = async () => {
    if (!profileFile) return;
    try {
      const formDataData = new FormData();
      formDataData.append("file", profileFile);
      const response = await postRequest({
        url: `upload/uploadImage`,
        cred: formDataData,
      });
      const uploadedUrl = response?.data?.data?.imageUrl;
      setFormData((prev) => ({ ...prev, profileImage: uploadedUrl }));
      console.log("Profile uploaded:", uploadedUrl);
    } catch (err) {
      console.error("Error uploading profile image:", err);
    }
  };

  const handleImagesSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setImagesFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagesPreview(previews);
  };

  const handleUploadImages = async () => {
    try {
      const uploadedUrls = [];
      for (const file of imagesFiles) {
        const formDataData = new FormData();
        formDataData.append("file", file);
        const response = await postRequest({
          url: `upload/uploadImage`,
          cred: formDataData,
        });
        console.log("Image upload response pre launch", response);

        uploadedUrls.push(response?.data?.data?.imageUrl);
      }
      setFormData((prev) => ({ ...prev, images: uploadedUrls }));
      console.log("Images uploaded:", uploadedUrls);
    } catch (err) {
      console.error("Error uploading images:", err);
    }
  };

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
        return [
          ...commonFields,
          "hospitalName",
          "bedCapacity",
          "specializations",
        ];
      case "doctor":
        return [
          ...commonFields,
          "qualification",
          "specialization",
          "experience",
        ];
      case "diagnostic":
        return [...commonFields, "centerName", "services", "equipments"];
      case "pharmacy":
        return [...commonFields, "centerName", "services", "equipments"];
      default:
        return commonFields;
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isFormComplete) {
  //     alert("Registration submitted successfully!");
  //     setIsModalOpen(false);
  //   }
  // };

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
    </div>
  );

 const renderForm = () => {
  switch (selectedCard) {
    case "ambulance":
      return <AmbulanceRegistrationForm renderInput={renderInput} />;
    case "hospital":
      return <HospitalRegistrationForm renderInput={renderInput}
       formData={formData}
          setFormData={setFormData} />;
    case "doctor":
      return (
        <DoctorRegistrationForm
          renderInput={renderInput}
          formData={formData}
          setFormData={setFormData}
        />
      );
    case "diagnostic":
      return <DiagnosticsRegistrationForms renderInput={renderInput} 
        formData={formData}
          setFormData={setFormData}
      />;
    case "pharmacy":
      return <PharmacyRegistrationForms
       renderInput={renderInput} />;
    default:
      return null;
  }
};

  if (!isModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormComplete) {
      alert("Please fill all required fields");
      return;
    }

    try {
      let payload = {};

      switch (selectedCard) {
        case "doctor":
          payload = {
            schemaType: "Doctor",
            userId: formData.userId, // get this from logged in user
            phone: formData.phone,
            latitude: formData.latitude,
            longitude: formData.longitude,
            fullName: formData.name,
            gender: formData.gender,
            dob: formData.dob,
            email: formData.email,
            profilepic: formData.profileImage,
            experience: formData.experience,
            serviceType: formData.serviceType,
            about: formData.about,
            education: formData.education,
            category: formData.category,
            hospital: formData.hospital,
            profileImages: formData.profileImages,
            clinics: [
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
                location: { type: "Point", coordinates: [0, 0] },
              },
            ],
          };
          break;

        case "hospital":
          payload = {
            schemaType: "Hospital",
            name: formData.hospitalName,
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
            facilities: [{name: "", discription:""}],
            ownerDetails: formData.ownerDetails || {},
            accountType: "Hospital",
            isApprove: "Approved",
            profileImages: formData.images || [],
          };
          break;

        case "ambulance":
          payload = {
            schemaType: "Ambulance",
            name: formData.name,
            licenseNumber: formData.licenseNumber,
            phone: formData.phone,
            latitude: formData.latitude,
            longitude: formData.longitude,
            address: formData.address,
            vehicleCount: formData.vehicleCount,
            profilepic: formData.profileImage,
            profileImages: formData.images || [],
          };
          break;

        case "diagnostic":
          payload = {
            schemaType: "Diagnostic",
            centerName: formData?.centerName,
            phone: formData?.phone,
            email: formData.email,
            latitude: formData?.latitude,
            longitude: formData?.longitude,
            address: formData?.address,
            description: formData?.description,
            services: formData?.services || [],
            packages: formData?.packages || [],
            storeTiming:formData?.storeTiming,
            startTime:formData?.startTime,
            endTime:formData?.endTime,
            profileImage: formData?.profileImage,
            profileImages: formData?.images || [],

          };
          break;

        case "pharmacy":
          payload = {
            schemaType: "Pharmacy",
            centerName: formData?.pharmacyName,
            phone: formData?.phone,
            email: formData.email,
            latitude: formData?.latitude,
            longitude: formData?.longitude,
            address: formData?.address,
            storeTiming: formData?.storeTiming,
            services: formData?.services || [],
            ownerDetails: formData?.ownerDetails || {},
            profileImage: formData?.profileImage,
            profileImages: formData?.images || [],
            onlinePayment: true,
            cod: true,
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
                    <div className="mt-2">
                      <img
                        src={profilePreview}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover border"
                      />
                      <button
                        type="button"
                        onClick={handleUploadProfile}
                        className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded"
                      >
                        Upload
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
                        <img
                          key={idx}
                          src={src}
                          alt={`preview-${idx}`}
                          className="w-20 h-20 object-cover rounded border"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={handleUploadImages}
                        className="px-3 py-1 bg-indigo-600 text-white rounded"
                      >
                        Upload All
                      </button>
                    </div>
                  )}
                </div>

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
          Registration is required to access our platform. All information is
          secure and confidential.
        </div>
      </div>
    </div>
  );
};

export default HealthcareRegistrationModal;
