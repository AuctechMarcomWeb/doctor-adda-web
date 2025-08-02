import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

import { Stethoscope, Heart, Brain, Eye, Activity, User } from "lucide-react";
import { getRequest } from "../Helpers/index";

const      DoctorCategoryCards = () => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/doctor/${id}`);
  };

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getRequest("category");
      //console.log("fetched category", response);
      setCategories(response?.data?.data?.categories || []);
    } catch (error) {
     // console.error(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const getIconByCategory = (name = "") => {
    if (
      name.includes("General Physician") ||
      name.includes("Dental Care") ||
      name.includes("Cardiologist")
    )
      return Heart;
    if (name.includes("Neurologist")) return Brain;
    if (name.includes("Child Specialist")) return Stethoscope;
    if (name.includes("Ear,Nose,Throat")) return Eye;
    if (name.includes("Physio")) return Activity;
    return User;
  };

  return (
    <div  className="bg-gradient-to-br from-slate-50 to-blue-50 py-8  relative">
      <div className=" max-w-7xl mx-auto max-w-[85%]">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Doctors &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Specialists
            </span>
          </h2>
          <p className="text-gray-600  mx-auto">
            Choose from our comprehensive range of medical specialties and
            connect with expert doctors
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              el: ".swiper-pagination-custom",
              clickable: true,
            }}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
              // 1580: { slidesPerView: 5 },
              // 1880: { slidesPerView: 6 },
              // 2180: { slidesPerView: 7 },
            }}
          >
            {categories.map((category, index) => {
              const IconComponent = getIconByCategory(category.name);

             /// console.log("category",category);
              


              return (
                <>
                  <SwiperSlide key={index}>
                    <div  onClick={() => {
                           // console.log("View More");
                            navigate(`/doctorlist/${category?._id}`);
                          }} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-center text-white">
                            <IconComponent className="w-12 h-12 mx-auto mb-2" />
                            <p className="text-sm font-medium">
                              Click to View Doctors
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className=" mb-2 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {category.description}
                        </p>
                        <button
                          className="w-full bg-[#00669e] text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                         
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              );
            })}
          </Swiper>

          {/* Custom Navigation Buttons (Center Aligned) */}
          <div className="absolute inset-y-0 -left-5 flex items-center z-10">
            <div className="swiper-button-prev-custom bg-white text-blue-600 border border-blue-500 rounded-full p-1.5 shadow hover:bg-blue-100 transition duration-300 cursor-pointer">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-y-0 -right-5 flex items-center z-10">
            <div className="swiper-button-next-custom bg-white text-blue-600 border border-blue-500 rounded-full p-1.5 shadow hover:bg-blue-100 transition duration-300 cursor-pointer">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Custom Pagination */}
        <div className="swiper-pagination-custom mt-4 text-center" />
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleViewDetails}
          className="w-40 bg-[#00669e] text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all       duration-300 shadow-md hover:shadow-lg"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default DoctorCategoryCards;
