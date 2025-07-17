import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9jdG9yfGVufDB8fDB8fHww",
    heading: "Cost Effective",
    subtext: "Honest Price Guaranteed",
  },
  {
    image: "https://media.istockphoto.com/id/868644242/photo/close-up-of-stethoscope-and-doctor.webp?a=1&b=1&s=612x612&w=0&k=20&c=R7-U9IxWlMHKapHd0J9rM-bb9f3_xAVj5MEplpFpawo=",
    heading: "Trusted Labs",
    subtext: "Verified and Certified Partners",
  },
  {
    image: "https://media.istockphoto.com/id/1301595548/photo/female-doctor-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=PW3Lbgi6F8DjYdKffpo6Uyo07ZBxw69utLcASzxX3b0=",
    heading: "Home Sample Collection",
    subtext: "Safe & Convenient Testing",
  },
];

const LoginStep = ({ setStep, setMobile }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleLogin = () => {
    setStep(2);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const { image, heading, subtext } = slides[currentSlide];

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Slider Section */}
        <div className="w-1/2 relative bg-teal-600 text-white flex flex-col justify-center items-center p-8 transition-all duration-500">
          <img
            src={image}
            alt={heading}
            className="w-100 h-100 object-contain mb-6 rounded"
          />
          <h3 className="text-2xl font-bold">{heading}</h3>
          <p className="mt-2 text-center text-white/90 text-sm">{subtext}</p>

          {/* Dots */}
          <div className="absolute bottom-6 flex space-x-2">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Login Form Section */}
        <div className="w-1/2 p-10 bg-white">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Login/Sign Up</h2>
          <p className="text-gray-500 mb-6">Please enter your Mobile Number to proceed</p>

          <div className="flex items-center border-b border-gray-300 pb-2 mb-6">
            <span className="text-lg pr-2">🇮🇳 +91</span>
            <input
              type="tel"
              placeholder="Enter your Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
              className="flex-1 text-lg outline-none bg-transparent"
            />
          </div>

          <button
            onClick={handleLogin}
            className="bg-orange-500 w-full py-3 text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-orange-600 transition"
          >
            Login <ArrowRight size={20} />
          </button>

          {/* Promo Info */}
          <div className="mt-6 bg-gray-100 p-4 rounded text-sm text-gray-700 flex items-center gap-2">
            🎁 Sign-up to get <span className="text-blue-600 font-semibold ml-1">₹1000 Cash</span> in your wallet
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-400 text-center mt-4">
            By proceeding, you agree with our{" "}
            <span className="text-orange-500 underline cursor-pointer">Terms and Conditions</span> &{" "}
            <span className="text-orange-500 underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginStep;
