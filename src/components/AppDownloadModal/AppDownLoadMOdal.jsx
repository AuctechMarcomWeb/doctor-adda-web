import React from "react";
import { Dialog } from "@headlessui/react";

import DoctorAddaHero from "../../assets/dr-adda-logo.png";

const AppDownloadModal = ({ open, onClose, playStoreLink }) => {
  const handleDownload = () => {
    window.open(playStoreLink, "_blank");
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
        <Dialog.Panel className="relative bg-white rounded-2xl md:p-8 p-2 w-full max-w-4xl shadow-2xl">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ✕
          </button>

          <div className="flex flex-row items-center md:gap-12 gap-4">
            
            {/* Left Side - Phone Mockup */}
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Phone Frame */}
                <div className="md:w-64 md:h-[520px] w-38 h-[340px] bg-gray-200 rounded-[2.5rem] p-3 shadow-xl">
                  <div className="w-full h-full bg-white rounded-[2rem] relative overflow-hidden">
                    
                    {/* Phone Screen Header */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:w-32 md:h-6 w-18 h-4 bg-black rounded-b-xl"></div>
                    
                    {/* Screen Content */}
                    <div className="pt-8 px-4 h-full bg-gray-50 flex flex-col items-center justify-center">
                      
                      {/* App Logo */}
                      <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm">
                        <img
                          src={DoctorAddaHero}
                          alt="App Logo"
                          className="w-16 h-16 object-contain"
                        />
                      </div>

                      {/* Decorative Items */}
                      {/* <div className="space-y-4 w-full">
                        <div className="flex justify-between items-center">
                          <div className="w-12 h-8 bg-red-500 rounded"></div>
                          <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                        </div>
                        <div className="flex justify-center">
                          <div className="w-20 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="w-8 h-12 bg-green-500 rounded"></div>
                          <div className="w-16 h-3 bg-yellow-400 rounded-full"></div>
                        </div>
                        <div className="flex justify-center">
                          <div className="w-24 h-4 bg-gray-400 rounded"></div>
                        </div>
                      </div> */}
                    </div>
                    
                    {/* Home Button */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 border-2 border-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 text-left max-w-md">
              
              {/* Main Title */}
              <Dialog.Title className="text-xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Reach more deals with our app
              </Dialog.Title>
              
              {/* Subtitle */}
              <p className="text-sm md:text-lg text-gray-600 mb-8 leading-relaxed">
                Get an amazing opportunities to use this state of the art app
              </p>
              
              {/* Call to Action */}
              <p className="text-xs md:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-6">
                DON'T HESITATE, DOWNLOAD IT TODAY
              </p>
              
              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* App Store Button */}
                <button
                  onClick={handleDownload}
                  className="hidden md:block flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors min-w-[160px]"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </div>
                </button>

                {/* Google Play Button */}
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center bg-black text-white md:px-6 md:py-3 px-2 py-2 rounded-lg hover:bg-gray-800 transition-colors min-w-[160px]"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      
                      <div className="md:text-sm text-xs font-semibold">Google Play</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AppDownloadModal;