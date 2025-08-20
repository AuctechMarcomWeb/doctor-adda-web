/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// BannerSection.jsx
import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import {
  FaRupeeSign,
  FaMotorcycle,
  FaClipboardCheck,
  FaUserMd,
} from "react-icons/fa";
import { getRequest } from "../Helpers/index";
import banner from "../assets/Header.png";
import hero from "../assets/dr-adda-website.png";
import DoctorSearch from "./DoctorSearch";
import { Skeleton } from "antd";

const BannerSection = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // for skeleton
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
      className="mx-auto text-white pl-4 pt-18 md:pl-10 md:pt-30 rounded-3xl flex flex-row md:flex-row gap-4 justify-between sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%]"
      style={{
        background:
          "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }}
    >
      {/* Left Content */}
      <div className="max-w-7xl pt-12 md:pt-8 md:mb-2">
        <h2 className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold">
          Your Health, One Tap Away
        </h2>

        <div className="flex items-center gap-4 lg:mt-6">
          <span className="hidden lg:grid text-base xl:text-xl flex items-center font-bold">
            Smart Healthcare Access – Anytime, Anywhere
          </span>
          <p
                className="text-white/90 text-sm sm:text-base mb-2 mt-2  leading-relaxed animate-fade-in-up lg:hidden "
                style={{ animationDelay: "0.5s" }}
              >
               Connect with world-class doctors.
              </p>
          
        </div>

        {/* Search Bar */}
        <DoctorSearch />

        {/* Features */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-sm">
          <div className="flex items-start gap-2">
            <FaMotorcycle size={30} className="text-orange-400 mt-1" />
            <span>
              <span className="font-semibold">Free Sample Collection</span>
              <br />
              within{" "}
              <span className="text-yellow-300 font-bold">60 Mins</span>
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

        <div className=" flex items-center gap-4 lg:mt-6  md:mb-0 mt-2 mb-2">
           <div
                className="flex flex-col sm:flex-row gap-4 md:pt-6 animate-fade-up"
                style={{ animationDelay: "1.6s" }}
              >

                <a href="https://play.google.com/store/apps/details?id=com.doctors.adda">
                  <button
                    onMouseEnter={() => setHoveredButton("download")}
                    onMouseLeave={() => setHoveredButton(null)}
                    className="group relative bg-white text-[#0074b2] md:px-6 md:py-4 px-3 py-2 md:rounded-2xl rounded-lg font-bold text-xs md:text-base lg:text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden animate-slide-in-left cursor-pointer"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="relative z-10 flex items-center md:gap-3 gap-1 group-hover:text-white transition-colors duration-300">
                      <Download className="w-5 h-5 group-hover:animate-bounce" />
                      Download App
                      {hoveredButton === "download" && (
                        <div className="absolute -right-2 -top-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                      )}
                    </div>
                  </button>
                </a>

              </div>
        </div>
      </div>

      {/* Right Image with Skeleton */}
      <div className="hidden 2xl:grid flex flex-col-reverse md:mt-0 md:mb-0">
        {loading && (
          <Skeleton.Image
            active
            style={{ width: 300, height: 200, borderRadius: "16px" }}
          />
        )}
        <img
          src={banner}
          alt="banner"
          className={`w-full max-h-80 md:max-h-100 object-contain rounded-2xl ${
            loading ? "hidden" : "block"
          }`}
          onLoad={() => setLoading(false)}
        />
      </div>

      <div className="flex flex-col-reverse md:mt-0 md:mb-0 2xl:hidden">
        <img
          src={hero}
          alt="hero"
          className={`w-full max-h-100 object-contain rounded-2xl ${
            loading 
          }`}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};

export default BannerSection;
