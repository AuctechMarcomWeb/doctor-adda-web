import React, { useState, useEffect } from "react";
import {
  Star, MapPin, BadgeCheck, Calendar, Stethoscope, GraduationCap, Phone,
  MessageCircle, Building2, IndianRupee, CalendarDays, Award, Shield,
  Users, CheckCircle, Video, PlusCircle, Crown, Activity, Clock, Globe,
  Heart, TrendingUp, Zap
} from "lucide-react";

const DoctorDetailPage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ name: '', comment: '', rating: 5 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleReviewSubmit = () => {
    console.log("Submitted Review:", reviewData);
    setShowReviewForm(false);
    setReviewData({ name: '', comment: '', rating: 5 });
  };

  const timeSlots = [
    { time: "10:00 AM", available: true }, { time: "10:30 AM", available: false },
    { time: "11:00 AM", available: true }, { time: "11:30 AM", available: true },
    { time: "12:00 PM", available: false }, { time: "12:30 PM", available: true },
    { time: "5:00 PM", available: true }, { time: "5:30 PM", available: true }
  ];

  const specializations = [
    { name: "Internal Medicine", icon: Stethoscope, color: "from-blue-500 to-blue-600", patients: "2.5K+" },
    { name: "Diabetes Management", icon: Activity, color: "from-green-500 to-green-600", patients: "1.8K+" },
    { name: "Hypertension", icon: Shield, color: "from-red-500 to-red-600", patients: "3.2K+" },
    { name: "Preventive Care", icon: CheckCircle, color: "from-purple-500 to-purple-600", patients: "2.1K+" }
  ];

  const achievements = [
    { title: "Top Rated Doctor 2023", icon: Crown, color: "from-yellow-500 to-orange-500" },
    { title: "Patient's Choice Award", icon: Heart, color: "from-pink-500 to-rose-500" },
    { title: "Excellence in Care", icon: Award, color: "from-indigo-500 to-purple-500" },
    { title: "Medical Innovation", icon: Zap, color: "from-cyan-500 to-blue-500" }
  ];

  const reviews = [
    { name: "Priya Gupta", rating: 5, comment: "Excellent doctor! Very thorough examination and clear explanations.", date: "2 weeks ago", verified: true },
    { name: "Rohit Kumar", rating: 5, comment: "Dr. Singh is compassionate and professional. Highly recommend!", date: "1 month ago", verified: true },
    { name: "Anjali Mehta", rating: 4, comment: "Good experience overall. The clinic is well-maintained.", date: "3 weeks ago", verified: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random()}s` }}>
            </div>
          ))}
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className={`grid lg:grid-cols-5 gap-12 items-center transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            {/* Doctor Image */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                  <img src="https://i.pinimg.com/1200x/77/ce/6f/77ce6ff077e2ef6e8e23837256141ba0.jpg" 
                    alt="Dr. Ananya Singh" className="w-full h-96 object-cover rounded-2xl shadow-2xl" />
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-3 shadow-2xl animate-bounce">
                    <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                    Available Now
                  </div>
                  <div className="absolute -top-4 -left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl">
                    <Crown className="w-4 h-4 inline mr-1" />Top Rated
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Information */}
            <div className="lg:col-span-3 text-white space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-2 rounded-full shadow-lg">
                    <BadgeCheck className="w-8 h-8 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-green-400/30 to-emerald-400/30 backdrop-blur-md text-green-200 px-6 py-3 rounded-full text-lg font-bold border border-green-300/30">
                    Verified Doctor
                  </span>
                </div>
                
                <div>
                  <h1 className="text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                    Dr. Ananya Singh
                  </h1>
                  <p className="text-3xl text-blue-200 font-light mt-2">General Physician  </p>
                </div>

                <div className="flex flex-wrap items-center gap-8 text-blue-100">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <MapPin className="w-6 h-6 text-red-400" />
                    <span className="font-semibold">Vijaya Medical Center, Gurugram</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-2xl">4.7</span>
                    <span className="text-lg">(320+ reviews)</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { number: "12+", label: "Years Experience", icon: GraduationCap, color: "from-blue-500 to-blue-600" },
                  { number: "10K+", label: "Patients Treated", icon: Users, color: "from-green-500 to-green-600" },
                  { number: "₹800", label: "Consultation Fee", icon: IndianRupee, color: "from-purple-500 to-purple-600" }
                ].map((stat, index) => (
                  <div key={index} className={`relative overflow-hidden bg-gradient-to-br ${stat.color} rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                    <div className="relative z-10">
                      <stat.icon className="w-10 h-10 mb-4 text-white/80" />
                      <div className="text-4xl font-bold mb-2">{stat.number}</div>
                      <div className="text-white/80 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-6 pt-8">
                <button className="group bg-gradient-to-r from-white to-blue-50 text-blue-600 px-10 py-5 rounded-2xl font-bold hover:from-blue-50 hover:to-white transition-all duration-500 flex items-center gap-4 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2">
                  <Calendar className="w-6 h-6 group-hover:animate-bounce" />
                  Book Appointment
                </button>
                <button className="group bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold hover:from-green-500/40 hover:to-emerald-500/40 transition-all duration-500 flex items-center gap-4 border border-white/30 shadow-2xl">
                  <Phone className="w-6 h-6 group-hover:animate-pulse" />
                  Call Now
                </button>
                <button className="group bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-500 flex items-center gap-4 border border-white/30 shadow-2xl">
                  <Video className="w-6 h-6 group-hover:animate-pulse" />
                  Video Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Redesigned */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* About & Specializations */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl transform rotate-1"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-100/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">About Dr. Ananya Singh</h2>
                    <p className="text-lg text-blue-600 font-medium">Your Health, Our Priority</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-xl leading-relaxed mb-10">
                  Dr. Ananya Singh is a highly experienced Internal Medicine specialist with over 12 years of clinical practice. 
                  She combines evidence-based medicine with compassionate care, focusing on preventive healthcare and patient wellness.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {specializations.map((spec, index) => (
                    <div key={index} className={`group relative overflow-hidden bg-gradient-to-r ${spec.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <spec.icon className="w-7 h-7" />
                          <div>
                            <span className="font-bold text-lg block">{spec.name}</span>
                            <span className="text-white/80 text-sm">{spec.patients} patients</span>
                          </div>
                        </div>
                        <TrendingUp className="w-6 h-6 text-white/60 group-hover:animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education & Awards */}
            <div className="">
              {/* Education */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-3xl transform -rotate-1"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-100/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { degree: "MBBS", institution: "AIIMS, Delhi", year: "2013" },
                      { degree: "MD - Internal Medicine", institution: "PGI, Chandigarh", year: "2017" },
                      { degree: "Fellowship in Diabetology", institution: "Medanta Institute", year: "2018" }
                    ].map((edu, index) => (
                      <div key={index} className="relative pl-6">
                        <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                          <p className="text-gray-600">{edu.institution}</p>
                          <span className="text-sm text-green-600 font-medium">{edu.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Awards */}
              {/* <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-3xl transform rotate-1"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-100/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Awards</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {achievements.map((award, index) => (
                      <div key={index} className={`flex items-center gap-4 p-4 bg-gradient-to-r ${award.color} rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
                        <award.icon className="w-6 h-6" />
                        <span className="font-bold">{award.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}
            </div>

            {/* Patient Reviews */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl transform -rotate-1"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-100/50">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Patient Reviews</h2>
                      <p className="text-lg text-purple-600 font-medium">What patients say about Dr. Singh</p>
                    </div>
                  </div>
                  <button onClick={() => setShowReviewForm(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-500 flex items-center gap-2 font-bold">
                    <PlusCircle className="w-5 h-5" />
                    Write Review
                  </button>
                </div>

                <div className="grid gap-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-transparent p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-500">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900">{review.name}</h4>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {showReviewForm && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                    <h3 className="font-bold mb-4 text-xl">Share Your Experience</h3>
                    <div className="space-y-4">
                      <input type="text" placeholder="Your Name" value={reviewData.name} onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-300" />
                      <textarea placeholder="Your Review" rows="4" value={reviewData.comment} onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-300" />
                      <div className="flex gap-3">
                        <button onClick={handleReviewSubmit} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-bold">Submit</button>
                        <button onClick={() => setShowReviewForm(false)} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all duration-300 font-bold">Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Appointment Booking */}
            <div className="sticky top-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl transform rotate-2"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-blue-100">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                      <Calendar className="w-6 h-6" />
                      Book Appointment
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                      <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-gray-900">₹800</div>
                      <p className="text-green-700 font-medium">Consultation Fee</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-gray-900">Available Today</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((slot, index) => (
                          <button key={index} onClick={() => slot.available && setSelectedSlot(slot.time)} className={`text-sm py-3 px-3 rounded-xl font-bold transition-all duration-300 ${
                              slot.available ? selectedSlot === slot.time ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105' : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600' : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                            }`} disabled={!slot.available}>
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-500 flex items-center justify-center gap-3 transform hover:scale-105">
                        <Calendar className="w-5 h-5" />
                        Confirm Booking
                      </button>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-500 flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call
                        </button>
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-500 flex items-center justify-center gap-2">
                          <Video className="w-4 h-4" />
                          Video
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinic Info */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl transform -rotate-2"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-indigo-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Clinic Details</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-1">Vijaya Medical Center</h4>
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Sector 45, Gurugram, Haryana
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl">
                    <p className="text-gray-700 text-sm flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4" />
                      +91 9876543210
                    </p>
                    <p className="text-gray-700 text-sm flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      ananya.singh@clinic.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-3xl transform rotate-1"></div>
              <div className="relative bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl border-2 border-red-200 p-8 shadow-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Phone className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <h3 className="font-bold text-red-900 text-xl mb-2">Emergency Care</h3>
                  <p className="text-red-700 mb-6">24/7 urgent medical assistance</p>
                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                    Emergency Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;