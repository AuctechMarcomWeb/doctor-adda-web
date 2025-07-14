import React, { useEffect, useRef, useState } from "react";
import { Star, MapPin, Phone, Clock, Award, Users } from "lucide-react";

const hospitals = [
  { 
    name: "Apollo Hospital", 
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400",
    specialties: ["Cardiology", "Oncology", "Neurology"],
    rating: 4.8,
    location: "Lucknow",
    established: "1983",
    beds: "500+",
    description: "Leading multi-specialty hospital with world-class medical care and advanced technology.",
    highlights: ["24/7 Emergency", "International Patients", "Robotic Surgery"]
  },
  { 
    name: "Fortis Healthcare", 
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400",
    specialties: ["Orthopedics", "Gastroenterology", "Cardiology"],
    rating: 4.6,
    location: "Pan India",
    established: "2001",
    beds: "400+",
    description: "Comprehensive healthcare services with cutting-edge medical technology and expert doctors.",
    highlights: ["Minimally Invasive Surgery", "Critical Care", "Organ Transplant"]
  },
  { 
    name: "Max Healthcare", 
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    specialties: ["Cancer Care", "Heart Surgery", "Pediatrics"],
    rating: 4.7,
    location: "North India",
    established: "2000",
    beds: "350+",
    description: "Patient-centric healthcare with advanced medical facilities and personalized care.",
    highlights: ["Cancer Institute", "Pediatric ICU", "Telemedicine"]
  },
  { 
    name: "AIIMS", 
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400",
    specialties: ["Research", "Medical Education", "All Specialties"],
    rating: 4.9,
    location: "Multiple Cities",
    established: "1956",
    beds: "2000+",
    description: "Premier medical institution offering world-class healthcare, research, and medical education.",
    highlights: ["Medical Research", "Teaching Hospital", "Affordable Care"]
  },
  { 
    name: "Medanta", 
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400",
    specialties: ["Multi-organ Transplant", "Robotic Surgery", "Critical Care"],
    rating: 4.8,
    location: "Gurugram",
    established: "2009",
    beds: "1250+",
    description: "Multi-super specialty hospital with state-of-the-art infrastructure and medical expertise.",
    highlights: ["Heart Transplant", "Liver Transplant", "Robotic Surgery"]
  },
  { 
    name: "Manipal Hospital", 
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400",
    specialties: ["Nephrology", "Urology", "Gastroenterology"],
    rating: 4.5,
    location: "Bangalore ",
    established: "1953",
    beds: "600+",
    description: "Trusted healthcare provider with decades of experience in medical excellence.",
    highlights: ["Kidney Transplant", "Minimal Access Surgery", "Emergency Care"]
  },
  { 
    name: "BLK Hospital", 
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400",
    specialties: ["Bone Marrow Transplant", "IVF", "Laparoscopic Surgery"],
    rating: 4.4,
    location: "Delhi",
    established: "1959",
    beds: "650+",
    description: "Multi-specialty tertiary care hospital with advanced medical technology and expert care.",
    highlights: ["BMT Center", "IVF Success Rate", "Day Care Surgery"]
  },
  { 
    name: "Narayana Health", 
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400",
    specialties: ["Cardiac Surgery", "Neurosurgery", "Oncology"],
    rating: 4.6,
    location: "Bangalore ",
    established: "2000",
    beds: "6000+",
    description: "Quality healthcare at affordable costs with a network of hospitals across India.",
    highlights: ["Affordable Care", "Cardiac Excellence", "Preventive Health"]
  },
];

const FeaturedHospitals2 = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (!scrollContainer || !isScrolling) {
        animationRef.current = requestAnimationFrame(scroll);
        return;
      }

      scrollContainer.scrollLeft += 0.5;

      // Reset scroll when we've scrolled through half the content (original set)
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    scroll();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isScrolling]);

  const hospitalList = [...hospitals, ...hospitals];

  const stopScrolling = () => setIsScrolling(false);
  const resumeScrolling = () => setIsScrolling(true);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 ">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center mb-4">
          Featured <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Hospitals</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover India's leading healthcare institutions offering world-class medical care, 
          cutting-edge technology, and compassionate treatment.
        </p>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex  overflow-x-auto no-scrollbar pb-4"
          style={{ scrollBehavior: 'auto' }}
          onMouseEnter={stopScrolling}
          onMouseLeave={resumeScrolling}
        >
          {hospitalList.map((hospital, index) => (
            <div
              key={index}
              className="mx-4 flex-shrink-0 cursor-pointer group"
              onClick={stopScrolling}
            >
              <div className="w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                {/* Hospital Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">{hospital.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    Est. {hospital.established}
                  </div>
                </div>

                {/* Hospital Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {hospital.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4  flex flex-wrap leading-relaxed " >
                    {hospital.description}
                  </p>

                  {/* Hospital Stats */}
                  {/* <div className="grid grid-cols-2 gap-4 mb-4"  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{hospital.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{hospital.beds} Beds</span>
                    </div>
                  </div> */}

                  {/* Specialties */}
                  {/* <div className="mb-4"  style={{ minHeight: '78px' }}>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {hospital.specialties.map((specialty, idx) => (
                        <span 
                          key={idx} 
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div> */}

                  {/* Highlights */}
                  {/* <div className="mb-4" style={{ minHeight: '40px' }}>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Highlights</h4>
                    <div className="space-y-1">
                      {hospital.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Award className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-gray-600">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Book Appointment
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Hint */}
      

      <style jsx>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default FeaturedHospitals2;