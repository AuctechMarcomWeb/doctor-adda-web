import React from 'react'
import { ArrowRight, Star, Heart, Shield, Clock } from "lucide-react";

import img1 from '../assets/img.png'

const HeroSection = () => {
  return (
    <>
      <section id="home" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Health,
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {" "}
                  Our Priority
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with certified doctors, book appointments instantly, and
                get expert medical advice from the comfort of your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center group">
                  Book Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all">
                  Emergency Care
                </button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
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

            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              
              {/* Mobile Phone Mockup */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                {/* Phone Frame */}
                <div className="bg-gray-900 rounded-[3rem] p-2 shadow-2xl w-72 h-[580px]">
                  {/* Screen */}
                  <div className="bg-black rounded-[2.5rem] p-1 h-full">
                    {/* Content Area */}
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
                      
                      {/* App Header */}
                      {/* <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 flex-shrink-0">
                        <h2 className="text-lg font-bold text-gray-800">HealthCare</h2>
                        <p className="text-sm text-gray-600">Find your doctor</p>
                      </div> */}
                      
                      {/* Main Image */}
                      <div className="flex-1 relative overflow-hidden">
                        <img
                        //   src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                          src={img1}
                          alt="Doctor consultation app"
                          className="w-full h-full object-contain"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* Doctor Info Card */}
                        {/* <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-900">Dr. Sarah Johnson</h3>
                                <p className="text-sm text-gray-600">Cardiologist</p>
                                <div className="flex items-center mt-1">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                    ))}
                                  </div>
                                  <span className="ml-2 text-xs font-semibold text-gray-700">4.9</span>
                                </div>
                              </div>
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </div> */}
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
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-60"></div>
                </div>
              </div>

              {/* Rating Card */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
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
  )
}

export default HeroSection