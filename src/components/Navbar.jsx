import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Stethoscope, Bell, LogOut, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import logo from "../assets/doctor-adda-logo.png";
import logo from "../assets/dr-adda-logo.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { logout } from "../redux/slices/userSlice";
import { deleteCookie, clearAuthCookies } from "../Hooks/cookie";
import NavBar2 from "./NavBar2";
import { toast } from "react-hot-toast";
import NotificationBell from "./NotificationBell";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // added
  const dropdownRef = useRef(null); // added
  const [isVisible, setIsVisible] = useState({});
  const dispatch = useDispatch();

  // Get user profile data from Redux
  const { userProfileData, isLoggedIn } = useSelector((state) => state.user);

  console.log("user profile data from redux in navbar", userProfileData);
  console.log("isLoggedIn from redux", isLoggedIn);

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

  // Handle logout
  const handleLogout = () => {
    // Clear Redux state
    dispatch(logout());
    
    // Clear cookies
    clearAuthCookies();
    
    // Close dropdown
    setDropdownOpen(false);
    toast.success("Logged out successfully");
    
    console.log("All sessions cleared successfully");
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-white shadow-lg">
        <div className=" mx-auto ">

          <div className=" max-w-[70%]  max-w-7xl  m-auto flex justify-between items-center h-16 py-10">

            {/* Logo */}
            <Link to="/">
              <div className="flex items-center space-x-2">
                
                <div className="w-18 h-18  rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                  <img src={logo} alt="" />
                </div>
                {/* <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Doctor Adda
                </span> */}
                
              </div>
            </Link> 

            {/* Location */}
            <div className="hidden md:flex items-center gap-2 pl-4 cursor-pointer">
              <div className="bg-gray-100 p-2 rounded-full">
                <FaMapMarkerAlt className="text-gray-600 text-base" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Your Location</div>
                <div className="text-sm text-gray-800 font-semibold flex items-center">
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
                <span className="text-sm font-semibold text-gray-800">
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
          <span className="text-sm font-semibold text-gray-800">931-125-387-5</span>
        </div>


            

            {/* User Profile */}
            {isLoggedIn && userProfileData ? (
              console.log("userProfileData navbar", userProfileData.name),
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={userProfileData.profileImage || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-gray-800 hidden lg:block">
                    {userProfileData?.name ||  "User"}
                  </span>
                  <span className="text-gray-500">▾</span>
                </div>
                
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute z-100 right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                    <Link to="/profile">
                      <button
                        
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                    </Link>
                    <button
                      
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </div>
                )}
              </div>
            ) : (
            
              <>
            <Link to="/login" className="flex items-center space-x-1 text-gray-800 cursor-pointer hidden sm:block">
            <div className="flex gap-2">
             
              <span className="text-sm font-semibold ">Login/Signup</span>
            </div>
          </Link>
          </>

            )}

            {/* Notification Icon */}
            {/* <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-2 rounded-full cursor-pointer " >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-xs font-semibold px-1.5 py-0.5 rounded-full">
                8
              </span>
            </div> */}
            <NotificationBell />
            


            {/* Mobile Menu Toggle */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <div >

          <NavBar2/>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link onClick={() => setIsMenuOpen(false)}   to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</Link>
              <Link  onClick={() => setIsMenuOpen(false)}  to="/ambulance" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Blood Bank </Link>
              <Link onClick={() => setIsMenuOpen(false)}  to="/ambulance" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Ambulance </Link>
              <Link onClick={() => setIsMenuOpen(false)}  to="/pharmacy" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Pharmacies </Link>
              <Link onClick={() => setIsMenuOpen(false)}  to="/diagnostic" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Diagnostic </Link>
              <Link onClick={() => setIsMenuOpen(false)}  to="/doctor" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Doctors & Specialists</Link>
              <Link onClick={() => setIsMenuOpen(false)}  to="/hospital" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Hospitals & Clinics</Link>
              
              <Link to="/login"><button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full">
                Login / SignUp
              </button></Link>
            </div>
          </div>
        )}
      {/* <span className="ml-1">▾</span> */}
      </nav>

    </>
  );
};

export default Navbar;
