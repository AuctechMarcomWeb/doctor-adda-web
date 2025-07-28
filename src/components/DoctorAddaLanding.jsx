import React from "react";
import {
  ArrowRight,
  Users,
  Clock,
  Shield,
  Heart,
  Stethoscope,
  Calendar,
  Award,
  Zap,
  CheckCircle,
} from "lucide-react";

const DoctorAddaLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "1000+", label: "Expert Doctors" },
              { number: "50,000+", label: "Happy Patients" },
              { number: "25+", label: "Specializations" },
              { number: "99.9%", label: "Ontime" },
            ].map((stat, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-transform"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="services" className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-8">
              <div className="h-1 w-16 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full mr-2"></div>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-2"></div>
              <div className="h-1 w-8 bg-purple-600 rounded-full"></div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Why Choose Us
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: <Award className="w-12 h-12" />,
                title: "Quality",
                description: "Board-certified doctors and medical professionals ensuring the highest standard of healthcare services for all patients.",
                borderColor: "border-teal-400"
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Personnel",
                description: "Experienced healthcare team with specialized expertise across multiple medical fields and patient care disciplines.",
                borderColor: "border-blue-500"
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: "Innovation",
                description: "Cutting-edge medical technology and digital health solutions providing advanced diagnostic and treatment options.",
                borderColor: "border-indigo-500"
              },
              {
                icon: <Heart className="w-12 h-12" />,
                title: "Commitment",
                description: "Dedicated patient-centered approach ensuring personalized care and long-term health relationships with every individual.",
                borderColor: "border-purple-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center group"
              >
                {/* Circular Icon */}
                <div className={`w-32 h-32 mx-auto mb-8 rounded-full border-4 ${feature.borderColor} bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-gray-800">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorAddaLanding;