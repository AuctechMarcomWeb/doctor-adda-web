import React, { useState } from 'react';
import { Stethoscope, Heart, Brain, Eye, Bone, Baby, User, Activity } from 'lucide-react';

const DoctorCategoryCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Sample data - replace with your actual data
  const categories = [
    {
      id: 1,
      name: "Ambulance",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop",
      description: "Heart & Cardiovascular Care",
      color: "from-red-500 to-pink-600"
    },
    {
      id: 2,
      name: "Pharmacies",
      icon: Brain,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
      description: "Brain & Nervous System",
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 3,
      name: "Diagnostic",
      icon: Bone,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
      description: "Bone & Joint Care",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 4,
      name: "Doctor & Specialists",
      icon: Eye,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
      description: "Eye Care & Vision",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 5,
      name: "Hospital & Clinics",
      icon: Baby,
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop",
      description: "Child Healthcare",
      color: "from-yellow-500 to-orange-600"
    }
    
  ];

  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Medical <span className="text-blue-600">Specialties</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our comprehensive range of medical specialties and connect with expert doctors
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  {/* Hover Content */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white">
                      <IconComponent className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm font-medium">Click to View Doctors</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  
                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                    Find Doctors
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Can't Find Your Specialty?
            </h2>
            <p className="text-gray-600 mb-6">
              We have specialists in over 50+ medical fields. Contact us to find the right doctor for you.
            </p>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
              Contact Support
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DoctorCategoryCards;