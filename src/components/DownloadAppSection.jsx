import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const DownloadAppSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-cyan-600  text-white py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">Download the Dr. Adda App</h2>
          <p className="text-xl text-blue-100 mb-6">
            Book appointments, consult doctors, and manage your health — all in one place. Get the best care anytime, anywhere.
          </p>
          <div className="flex gap-4 flex-wrap">
            {/* Play Store Button */}
            <a
              href="#"
              className="flex items-center gap-3 bg-white text-blue-700 px-5 py-3 rounded-xl shadow-md hover:bg-gray-100 transition"
            >
              <FaGooglePlay size={24} />
              <span className="text-base font-semibold">Google Play</span>
            </a>

            {/* App Store Button */}
            <a
              href="#"
              className="flex items-center gap-3 bg-white text-blue-700 px-5 py-3 rounded-xl shadow-md hover:bg-gray-100 transition"
            >
              <FaApple size={24} />
              <span className="text-base font-semibold">App Store</span>
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 text-center">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=500"
            alt="Dr. Adda App Preview"
            className="mx-auto w-72 md:w-96 drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
