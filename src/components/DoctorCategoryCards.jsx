import React, { useState } from 'react';
import { Stethoscope, Heart, Brain, Eye, Bone, Baby, User, Activity } from 'lucide-react';

const DoctorCategoryCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Sample data - replace with your actual data
  const categories = [
    {
      id: 1,
      name: "General Physician",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop",
      // description: "Heart & Cardiovascular Care",
      color: "from-red-500 to-pink-600"
    },
    {
      id: 2,
      name: "Skin & Hairs",
      icon: Brain,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",

      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 3,
      name: "Dental Care",
      icon: Bone,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
     
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 4,
      name: "Child Specialist",
      icon: Eye,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
    
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 5,
      name: "Ear, Nose, Throat",
      icon: Baby,
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop",
   
      color: "from-yellow-500 to-orange-600"
    },
     {
      id: 6,
      name: "Veterinary",
      icon: Bone,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
     
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 7,
      name: "Cardiologist(Heart)",
      icon: Baby,
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop",
   
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: 8,
      name: " Neurologist(Brain)",
      icon: Eye,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
    
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 9,
      name: "Orthopedic(Bone & Joint)",
      icon: Eye,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
    
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 10,
      name: " Gynecologist(Women's Health)  ",
      icon: Eye,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
    
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 11,
      name: "Urologist(kidney & Urinary)  ",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop",
      // description: "Heart & Cardiovascular Care",
      color: "from-red-500 to-pink-600"
    },
//    {
//   id: 999,
//   name: "8+ More",
//   icon: Activity, // Or any suitable icon
//   image: "", // Empty or placeholder
//   color: "from-gray-500 to-gray-700",
//   isMoreCard: true
// }

    
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
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
                <div className="px-2 py-2">
                  <h3 className="text-lg text-center font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DoctorCategoryCards;