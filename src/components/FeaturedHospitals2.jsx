/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Star, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { getRequest } from "../Helpers";
import { useNavigate } from "react-router-dom";

const FeaturedHospitals2 = () => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/hospitaldetail/${id}`);
  };

  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const [hospitalList, setHospitalList] = useState([]);

  // const hospitalList = [...hospitals, ...hospitals];
  // ✅ Fetch hospitals from API
  const fetchHospitals = async () => {
    try {
      const response = await getRequest("hospital");
      console.log("Fetched hospitals:", response?.data?.data?.hospitals);
      setHospitalList(response?.data?.data?.hospitals || []);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

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
    fetchHospitals();
    scroll();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

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
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Featured{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Hospitals
          </span>
        </h2>
        <p className=" text-gray-600 max-w-3xl mx-auto">
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
                  src={
                    hospital.profileImage ||
                    "https://media.gettyimages.com/id/539204646/vector/modern-medical-facilities.jpg?s=612x612&w=gi&k=20&c=8Z_vHahm6VIDT1uOpmvhXo-DWUJ5G73mFzqVAPPSZtM="
                  }
                  alt={hospital.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">
                    {hospital.averageRating}
                  </span>
                </div>
                {/* <div className="absolute bottom-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                  Est. {hospital.established}
                </div> */}
              </div>

              <div className="p-6">
                <h3 className=" mb-2 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {hospital.name?.split(" ").slice(0, 3).join(" ")}
                </h3>
                <p
                  className="text-gray-600 text-sm mb-4 leading-relaxed"
                  style={{ minHeight: 100 }}
                >
                  {hospital.description?.length > 100
                    ? `${hospital.description.substring(0, 100)}...`
                    : hospital.description}
                </p>
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 bg-[#00669e] text-white py-2  rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Book Appointment
                  </button>
                  <button
onClick={() => handleViewDetails(hospital._id)}
                    className="px-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                  >
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
