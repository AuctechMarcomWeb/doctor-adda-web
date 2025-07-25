import React, { useEffect, useState } from "react";

import DiagnosticCard from "../components/DiagnosticCard" ;
import {
  
  MapPin,
 
  BadgeCheck,
  
} from "lucide-react";



const DiagnosticPage = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const diagnosticData = [
    {
      name: "Thyrocare",
      type: "24/7",
      services: "Lipid Profile",
      timming: "8:00 am to 5:00 pm",
      location: "Hazratganj, Lucknow, UP",
      rating: 4.3,
      image: "https://i.pinimg.com/1200x/5a/ef/97/5aef97f3a37d7733167ad69600c58688.jpg"
    },
    {
      name: " Vijaya Diagnostic  ",
      type: "Emergency",
      services: "Neha Joshi",
      timming: "8:00 am to 5:00 pm",
      location: "1090 Chouraha, Gomti Nagar",
      rating: 4.0,
      image: "https://i.pinimg.com/1200x/77/ce/6f/77ce6ff077e2ef6e8e23837256141ba0.jpg"
    },
    {
      name: "Suburban Diagnostic",
      type: "Non-Emergency",
      services: "Sameer Patel",
      timming: "8:00 am to 5:00 pm",
      location: "RWJF+P24, Lucknow",
      rating: 3.9,
      image: "https://i.pinimg.com/1200x/27/d0/88/27d08852fb5052d6a24cf98ed2bac7d6.jpg"
    },
  ];

  const filteredData = diagnosticData.filter(diagnostic => {
    const matchesSearch = diagnostic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diagnostic.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || diagnostic.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen  pt-18">
      {/* Hero Banner */}
      <div className="relative overflow-hidden ">
        <div className="absolute inset-0 "></div>
        <div className="absolute inset-0 "></div>
        
        <div className="relative max-w-7xl mx-auto rounded-3xl p-8 py-20"  style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)" }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2  rounded-full px-4 py-2 text-sm font-medium">
                <BadgeCheck className="w-4 h-4 text-green-400" />
                Certified & Trusted
              </div>
              
              <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Diagnostic
                <span className="block text-transparent bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text">
                  And Labs
                </span>
              </h2>
              
              <p className="text-white/90 text-lg  max-w-lg">
                Advanced diagnostic services with state-of-the-art technology and expert care in the heart of Delhi NCR.
              </p>
              
              <div className="flex items-center gap-2 text-blue-200">
                <MapPin className="w-5 h-5 text-red-400" />
                <span className="font-medium">Delhi NCR, Sector 45, Gurugram</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-sm text-blue-200">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-blue-200">Test Types</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-blue-200">Available</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://i.pinimg.com/1200x/77/ce/6f/77ce6ff077e2ef6e8e23837256141ba0.jpg"
                  alt="diagnostic"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
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
                <option value="24/7">24/7</option>
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
            Available Diagnostic
            <span className="ml-2 text-lg text-gray-500">({filteredData.length})</span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Live Updates</span>
          </div>
        </div>

        {/* diagnostic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <DiagnosticCard {...data} />
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

export default DiagnosticPage;