import React, { useState, useEffect } from "react";
import {
  Star, MapPin, BadgeCheck, Calendar, Stethoscope, GraduationCap, Phone,
  MessageCircle, Building2, IndianRupee, CalendarDays, Award, Shield,
  Users, CheckCircle, Video, PlusCircle, Crown, Activity, Clock, Globe,
  Heart, TrendingUp, Zap
} from "lucide-react";


// Constants
const DOCTOR_DATA = {
  name: "Dr. Ananya Singh",
  specialty: "General Physician",
  rating: 4.9,
  reviewCount: 156,
  experience: 12,
  phone: "+91 98765 43210",
  address: "Shop No. 12, 1090 Chauraha, Gomti Nagar, Lucknow",
  consultationFee: 800,
  image: "https://i.pinimg.com/736x/94/82/a3/9482a323103052c74462f90cd8c1e87b.jpg",
  about: "Dr. Ananya Singh is a highly experienced Internal Medicine specialist with over 12 years of clinical practice. She combines evidence-based medicine with compassionate care, focusing on preventive healthcare and patient wellness."
};

const TIME_SLOTS = [
  { time: "10:00 AM", available: true }, { time: "10:30 AM", available: false },
  { time: "11:00 AM", available: true }, { time: "11:30 AM", available: true },
  { time: "12:00 PM", available: false }, { time: "12:30 PM", available: true },
  { time: "5:00 PM", available: true }, { time: "5:30 PM", available: true }
];

const HIGHLIGHTS = [
  { icon: Shield, text: "100% Trusted", color: "text-green-600" },
  { icon: Clock, text: "24/7 Available", color: "text-blue-600" },
  { icon: Zap, text: "12+ years Experience", color: "text-purple-600" },
  { icon: CheckCircle, text: "Licensed Doctor", color: "text-orange-500" }
];

const EDUCATION = [
  { degree: "MBBS", institution: "AIIMS, Delhi", year: "2013" },
  { degree: "MD - Internal Medicine", institution: "PGI, Chandigarh", year: "2017" },
  { degree: "Fellowship in Diabetology", institution: "Medanta Institute", year: "2018" }
];

const REVIEWS = [
  { name: "Priya Gupta", rating: 5, comment: "Excellent doctor! Very thorough examination and clear explanations.", date: "2 weeks ago", verified: true },
  { name: "Rohit Kumar", rating: 5, comment: "Dr. Singh is compassionate and professional. Highly recommend!", date: "1 month ago", verified: true },
  { name: "Anjali Mehta", rating: 4, comment: "Good experience overall. The clinic is well-maintained.", date: "3 weeks ago", verified: false }
];

// Components
const GradientCard = ({ children, className = "", gradient = "from-blue-500/5 to-purple-500/5", rotation = "rotate-1" }) => (
  <div className="relative">
    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-3xl transform ${rotation}`}></div>
    <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 ${className}`}>
      {children}
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, subtitle, gradient = "from-blue-500 to-indigo-600" }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`p-4 bg-gradient-to-r ${gradient} rounded-2xl shadow-lg`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-lg text-blue-600 font-medium">{subtitle}</p>}
    </div>
  </div>
);

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-2 text-yellow-500">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400" />
    ))}
    <span className="text-gray-700 text-sm font-medium ml-1">{rating} ({DOCTOR_DATA.reviewCount} reviews)</span>
  </div>
);

const TimeSlotButton = ({ slot, isSelected, onSelect }) => (
  <button
    onClick={() => slot.available && onSelect(slot.time)}
    className={`text-sm py-3 px-3 rounded-xl font-bold transition-all duration-300 ${
      slot.available 
        ? isSelected 
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105' 
          : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
    }`}
    disabled={!slot.available}
  >
    {slot.time}
  </button>
);

const ReviewCard = ({ review }) => (
  <div className="bg-gradient-to-r from-gray-50 to-transparent p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-500">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12  rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}>
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
);

const EducationItem = ({ education }) => (
  <div className="relative pl-6">
    <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" ></div>
    <div className="bg-gray-50 p-4 rounded-xl">
      <h4 className="font-bold text-gray-900">{education.degree}</h4>
      <p className="text-gray-600">{education.institution}</p>
      <span className="text-sm text-green-600 font-medium">{education.year}</span>
    </div>
  </div>
);

