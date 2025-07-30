import React, { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  PhoneCall,
  BadgeCheck,
} from "lucide-react";

const AmbulanceDetailPage = () => {
   useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="max-w-7xl mx-auto  py-10 space-y-8 pt-40">
      {/* Heading */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow overflow-hidden">
          <img
            src="https://i.pinimg.com/1200x/68/f7/06/68f70659ffa1c253817619fcd559ea9d.jpg"
            alt="Ambulance"
            className="w-full  object-cover object-center"
          />
        </div>

        {/* Right Side - Basic Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h1 className="text-2xl font-bold text-[#00679f] mb-2">FastCare Ambulance</h1>
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
                activeTab === "about" ? "border-b-2 border-[#00679f] text-[#00679f] " : "text-gray-600"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`pb-2 font-medium ${
                activeTab === "review" ? "border-b-2 border-[#00679f] text-[#00679f]" : "text-gray-600"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About FastCare Ambulance</h3>
              <p className="text-gray-700 text-justify">
                FastCare Ambulance is a trusted emergency medical transportation provider serving the entire Delhi NCR region.
                Our fleet is equipped with modern life-saving equipment and our drivers are trained first responders.
                Whether it's a medical emergency or a planned patient transfer, we ensure timely and reliable service.
              </p>
              <p className="mt-2 text-gray-700 text-justify">
                We offer both AC and non-AC ambulances with GPS tracking, trained paramedics, and on-board emergency supplies like oxygen cylinders and medications.
                With 24/7 availability, our mission is to deliver compassionate, efficient, and safe transport for every patient.
              </p>
            </div>
          </div>
        )}

        {/* Review Section */}
        {activeTab === "review" && (
          <div className="space-y-6">
            {[
              {
                name: "Rahul Sharma",
                comment: "Excellent service! The ambulance arrived quickly and was very clean. The driver was professional and courteous.",
                rating: 5,
                image: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Neha Verma",
                comment: "Fast response during an emergency. The driver reached us in under 10 minutes and handled the situation calmly.",
                rating: 4,
                image: "https://randomuser.me/api/portraits/women/44.jpg",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-300"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
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
