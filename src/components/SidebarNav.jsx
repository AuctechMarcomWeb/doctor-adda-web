import React, { useState } from "react";
import { User, MapPin, Heart, Settings, Users, PawPrint } from "lucide-react";
import ManagePetsModal from "./ManagePetsModal";
import ManagePatientsModal from "./ManagePatientsModal";

const menuItems = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "address", label: "Address", icon: MapPin },
  { id: "medical", label: "Medical", icon: Heart },
  { id: "lifestyle", label: "Lifestyle", icon: Settings },
  { id: "friends", label: "Invite Friends", icon: Users },
  { id: "patients", label: "Manage Patients", icon: User },
  { id: "pets", label: "Manage Pets", icon: PawPrint },
];

const SidebarNav = ({ formData, setActiveTab, activeTab, handleEdit }) => {
  const [isPetsModalOpen, setIsPetsModalOpen] = useState(false);
  const [isPatientsModalOpen, setIsPatientsModalOpen] = useState(false);

  const getInitials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").toUpperCase() : "";

  const handleMenuClick = (id) => {
    if (id === "pets") {
      setIsPetsModalOpen(true);
    } else if (id === "patients") {
      setIsPatientsModalOpen(true);
    } else {
      setActiveTab(id);
    }
  };

  return (
    <>
      <aside className="lg:w-80 bg-white shadow-xl rounded-2xl p-6 h-fit">
        {/* User Summary */}
        <div className="text-center border-b border-gray-100 pb-6 pt-6 mb-6 bg-gray-100 rounded-xl">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
              {formData?.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                getInitials(formData?.name)
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
          </div>
          <h2 className="font-bold text-xl mt-3 text-gray-800">
            {formData?.name}
          </h2>
          <div className="flex items-center justify-center gap-1 mt-1 text-gray-600 text-sm">
            <span>{formData?.email}</span>
          </div>
          <div className="flex items-center justify-center gap-1 mt-1 text-gray-600 text-sm">
            <span>+91 {formData?.phone}</span>
          </div>
          <button
            className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm rounded-full hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg cursor-pointer"
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all cursor-pointer ${
                  activeTab === item.id
                    ? "bg-[#006ca7] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Manage Pets Modal */}
      <ManagePetsModal
        isOpen={isPetsModalOpen}
        onClose={() => setIsPetsModalOpen(false)}
      />

      {/* Manage Patients Modal */}
      <ManagePatientsModal
        isOpen={isPatientsModalOpen}
        onClose={() => setIsPatientsModalOpen(false)}
      />
    </>
  );
};

export default SidebarNav;
