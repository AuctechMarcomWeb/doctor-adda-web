import React, { useState } from "react";

import HospitalCard from "../components/HospitalCard"



const HospitalPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const hospitalData = [
    {
      name: "MediCabs Hospital",
      type: "ICU Hospital",
      capacity: 3,
      price: 350,
      location: "Hazratganj, Lucknow, UP",
      rating: 4.3,
      image: "https://i.pinimg.com/736x/a3/7d/fa/a37dfa60e0a5c78f0cad5880ba8822dd.jpg"
    },
    {
      name: "Emergency Cab",
      type: "ICU",
      capacity: 4,
      price: 700,
      location: "1090 Chouraha, Manas Nagar Colony, Jiamau",
      rating: 4.0,
      image: "https://i.pinimg.com/1200x/3b/58/26/3b58264367ff25a10d419888fde59af7.jpg"
    },
    {
      name: "Adda24/7 Services",
      type: "Non-Emergency",
      capacity: 2,
      price: 250,
      location: "RWJF+P24, Lucknow",
      rating: 3.9,
      image: "https://i.pinimg.com/736x/97/97/c1/9797c15e41f8dae3fa2ea67492afeb04.jpg"
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
      <div className="relative  text-white overflow-hidden"style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
  }}>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-75"></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-150"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-4xl"></span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
           Hospitals
        </h1>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Fast, reliable, and professional medical transport when you need it most
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-green-400">✓</span>
                <span className="text-sm font-medium">24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-green-400">✓</span>
                <span className="text-sm font-medium">Trained Professionals</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-green-400">✓</span>
                <span className="text-sm font-medium">Quick Response</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-8" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
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
                <option value="non-emergency">Non-Emergency</option>
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
          <div className=" text-white p-6 rounded-2xl shadow-lg" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Available Now</p>
                <p className="text-2xl font-bold">{filteredData.length}</p>
              </div>
              <div className="text-3xl "><img src="src/assets/ambulance.png" height={50} width={50} alt="" /></div>
            </div>
          </div>
          
          <div className=" text-white p-6 rounded-2xl shadow-lg" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Avg Response</p>
                <p className="text-2xl font-bold">8 min</p>
              </div>
              <div className="text-3xl opacity-80"><img src="src/assets/thunder-new.png" height={50} width={50} alt="" /></div>
            </div>
          </div>
          
          <div className=" text-white p-6 rounded-2xl shadow-lg" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Success Rate</p>
                <p className="text-2xl font-bold">98%</p>
              </div>
              <div className="text-3xl opacity-80"><img src="src/assets/100-new.png" height={40} width={40} alt="" /></div>
            </div>
          </div>
        </div>

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
        <div className="space-y-6">
          {filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <HospitalCard {...data} />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No hospital found</h3>
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