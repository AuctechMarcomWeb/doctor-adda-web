/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import AmbulanceCard from "../components/AmbulanceCard";
import { getRequest } from "../Helpers";
import AmbulanceBanner from "../components/AmbulanceBanner";
import SearchCard from "./SearchCard";

const PopularSearch = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [location, setLocation] = useState({
    radius: "8000",
  });

  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const res = await getRequest(`ambulance?radius=${location?.radius}`);
        console.log(" Ambulance Lists:", res?.data?.data?.ambulances || []);
        setAmbulanceData(res?.data?.data?.ambulances || []);
      } catch (error) {
        console.error(" Error fetching ambulances:", error);
        setAmbulanceData([]);
      }
    };

    fetchAmbulances();
  }, [location?.radius]);

  const filteredData = ambulanceData.filter((ambulance) => {
    const matchesSearch =
      ambulance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ambulance.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      ambulance.ambulanceType.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Hero Banner */}

      

      

      {/* Search and Filter Section */}
      <div className="sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto px-4 py-36">
       
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl  md:text-2xl lg:text-3xl font-bold text-gray-800">
            Available{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Hospital
            </span>
            <span className="ml-2 text-lg text-gray-500">
              ({filteredData.length})
            </span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Live Updates </span>
          </div>
        </div>

        {/* Ambulance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <div
                key={index}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <SearchCard {...data} />
              </div>
            ))
          ) : (

            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No ambulancess found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default PopularSearch;