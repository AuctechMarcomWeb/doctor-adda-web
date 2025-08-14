import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePageImagePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: dots => (
      <div>
        <ul className="custom-dots"> {dots} </ul>
      </div>
    ),
  };

  const images = [
    "https://i.pinimg.com/736x/89/01/7c/89017cd7b1b2e4c5fbfd214253cb08be.jpg",
    "https://i.pinimg.com/736x/89/8f/8e/898f8e9a67421273d816d3c0c86b6d3d.jpg",
    "https://i.pinimg.com/1200x/1d/49/dc/1d49dcda5c949785d99d71d7fbd235a0.jpg",
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full relative overflow-hidden transform scale-95 animate-popup">
            
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm shadow-md text-gray-800 p-2 rounded-full hover:scale-110 hover:shadow-lg transition-all"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            {/* Image Slider */}
            <Slider {...settings}>
              {images.map((img, idx) => (
                <div key={idx}>
                  <img
                    src={img}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-[22rem] object-cover rounded-xl"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      {/* Custom styles for dots */}
      <style>{`
        .custom-dots {
          position: relative;
          bottom: 30px;
          display: flex !important;
          justify-content: center;
          gap: 8px;
        }
        .custom-dots li button:before {
          font-size: 12px;
          color: white;
          opacity: 0.8;
        }
        .custom-dots li.slick-active button:before {
          color: #ff6b6b;
          opacity: 1;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popup {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .animate-popup {
          animation: popup 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default HomePageImagePopup;
