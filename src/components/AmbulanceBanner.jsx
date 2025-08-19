import React, { useState } from "react";
import { Download } from "lucide-react";
const AmbulanceBanner = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-white/10 rounded-full animate-ping "></div>
        <div className="absolute top-60 right-1/3 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-300"></div>
      </div>

      <div className="relative sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%] mx-auto px-4 md:py-16 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-2 md:gap-12 items-center md:min-h-[500px]">
          {/* Left Content */}
          <div className="text-white z-10 relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm animate-pulse">
              <span className="text-4xl"></span>
            </div>

            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-6 leading-tight">
              <span className="block animate-slide-in-left">Emergency</span>
              <span className="block text-red-200 animate-slide-in-left delay-200">
                Ambulance
              </span>
              <span className="block text-base md:text-2xl font-normal md:mt-2 animate-slide-in-left delay-400">
                Services
              </span>
            </h2>

            <p className="text-white/90 text-sm sm:text-base mb-8 max-w-2xl leading-relaxed hidden md:block">
              Professional medical transport available 24/7 with trained
              paramedics and advanced life support equipment.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3 md:mb-8 animate-fade-in-up delay-700">
              {["24/7 Available", "ICU Equipment", "Quick Response"].map(
                (feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-all duration-300 hidden md:block"
                  >
                    <span className="text-green-400 text-lg">✓</span>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                )
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:gap-4 mb-6">
              <a href="https://play.google.com/store/apps/details?id=com.doctors.adda">
                <button
                  onMouseEnter={() => setHoveredButton("download")}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="group relative bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden animate-slide-in-left cursor-pointer"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    Download App
                    {hoveredButton === "download" && (
                      <div className="absolute -right-2 -top-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    )}
                  </div>
                </button>
              </a>

              {/* <a href="#emergency">
                <button
                  className="group bg-red-500 hover:bg-red-600 text-white border border-white  text-xs md:text-base font-semibold py-2 px-4 md:px-4 md:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center xl:gap-3 mb-4 cursor-pointer  "
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
                  }}
                >
                  <span className="text-xs md:text-base group-hover:scale-110 transition-transform">
                    <img
                      width="25"
                      height="25"
                      src="https://img.icons8.com/fluency-systems-regular/50/FFFFFF/phone.png"
                      alt="phone"
                    />
                  </span>
                  Emergency Call
                </button>
              </a> */}
            </div>
          </div>

          {/* Right Side - Large Ambulance Image */}
          <div className="relative flex items-center justify-center mt-18  md:mt-0">
            <div className="relative z-10 animate-float">
              <img
                src="https://plus.unsplash.com/premium_photo-1723708841860-5b00cc402a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YW1idWxhbmNlfGVufDB8fDB8fHww"
                alt="Emergency Ambulance"
                className="w-full max-w-lg md:h-auto h-45 w-45  transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl rounded-2xl"
              />
              <div className="absolute inset-0 bg-white/20  rounded-full blur-3xl scale-110 animate-pulse"></div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -top-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl animate-bounce z-20 hidden md:block">
              <div className="text-blue-600 text-2xl font-bold">24/7</div>
              <div className="text-gray-600 text-sm font-medium">Available</div>
            </div>

            <div className="absolute -bottom-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl animate-pulse z-20 hidden md:block">
              <div className="text-green-600 text-2xl font-bold">&lt;8min</div>
              <div className="text-gray-600 text-sm font-medium">Response</div>
            </div>

            <div className="absolute top-1/2 -right-12 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl animate-bounce delay-500 z-20 hidden md:block">
              <div className="text-red-600 text-2xl font-bold">98%</div>
              <div className="text-gray-600 text-sm font-medium">Success</div>
            </div>

            {/* Background decoration circles */}
            <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl animate-spin-slow"></div>
            <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-red-400/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceBanner;
