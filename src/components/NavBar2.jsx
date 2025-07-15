import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const NavBar2 = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseEnter = (menu) => setOpenDropdown(menu);
  const handleMouseLeave = () => setOpenDropdown(null);

  const dropdownClass =
    "absolute left-0 top-full mt-0 w-44 bg-white shadow-lg rounded-md z-50 transition-all duration-200";

  return (
    <div className="w-full border-t bg-white hidden sm:block">
      <div className="flex max-w-7xl m-auto items-center gap-6  leading-[35px] font-medium text-gray-800 justify-between">
        <FaHome className="text-lg" />

        {/* Blood Bank */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("blood")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-1 cursor-pointer px-2 py-1 hover:bg-[#0074b2] hover:text-white ">
            Blood Bank
            <MdKeyboardArrowDown
              className={`transition-transform duration-200 ${
                openDropdown === "blood" ? "rotate-180" : ""
              }`}
            />
          </div>
          {openDropdown === "blood" && (
            <div className= {dropdownClass} >
              <div className="px-4 py-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer">Find Donors</div>
              <div className="px-4 py-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer">Donate Blood</div>
              <div className="px-4 py-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer">Request Blood</div>
            </div>
          )}
        </div>

        {/* Ambulance */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("ambulance")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-1 cursor-pointer px-2 py-1 hover:bg-[#0074b2] hover:text-white">
            Ambulance
            <MdKeyboardArrowDown
              className={`transition-transform duration-200 ${
                openDropdown === "ambulance" ? "rotate-180" : ""
              }`}
            />
          </div>
          {openDropdown === "ambulance" && (
            <div className={dropdownClass}>
              <div className="px-4 py-2 hover:bg-gray-100  hover:text-[#0074b2] cursor-pointer">Book Ambulance</div>
              <div className="px-4 py-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer">Emergency Help</div>
            </div>
          )}
        </div>

        {/* Pharmacies */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("pharmacy")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-1 cursor-pointer px-2 py-1 hover:bg-[#0074b2] hover:text-white">
            Pharmacies
            <MdKeyboardArrowDown
              className={`transition-transform duration-200 ${
                openDropdown === "pharmacy" ? "rotate-180" : ""
              }`}
            />
          </div>
          {openDropdown === "pharmacy" && (
            <div className={dropdownClass}>
              <div className="px-4 py-2 hover:bg-gray-100  hover:text-[#0074b2] cursor-pointer">Order Medicines</div>
              <div className="px-4 py-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer">Upload Prescription</div>
            </div>
          )}
        </div>

        {/* Doctor & Specialists */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("doctor")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-1 cursor-pointer px-2 py-1 hover:bg-[#0074b2] hover:text-white">
            Doctor & Specialists
            <MdKeyboardArrowDown
              className={`transition-transform duration-200 ${
                openDropdown === "doctor" ? "rotate-180" : ""
              }`}
            />
          </div>
          {openDropdown === "doctor" && (
            <div className={dropdownClass}>
              <div className="px-4 py-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer">Find Doctor</div>
              <div className="px-4 py-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer">Book Appointment</div>
            </div>
          )}
        </div>

        {/* Diagnostic */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("diagnostic")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-1 cursor-pointer px-2 py-1 hover:bg-[#0074b2] hover:text-white">
            Diagnostic
            <MdKeyboardArrowDown
              className={`transition-transform duration-200 ${
                openDropdown === "diagnostic" ? "rotate-180" : ""
              }`}
            />
          </div>
          {openDropdown === "diagnostic" && (
            <div className={dropdownClass}>
              <div className="px-4 py-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer">Book Test</div>
              <div className="px-4 py-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer">View Reports</div>
            </div>
          )}
        </div>

        {/* Hospitals & Clinics */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("hospital")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-1 cursor-pointer px-2 py-1 hover:bg-[#0074b2] hover:text-white">
            Hospitals & Clinics
            <MdKeyboardArrowDown
              className={`transition-transform duration-200 ${
                openDropdown === "hospital" ? "rotate-180" : ""
              }`}
            />
          </div>
          {openDropdown === "hospital" && (
            <div className={dropdownClass}>
              <div className="px-4 py-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer">Find Hospital</div>
              <div className="px-4 py-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer">Book Appointment</div>
            </div>
          )}
        </div>

        <span className="cursor-pointer hover:bg-[#0074b2] hover:text-white">Offers</span>
      </div>
    </div>
  );
};

export default NavBar2;
