/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// BannerSection.jsx
import React, { useState } from "react";
import {
  FaRupeeSign,
  FaMotorcycle,
  FaClipboardCheck,
  FaUserMd,
} from "react-icons/fa";
import { useEffect } from "react";
import { getRequest } from "../Helpers/index";

const BannerSection = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [location, setLocation] = useState({
    latitude: "26.8469033",
    longitude: "80.9659383",
    query: "general",
    radius: "5000",
  });

  const fetchData = async () => {
    const url = `global-search?longitude=${location?.longitude}&latitude=${location?.latitude}&query=${location?.query}&radius=${location?.radius}`;

    try {
      const response = await getRequest(url);

      if (response) {
        console.log("Global Search Response:", response?.data?.data);
        setSearchResults(response?.data?.data || []);
      }
    } catch (error) {
      console.error("Error in Global Search:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className=" mx-auto text-white px-2  md:p-12 rounded-3xl flex flex-row md:flex-row items-center gap-4 justify-between sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] "
      style={{
        background:
          "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
        paddingBottom: "0px",
        paddingTop: "100px",
      }}
      >
      {/* Left Content */}
      <div className="max-w-7xl  py-2 sm:py-12 ">
        <h2 className="text-lg md:text-4xl font-bold">Your Health,One Tap Away</h2>

        <div className="flex items-center gap-4 mt-6">
          <span className="hidden sm:grid text-3xl text-xl flex items-center font-bold">
            Smart Healthcare Access – Anytime, Anywhere
          </span>
          <button className="hidden sm:grid bg-Blue-400 border text-xs md:text-base border-white text-white font-semibold px-4 py-2 rounded-lg hover:bg-white hover:text-[#0074b2] transition cursor-pointer">
            Book Now
          </button>
        </div>

        {/* Search Bar */}

        <div className="hidden sm:grid mt-8 w-full max-w-xl mx-auto text-black">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between w-full">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search doctors, specialties, or locations"
              className="w-full md:flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />

            {/* Dropdown */}
            <select className="w-full md:w-1/3 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
              <option>All Specialties</option>
              <option>Radiology</option>
              <option>Cardiology</option>
              <option>Neurology</option>
            </select>

            {/* Search Button */}
            <button className="w-full md:w-auto px-6 py-2 bg-[#297cff] text-white font-semibold rounded-md hover:bg-blue-700 transition">
              SEARCH
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-sm">
          <div className="flex items-start gap-2">
            <FaMotorcycle size={30} className="text-orange-400 mt-1" />
            <span>
              <span className="font-semibold">Free Sample Collection</span>
              <br />
              within <span className="text-yellow-300 font-bold">
                60 Mins
              </span>{" "}
              of Booking*
            </span>
          </div>
          <div className="flex items-start gap-2">
            <FaClipboardCheck size={30} className="text-orange-400 mt-1" />
            <span>
              <span className="font-semibold">Smart Reports</span> with
              <br />
              Real-Time Updates
            </span>
          </div>
          <div className="flex items-start gap-2">
            <FaUserMd size={30} className="text-orange-400 mt-1" />
            <span>
              <span className="font-semibold">Free Report</span>
              <br />
              Counselling
            </span>
          </div>
        </div>

        <div className=" flex items-center gap-4 md:mt-6  mt-2">
          <button className="hidden sm:grid bg-Blue-400 border border-white text-white font-semibold px-4 py-2 rounded-lg hover:bg-white hover:text-[#0074b2] transition cursor-pointer">
            Book Appointment
          </button>
          <a href="https://play.google.com/store/apps/details?id=com.doctors.adda">
            <button className="bg-white text-[#0074b2]   text-xs md:text-base  font-semibold py-2 px-4  md:px-4 md:py-2 rounded-lg  hover:text-black transition cursor-pointer">
              Download App
            </button>
          </a>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/3 mt-6 md:mt-0 md:mb-0 mb-6">
        <img
          src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop"
          alt="Health Package Promotion"
          className="w-full max-h-80 object-contain rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default BannerSection;
