import React from 'react';
import { Heart, Users, Award, Clock, Stethoscope, Shield, Star } from 'lucide-react';

const AboutUsSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#00659c] via-[#0074b2] to-[#005a8a] py-8 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Welcome to{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#fcbe57] to-[#ffd700] bg-clip-text text-transparent">
                Doctors Adda
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#fcbe57] to-[#ffd700] rounded-full"></div>
            </span>
          </h2>
          
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <p className="text-white/90  leading-relaxed mb-6">
                At <strong className="text-[#fcbe57]">Doctors Adda</strong>, we believe that quality healthcare should be accessible
                to everyone. With a legacy spanning over <strong className="text-white">two decades</strong>, we've remained committed to
                offering world-class medical care—where modern innovation meets human compassion.
              </p>

              <p className="text-white/80  leading-relaxed mb-8">
                Our team of skilled doctors, nurses, and health professionals work collaboratively to
                ensure every patient receives personalized care—whether it's a regular health check-up
                or a complex procedure. Your health journey is our priority.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-[#fcbe57] mb-1">25+</div>
                  <div className="text-white/70 text-sm">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-[#fcbe57] mb-1">50K+</div>
                  <div className="text-white/70 text-sm">Happy Patients</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-[#fcbe57] mb-1">100+</div>
                  <div className="text-white/70 text-sm">Expert Doctors</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://play.google.com/store/apps/details?id=com.doctors.adda">
                  <button className="bg-white text-[#00659c] hover:bg-gray-50 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group cursor-pointer">
                  <span>Download App Now</span>
                  <Heart size={18} className="ml-2 group-hover:text-red-500 transition-colors" />
                </button>
                </a>
                <button className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Right Image & Features */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=500&h=600&fit=crop"
                    alt="Medical team providing healthcare"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-6 -right-6 bg-white text-[#00659c] p-4 rounded-2xl shadow-xl border border-blue-100 transform hover:scale-110 transition-transform duration-300">
                  <div className="flex items-center space-x-2 mb-1">
                    <Award size={20} className="text-[#fcbe57]" />
                    <span className="font-bold text-sm">Trusted Care</span>
                  </div>
                  <div className="text-xs text-gray-600 text-center">Since 1999</div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-[#fcbe57] to-[#ffd700] text-white p-4 rounded-2xl shadow-xl transform hover:scale-110 transition-transform duration-300">
                  <div className="flex items-center space-x-2 mb-1">
                    <Shield size={20} />
                    <span className="font-bold text-sm">ISO Certified</span>
                  </div>
                  <div className="text-xs opacity-90 text-center">Quality Assured</div>
                </div>

                <div className="absolute top-1/2 -left-8 bg-white text-[#00659c] p-3 rounded-xl shadow-xl border border-blue-100 transform hover:scale-110 transition-transform duration-300">
                  <div className="flex items-center space-x-2">
                    <Star size={16} className="text-[#fcbe57]" />
                    <span className="font-bold text-xs">4.9★</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Rating</div>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
                <Users size={24} className="text-[#fcbe57] mx-auto mb-2" />
                <div className="text-white font-semibold text-sm">Expert Team</div>
                <div className="text-white/70 text-xs">Specialized Care</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
                <Clock size={24} className="text-[#fcbe57] mx-auto mb-2" />
                <div className="text-white font-semibold text-sm">24/7 Support</div>
                <div className="text-white/70 text-xs">Always Available</div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default AboutUsSection;