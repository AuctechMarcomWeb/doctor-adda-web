import React from 'react';
import { Heart, Users, Award, Clock } from 'lucide-react';

const AboutUsSection = () => {
  return (
    <section className="bg-[#00659c] py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 px-2">
          <h2 className="text-4xl font-bold text-white mb-4">Welcome to
            <span className="bg-[#fcbe57] bg-clip-text text-transparent"> Doctors Adda</span>{" "}
           
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 ">
          {/* Left Content */}
          <div className="text-white text-justify">
            <p className="mb-4  leading-relaxed">
              At <strong>Doctors Adda</strong>, we believe that quality healthcare should be accessible
              to everyone. With a legacy spanning over two decades, we’ve remained committed to
              offering world-class medical care—where modern innovation meets human compassion.
            </p>

            <p className="mb-4   leading-relaxed">
              Our team of skilled doctors, nurses, and health professionals work collaboratively to
              ensure every patient receives personalized care—whether it’s a regular health check-up
              or a complex procedure. Your health journey is our priority.
            </p>

            {/* CTA Button */}
            <button className="bg-white text-[#00659c] hover:text-[#0074b2] font-semibold px-5 py-2.5 rounded-full border border-white transition duration-300 text-sm sm:text-base">
              Learn More
            </button>
          </div>

          {/* Right Image & Badge */}
          <div className="flex justify-center relative">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop"
                  alt="Medical team providing healthcare"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -left-5 bg-white text-[#00659c] p-3 rounded-xl shadow-xl border border-blue-200 text-sm">
                <div className="flex items-center space-x-2">
                  <Award size={18} />
                  <span className="font-bold">Trusted Care</span>
                </div>
                <div className="text-xs text-gray-600">Since 1999</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
