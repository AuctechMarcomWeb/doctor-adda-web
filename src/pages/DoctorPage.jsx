import React, { useState, useEffect } from "react";
import { Smartphone, Heart, Calendar, Video, Shield, Star, Download, Sparkles } from 'lucide-react';
import DownloadAppSection from "../components/DownloadAppSection";
import { useNavigate } from "react-router-dom";


const SpecialtyCard = ({ specialty, image, description, doctorCount, rating, availability }) => {
   const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate(`/doctorlist/${name}`);
  };
 
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={specialty}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-1">{specialty}</h3>
        </div>
      </div>
      
      <div className="px-18 py-4">
        
        
        <button onClick={handleViewDetails} className="w-full bg-[#00659d] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
          View Doctors
        </button>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const DoctorPage = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
   useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: Heart, text: "Top Doctors" },
    { icon: Video, text: "Video Consults" },
    { icon: Calendar, text: "Instant Booking" },
    { icon: Shield, text: "Secure & Private" }
  ];

  const specialtyData = [
    {
      specialty: "General Physician",
      image: "https://i.pinimg.com/736x/e7/b2/2c/e7b22c1f928c1d06d00dc1c887ef9918.jpg",
      type: "general"
    },
    {
      specialty: "Gynaecology",
      image: "https://i.pinimg.com/1200x/6c/59/95/6c599523460f54ddeba81f3cd689ae04.jpg",
      type: "specialist"
    },
    {
      specialty: "Dermatology",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      type: "specialist"
    },
    {
      specialty: "Diabetology",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      type: "specialist"
    },
    {
      specialty: "Cardiology",
      image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      type: "specialist"
    },
    {
      specialty: "Psychiatry",
      image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2085&q=80",
      type: "specialist"
    }
  ];

  const filteredData = specialtyData.filter(doctor => {
    const matchesSearch = doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || doctor.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Banner */}
      <div className="relative text-white overflow-hidden" style={{
        background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }}>
        {/* <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-75"></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-150"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
               Doctor & Specialists
            </h1>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Select specialty to find relevant doctors for your healthcare needs
            </p>
          </div>
        </div> */}
      </div>

      {/* Download App Banner */}
      <div className="max-w-6xl mx-auto px-4 mb-0 pt-36">
      <div className={`relative overflow-hidden  text-white rounded-3xl shadow-2xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{
        background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }}>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -left-8 w-16 h-16 bg-cyan-300/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-4 right-1/4 w-12 h-12 bg-purple-300/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          
          {/* Floating Icons */}
          <div className="absolute top-6 right-16 animate-float">
            <Sparkles className="w-6 h-6 text-yellow-300 opacity-70" />
          </div>
          <div className="absolute bottom-8 left-20 animate-float" style={{ animationDelay: '1.5s' }}>
            <Star className="w-5 h-5 text-pink-300 opacity-60" />
          </div>
        </div>

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm"></div>
        
        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 transform hover:scale-105 transition-transform duration-300">
                <Smartphone className="w-4 h-4" />
                <span className="text-sm font-medium">New App Available</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <h2 className="text-4xl md:text-4xl  font-bold mb-4 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent leading-tight">
                Your Health,
                
                <span className="">
                  One Tap Away
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full transform scale-x-0 animate-scale-x"></div>
                </span>
              </h2>
              
              <p className="text-white/90 text-lg mb-8 max-w-2xl leading-relaxed">
                Experience healthcare reimagined. Connect with world-class doctors, book instant consultations, 
                and manage your health journey with our award-winning mobile app.
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 transform hover:scale-105 hover:bg-white/25 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <feature.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Content - Buttons */}
            <div className="flex flex-col gap-4 min-w-fit">
              <button
                onMouseEnter={() => setHoveredButton('download')}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                  <Download className="w-5 h-5" />
                  Download App
                  {hoveredButton === 'download' && (
                    <div className="absolute -right-2 -top-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  )}
                </div>
              </button>
              
              <button
                onMouseEnter={() => setHoveredButton('book')}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative bg-gradient-to-r from-pink-500 to-rose-400 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  Book Now
                  {hoveredButton === 'book' && (
                    <div className="absolute -right-2 -top-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                  )}
                </div>
              </button>
              
              {/* Stats */}
              <div className="flex gap-6 mt-4 text-center">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-white">4.9★</div>
                  <div className="text-xs text-white/70">App Rating</div>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-xs text-white/70">Downloads</div>
                </div>
              </div>
            </div>
          </div>

          
          
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes scale-x {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-scale-x {
          animation: scale-x 2s ease-in-out 0.5s forwards;
        }
      `}</style>
    </div>
      

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by specialty..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Specialties</option>
                <option value="general">General</option>
                <option value="specialist">Specialist</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      
        

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Medical Specialties
            <span className="ml-2 text-lg text-gray-500">({filteredData.length})</span>
          </h2>
        </div>

        {/* Specialty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <SpecialtyCard {...data} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No specialties found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>

      


      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 ">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Platform</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Experience healthcare like never before with our comprehensive medical services</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <FeatureCard
            icon={<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>}
            title="Video Consultation"
            description="Connect with doctors from comfort of your home via secure video calls"
          />
          <FeatureCard
            icon={<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>}
            title="24/7 Available"
            description="Round the clock medical assistance whenever you need it most"
          />
          <FeatureCard
            icon={<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>}
            title="Verified Doctors"
            description="All our medical professionals are certified and experienced specialists"
          />
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Patients Say</h2>
            <p className="text-gray-600">Real experiences from thousands of satisfied patients</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">A</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Amit Sharma</h4>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600">"Excellent service! Video consultation was smooth and doctor was very professional. Highly recommended!"</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-pink-600 font-bold">P</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Priya Singh</h4>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600">"Amazing platform! Got appointment within minutes and received quality healthcare from home."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Banner */}
      

      <DownloadAppSection />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default DoctorPage;