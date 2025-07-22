import React, { useState } from "react";
import {
  Star,
  MapPin,
  PhoneCall,
  BadgeCheck,
  Mail,
  LocateFixed,
  PlusCircle,
  Award,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Heart
} from "lucide-react";

const DiagnosticDetailPage = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-18" >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 " style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)" }}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <BadgeCheck className="w-4 h-4 text-green-400" />
                Certified & Trusted
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                FastCare
                <span className="block text-transparent bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text">
                  Diagnostic
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 max-w-lg">
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

      {/* Action Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <PhoneCall className="w-5 h-5 group-hover:animate-pulse" />
              Call Now
            </button>
            <button className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Mail className="w-5 h-5 group-hover:animate-bounce" />
              Email Us
            </button>
            <button className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <LocateFixed className="w-5 h-5 group-hover:animate-pulse" />
              Get Directions
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        
        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tests & Services */}
          <div className="group">
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Available Tests & Services</h2>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <label className="group/item flex items-center gap-4 p-4 rounded-2xl jbg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-200">
                    <input type="checkbox" className="w-5 h-5 rounded border-2 border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-2" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Lipid Profile</div>
                      <div className="text-blue-600 font-bold text-lg">₹600</div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </label>
                  
                  <label className="group/item flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-200">
                    <input type="checkbox" className="w-5 h-5 rounded border-2 border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-2" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Liver Function Test</div>
                      <div className="text-blue-600 font-bold text-lg">₹1,500</div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Health Packages */}
          <div className="group">
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Health Packages</h2>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <label className="group/item flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 transition-colors cursor-pointer border border-transparent hover:border-emerald-200">
                    <input type="checkbox" className="w-5 h-5 rounded border-2 border-emerald-300 text-emerald-600 focus:ring-emerald-500 focus:ring-2" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Basic Health Checkup</div>
                      <div className="text-emerald-600 font-bold text-lg">₹900</div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </label>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                  <div className="text-center">
                    
                    {/* <h3 className="font-bold text-emerald-800 mb-2">Premium Package Coming Soon!</h3> */}
                    <p className="text-sm text-emerald-600">Comprehensive health screening with advanced diagnostics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Tab Navigation */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <nav className="flex gap-2">
              <button
                className={`px-8 py-4 font-semibold rounded-2xl transition-all duration-300 ${
                  activeTab === "about"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:bg-white hover:shadow-md"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About Us
              </button>
              <button
                className={`px-8 py-4 font-semibold rounded-2xl transition-all duration-300 ${
                  activeTab === "review"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:bg-white hover:shadow-md"
                }`}
                onClick={() => setActiveTab("review")}
              >
                Patient Reviews
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="space-y-8 text-gray-700 leading-relaxed">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">24/7 Available</h3>
                    <p className="text-sm text-gray-600">Round-the-clock emergency services</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                    <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Expert Team</h3>
                    <p className="text-sm text-gray-600">Trained professionals & paramedics</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                    <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Certified</h3>
                    <p className="text-sm text-gray-600">Accredited diagnostic center</p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                    About Vijaya Diagnostics
                  </h3>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-6">
                    <p className="text-lg leading-relaxed">
                      Vijaya Diagnostics is a trusted emergency medical transportation provider serving the entire Delhi NCR region.
                      Our fleet is equipped with modern life-saving equipment and our drivers are trained first responders.
                      Whether it's a medical emergency or a planned patient transfer, we ensure timely and reliable service.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
                    <p className="text-lg leading-relaxed">
                      We offer both AC and non-AC Diagnostic with GPS tracking, trained paramedics, and on-board emergency supplies like oxygen cylinders and medications.
                      With 24/7 availability, our mission is to deliver compassionate, efficient, and safe transport for every patient.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "review" && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Patients Say</h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-current" />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-gray-900 ml-2">4.8</span>
                    <span className="text-gray-600">(250+ reviews)</span>
                  </div>
                </div>

                <div className="grid gap-6">
                  {[
                    {
                      name: "Rahul Sharma",
                      comment: "Excellent service! The Vijaya diagnostic arrived quickly and was very clean. The driver was professional and courteous.",
                      rating: 5,
                      image: "https://randomuser.me/api/portraits/men/32.jpg",
                    },
                    {
                      name: "Neha Verma", 
                      comment: "Fast response during an emergency. The driver reached us in under 10 minutes and handled the situation calmly.",
                      rating: 4,
                      image: "https://randomuser.me/api/portraits/women/44.jpg",
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-6">
                        <div className="relative">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                            <BadgeCheck className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed italic">"{review.comment}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-8">
                  <button className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <PlusCircle className="w-5 h-5 group-hover:animate-spin" />
                    Share Your Experience
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-3xl shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="relative p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Book Your Diagnostic?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Experience premium healthcare services with our state-of-the-art facilities and expert medical team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-4 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 font-bold text-lg flex items-center gap-3 justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-2">
                <PhoneCall className="w-6 h-6 group-hover:animate-pulse" />
                Call Now
              </button>
              <button className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticDetailPage;