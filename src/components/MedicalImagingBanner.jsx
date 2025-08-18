import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getRequest } from "../Helpers";

const fallbackImages = [
  "https://i.pinimg.com/736x/e3/e9/c8/e3e9c89572ed78a8172ea954618946eb.jpg",
  "https://i.pinimg.com/736x/9d/6b/af/9d6baf6d9fbc4aa810f9f78b8f42616a.jpg",
  "https://i.pinimg.com/736x/e2/6d/35/e26d352c8710bab40b472bca96997506.jpg",
];

const MedicalImagingBanner = ({ data }) => {
  const [bannerData, setBannerData] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getRequest(`banner?isPagination=false`)
      .then((res) => {
        setBannerData(res?.data?.data || []);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  // choose API images if available, otherwise fallback
  const images =
    bannerData.length > 0
      ? bannerData.map((item) => item.imageUrl)
      : fallbackImages;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getIndex = (index) => {
    return (index + images.length) % images.length;
  };

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [current, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative mx-auto flex items-center justify-center h-[170px] md:h-[280px] sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%]">
      <div className="relative flex items-center justify-center w-full overflow-hidden">
        <img
          src={images[getIndex(current - 1)]}
          alt="prev"
          className="w-[700px] md:h-[260px] h-[120px] object-cover rounded-2xl opacity-50 scale-90 transition-all duration-300"
        />

        <img
          src={images[current]}
          alt="current"
          className="absolute h-[120px] md:w-[700px] md:h-[260px] object-contain bg-[#1f73a7]  rounded-2xl z-10 shadow-xl transition-all duration-500"
        />

        <img
          src={images[getIndex(current + 1)]}
          alt="next"
          className="w-[700px] md:h-[260px] h-[120px] object-cover rounded-2xl opacity-50 scale-90 transition-all duration-300"
        />
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-10 top-1/2 -translate-y-1/2 bg-white md:w-10 md:h-10 w-8 h-8 flex items-center justify-center rounded-full shadow-md z-20"
      >
        <ChevronLeft className="text-black" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-10 top-1/2 -translate-y-1/2 bg-white md:w-10 md:h-10 w-8 h-8 flex items-center justify-center rounded-full shadow-md z-20"
      >
        <ChevronRight className="text-black" />
      </button>
    </div>
  );
};

export default MedicalImagingBanner;
