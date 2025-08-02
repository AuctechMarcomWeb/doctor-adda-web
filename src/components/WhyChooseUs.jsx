import React from "react";
import { FaThumbsUp, FaUsers, FaCogs, FaHeart } from "react-icons/fa";

const features = [
  {
    title: "Quality",
    icon: <FaThumbsUp className="text-gray-800 text-7xl" />,
    color: "from-teal-400 to-transparent",
    description: "Board-certified doctors and medical professionals ensuring the highest standard of healthcare services for all patients.",
  },
  {
    title: "Personnel",
    icon: <FaUsers className="text-gray-800 text-7xl" />,
    color: "from-cyan-400 to-transparent",
    description: "Experienced healthcare team with specialized expertise across multiple medical fields and patient care disciplines. ",
  },
  {
    title: "Innovation",
    icon: <FaCogs className="text-gray-800 text-7xl" />,
    color: "from-blue-400 to-transparent",
    description: "Cutting-edge medical technology and digital health solutions providing advanced diagnostic and treatment options.",
  },
  {
    title: "Commitment",
    icon: <FaHeart className="text-gray-800 text-7xl" />,
    color: "from-purple-400 to-transparent",
    description: "Dedicated patient-centered approach ensuring personalized care and long-term health relationships with every individual.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 md:px-20 bg-white text-center max-w-[85%]">
     <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Why {" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
           Choose Us
          </span>
        </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div
              className={` rounded-full w-60 h-60 rounded-full  flex items-center justify-center border-t-4 border-x-4  border-b-0 border`}
              style={{ borderBottom: "none" , color: "#4fc1f3" , borderLeft:"none" , borderRight:"none" }}
            >
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#1e8dbd] mt-8">{item.title}</h3>
            <p className="text-sm text-gray-600  mt-2 max-w-[180px]">
             {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
