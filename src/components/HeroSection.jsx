import React from 'react';
import { ArrowRight, Star, Heart, Shield, Clock } from 'lucide-react';
import img1 from '../assets/img.png';

const HeroSection = () => {
  return (
    <>
      <section id="home" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Health,
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {" "}
                  Our Priority
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Connect with certified doctors, book appointments instantly, and
                get expert medical advice from the comfort of your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center group">
                  Book Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all">
                  Emergency Care
                </button>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-gray-600">Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50k+</div>
                  <div className="text-gray-600">Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Right - Mobile UI Mockup */}
            <div className="relative flex justify-center">
              {/* Blurred Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>

              {/* Mobile Frame */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 w-[260px] sm:w-[300px]">
                <div className="bg-gray-900 rounded-[3rem] p-2 shadow-2xl h-[540px] sm:h-[576px]">
                  <div className="bg-black rounded-[2.5rem] p-1 h-full">
                    <div className="bg-white rounded-[2rem] overflow-hidden relative h-full flex flex-col">
                      {/* Status Bar */}
                      <div className="bg-white h-12 flex items-center justify-between px-6 pt-2 flex-shrink-0">
                        <div className="text-sm font-semibold text-gray-900">9:41</div>
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          </div>
                          <div className="w-6 h-3 bg-green-500 rounded-sm ml-2"></div>
                        </div>
                      </div>

                      {/* Main Image */}
                      <div className="flex-1 relative overflow-hidden">
                        <img
                          src={img1}
                          alt="Doctor consultation app"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      </div>

                      {/* Bottom Navigation */}
                      <div className="bg-white border-t border-gray-100 px-6 py-3 flex justify-around flex-shrink-0">
                        <Heart className="w-6 h-6 text-blue-500" />
                        <Shield className="w-6 h-6 text-gray-400" />
                        <Clock className="w-6 h-6 text-gray-400" />
                        <Star className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-white rounded-full opacity-60"></div>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 bg-white p-3 sm:p-4 rounded-2xl shadow-xl z-20">
                <div className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-gray-600">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </>
  );
};

export default HeroSection;
