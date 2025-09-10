import React from "react";
import { Dialog } from "@headlessui/react";

import DoctorAddaHero from "../../assets/dr-adda-logo.png";

const AppDownloadModal = ({ open, onClose, playStoreLink }) => {
  const handleDownload = () => {
    window.open(playStoreLink, "_blank");
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
        <Dialog.Panel className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left Side (Phone Mockup) */}
            <div className="relative bg-white rounded-2xl p-4 shadow-lg w-36 h-64 flex items-center justify-center">
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 text-center leading-snug">
                we <br /> are <br /> live
              </span>
            </div>

            {/* Right Side (Logo + Text + Button) */}
            <div className="flex-1 text-center md:text-left">
              {/* Logo space */}
              <div className="mb-4 flex justify-center md:justify-start">
                <img
                  src={DoctorAddaHero}
                  alt="App Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>

              <Dialog.Title className="text-3xl font-extrabold mb-3 leading-snug">
                Our Mobile App <br /> is{" "}
                <span className="text-yellow-300">Live now!</span>
              </Dialog.Title>
              <p className="text-base mb-6 opacity-90">
                Use our App & get exclusive discounts 🎉
              </p>
              <button
                onClick={handleDownload}
                className="bg-white text-blue-600 font-bold text-base px-6 py-2.5 rounded-full shadow-md hover:bg-gray-100 transition"
              >
                DOWNLOAD THE APP!
              </button>
            </div>
          </div>

          {/* Decorative Circles */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-indigo-300/20 rounded-full blur-3xl"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:text-gray-200 text-xl font-bold"
          >
            ✕
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AppDownloadModal;
