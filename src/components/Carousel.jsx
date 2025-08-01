import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://i.pinimg.com/736x/e3/e9/c8/e3e9c89572ed78a8172ea954618946eb.jpg",
  "https://i.pinimg.com/736x/9d/6b/af/9d6baf6d9fbc4aa810f9f78b8f42616a.jpg", 
  "https://i.pinimg.com/736x/e2/6d/35/e26d352c8710bab40b472bca96997506.jpg",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Set autoplay interval once on mount
  useEffect(() => {
    if (isAutoplay) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoplay]);

  const goToSlide = (index) => {
    if (index === current) return;
    setCurrent(index);
  };

  const getIndex = (index) => {
    return (index + images.length) % images.length;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-3xl p-8 backdrop-blur-sm max-w-[80%]">
      <div className="relative flex items-center justify-center h-[260px] perspective-1000">
        
        <div className="absolute left-0 transform -translate-x-16 rotate-y-45 transition-all duration-700 ease-out">
          <img
            src={images[getIndex(current - 1)]}
            alt="previous"
            className="w-[280px] h-[200px] object-cover rounded-xl opacity-40 scale-75 shadow-2xl cursor-pointer"
            onClick={prevSlide}
          />
        </div>

        <div className="relative z-20 transform transition-all duration-700 ease-out">
          <img
            src={images[current]}
            alt="current"
            className="w-[600px] h-[280px] object-cover rounded-2xl shadow-2xl"
          />
        </div>

        <div className="absolute right-0 transform translate-x-16 -rotate-y-45 transition-all duration-700 ease-out">
          <img
            src={images[getIndex(current + 1)]}
            alt="next"
            className="w-[280px] h-[200px] object-cover rounded-xl opacity-40 scale-75 shadow-2xl cursor-pointer"
            onClick={nextSlide}
          />
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 w-14 h-14 flex items-center justify-center rounded-full z-30"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 w-14 h-14 flex items-center justify-center rounded-full z-30"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-45 {
          transform: rotateY(45deg);
        }
        .-rotate-y-45 {
          transform: rotateY(-45deg);
        }
      `}</style>
    </div>
  );
};

export default Carousel;