const ActionButton = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl transform hover:scale-105",
    secondary: "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg",
    tertiary: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg",
    danger: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-xl transform hover:scale-105"
  };
  
  return (
    <button 
      className={`py-3 px-6 rounded-xl font-bold transition-all duration-500 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Main Component

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-10 px-4 pt-40">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
          {/* Doctor Image & Highlights */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <img
                src={DOCTOR_DATA.image}
                alt={DOCTOR_DATA.name}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {HIGHLIGHTS.map((item, i) => (
                <div key={i} className="flex flex-col items-center bg-white py-4 rounded-xl shadow border text-center">
                  <div className="w-10 h-10 flex items-center justify-center mb-2">
                    <item.icon className={item.color} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Info Card */}
          <div className="bg-white shadow-2xl rounded-3xl p-6 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">{DOCTOR_DATA.name}</h2>
              <CheckCircle className="text-blue-500" />
            </div>
            
            <p className="text-sm text-gray-600">{DOCTOR_DATA.specialty}</p>
            <StarRating rating={DOCTOR_DATA.rating} />

            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold inline-block">
              Experience: {DOCTOR_DATA.experience} Years
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {DOCTOR_DATA.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {DOCTOR_DATA.address}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <ActionButton className="w-full" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}>
                <Phone className="w-4 h-4"  />
                Call Now
              </ActionButton>
              <ActionButton variant="secondary" className="w-full">
                <MessageCircle className="w-4 h-4" />
                Book Clinic Visit
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* About Section */}
            <GradientCard className="p-10">
              <SectionHeader 
                icon={Stethoscope} 
                title={`About ${DOCTOR_DATA.name}`}
                subtitle={DOCTOR_DATA.specialty}
              />
              <p className="text-gray-700 leading-relaxed">
                {DOCTOR_DATA.about}
              </p>
            </GradientCard>

            {/* Education Section */}
            <GradientCard gradient="from-green-500/5 to-emerald-500/5" rotation="-rotate-1" className="p-8">
              <SectionHeader 
                icon={GraduationCap} 
                title="Education"
                gradient="from-green-500 to-emerald-500"
              />
              <div className="space-y-6">
                {EDUCATION.map((edu, index) => (
                  <EducationItem key={index} education={edu} />
                ))}
              </div>
            </GradientCard>

            {/* Reviews Section */}
            <GradientCard gradient="from-purple-500/5 to-pink-500/5" rotation="-rotate-1" className="p-10" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}>
              <div className="flex justify-between items-center mb-8">
                <SectionHeader 
                  icon={MessageCircle} 
                  title="Patient Reviews"
                  subtitle="What patients say about Dr. Singh"
                  gradient="from-purple-500 to-pink-500"
                />
                <ActionButton 
                  variant="tertiary" 
                  onClick={() => setShowReviewForm(true)} style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}
                >
                  <PlusCircle className="w-5 h-5" />
                  Write Review
                </ActionButton>
              </div>

              <div className="grid gap-6">
                {REVIEWS.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <h3 className="font-bold mb-4 text-xl">Share Your Experience</h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={reviewData.name} 
                      onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-300" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}} 
                    />
                    <textarea 
                      placeholder="Your Review" 
                      rows="4" 
                      value={reviewData.comment} 
                      onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/25 focus:border-purple-500 transition-all duration-300" 
                    />
                    <div className="flex gap-3">
                      <ActionButton variant="tertiary" onClick={handleReviewSubmit}>
                        Submit
                      </ActionButton>
                      <button 
                        onClick={() => setShowReviewForm(false)} 
                        className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all duration-300 font-bold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </GradientCard>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Appointment Booking */}
            <div className="sticky top-8">
              <GradientCard gradient="from-blue-500/10 to-indigo-500/10" rotation="rotate-2" className="p-8 border-blue-100" >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-3  text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}>
                    <Calendar className="w-6 h-6" />
                    Ananya Clinic
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-gray-900">₹{DOCTOR_DATA.consultationFee}</div>
                    <p className="text-green-700 font-medium">Consultation Fee</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-gray-900">Available Today</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {TIME_SLOTS.map((slot, index) => (
                        <TimeSlotButton 
                          key={index} 
                          slot={slot}
                          isSelected={selectedSlot === slot.time}
                          onSelect={setSelectedSlot}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <ActionButton className="w-full py-4 rounded-2xl" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}>
                      <Calendar className="w-5 h-5" />
                      Confirm Booking
                    </ActionButton>
                    <div className="grid grid-cols-2 gap-3">
                      <ActionButton variant="secondary">
                        <Phone className="w-4 h-4" />
                        Call
                      </ActionButton>
                      <ActionButton variant="tertiary">
                        <Video className="w-4 h-4" />
                        Video
                      </ActionButton>
                    </div>
                  </div>
                </div>
              </GradientCard>
            </div>

            {/* Clinic Info */}
            <GradientCard gradient="from-indigo-500/10 to-purple-500/10" rotation="-rotate-2" className="p-8 border-indigo-100">
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
            </GradientCard>


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

                  <ActionButton variant="danger" className="w-full py-4 rounded-2xl">
                    Emergency Call
                  </ActionButton>
                </div>
              </div>
            </div>
          </aside>
        </div>

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