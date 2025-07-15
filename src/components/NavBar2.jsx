import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const NavBar2 = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseEnter = (menu) => setOpenDropdown(menu);
  const handleMouseLeave = () => setOpenDropdown(null);

  const dropdownData = {
    blood: {
      left: ["Find Donors", "Donate Blood", "Request Blood"],
      right: [
        "Blood Bank Locations",
        "Plasma Donation",
        "Blood Groups Info",
        "Donation Eligibility",
        "Voluntary Donation",
        "Camp Schedules",
      ],
    },
    ambulance: {
      left: ["Book Ambulance", "Emergency Help", "ICU Ambulance"],
      right: [
        "Neonatal Ambulance",
        "Freezer Box",
        "CSR-Based Ambulance",
        "Roadside Support",
        "Mobile ICU",
        "Dead Body Carrier",
        "On-Demand Ambulance",
      ],
    },
    pharmacy: {
      left: ["Order Medicines", "Upload Prescription", "Health Products"],
      right: [
        "Nearby Pharmacy",
        "Refill Orders",
        "Wellness Packages",
        "Baby Care",
        "Elderly Care",
        "Covid Essentials",
      ],
    },
    doctor: {
      left: ["Find Doctor", "Specialists", "Online Consult"],
      right: [
        "Cardiologist",
        "Dentist",
        "Orthopedic",
        "Gynecologist",
        "Dermatologist",
        "ENT Specialist",
        "General Physician",
      ],
    },
    diagnostic: {
      left: ["Book Test", "Full Body Checkup", "Covid Test"],
      right: [
        "Blood Test",
        "Liver Function Test",
        "Diabetes Check",
        "Thyroid Test",
        "Vitamin Profile",
        "X-Ray / MRI",
      ],
    },
    hospital: {
      left: ["Nearby Hospital", "Clinics", "Multi-specialty"],
      right: [
        "Cashless Facility",
        "Surgery Packages",
        "Emergency Wards",
        "Private Wards",
        "ICU Availability",
        "OPD Schedules",
      ],
    },
  };

  const renderMegaMenu = (menu) => {
    const data = dropdownData[menu];
    if (!data) return null;

    return (
      <div className="absolute left-0 top-full mt-1 bg-white shadow-2xl rounded-md w-[800px] p-6 flex z-50 border-t border-gray-200">
        {/* Left Column (3 items) */}
        <div className="w-1/4 max-w-[250px] border-r pr-6">
          {data.left.map((item, idx) => (
            <div
              key={idx}
              className="py-2 px-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer text-sm"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Right Columns */}
        <div className="w-3/4 pl-6 grid grid-cols-3 gap-4">
          {data.right.map((item, idx) => (
            <div
              key={idx}
              className="py-2 px-2 hover:bg-gray-100 hover:text-[#0074b2] cursor-pointer text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full border-t bg-white hidden sm:block relative z-50">
      <div className="flex max-w-7xl mx-auto items-center gap-6 leading-[35px] font-medium text-gray-800 px-6 py-3 justify-between">
        <FaHome className="text-lg cursor-pointer hover:text-[#0074b2]" />

        {/* Render Menu Items */}
        {[
          { label: "Blood Bank", key: "blood" },
          { label: "Ambulance", key: "ambulance" },
          { label: "Pharmacies", key: "pharmacy" },
          { label: "Doctor & Specialists", key: "doctor" },
          { label: "Diagnostic", key: "diagnostic" },
          { label: "Hospitals & Clinics", key: "hospital" },
        ].map((menu) => (
          <div
            key={menu.key}
            className="relative"
            onMouseEnter={() => handleMouseEnter(menu.key)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center gap-1 cursor-pointer px-2 py-1 hover:bg-[#0074b2] hover:text-white transition duration-200">
              {menu.label}
              <MdKeyboardArrowDown
                className={`transition-transform duration-200 ${
                  openDropdown === menu.key ? "rotate-180" : ""
                }`}
              />
            </div>
            {openDropdown === menu.key && renderMegaMenu(menu.key)}
          </div>
        ))}

        <span className="cursor-pointer hover:bg-[#0074b2] hover:text-white px-2 py-1 rounded transition duration-200">
          Offers
        </span>
      </div>
    </div>
  );
};

export default NavBar2;
