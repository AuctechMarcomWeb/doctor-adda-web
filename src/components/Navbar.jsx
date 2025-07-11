import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Stethoscope, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/doctor-adda-logo.png";
import { FaMapMarkerAlt } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // added
  const dropdownRef = useRef(null); // added
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

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
                <img src={logo} alt="" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Doctor Adda
              </span>
            </div>

            {/* Location */}
            <div className="hidden md:flex items-center gap-2 pl-4">
              <div className="bg-gray-100 p-2 rounded-full">
                <FaMapMarkerAlt className="text-gray-600 text-base" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Your Location</div>
                <div className="text-sm text-black font-semibold flex items-center">
                  Ahmadnagar <span className="ml-1">▾</span>
                </div>
              </div>
            </div>

            {/* Main Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Categories</Link>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Appointment</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
              {/* <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
                Book Appointment
              </button> */}
            </div>

            {/* Notification + Profile */}
            {/* Notification Icon */}
            <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-2 rounded-full">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-xs font-semibold px-1.5 py-0.5 rounded-full">
                8
              </span>
            </div>

            {/* Profile Avatar & Dropdown */}
            <div ref={dropdownRef} className="relative">
              <img
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80
"
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-50 py-2 space-y-1">
                  <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
                    <span>Profile</span>
                    <span className="text-xs bg-gray-600 px-2 py-0.5 rounded-full">New</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Settings</div>
                  <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Logout</div>
                </div>
              )}
            </div>


            {/* Mobile Menu Toggle */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Services</Link>
              <Link to="#doctors" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Doctors</Link>
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">About</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Contact</Link>
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
