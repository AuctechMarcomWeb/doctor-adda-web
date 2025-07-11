// HeroCarousel.jsx
import React from "react";
import Slider from "react-slick";
import { FaRupeeSign, FaMicroscope, FaVirus, FaClipboardList } from "react-icons/fa";
import { GiReceiveMoney, GiHealthPotion } from "react-icons/gi";

const slides = [
  {
    title: "Your one-stop destination for affordable and reliable imaging services",
    image:
      "https://img.freepik.com/free-photo/female-doctor-looking-x-ray-radiology-clinic_23-2150914650.jpg?w=500",
  },
  {
    title: "Advanced MRI, CT, X-Ray, and Ultrasound Scanning at Unbeatable Prices",
    image:
      "https://img.freepik.com/free-photo/doctor-holding-x-ray_23-2147792198.jpg?w=500",
  },
  {
    title: "Trusted by 130+ Radiologists Across India – Get Tested with Confidence",
    image:
      "https://img.freepik.com/free-photo/young-female-doctor-holding-radiograph_23-2148672554.jpg?w=500",
  },
];

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="relative bg-gradient-to-br from-cyan-900 to-sky-800 text-white overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col md:flex-row items-center">
              {/* Left */}
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold leading-snug">
                  {slide.title}
                </h1>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center space-x-3">
                    <FaRupeeSign className="text-xl text-yellow-300" />
                    <span>Honest pricing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaVirus className="text-xl text-green-400" />
                    <span>100% covid safe</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaMicroscope className="text-xl text-pink-300" />
                    <span>130+ radiology experts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaClipboardList className="text-xl text-blue-300" />
                    <span>Labs across India</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow">
                    <GiReceiveMoney className="text-green-600" />
                    100% Cash Back
                  </div>
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow">
                    <GiHealthPotion className="text-blue-600" />
                    100% Tax Benefit
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative">
                <div className="w-80 h-80 bg-white rounded-full overflow-hidden shadow-2xl">
                  <img
                    src={slide.image}
                    alt="Slide Visual"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
