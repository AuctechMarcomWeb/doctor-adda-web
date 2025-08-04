import React from "react";
import { FaThumbsUp, FaUsers, FaCogs, FaHeart } from "react-icons/fa";

const features = [
  {
    title: "Quality",
    icon: <FaThumbsUp className="text-gray-800 text-5xl md:text-6xl lg:text-7xl" />,
    description: "Board-certified doctors and medical professionals ensuring the highest standard of healthcare services for all patients.",
  },
  {
    title: "Personnel",
    icon: <FaUsers className="text-gray-800 text-5xl md:text-6xl lg:text-7xl" />,
    description: "Experienced healthcare team with specialized expertise across multiple medical fields and patient care disciplines.",
  },
  {
    title: "Innovation",
    icon: <FaCogs className="text-gray-800 text-5xl md:text-6xl lg:text-7xl" />,
    description: "Cutting-edge medical technology and digital health solutions providing advanced diagnostic and treatment options.",
  },
  {
    title: "Commitment",
    icon: <FaHeart className="text-gray-800 text-5xl md:text-6xl lg:text-7xl" />,
    description: "Dedicated patient-centered approach ensuring personalized care and long-term health relationships with every individual.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white text-center max-w-[85%]">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
        Why {" "}
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Choose Us
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`rounded-full w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center border-t-4 border-x-4 border-b-0`}
              style={{
                borderColor: "#4fc1f3",
                borderBottom: "none",
                borderLeft: "none",
                borderRight: "none",
              }}
            >
              {item.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1e8dbd] mt-6">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-xs px-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
