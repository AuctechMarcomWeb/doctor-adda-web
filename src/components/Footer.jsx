import React, { useState, useEffect } from "react";
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToggle = () => {
    if (isAtTop) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Doctor Adda</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted healthcare partner, providing quality medical
                services and connecting you with the best doctors.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="#home"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
                <a
                  href="#services"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </a>
                <a
                  href="#doctors"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Doctors
                </a>
                <a
                  href="#about"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                <div className="text-gray-400">Online Consultation</div>
                <div className="text-gray-400">Emergency Care</div>
                <div className="text-gray-400">Health Monitoring</div>
                <div className="text-gray-400">Family Care</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">info@doctoradda.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">
                    123 Health St, Medical City
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Doctor Adda. All rights reserved. Made with ❤️ for
              better healthcare.
            </p>
            <div className="mt-4 flex justify-center items-center gap-4 text-sm">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                to="/terms-and-conditions"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Toggle Button */}
      <button
        onClick={handleScrollToggle}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors z-50"
        aria-label="Scroll toggle"
      >
        {isAtTop ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </button>
    </>
  );
};

export default Footer;
