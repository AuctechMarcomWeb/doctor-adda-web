import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww",
    heading: "Secure & Fast",
    subtext: "Quick OTP Verification for Seamless Login",
  },
  {
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yfGVufDB8fDB8fHww",
    heading: "Your Data is Safe",
    subtext: "End-to-End Encryption of Sensitive Info",
  },
];

const OtpStep = ({ mobile }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const otpRefs = useRef([]);

  // Slider rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance on digit input
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      if (index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleVerifyOtp = () => {
    // Simulate successful OTP
    navigate("/user-details");
  };

  const { image, heading, subtext } = slides[currentSlide];

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Slider */}
        <div className="w-1/2 relative bg-indigo-600 text-white flex flex-col justify-center items-center p-8">
          <img src={image} alt={heading} className="w-100 h-100 object-contain mb-6 rounded" />
          <h3 className="text-2xl font-bold">{heading}</h3>
          <p className="mt-2 text-center text-white/90 text-sm">{subtext}</p>

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

        {/* Right OTP Form */}
        <div className="w-1/2 p-10 bg-white">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Enter OTP</h2>
          <p className="text-gray-500 mb-6">OTP sent to +91-{mobile}</p>

          <div className="flex gap-4 justify-center mb-6">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-14 h-14 text-xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => handleOtpChange(e, index)}
                ref={(el) => (otpRefs.current[index] = el)}
              />
            ))}
          </div>

          <button
            onClick={handleVerifyOtp}
            className="bg-green-600 w-full py-3 text-white font-semibold rounded-full hover:bg-green-700 transition"
          >
            Verify OTP
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Didn’t receive the code? <span className="text-indigo-600 cursor-pointer hover:underline">Resend</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpStep;
