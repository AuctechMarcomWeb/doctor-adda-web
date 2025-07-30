/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../Helpers";
const ServicesSection2 = () => {

  const navigation = useNavigate()
const [services, setServices] = useState([]);

  // const services = [
  //   {
  //     id: 1,
  //     name: "Blood Bank",
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1661779739047-c5c27cf8ebac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Qmxvb2QlMjBCYW5rfGVufDB8fDB8fHww",
  //   },
  // ];

  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
useEffect(() => {
  const fetchServices = async () => {
    try {
      const res = await getRequest("services?page=1&limit=10"); // 👈 API call
      console.log("Services fetched:", res?.data?.data?.services);
      setServices(res?.data?.data?.services || []); // 🔁 adjust if response shape is different
      
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  fetchServices();
}, []);


  // Auto-scroll effect
  useEffect(() => {
    if (!isPaused && scrollContainerRef.current) {
      const interval = setInterval(() => {
        const container = scrollContainerRef.current;
        const cardWidth = 216; // 192px (w-48) + 24px (gap)
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
          setCurrentIndex(0);
        } else {
          container.scrollLeft += cardWidth;
          setCurrentIndex((prev) => (prev + 1) % services.length);
        }
      }, 2000); // Auto-scroll every 2 seconds

      return () => clearInterval(interval);
    }
  }, [isPaused, services.length]);

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = 216; // 192px (w-48) + 24px (gap)
      scrollContainerRef.current.scrollLeft = index * cardWidth;
      setCurrentIndex(index);
    }
  };

  const scrollPrevious = () => {
    const newIndex =
      currentIndex === 0 ? services.length - 1 : currentIndex - 1;
    scrollToIndex(newIndex);
  };

  const scrollNext = () => {
    const newIndex =
      currentIndex === services.length - 1 ? 0 : currentIndex + 1;
    scrollToIndex(newIndex);
  };

  return (
    <div className="w-full bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-gray-600">
            Quality healthcare services at your fingertips
          </p>
        </div>

        {/* Services Container */}
        <div className="relative">
          {/* Fade Effects */}
          <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Previous Arrow */}
          {/* <button
            onClick={scrollPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-opacity-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button> */}

          {/* Next Arrow */}
          {/* <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-opacity-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button> */}

          {/* Pause/Play Button */}
          {/* <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute top-4 right-4 z-20 bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 invisible"
          >
            {isPaused ? (
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button> */}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex space-x-6 w-max pb-4">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`group cursor-pointer transition-all duration-300 ${
                    currentIndex === index ? "" : ""
                  }`}
                  onClick={() => {
                    if (service?.name == "Blood Bank") {
                      console.log("Blood Bank", service?.name);
                      navigation("/bloodbank")
                    } else if(service?.name == "Ambulance"){
                      
                      navigation("/ambulance")
                    }else if(service?.name == "Pharmacies"){
                      
                      navigation("/pharmacy")
                    }else if(service?.name == "Diagnostic"){
                      
                      navigation("/diagnostic")
                    }else if(service?.name == "Doctor & Specialists"){
                      
                      navigation("/doctor")
                    }else if(service?.name == "Hospitals & Clinics"){
                      
                      navigation("/hospital")
                    } else {
                      console.log("sdfsdfsdf", service?.name);
                    }

                    scrollToIndex(index);
                  }}
                >
                  {/* Image Container */}
                  <div className="w-48 h-36 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Service Name */}
                  <h3 className="text-center mt-4 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {service.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {/* <div className="flex justify-center mt-6 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div> */}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default ServicesSection2;
