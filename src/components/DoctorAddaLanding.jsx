import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Star,
  Users,
  Clock,
  Shield,
  Heart,
  Stethoscope,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import HeroSection from "./HeroSection";

const DoctorAddaLanding = () => {

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
     

      {/* Hero Section */}
    
<HeroSection/>
    

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "1000+", label: "Expert Doctors" },
              { number: "50,000+", label: "Happy Patients" },
              { number: "25+", label: "Specializations" },
              { number: "99.9%", label: "Uptime" },
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


        {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 `}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare services designed to meet all your
              medical needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Online Consultation",
                description:
                  "Connect with doctors via video call, chat, or phone from anywhere",
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Easy Appointment",
                description:
                  "Book appointments with your preferred doctors at convenient times",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure & Private",
                description:
                  "Your medical data is encrypted and completely confidential",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "24/7 Emergency",
                description:
                  "Round-the-clock emergency medical support when you need it",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Health Monitoring",
                description:
                  "Track your health metrics and get personalized recommendations",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Family Care",
                description:
                  "Manage healthcare for your entire family in one place",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      {/* <section id="doctors" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${fadeInUp("doctors")}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Doctors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced and certified medical professionals ready to help you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                specialty: "Cardiologist",
                experience: "15 years",
                rating: "4.9",
                image:
                  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Dr. Michael Chen",
                specialty: "Neurologist",
                experience: "12 years",
                rating: "4.8",
                image:
                  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Dr. Emily Davis",
                specialty: "Pediatrician",
                experience: "10 years",
                rating: "5.0",
                image:
                  "https://images.unsplash.com/photo-1594824475905-537c7ba2d1c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              },
            ].map((doctor, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {doctor.specialty}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">
                      {doctor.experience} experience
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of patients who trust Doctor Adda for their
            healthcare needs. Get started today and experience healthcare like
            never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all">
              Start Your Journey
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default DoctorAddaLanding;
