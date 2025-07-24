import React, { useState, useEffect } from "react";
import { Search, MapPin, Star, Video, Calendar, Phone, Clock, Shield, Award, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ name, specialization, experience, fee, location, rating, mode, image }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/doctordetail/${name}`);
  };
  
  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${isHovered ? 'scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header with Gradient */}
      <div className="relative h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 overflow-hidden" style={{
        background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }} >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-2 right-4 flex gap-1">
          {mode.includes("video") && (
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
              <Video className="w-4 h-4 text-white" />
            </div>
          )}
          {mode.includes("in-clinic") && (
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
              <Calendar className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
      </div>

      <div className="p-6 relative">
        {/* Doctor Image with Animation */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white shadow-lg group-hover:ring-blue-200 transition-all duration-300">
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">
              {name}
            </h3>
            <p className="text-blue-600 font-medium mb-2">{specialization}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-gray-700">{rating}</span>
              </div>
              <div className="text-sm text-gray-500">• {experience} experience</div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">₹</span>
              </div>
              <div>
                <div className="font-bold text-gray-800">₹{fee}</div>
                <div className="text-xs text-gray-500">Consultation Fee</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Available</div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600 font-medium">Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button  onClick={handleViewDetails} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" style={{
        background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }} >
            View More
          </button>
          
        </div>
      </div>
    </div>
  );
};

const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [modeFilter, setModeFilter] = useState("in-clinic");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const doctorData = [
    {
      name: "Dr. Ramesh Chandra",
      specialization: "General Physician",
      experience: "12 years",
      fee: "500",
      location: "Hazratganj, Lucknow",
      rating: 4.5,
      mode: ["in-clinic"],
      image: "https://i.pinimg.com/1200x/98/bd/9d/98bd9d77300e729168cb542f5d891bda.jpg"
    },
    {
      name: "DR. Priya Mehta",
      specialization: "General Physician",
      experience: "12 years",
      fee: "500",
      location: "Gomti Nagar Extension",
      rating: 4.2,
      mode: ["video"],
      image: "https://i.pinimg.com/736x/f6/cd/b0/f6cdb0e81ebbb316f5d93303388d4dc3.jpg"
    },
    {
      name: "Dr. Aditiya",
      specialization: "General Physician",
      experience: "12 years",
      fee: "500",
      location: "Indira Nagar, Lucknow",
      rating: 4.0,
      mode: ["in-clinic", "video"],
      image: "https://i.pinimg.com/736x/ea/a6/3e/eaa63e596382c84c3fdb128716e98ed5.jpg"
    }
  ];

  const filteredData = doctorData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = modeFilter === "all" || doctor.mode.includes(modeFilter);
    return matchesSearch && matchesMode;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-teal-200/30 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-pink-200/30 rounded-full animate-float"></div>
      </div>

      {/* Hero Banner */}
      <div className="relative text-white overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-teal-600" style={{
        background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }} ></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse blur-sm"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/15 rounded-full animate-pulse delay-75 blur-sm"></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-150 blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className={`relative max-w-6xl mx-auto px-4 py-16 text-center transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-bounce">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">Trusted Healthcare Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            General Physician
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Fast, genuine and accessible healthcare for you and your loved ones
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/90 backdrop-blur-sm border-0 focus:bg-white focus:ring-4 focus:ring-blue-200/50 transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {[
              { icon: Clock, text: "24/7 Available", color: "green" },
              { icon: Shield, text: "Verified Doctors", color: "blue" },
              { icon: Award, text: "Top Rated", color: "purple" },
              { icon: Users, text: "1000+ Patients", color: "teal" }
            ].map((item, index) => (
              <div 
                key={index}
                className={`flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-all duration-300 cursor-pointer transform hover:scale-105 animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Mode Filter Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {[
            { key: "in-clinic", label: "In-Clinic Appointment", icon: Calendar },
            { key: "video", label: "Video Consultation", icon: Video }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setModeFilter(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                modeFilter === tab.key 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Available Doctors
            </h2>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredData.length} found
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Updates</span>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredData.length > 0 ? (
            filteredData.map((doctor, index) => (
              <div 
                key={index} 
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <DoctorCard {...doctor} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-8xl mb-6 animate-bounce">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No doctors found</h3>
              <p className="text-gray-500 text-lg">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Section */}
      <div className="relative text-white py-16 mt-16 overflow-hidden">
        <div className="absolute inset-0 " style={{
        background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }}></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full animate-pulse blur-sm"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-75 blur-sm"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-2">Medical Emergency?</h3>
              <p className="text-red-100 text-lg">Call immediately for urgent medical assistance</p>
            </div>
          </div>
          
          <a 
            href="tel:108" 
            className="inline-flex items-center gap-3 bg-white text-red-600 font-bold py-4 px-8 rounded-2xl text-xl hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            <Phone className="w-6 h-6" />
            <span>Call 108 Now</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
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
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-fadeInUp { 
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default DoctorList;