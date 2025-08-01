import React, {useEffect, useState } from "react";

import HospitalCard from "../components/HospitalCard"



const HospitalPage = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const hospitalData = [
    {
      name: "Acadis Hospital",
      type: "ICU ",
      services: "ICU",
      phone: 6765678587,
      location: "Hazratganj, Lucknow, UP",
      rating: 4.3,
      image: "https://i.pinimg.com/736x/64/14/2c/64142c98e03babcd3a630be061c6cf97.jpg"
    },
    {
      name: "   Sunrise Hospital",
      type: "Emergency",
      services: "Gastroenterologist",
      phone: 6765678587,
      location: "1090 Chouraha, Gomti Nagar",
      rating: 4.0,
      image: "https://i.pinimg.com/736x/04/3e/5a/043e5ab7f8f04c4fad70c368a5be8094.jpg"
    },
    {
      name: "TrueLife",
      type: "24/7",
      services: "Gynecologist",
      phone: 6765678587,
      location: "RWJF+P24, Lucknow",
      rating: 3.9,
      image: "https://i.pinimg.com/736x/78/4e/e3/784ee381626b6db85ce9d959ba3cba28.jpg"
    },
  ];

  const filteredData = hospitalData.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || hospital.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Hero Banner */}
      {/* Enhanced Hero Banner */}
      <div className="relative text-white overflow-hidden min-h-[500px]" style={{
        background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }}>
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20"></div>
        
        {/* Floating medical icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-300 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/70" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 14a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 7.618V16a1 1 0 11-2 0V7.618L6.237 6.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 14a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute top-32 right-20 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-150 flex items-center justify-center">
            
          </div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-spin delay-500 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/70 rounded-full"></div>
          </div>
          <div className="absolute top-40 left-1/2 w-14 h-14 bg-white/10 rounded-full animate-pulse delay-700 flex items-center justify-center">
            <svg className="w-7 h-7 text-white/70" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Main content */}
        <div className="relative max-w-7xl mx-auto px-4 py-16 flex items-center min-h-[500px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Left content */}
            <div className="text-left space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-6 backdrop-blur-sm animate-pulse">
                
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fadeInUp">
                  Find Trusted
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 animate-pulse">
                    Hospitals & Clinics
                  </span>
                </h2>
                
                <p className="text-blue-100 text-white/90 text-lg mb-8 max-w-xl animate-fadeInUp animation-delay-300">
                  Discover quality healthcare facilities near you with 24/7 emergency services and specialized medical care
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 animate-fadeInUp animation-delay-500">
                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 transform hover:scale-105 transition-transform duration-300">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  <span className="text-sm font-medium">24/7 Emergency Care</span>
                </div>
                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 transform hover:scale-105 transition-transform duration-300">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-ping animation-delay-150"></div>
                  <span className="text-sm font-medium">Expert Medical Staff</span>
                </div>
                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 transform hover:scale-105 transition-transform duration-300">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-ping animation-delay-300"></div>
                  <span className="text-sm font-medium">Advanced Equipment</span>
                </div>
              </div>
              
              <div className="pt-6 animate-fadeInUp animation-delay-700">
                <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  Emergency Contact
                </button>
              </div>
            </div>
            
            {/* Right image */}
            <div className="relative animate-fadeInRight">
              <div className="relative">
                <img 
                  src="https://i.pinimg.com/736x/cb/68/63/cb68636c31e597f6c4c90102138abd24.jpg" 
                  alt="Modern Hospital Building" 
                  className="rounded-3xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className=""></div>
              </div>
              
              {/* Floating stats cards */}
              <div className="absolute -top-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-bounce delay-500">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">98%</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-bounce delay-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">5 min</p>
                    <p className="text-sm text-gray-600">Avg Response</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced wave divider with animation */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-12 animate-pulse" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: 'rgba(255,255,255,0.1)'}} />
                <stop offset="50%" style={{stopColor: 'rgba(255,255,255,0.3)'}} />
                <stop offset="100%" style={{stopColor: 'rgba(255,255,255,0.1)'}} />
              </linearGradient>
            </defs>
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="url(#waveGradient)"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="url(#waveGradient)"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
        
        {/* Add custom CSS for animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          
          .animate-fadeInRight {
            animation: fadeInRight 0.8s ease-out forwards;
          }
          
          .animation-delay-300 {
            animation-delay: 0.3s;
          }
          
          .animation-delay-500 {
            animation-delay: 0.5s;
          }
          
          .animation-delay-700 {
            animation-delay: 0.7s;
          }
        `}</style>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto  py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or location..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="icu">ICU</option>
                <option value="emergency">Emergency</option>
                <option value="24/7">24/7</option>
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
        

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Available Hospitals
            <span className="ml-2 text-lg text-gray-500">({filteredData.length})</span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Live Updates</span>
          </div>
        </div>

        {/* Hospital Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <HospitalCard {...data} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No ambulances found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Contact Banner */}
      <div className=" text-white py-8 mt-12" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl"><img src="src/assets/alert.png" height={50} width={50} alt="" /></span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Emergency?</h3>
              <p className="text-red-100">Call immediately for urgent medical assistance</p>
            </div>
          </div>
          <a href="tel:108" className="flex inline-block bg-white text-red-600 font-bold py-3 px-12 rounded-full text-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105">
            <div className="flex gap-1"><img src="https://i.pinimg.com/1200x/7e/21/b9/7e21b9661c85d61676143a8ae2c9a73b.jpg" height={25} width={25} alt="" /><span>Call 108</span></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HospitalPage;