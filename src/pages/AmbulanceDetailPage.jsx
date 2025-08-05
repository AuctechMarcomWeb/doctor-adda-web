/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Star, MapPin, PhoneCall, BadgeCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { getRequest } from "../Helpers";

const AmbulanceDetailPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [ambulance, setAmbulance] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getRequest(`ambulance/${id}`)
      .then((res) => {
        console.log("ambulance ===", res?.data?.data);
        setAmbulance(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [id]);


 const phoneNumber = "102";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [showFallback, setShowFallback] = useState(false);

  const tryTelLink = () => {
    const telUrl = `tel:${phoneNumber}`;
    const timeout = setTimeout(() => {
      // If nothing happened → show fallback popup
      setShowFallback(true);
    }, 1500);

    window.location.href = telUrl;

    // If the page is hidden (meaning app opened), cancel timeout
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearTimeout(timeout);
    });
  };

  const handleClick = () => {
    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      tryTelLink();
    }
  };

  return (
    <div className="max-w-7xl mx-auto  py-10 space-y-8 pt-40">
      {/* Heading */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow overflow-hidden flex">
          <img
            src={ambulance?.profilepic || "N/A"}
            alt="Ambulance"
            className="w-full h-130 object-cover object-center"
          />
        </div>

        {/* Right Side - Basic Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h1 className="text-2xl font-bold text-[#00679f] mb-2">
              {ambulance?.name || "N/A"}
            </h1>
            <p className="text-gray-600 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-red-500" />{" "}
              {ambulance?.address || "N/A"}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <strong>Price:</strong> {ambulance?.price || "N/A"}
            </p>
            <p>
              <strong>Capacity:</strong> {ambulance?.capacity || "N/A"} Patients
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-green-600 font-medium">
                {ambulance?.availabilityStatus || "N/A"}
              </span>
            </p>
            <p>
              <strong>Approval:</strong>{" "}
              <BadgeCheck className="inline w-4 h-4 text-blue-500" />{" "}
              {ambulance?.isApprove || "N/A"}
            </p>
            <p>
              <strong>Operating Hours:</strong>{" "}
              {ambulance?.operatingHours || "N/A"}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 space-y-2 text-sm">
            <p>
              <strong>Driver:</strong> {ambulance?.driverInfo?.name || "N/A"}
            </p>
            <p>
              <strong>Mobile No:</strong>{" "}
              {ambulance?.driverInfo?.mobile || "N/A"}{" "}
            </p>
            <p>
              <strong>License No:</strong>{" "}
              {ambulance?.driverInfo?.licenseNumber || "N/A"}
            </p>
            <p>
              <strong>Emergency Contact:</strong>{" "}
              {ambulance?.driverInfo?.emergencyContact || "N/A"}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <button
  onClick={handleClick}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200 text-sm font-medium flex justify-center items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Call Now
            </button>
            {/* {showFallback && !isMobile && (
        <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50 w-64">
          <p className="text-sm mb-2">Call failed. Try using:</p>
          <button
            onClick={() => (window.location.href = `msteams://call/0/${phoneNumber}`)}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            📞 Microsoft Teams
          </button>
          <button
            onClick={() => (window.location.href = `skype:${phoneNumber}?call`)}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            📞 Skype
          </button>
          <button
            onClick={() =>
              window.open(`https://wa.me/${phoneNumber.replace(/\D/g, "")}`, "_blank")
            }
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            💬 WhatsApp Web
          </button>
        </div>
      )} */}

          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex gap-8">
            <button
              className={`pb-2 font-medium ${
                activeTab === "about"
                  ? "border-b-2 border-[#00679f] text-[#00679f] "
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`pb-2 font-medium ${
                activeTab === "review"
                  ? "border-b-2 border-[#00679f] text-[#00679f]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("review")}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* About Section */}
        {activeTab === "about" && (
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About {ambulance?.name || "N/A"}
              </h3>
              <p className="text-gray-700 text-justify">
                {ambulance?.name || "N/A"}
              </p>
              <p className="mt-2 text-gray-700 text-justify">
                {ambulance?.description || "N/A"}
              </p>
            </div>
          </div>
        )}

        {/* Review Section */}
        {activeTab === "review" && (
          <div className="space-y-6">
            {(ambulance.reviews || []).map((review, index) => (
              <div
                key={index}
                className="border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <img
                  src={review?.user?.profilepic}
                  alt={review?.user?.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-300"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review?.user?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        ({review?.user?.email})
                      </p>
                    </div>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review?.rating
                              ? "fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {review?.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AmbulanceDetailPage;
