import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Stethoscope, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/doctor-adda-logo.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
// import NavBar2 from "./Navbar2";

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
      <nav className="fixed w-full z-50 bg-white shadow-lg">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" max-w-7xl m-auto flex justify-between items-center h-16 py-10">
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
                <div className="text-sm text-gray-900 font-semibold flex items-center">
                  Lucknow <span className="ml-1">▾</span>
                </div>
              </div>
            </div>

            {/* Main Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              {/* <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Categories</Link>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Appointment</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link> */}
              {/* <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
                Book Appointment
              </button> */}
            </div>



            {/* Notification + Profile */}
            
       

        {/* Vertical Divider */}
        <div className="h-5 w-px bg-gray-300 hidden md:block" />

        {/* Customer Support */}
        <div className="flex items-center space-x-2 text-gray-600 hidden md:block">
          
          <div className="flex items-center gap-1">
            <FaPhoneAlt className="text-gray-500 text-base" />
            <div >
                <span className="text-xs block text-gray-500 ">Customer Support</span>
                <span className="text-sm font-semibold text-gray-900">
                1800-572-0005 / 999-888-000-5
                </span>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-5 w-px bg-gray-300 hidden md:block" />

        {/* Corporate Bookings */}
        <div className="text-gray-600 hidden md:block ">
          <span className="text-xs block text-gray-500">For Corporate Bookings/Enquiry</span>
          <span className="text-sm font-semibold text-gray-900">931-125-387-5</span>
        </div>


         
      

            {/* Profile Avatar & Dropdown */}
            <div ref={dropdownRef} className="relative">
              {/* <img
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80
"
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              /> */}

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

            {/* Login/Signup */}
            <div className="flex items-center space-x-1 text-gray-900 cursor-pointer hidden sm:block "  onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="flex gap-2">
                    <img
                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover cursor-pointer"
                        
                    />
                    <span className="font-medium ">Login/Signup</span>

                </div>
            </div>

            {/* Notification Icon */}
            <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-2 rounded-full " >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-xs font-semibold px-1.5 py-0.5 rounded-full">
                8
              </span>
            </div>
            


            {/* Mobile Menu Toggle */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <div >

          {/* <NavBar2/> */}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Blood Bank <span className="ml-1">▾</span></Link>
              <Link to="#doctors" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Ambulance <span className="ml-1">▾</span></Link>
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Pharmacies <span className="ml-1">▾</span></Link>
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Diagnostic <span className="ml-1">▾</span></Link>
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Doctors & Specialists<span className="ml-1">▾</span></Link>
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Hospitals & Clinics<span className="ml-1">▾</span></Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Contact</Link>
              <button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full">
                Login / SignUp
              </button>
            </div>
          </div>
        )}
      
      </nav>

    </>
  );
};

export default Navbar;
