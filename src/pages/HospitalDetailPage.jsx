/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  MapPin,
  PhoneCall,
  BadgeCheck,
  Locate,
  CalendarCheck,
  Hospital,
  Stethoscope,
  Star,
  Clock,
  Shield,
  Award,
  Users,
  Heart,
  CheckCircle,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { getRequest } from "../Helpers";
import { useParams } from "react-router-dom";
import HospitalReviewForm from "../components/HospitalReviewForm";

const HospitalDetailPage = () => {

  const [hospital, setHospital] = useState(null);
  // console.log("hospitals=============???", hospital);

  const [activeTab, setActiveTab] = useState("about");
  const { id } = useParams();
  const [openReviewPopup, setOpenReviewPopup] = useState(false);
  const [reviews, setReviews] = useState([]);

  const fetchHospitalDetails = async (id) => {
    try {
      const res = await getRequest(`hospital/${id}`);
      console.log("Hospitals Details Page :", res?.data?.data);
      setHospital(res?.data?.data);
      setReviews(res?.data?.data?.reviews || []);
    } catch (error) {
      console.error("Error fetching hospitals", error);
    }
  };

  const handleAddReview = () => {
    setOpenReviewPopup(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      fetchHospitalDetails(id);
    }
  }, []);

  // Function to return correct icon based on facility name
const getFacilityIcon = (name = "") => {
  if (name.includes("Emergency Services")) return Heart;
  if (name.includes("24/7 Pharmacy")) return Clock;
  if (name.includes("ICU") || name.includes("NICU")) return Shield;
  if (name.includes("Blood Bank")) return Hospital;
  if (name.includes("Radiology") || name.includes("MRI") || name.includes("CT")) return BadgeCheck;
  if (name.includes("Pathology") || name.includes("Lab")) return Stethoscope;
  return Hospital; 
};

  const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Gynecology",
    "General Surgery",
    "Dermatology",
    "Psychiatry",
    "Oncology",
  ];

  const stats = [
    {
      label: "Years of Excellence",
      value: "25+",
      icon: <Award className="w-6 h-6" />,
    },
    {
      label: "Expert Doctors",
      value: "150+",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Successful Surgeries",
      value: "50K+",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      label: "Patient Satisfaction",
      value: "98%",
      icon: <Star className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-28">
      <div className="max-w-7xl mx-auto  py-8 space-y-8 ">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div
            className="absolute inset-0 "
            style={{
              background:
                "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
            }}
          ></div>
          <div className="relative grid lg:grid-cols-2 gap-8 p-8">
            {/* Hospital Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl z-10"></div>
              <img
                src="https://i.pinimg.com/736x/04/3e/5a/043e5ab7f8f04c4fad70c368a5be8094.jpg"
                alt="CityCare Hospital"
                className="w-full h-100  object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  NABH Accredited
                </span>
              </div>
            </div>

            {/* Hospital Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-white bg-clip-text text-transparent mb-3">
                  {hospital?.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span className="text-lg text-white">
                    {hospital?.address}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-white font-semibold">
                      {hospital?.averageRating} 
                      {/* //({hospital?.reviews} reviews) */}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-white text-lg leading-relaxed">
               {hospital?.description}
              </p>

              {/* Action Buttons */}
              <div className="grid sm:grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <PhoneCall className="w-5 h-5" />
                  Emergency Call
                </button>
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <CalendarCheck className="w-5 h-5" />
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-blue-600 mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex">
              <button
                className={`flex-1 py-6 px-8 text-lg font-semibold transition-all duration-300 ${
                  activeTab === "about"
                    ? "bg-white text-[#00659d] border-b-4 border-[#00659d] shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About {hospital?.name}
              </button>
              <button
                className={`flex-1 py-6 px-8 text-lg font-semibold transition-all duration-300 ${
                  activeTab === "review"
                    ? "bg-white text-[#00659d] border-b-4 border-[#00659d] shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("review")}
              >
                Patient Reviews
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "about" && (
              <div className="space-y-12">
                {/* About Section */}
                <div className="prose max-w-none">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    About {hospital?.name}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                        {hospital?.description}
                  </p>
                </div>

                {/* Facilities */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Hospital className="w-6 h-6 text-blue-600" />
                    World-Class Facilities
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hospital?.facilities.map((facility) => {
                            const Icon = getFacilityIcon(facility.name)
                      return(
                      <div
                        key={facility._id}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                       <Icon className="w-5 h-5 text-blue-600" /> 
                          <span className="font-semibold text-gray-800">
                            {facility.name}
                          </span>
                        </div>
                      </div>
                      );
})}
                  </div>
                </div>

                {/* Departments */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                    Medical Departments
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {hospital?.categories?.map((dept) => (
                      <div
                        key={dept._id}
                        className="bg-white border-2 border-gray-100 hover:border-blue-300 rounded-lg px-4 py-3 text-center transition-all duration-300 hover:shadow-md"
                      >
                        <span className="text-gray-700 font-medium">
                          {dept?.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Doctors */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Our Expert Doctors
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hospital?.doctors?.map((doc) => (
                      <div
                        key={doc._id}
                        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex flex-col items-center text-center">
                          <img
                            src={
                              doc?.image || "https://img.freepik.com/free-photo/portrait-female-doctor_144627-39388.jpg"
                            }
                            alt={doc?.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mb-4"
                          />
                          <h4 className="text-xl font-bold text-gray-800 mb-1">
                            {doc?.name}
                          </h4>
                          <p className="text-blue-600 font-semibold mb-2">
                            {doc?.specialization}
                          </p>
                          <p className="text-gray-600 text-sm mb-3">
                            {doc?.experience}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-gray-700 font-semibold">
                              {doc?.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <Navigation className="w-6 h-6 text-blue-600" />
                    Location & Directions
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">
                    {hospital?.address}
                  </p>
                  <button className="bg-[#00659d] text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl">
                    <Locate className="w-5 h-5" />
                    Get Directions
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {activeTab === "review" && (
              <div className="space-y-8">
                <div className="mb-8 flex flex-row justify-between">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Customer Reviews
                  </h2>

                  <button
                  onClick={() =>handleAddReview()}
                   className="bg-[#00659d] text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                   Add Review
                  </button>
                  

                </div>


              

                {
                hospital?.reviews?.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      <img
                        src={'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'}
                        alt={review.user}
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 mx-auto sm:mx-0"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                          <div>
                          <h4 className="text-xl font-bold text-gray-800">
                            {review?.user?.name || "user"}
                          </h4>

                          </div>
                          <div className="flex text-yellow-400 mt-2 sm:mt-0">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < review.rating
                                    ? "fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg italic">
                          "{review.comment}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-center">
                  <button className="bg-[#00659d] text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                    View All Reviews
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#00659d] rounded-3xl p-8 text-white text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Premium Healthcare?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Book your appointment today and discover why thousands trust
            CityCare Hospital
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#00659d] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Book Appointment Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#00659d] transition-all duration-300">
              Call +91-9876543210
            </button>
          </div>
        </div>


        <HospitalReviewForm

        open={openReviewPopup}
        onClose={() => setOpenReviewPopup(false)}
        hospitalId={id}
        onReviewAdded={review => setReviews([...reviews, review])}

      />
      </div>

      
      
    </div>
  );
};

export default HospitalDetailPage;
