import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://i.pinimg.com/1200x/04/0a/f4/040af4ba6c4c22d9a4dbcd344b91dbb7.jpg",
  "https://i.pinimg.com/1200x/9f/2b/7f/9f2b7f668891019dd64df290ec669c8d.jpg",
  "https://i.pinimg.com/1200x/5c/7e/b9/5c7eb9dc64eb953cc142f6f0dacb8a7c.jpg",
];

const MedicalImagingBanner = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getIndex = (index) => {
    return (index + images.length) % images.length;
  };

  // 🔁 Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [current]); // run effect when 'current' changes

  return (
    <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center h-[300px]">
      {/* Slides container */}
      <div className="relative flex items-center justify-center w-full overflow-hidden">
        {/* Previous image (left) */}
        <img
          src={images[getIndex(current - 1)]}
          alt="prev"
          className="w-[700px] h-[260px] object-cover rounded-2xl opacity-50 scale-90 transition-all duration-300 bg-linear-gradient(90deg, rgba(255, 255, 255, 1) 52%, rgba(0, 160, 168, 0) 100%);"
        />

        {/* Active (centered) image */}
        <img
          src={images[current]}
          alt="current"
          className="absolute w-[700px] h-[260px] object-cover rounded-2xl z-10 shadow-xl transition-all duration-500"
        />

        {/* Next image (right) */}
        <img
          src={images[getIndex(current + 1)]}
          alt="next"
          className="w-[700px] h-[260px] object-cover rounded-2xl opacity-50 scale-90 transition-all duration-300"
        />
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-10 top-1/2 -translate-y-1/2 bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-md z-20"
      >
        <ChevronLeft className="text-black" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-10 top-1/2 -translate-y-1/2 bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-md z-20"
      >
        <ChevronRight className="text-black" />
      </button>
    </div>
  );
};

export default MedicalImagingBanner;
