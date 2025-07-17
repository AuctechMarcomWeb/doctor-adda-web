import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  MapPin, 
  Calendar, 
  Phone, 
  Stethoscope, 
  Heart, 
  Shield, 
  Clock, 
  Star, 
  CheckCircle 
} from 'lucide-react';

const MedicalImagingBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Your one-stop destination for affordable & reliable imaging services",
      features: [
        {
          icon: Users,
          title: "Highly experienced",
          subtitle: "130+ radiology specialists"
        },
        {
          icon: MapPin,
          title: "State-of-the-art",
          subtitle: "radiology labs across India"
        }
      ],
      buttonText: "Explore Now"
    },
    {
      title: "Advanced diagnostic solutions with cutting-edge technology",
      features: [
        {
          icon: Shield,
          title: "100% Safe & Secure",
          subtitle: "HIPAA compliant systems"
        },
        {
          icon: Clock,
          title: "Quick Results",
          subtitle: "Reports within 24 hours"
        }
      ],
      buttonText: "Book Now"
    },
    {
      title: "Comprehensive health checkups tailored for your needs",
      features: [
        {
          icon: Heart,
          title: "Complete Care",
          subtitle: "Full body health packages"
        },
        {
          icon: Star,
          title: "Premium Quality",
          subtitle: "ISO certified facilities"
        }
      ],
      buttonText: "Learn More"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 overflow-hidden min-h-[500px]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-indigo-300 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-0 right-40 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-20 h-20 bg-blue-300 rounded-full opacity-10"></div>
        <div className="absolute bottom-20 left-40 w-12 h-12 bg-indigo-200 rounded-full opacity-25"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-8 min-h-[400px]">
          {/* Navigation Arrow Left */}
          <button 
            onClick={prevSlide}
            className="flex-shrink-0 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          {/* Main Content */}
          <div className="flex-1 mx-8">
            <div className="flex items-center justify-between">
              
              {/* Left side - Service cards */}
              <div className="hidden lg:flex flex-col space-y-4 w-80">
                <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Specialised Care</div>
                      <div className="text-sm text-gray-600">Advanced imaging solutions</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-gray-500">Available 24/7</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Premium Equipment</div>
                      <div className="text-sm text-gray-600">State-of-the-art technology</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-gray-500">Latest MRI & CT scanners</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Easy Booking</div>
                      <div className="text-sm text-gray-600">Comprehensive scheduling</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-xs text-gray-500">Online & offline options</span>
                  </div>
                </div>
              </div>

              {/* Center - Main message */}
              <div className="flex-1 max-w-md mx-4">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">
                    {currentSlideData.title}
                  </h2>
                  
                  <div className="space-y-5 mb-8">
                    {currentSlideData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{feature.title}</div>
                          <div className="text-sm text-blue-100">{feature.subtitle}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl">
                    {currentSlideData.buttonText}
                  </button>

                  {/* Slide indicators */}
                  <div className="flex justify-center space-x-2 mt-6">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Doctor with scan */}
              <div className="hidden lg:block relative">
                <div className="w-80 h-72 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Doctor silhouette */}
                  <div className="absolute right-4 bottom-0 w-36 h-52 bg-white bg-opacity-20 rounded-t-full backdrop-blur-sm"></div>
                  
                  {/* Medical scan mockup */}
                  <div className="absolute left-4 top-4 w-24 h-28 bg-gray-900 rounded-lg shadow-lg">
                    <div className="p-2">
                      <div className="grid grid-cols-4 gap-1 h-full">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`bg-gray-600 rounded-sm transition-opacity duration-1000 ${
                              i % 3 === 0 ? 'opacity-100' : 'opacity-70'
                            }`}
                            style={{
                              animationDelay: `${i * 100}ms`
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Service card overlay */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-4 text-white text-sm shadow-lg">
                    <div className="font-semibold">Online Doctors & Diet Consultant</div>
                    <div className="text-xs mt-1 opacity-90">in the comfort of your home</div>
                    <div className="mt-3 bg-white bg-opacity-30 rounded-lg px-3 py-2 text-xs font-medium backdrop-blur-sm">
                      Consultation starts from ₹199
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute bottom-8 left-8 w-8 h-8 bg-white bg-opacity-30 rounded-full animate-bounce"></div>
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
                </div>
                
                {/* Bottom service card */}
                <div className="absolute -bottom-4 right-8 bg-white rounded-xl shadow-xl p-4 border-l-4 border-blue-500 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Book an Appointment</div>
                      <div className="text-xs text-gray-600">Quick & easy scheduling</div>
                    </div>
                  </div>
                </div>

                {/* Additional floating card */}
                <div className="absolute -top-2 left-16 bg-green-500 rounded-lg p-2 text-white text-xs shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>4.9 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrow Right */}
          <button 
            onClick={nextSlide}
            className="flex-shrink-0 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Bottom stats section */}
      {/* <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-12 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">130+</div>
              <div className="text-sm text-gray-600">Specialists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">50+</div>
              <div className="text-sm text-gray-600">Locations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">100K+</div>
              <div className="text-sm text-gray-600">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MedicalImagingBanner;