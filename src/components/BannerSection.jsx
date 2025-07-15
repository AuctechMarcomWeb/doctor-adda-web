// BannerSection.jsx
import React from "react";
import {
  FaRupeeSign,
  FaMotorcycle,
  FaClipboardCheck,
  FaUserMd,
} from "react-icons/fa";

const BannerSection = () => {
  return (
    <div className="max-w-7xl mx-auto text-white p-6 md:p-12 rounded-xl flex flex-col md:flex-row items-center justify-between" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)" , paddingBottom: "0px" ,paddingTop:"100px",
  }}>
      {/* Left Content */}
      <div className="max-w-7xl  py-20 ">
        <h1 className="text-3xl md:text-4xl font-bold">
          Make India Healthy Package 2025
        </h1>

        <div className="flex items-center gap-4 mt-6">
          <span className="text-3xl text-xl flex items-center font-bold">
            @<FaRupeeSign className="mr-1" />
            99
          </span>
          <button className="bg-white text-[#0074b2] font-semibold px-4 py-2 rounded  hover:text-black transition">
            Book Now
          </button>
        </div>

        {/* Search Bar */}
        {/* <div className="flex flex-col sm:flex-row mt-6 gap-2">
          <input
            type="text"
            placeholder="Find your Package/Test/Scans"
            className="flex-grow px-4 py-3 rounded-md text-black outline-none bg-white"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md">
            Search
          </button>
        </div> */}

        <div className="bg-white mt-8 p-4 rounded-lg shadow-lg text-black w-full max-w-xl flex items-center  justify-between">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <input
                      type="text"
                      placeholder="Search doctors, specialties, or locations"
                      className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select className="w-fit md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"  style={{ width: "fit-content" }} >
                      <option>All Specialties</option>
                      <option>Radiology</option>
                      <option>Cardiology</option>
                      <option>Neurology</option>
                    </select>
                  </div>
                  <div className="">
                    <button className="w-full md:w-auto px-6 py-2 bg-[#297cff] text-white font-semibold rounded-md hover:bg-blue-700 transition">
                      SEARCH
                    </button>
                  </div>
                </div>



                

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-sm">
          <div className="flex items-start gap-2">
            <FaMotorcycle size={30} className="text-orange-400 mt-1" />
            <span>
              <span className="font-semibold">Free Sample Collection</span>
              <br />
              within <span className="text-yellow-300 font-bold">60 Mins</span> of Booking*
            </span>
          </div>
          <div className="flex items-start gap-2">
            <FaClipboardCheck size={30} className="text-orange-400 mt-1" />
            <span>
              <span className="font-semibold">Smart Reports</span> with
              <br />
              Real-Time Updates
            </span>
          </div>
          <div className="flex items-start gap-2">
            <FaUserMd size={30} className="text-orange-400 mt-1" />
            <span>
              <span className="font-semibold">Free Report</span>
              <br />
              Counselling
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          
          <button className="bg-Blue-400 border border-white text-white font-semibold px-4 py-2 rounded hover:bg-white hover:text-[#0074b2] transition">
            Book Appointment
          </button>
          <button className="bg-white text-[#0074b2]  font-semibold px-4 py-2 rounded  hover:text-black transition">
            Download App Now
          </button>
        </div>

      </div>

      {/* Right Image */}
      <div className="md:w-1/3 mt-6 md:mt-0">
        <img
          src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop"
          alt="Health Package Promotion"
          className="w-full max-h-80 object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default BannerSection;
