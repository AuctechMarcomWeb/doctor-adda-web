import React, {useEffect, useState } from "react";
import {
  MapPin,
  PhoneCall,
  BadgeCheck,
  Star,
  Upload,
  PlusCircle,
  Clock,
  Shield,
  Truck,
  Award,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  Camera,
  Check,
  ChevronRight,
  Zap,
  Users,
  Globe
} from "lucide-react";

const PharmacyDetailPage = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [activeTab, setActiveTab] = useState("about");
  const [prescription, setPrescription] = useState(null);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [reviews, setReviews] = useState([
    {
      name: "Amit Chauhan",
      comment: "Exceptional service! The pharmacist was very knowledgeable and helped me understand my medication. Quick delivery and genuine products.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      date: "2 days ago",
      verified: true
    },
    {
      name: "Priya Sinha",
      comment: "Best pharmacy in the area. Always stock fresh medicines and the staff is very courteous. Highly recommended!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      date: "1 week ago",
      verified: true
    },
    {
      name: "Rahul Sharma",
      comment: "Great experience with their home delivery service. Medicine arrived within 20 minutes!",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/33.jpg",
      date: "2 weeks ago",
      verified: false
    }
  ]);

  const handleFileChange = (e) => {
    setPrescription(e.target.files[0]);
  };

  const handleAddReview = () => {
    const name = prompt("Enter your name:");
    const comment = prompt("Enter your review:");
    const rating = parseInt(prompt("Enter rating (1-5):"));
    if (name && comment && rating) {
      setReviews([
        ...reviews,
        {
          name,
          comment,
          rating,
          image: "https://randomuser.me/api/portraits/lego/1.jpg",
          date: "Just now",
          verified: false
        },
      ]);
    }
  };

  const features = [
    { icon: Shield, text: "100% Genuine Products", color: "text-green-600" },
    { icon: Truck, text: "Express Delivery", color: "text-blue-600" },
    { icon: Clock, text: "24/7 Available", color: "text-purple-600" },
    { icon: Award, text: "Licensed Pharmacy", color: "text-amber-600" }
  ];

  const services = [
    { name: "Prescription Medicines", icon: "💊" },
    { name: "Health Supplements", icon: "🌿" },
    { name: "Personal Care", icon: "🧴" },
    { name: "Baby Care", icon: "👶" },
    { name: "Online Consultation", icon: "👨‍⚕️" },
    { name: "Health Checkup", icon: "🩺" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-28" >
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto  py-8">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Home</span>
              <ChevronRight className="w-4 h-4" />
              <span>Pharmacies</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-blue-600 font-medium">HealthPlus Pharmacy</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-all duration-300 ${isLiked ? 'bg-red-100 text-red-600' : 'bg-white text-gray-400 hover:text-red-500'} shadow-lg hover:shadow-xl`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full bg-white text-gray-600 hover:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Image & Gallery */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src="https://i.pinimg.com/1200x/72/59/6e/72596e499f868bdfce8220559315fcf5.jpg"
                    alt="Pharmacy"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    <feature.icon className={`w-8 h-8 ${feature.color} mb-2 group-hover:scale-110 transition-transform duration-300`} />
                    <p className="text-sm font-medium text-gray-700">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Info Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-6">
                  {/* Header */}
                  <div className="text-center pb-4 border-b border-gray-100">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">HealthPlus Pharmacy</h1>
                      <BadgeCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>Gomti Nagar, Lucknow</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">4.9 (156 reviews)</span>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-700">Open Now - 24/7</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Shop No. 12, 1090 Chauraha, Gomti Nagar, Lucknow</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                      <PhoneCall className="w-5 h-5" />
                      Call Now
                    </button>
                    <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                      <MessageCircle className="w-5 h-5" />
                      Chat with Pharmacist
                    </button>
                  </div>

                  {/* Services Preview */}
                  {/* <div className="pt-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-3">Available Services</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {services.slice(0, 6).map((service, index) => (
                        <div key={index} className="text-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                          <div className="text-lg mb-1">{service.icon}</div>
                          <div className="text-xs text-gray-600 leading-tight">{service.name}</div>
                        </div>
                      ))}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto  py-12">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-100 bg-gray-50/50">
            <nav className="flex">
              <button
                className={`px-8 py-4 font-semibold transition-all duration-300 relative ${
                  activeTab === "about"
                    ? "text-blue-600 bg-white shadow-lg"
                    : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About & Services
                {activeTab === "about" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full"></div>
                )}
              </button>
              <button
                className={`px-8 py-4 font-semibold transition-all duration-300 relative ${
                  activeTab === "review"
                    ? "text-blue-600 bg-white shadow-lg"
                    : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
                }`}
                onClick={() => setActiveTab("review")}
              >
                Reviews & Ratings
                {activeTab === "review" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full"></div>
                )}
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="space-y-8">
                {/* Description */}
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About HealthPlus Pharmacy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    HealthPlus Pharmacy is committed to providing high-quality medicines, wellness products, and health services through its extensive network of stores and prompt delivery system. We pride ourselves on being your trusted healthcare partner, offering genuine medications and expert pharmaceutical advice.
                  </p>
                </div>

                {/* Prescription Upload Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-blue-600" />
                    Quick Prescription Upload
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Upload Area */}
                    <div>
                      <label className="block mb-3 font-medium text-gray-700">Upload Prescription</label>
                      <div className="relative group">
                        <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300">
                          <input
                            type="file"
                            className="hidden"
                            id="prescription"
                            onChange={handleFileChange}
                          />
                          <label htmlFor="prescription" className="flex flex-col items-center cursor-pointer">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                              <Upload className="w-8 h-8 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-700 mb-1">Click to Upload</span>
                            <span className="text-sm text-gray-500">JPG, PNG, PDF (Max 5MB)</span>
                          </label>
                        </div>
                        {prescription && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2">
                              <Check className="w-5 h-5 text-green-600" />
                              <span className="text-sm font-medium text-green-700">
                                Uploaded: {prescription.name}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                      <div>
                        <label className="block mb-2 font-medium text-gray-700">Medicine Description</label>
                        <input
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Enter medicine details or requirements"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium text-gray-700">Duration of Supply</label>
                        <input
                          type="text"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          placeholder="e.g., 7 days, 1 month"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                        Get Quote & Continue
                      </button>
                    </div>
                  </div>
                </div>

                {/* Services Grid */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Our Services</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 group border border-gray-100">
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{service.name}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Review Tab */}
            {activeTab === "review" && (
              <div className="space-y-8">
                {/* Reviews Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-gray-900">4.9</span>
                        <span className="text-gray-600">out of 5</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>156 reviews</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleAddReview}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Write Review
                  </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                          />
                          {review.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold text-gray-900">{review.name}</h4>
                              {review.verified && (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-gray-700">({review.rating}/5)</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDetailPage;