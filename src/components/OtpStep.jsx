import React, { useRef, useState, useEffect } from "react";
import { Shield, Lock, CheckCircle, RotateCcw, Smartphone } from "lucide-react";

const slides = [
  {
    image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww",
    heading: "Secure & Fast",
    subtext: "Quick OTP Verification for Seamless Login",
    icon: Shield,
  },
  {
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yfGVufDB8fDB8fHww",
    heading: "Your Data is Safe",
    subtext: "End-to-End Encryption of Sensitive Info",
    icon: Lock,
  },
];

const OtpStep = ({ mobile = "9876543210", onVerifySuccess }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef([]);

  // Slider rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Resend timer
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Auto-advance on digit input
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    
    // Focus on the next empty field or last field
    const nextIndex = Math.min(pastedData.length, 3);
    otpRefs.current[nextIndex].focus();
  };

  const handleVerifyOtp = async () => {
    if (otp.join("").length !== 4) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Call the success callback if provided, otherwise show success message
    if (onVerifySuccess) {
      onVerifySuccess();
    } else {
      // Default behavior - you can replace this with your navigation logic
      alert("OTP Verified Successfully! Please add navigation logic.");
      console.log("OTP Verified - implement navigation to next screen");
    }
    setIsLoading(false);
  };

  const handleResendOtp = () => {
    setResendTimer(30);
    setCanResend(false);
    setOtp(["", "", "", ""]);
    otpRefs.current[0].focus();
  };

  const { image, heading, subtext, icon: Icon } = slides[currentSlide];
  const isOtpComplete = otp.every(digit => digit !== "");

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex w-full max-w-6xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-white/20">
        {/* Left Slider Section */}
        <div className="hidden lg:flex lg:w-1/2 relative text-white flex-col justify-center items-center p-12 transition-all duration-700 ease-in-out">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-blue-600 to-indigo-700"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          
          <div className="relative z-10 text-center space-y-6">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-xl"></div>
              <img
                src={image}
                alt={heading}
                className="w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl relative z-10 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute -bottom-2 -right-2 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                <Icon size={24} className="text-white" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-3xl font-bold tracking-tight">{heading}</h3>
              <p className="text-white/90 text-lg font-medium">{subtext}</p>
            </div>
          </div>

          {/* Enhanced Dots */}
          <div className="absolute bottom-8 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide 
                    ? "w-8 h-3 bg-white rounded-full" 
                    : "w-3 h-3 bg-white/40 rounded-full hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right OTP Form Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          
          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Smartphone className="text-white" size={28} />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Verify OTP</h2>
                <p className="text-gray-600 text-lg">
                  Enter the 4-digit code sent to{" "}
                  <span className="font-semibold text-gray-900">+91-{mobile}</span>
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center gap-4">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={otp[index]}
                      className="w-14 h-14 text-2xl font-bold text-center border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 hover:border-gray-300 bg-gray-50 focus:bg-white"
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      ref={(el) => (otpRefs.current[index] = el)}
                    />
                  ))}
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <div className="w-8 h-0.5 bg-gray-200 rounded"></div>
                    <span>Paste code here</span>
                    <div className="w-8 h-0.5 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={!isOtpComplete || isLoading}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-3 hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Verify OTP
                  </>
                )}
              </button>

              {/* Resend Section */}
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-500">
                  Didn't receive the code?
                </p>
                {canResend ? (
                  <button
                    onClick={handleResendOtp}
                    className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                  >
                    <RotateCcw size={16} />
                    Resend OTP
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 text-gray-500">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
                    Resend in {resendTimer}s
                  </div>
                )}
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <Shield className="text-blue-600" size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Secure:</span> Your OTP is encrypted and expires in 5 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View Slider Preview */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={image} alt={heading} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-sm">{heading}</h4>
            <p className="text-gray-600 text-xs">{subtext}</p>
          </div>
          <div className="flex space-x-1">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-emerald-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpStep;