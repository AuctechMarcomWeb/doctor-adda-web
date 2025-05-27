import React, { useState, useEffect } from "react";
import { Menu, X, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[id]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Doctor Adda
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
              </Link>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
                Book Appointment
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Services
              </Link>
              <Link
                to="#doctors"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Doctors
              </Link>
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                About
              </Link>
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Contact
              </Link>
              <button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full">
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
