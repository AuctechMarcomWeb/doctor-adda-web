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
  <div className="w-full bg-white py-8">
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 lg:w-[70%] sm:w-full xl:w-[70%]">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Our{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Categories
          </span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Quality healthcare services at your fingertips
        </p>
      </div>

      {/* Services Container */}
      <div className="relative flex justify-center">
        {/* Fade Effects */}
        <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex space-x-4 sm:space-x-6 w-max pb-4">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group cursor-pointer transition-all duration-300 flex-shrink-0"
                onClick={() => {
                  if (service?.name === "Blood Bank") {
                    navigation("/bloodbank");
                  } else if (service?.name === "Ambulance") {
                    navigation("/ambulance");
                  } else if (service?.name === "Pharmacies") {
                    navigation("/pharmacy");
                  } else if (service?.name === "Diagnostic") {
                    navigation("/diagnostic");
                  } else if (service?.name === "Doctor & Specialists") {
                    navigation("/doctor");
                  } else if (service?.name === "Hospitals & Clinics") {
                    navigation("/hospital");
                  }
                  scrollToIndex(index);
                }}
              >
                {/* Image Container */}
                <div className="w-40 sm:w-44 md:w-48 lg:w-56 h-32 sm:h-36 lg:h-40 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Service Name */}
                <h3 className="text-center mt-3 text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 min-h-[3rem]">
                  {service.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
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
