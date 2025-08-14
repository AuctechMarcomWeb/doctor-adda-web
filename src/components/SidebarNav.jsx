import React from "react";
import { NavLink } from "react-router-dom";
import { User, MapPin, Heart, Settings, Users, PawPrint } from "lucide-react";

const SidebarNav = ({ formData }) => {
  const menuItems = [
    { path: "/profile", label: "My Profile", icon: User },
    { path: "/address", label: "Address", icon: MapPin },
    { path: "/medical", label: "Medical", icon: Heart },
    { path: "/lifestyle", label: "Lifestyle", icon: Settings },
    { path: "/invite", label: "Invite Friends", icon: Users },
    { path: "/manage-patients", label: "Manage Patients", icon: User },
    { path: "/pets", label: "Manage Pets", icon: PawPrint },
  ];

  return (
    <div className="w-72 bg-white shadow-lg rounded-2xl p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
            {formData?.name ? getInitials(formData.name) : "NA"}
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <h2 className="mt-3 font-semibold text-lg">{formData?.name || "NA"}</h2>
        <p className="text-sm text-gray-500">{formData?.email || "NA"}</p>
        <p className="text-sm text-gray-500">+91 {formData?.phone || "0000000000"}</p>
        <button className="mt-3 px-4 py-2 text-white rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-sm shadow-md">
          Edit Profile
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="mt-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-[#006ca7] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

// Helper to get initials
const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default SidebarNav;


