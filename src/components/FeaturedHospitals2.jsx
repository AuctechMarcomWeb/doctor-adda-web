import React, { useEffect, useRef, useState } from "react";
import { Star, Phone, ChevronLeft, ChevronRight} from "lucide-react";


const hospitals = [
  {
    name: "Apollo Hospital",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400",
    specialties: ["Cardiology", "Oncology", "Neurology"],
    rating: 4.8,
    location: "Lucknow",
    established: "1983",
    beds: "500+",
    description:
      "Leading multi-specialty hospital with world-class medical care and advanced technology.",
    highlights: ["24/7 Emergency", "International Patients", "Robotic Surgery"],
  },
  {
    name: "Fortis Healthcare",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400",
    specialties: ["Orthopedics", "Gastroenterology", "Cardiology"],
    rating: 4.6,
    location: "Pan India",
    established: "2001",
    beds: "400+",
    description:
      "Comprehensive healthcare services with cutting-edge medical technology and expert doctors.",
    highlights: ["Minimally Invasive Surgery", "Critical Care", "Organ Transplant"],
  },
  {
    name: "Max Healthcare",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    specialties: ["Cancer Care", "Heart Surgery", "Pediatrics"],
    rating: 4.7,
    location: "North India",
    established: "2000",
    beds: "350+",
    description:
      "Patient-centric healthcare with advanced medical facilities and personalized care.",
    highlights: ["Cancer Institute", "Pediatric ICU", "Telemedicine"],
  },
  {
    name: "AIIMS",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400",
    specialties: ["Research", "Medical Education", "All Specialties"],
    rating: 4.9,
    location: "Multiple Cities",
    established: "1956",
    beds: "2000+",
    description:
      "Premier medical institution offering world-class healthcare, research, and medical education.",
    highlights: ["Medical Research", "Teaching Hospital", "Affordable Care"],
  },
  {
    name: "Medanta",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400",
    specialties: ["Multi-organ Transplant", "Robotic Surgery", "Critical Care"],
    rating: 4.8,
    location: "Gurugram",
    established: "2009",
    beds: "1250+",
    description:
      "Multi-super specialty hospital with state-of-the-art infrastructure and medical expertise.",
    highlights: ["Heart Transplant", "Liver Transplant", "Robotic Surgery"],
  },
  {
    name: "Manipal Hospital",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400",
    specialties: ["Nephrology", "Urology", "Gastroenterology"],
    rating: 4.5,
    location: "Bangalore",
    established: "1953",
    beds: "600+",
    description:
      "Trusted healthcare provider with decades of experience in medical excellence.",
    highlights: ["Kidney Transplant", "Minimal Access Surgery", "Emergency Care"],
  },
  {
    name: "BLK Hospital",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400",
    specialties: ["Bone Marrow Transplant", "IVF", "Laparoscopic Surgery"],
    rating: 4.4,
    location: "Delhi",
    established: "1959",
    beds: "650+",
    description:
      "Multi-specialty tertiary care hospital with advanced medical technology and expert care.",
    highlights: ["BMT Center", "IVF Success Rate", "Day Care Surgery"],
  },
  {
    name: "Narayana Health",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400",
    specialties: ["Cardiac Surgery", "Neurosurgery", "Oncology"],
    rating: 4.6,
    location: "Bangalore",
    established: "2000",
    beds: "6000+",
    description:
      "Quality healthcare at affordable costs with a network of hospitals across India.",
    highlights: ["Affordable Care", "Cardiac Excellence", "Preventive Health"],
  },
];

const FeaturedHospitals2 = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);

  const hospitalList = [...hospitals, ...hospitals];

  const scroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !isScrolling) {
      animationRef.current = requestAnimationFrame(scroll);
      return;
    }

    scrollContainer.scrollLeft += 0.5;
    if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
      scrollContainer.scrollLeft = 0;
    }

    animationRef.current = requestAnimationFrame(scroll);
  };

  useEffect(() => {
    scroll();
    return () => cancelAnimationFrame(animationRef.current);
  }, [isScrolling]);

  const stopScrolling = () => setIsScrolling(false);
  const resumeScrolling = () => setIsScrolling(true);

  const handleScrollLeft = () => {
    stopScrolling();
    scrollRef.current.scrollLeft -= 300;
  };

  const handleScrollRight = () => {
    stopScrolling();
    scrollRef.current.scrollLeft += 300;
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 relative">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Featured{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Hospitals
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover India's leading healthcare institutions offering world-class
          medical care, cutting-edge technology, and compassionate treatment.
        </p>
      </div>

      {/* Scroll buttons */}
      <button
        onClick={handleScrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 border border-gray-300 shadow p-2 rounded-full"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={handleScrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 border border-gray-300 shadow p-2 rounded-full"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar pb-4 px-8"
        style={{ scrollBehavior: "smooth" }}
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
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">
                    {hospital.rating}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                  Est. {hospital.established}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {hospital.name}
                </h3>
                <p
                  className="text-gray-600 text-sm mb-4 leading-relaxed"
                  style={{ minHeight: 68 }}
                >
                  {hospital.description}
                </p>
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 bg-blue-600 text-white py-2  rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Book Appointment
                  </button>
                  <button className="px-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
