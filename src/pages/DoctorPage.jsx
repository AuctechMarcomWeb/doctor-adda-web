import React, { useState } from "react";

const SpecialtyCard = ({ specialty, image, description, doctorCount, rating, availability }) => {
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
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 text-sm">{doctorCount} doctors</span>
          </div>
        </div>
        
        <button className="w-full bg-[#00659d] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const specialtyData = [
    {
      specialty: "General Physician",
      image: "https://i.pinimg.com/736x/e7/b2/2c/e7b22c1f928c1d06d00dc1c887ef9918.jpg",
      description: "Primary healthcare and general medical consultation",
      doctorCount: 45,
      rating: 4.8,
      availability: "Available",
      type: "general"
    },
    {
      specialty: "Gynaecology",
      image: "https://i.pinimg.com/1200x/6c/59/95/6c599523460f54ddeba81f3cd689ae04.jpg",
      description: "Women's health and reproductive system care",
      doctorCount: 28,
      rating: 4.9,
      availability: "Available",
      type: "specialist"
    },
    {
      specialty: "Dermatology",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Skin, hair, and nail related treatments",
      doctorCount: 22,
      rating: 4.7,
      availability: "Busy",
      type: "specialist"
    },
    {
      specialty: "Diabetology",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      description: "Diabetes management and endocrine disorders",
      doctorCount: 18,
      rating: 4.6,
      availability: "Available",
      type: "specialist"
    },
    {
      specialty: "Cardiology",
      image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Heart and cardiovascular system care",
      doctorCount: 32,
      rating: 4.9,
      availability: "Available",
      type: "specialist"
    },
    {
      specialty: "Psychiatry",
      image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2085&q=80",
      description: "Mental health and psychological wellbeing",
      doctorCount: 25,
      rating: 4.8,
      availability: "Available",
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
        <div className="absolute inset-0 bg-black/20"></div>
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
        </div>
      </div>

      {/* Book Appointment Banner */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Book Your Appointment</h2>
                <p className="text-gray-600">Schedule consultation with top specialists instantly</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Book Now
            </button>
          </div>
        </div>
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

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-white p-6 rounded-2xl shadow-lg" style={{
            background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Specialties</p>
                <p className="text-2xl font-bold">{filteredData.length}</p>
              </div>
              <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          
          <div className="text-white p-6 rounded-2xl shadow-lg" style={{
            background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Doctors</p>
                <p className="text-2xl font-bold">{filteredData.reduce((sum, item) => sum + item.doctorCount, 0)}</p>
              </div>
              <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          
          <div className="text-white p-6 rounded-2xl shadow-lg" style={{
            background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold">4.8★</p>
              </div>
              <svg className="w-12 h-12 text-white/80 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
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
      <div className="text-white py-8"  style={{
        background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Emergency?</h3>
              <p className="text-blue-100">Call immediately for urgent medical assistance</p>
            </div>
          </div>
          <a href="tel:108" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-3 px-12 rounded-full text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call 108</span>
          </a>
        </div>
      </div>

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