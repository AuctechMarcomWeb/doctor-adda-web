// src/pages/AmbulancePage.jsx
import React from "react";
import AmbulanceCard from "../components/AmbulanceCard";

const ambulanceData = [
  {
    name: "MediCabs Ambulance",
    type: "ICU Ambulance",
    capacity: 3,
    price: 350,
    location: "Hazratganj, Lucknow, UP",
    rating: 4.3,
    image: "https://via.placeholder.com/80"
  },
  {
    name: "Emergency Cab",
    type: "ICU",
    capacity: 4,
    price: 700,
    location: "1090 Chouraha, Manas Nagar Colony, Jiamau",
    rating: 4.0,
    image: "https://via.placeholder.com/80"
  },
  {
    name: "Adda24/7 Services",
    type: "Non-Emergency",
    capacity: 2,
    price: 250,
    location: "RWJF+P24, Lucknow",
    rating: 3.9,
    image: "https://via.placeholder.com/80"
  },
];

const AmbulancePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🚑 Best Ambulance Services</h1>
      <div className="space-y-6">
        {ambulanceData.map((data, index) => (
          <AmbulanceCard key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default AmbulancePage;
