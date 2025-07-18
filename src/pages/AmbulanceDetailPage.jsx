import React, { useState } from 'react';
import { ArrowLeft, Phone, Star, Clock, MapPin, Users, Shield, ChevronRight, MessageSquare, Heart, Share2, Bookmark } from 'lucide-react';

const AmbulanceDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent service! Very professional and quick response time. The medical team was well-equipped and handled the emergency with great care.",
      date: "2 days ago",
      avatar: "RK"
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4,
      comment: "Good ambulance service with modern equipment. Driver was experienced and reached on time. Highly recommended for emergency situations.",
      date: "1 week ago",
      avatar: "PS"
    },
    {
      id: 3,
      name: "Dr. Amit Singh",
      rating: 5,
      comment: "Outstanding medical equipment and trained paramedics. This ambulance service maintains high standards of patient care during transport.",
      date: "2 weeks ago",
      avatar: "AS"
    }
  ];

  const features = [
    { icon: "🚑", title: "Advanced Life Support", desc: "Equipped with ventilators, defibrillators, and cardiac monitors" },
    { icon: "👨‍⚕️", title: "Trained Paramedics", desc: "Certified medical professionals with emergency care expertise" },
    { icon: "📱", title: "GPS Tracking", desc: "Real-time location tracking for family members" },
    { icon: "🏥", title: "Hospital Network", desc: "Direct coordination with major hospitals in the city" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Ambulance Details</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-600'}`} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-white">
        {/* Hero Image */}
        <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <img 
            src="https://i.pinimg.com/1200x/68/f7/06/68f70659ffa1c253817619fcd559ea9d.jpg" 
            alt="Emergency Ambulance"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Available</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Title and Rating */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Ambulance</h2>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.0 (128 reviews)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">Verified • ICU Equipped</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">₹700</div>
              <div className="text-sm text-gray-500">per trip</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">4</div>
              <div className="text-sm text-gray-600">Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">5min</div>
              <div className="text-sm text-gray-600">Avg Response</div>
            </div>
          </div>

          {/* Call Button */}
          <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 rounded-xl mb-6 flex items-center justify-center space-x-2 hover:from-red-600 hover:to-red-700 transition-all shadow-lg">
            <Phone className="w-5 h-5" />
            <span>Call Ambulance Now</span>
          </button>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'details', label: 'Details' },
              { id: 'reviews', label: 'Reviews' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    1090 Chouraha, Chatori Galli, Manas Nagar Colony,
                    Jiamau, Lucknow, Uttar Pradesh 226001, India
                  </p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-1 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Get the closest ambulance within minutes. 24/7 service trusted by thousands. 
                  Immediate medical transport at affordable rates with trained paramedics and 
                  modern life-support equipment.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Driver Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">Aman Yadav</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mobile:</span>
                    <span className="font-medium">+91 65465 54699</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">License:</span>
                    <span className="font-medium">DL1234567898012</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">8 years</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Emergency Contact</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Emergency Helpline:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-red-600">911</span>
                    <button className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Operating Hours</h3>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-medium">24/7 Available</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Customer Reviews</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Add Review
                </button>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{review.name}</h4>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
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
  );
};

export default AmbulanceDetailPage;