import React, { useState } from "react";
import { Star, MapPin, Phone, Clock, User, BadgeCheck, PhoneCall, ClipboardSignature } from "lucide-react";

const AmbulanceDetailPage = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 pt-40">
      {/* Heading */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow overflow-hidden">
          <img
            src="https://i.pinimg.com/1200x/68/f7/06/68f70659ffa1c253817619fcd559ea9d.jpg"
            alt="Ambulance"
            className="w-full  object-cover"
          />
        </div>

        {/* Right Side - Basic Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">FastCare Ambulance</h1>
            <p className="text-gray-600 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-red-500" /> Delhi NCR, Sector 45, Gurugram
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p><strong>Price:</strong> ₹1500</p>
            <p><strong>Capacity:</strong> 2 Patients</p>
            <p><strong>Status:</strong> <span className="text-green-600 font-medium">Available</span></p>
            <p><strong>Approval:</strong> <BadgeCheck className="inline w-4 h-4 text-blue-500" /> Approved</p>
            <p><strong>Operating Hours:</strong> 24/7</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 space-y-2 text-sm">
            <p><strong>Driver:</strong> Rajesh Kumar</p>
            <p><strong>Mobile No:</strong> +91 9876543210</p>
            <p><strong>License No:</strong> DL-0420217893</p>
            <p><strong>Emergency Contact:</strong> +91 9000090000</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200 text-sm font-medium flex justify-center items-center gap-2">
              <PhoneCall className="w-4 h-4" /> Call Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex gap-8">
            <button
              className={`pb-2 font-medium ${
                activeTab === "about" ? "border-b-2 border-red-600 text-red-600" : "text-gray-600"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`pb-2 font-medium ${
                activeTab === "review" ? "border-b-2 border-red-600 text-red-600" : "text-gray-600"
              }`}
              onClick={() => setActiveTab("review")}
            >
              Reviews
            </button>
          </nav>
        </div>

        {activeTab === "about" && (
          <div className="space-y-6 text-sm text-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p>
                FastCare Ambulance provides 24/7 emergency and non-emergency medical transportation services across the Delhi NCR region. Our ambulances are equipped with life-saving equipment, AC/non-AC options, and professional drivers trained in first response support.
              </p>
            </div>

            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-1">Key Features</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Basic & Advanced Life Support</li>
                <li>Trained Paramedics Onboard</li>
                <li>Real-Time Tracking Available</li>
                <li>Oxygen Supply and Emergency Medicines</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "review" && (
          <div className="space-y-4">
            {[
              {
                name: "Rahul Sharma",
                comment: "Quick response and clean ambulance. Very satisfied with the service.",
                rating: 5,
              },
              {
                name: "Neha Verma",
                comment: "Booked during an emergency. Reached within 10 minutes. Highly recommend!",
                rating: 4,
              },
            ].map((review, index) => (
              <div key={index} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
                <div className="text-yellow-500 flex items-center mt-2 md:mt-0">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
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
