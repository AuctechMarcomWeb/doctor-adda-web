import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const images = [
  "https://i.pinimg.com/736x/e3/e9/c8/e3e9c89572ed78a8172ea954618946eb.jpg",
  "https://i.pinimg.com/736x/9d/6b/af/9d6baf6d9fbc4aa810f9f78b8f42616a.jpg", 
  "https://i.pinimg.com/736x/e2/6d/35/e26d352c8710bab40b472bca96997506.jpg",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [current, isAutoplay]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const getIndex = (index) => {
    return (index + images.length) % images.length;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto  rounded-3xl p-8 backdrop-blur-sm">
      {/* Background glow effect */}
      <div className="absolute inset-0  rounded-3xl blur-xl"></div>
      
      {/* Main carousel container */}
      <div className="relative flex items-center justify-center h-[260px] perspective-1000">
        
        {/* Left side image */}
        <div className="absolute left-0 transform -translate-x-16 rotate-y-45 transition-all duration-700 ease-out">
          <img
            src={images[getIndex(current - 1)]}
            alt="previous"
            className="w-[280px] h-[200px] object-cover rounded-xl opacity-40 scale-75 shadow-2xl transform hover:scale-80 hover:opacity-60 transition-all duration-300 cursor-pointer"
            onClick={prevSlide}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/20 rounded-xl"></div>
        </div>

        {/* Center active image */}
        <div className="relative z-20 transform transition-all duration-700 ease-out">
          <div className="relative group">
            <img
              src={images[current]}
              alt="current"
              className="w-[600px] h-[280px] object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 rounded-2xl"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
            
 
           
          </div>
        </div>

        {/* Right side image */}
        <div className="absolute right-0 transform translate-x-16 -rotate-y-45 transition-all duration-700 ease-out">
          <img
            src={images[getIndex(current + 1)]}
            alt="next"
            className="w-[280px] h-[200px] object-cover rounded-xl opacity-40 scale-75 shadow-2xl transform hover:scale-80 hover:opacity-60 transition-all duration-300 cursor-pointer"
            onClick={nextSlide}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-white/20 rounded-xl"></div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm w-14 h-14 flex items-center justify-center rounded-full shadow-xl z-30 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-50 group"
      >
        <ChevronLeft className="text-gray-800 w-6 h-6 group-hover:text-purple-600 transition-colors duration-200" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm w-14 h-14 flex items-center justify-center rounded-full shadow-xl z-30 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-50 group"
      >
        <ChevronRight className="text-gray-800 w-6 h-6 group-hover:text-purple-600 transition-colors duration-200" />
      </button>

      {/* Bottom controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-6 z-30">
        
        

      </div>

    

      <style jsx>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
        
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