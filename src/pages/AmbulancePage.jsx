/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import AmbulanceCard from "../components/AmbulanceCard";
import { getRequest } from "../Helpers";
import AmbulanceBanner from "../components/AmbulanceBanner";
import { Skeleton, Card } from "antd";

const AmbulancePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [location, setLocation] = useState({
    radius: "8000",
  });
    const [loading, setLoading] = useState(true); // 👈 loading state

 useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        setLoading(true); // start skeleton
        const res = await getRequest(`ambulance?radius=${location?.radius}`);
        setAmbulanceData(res?.data?.data?.ambulances || []);
      } catch (error) {
        console.error(" Error fetching ambulances:", error);
        setAmbulanceData([]);
      } finally {
        setLoading(false); // stop skeleton
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

      <AmbulanceBanner />

      {/* Enhanced Wave Divider
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full md:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="white"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="white"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="white"
          ></path>
        </svg>
      </div> */}

      {/* Search and Filter Section */}
      <div className="sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-2 md:p-6  mb-8 border border-gray-100">
          <div className="flex flex-row items-center md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative ">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or location..."
                className="w-full pl-10 pr-4 md:py-3 py-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 md:py-3 py-1 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="icu">ICU</option>
                <option value="non-emergency">Non-Emergency</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl  md:text-2xl lg:text-3xl font-bold text-gray-800">
            Available{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Ambulances
            </span>
            <span className="ml-2 text-lg text-gray-500">
              ({filteredData.length})
            </span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Live Updates</span>
          </div>
        </div>

        {/* Ambulance Cards */}
        {/* Ambulance Cards OR Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loading ? (
            // 🔹 Skeleton grid (shows 4 placeholders)
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="rounded-2xl shadow-md">
                <Skeleton active avatar paragraph={{ rows: 3 }} />
              </Card>
            ))
          ) : filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <div
                key={index}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AmbulanceCard {...data} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No ambulances found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* why choose us */}
      <section className="sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto px-4 py-8">
        <h2 className="text-xl  md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Our Ambulance Services
          </span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
            <img
              src="https://img.icons8.com/ios-filled/50/0074b2/alarm.png"
              alt="24/7"
              className="mx-auto mb-4"
            />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              24/7 Availability
            </h3>
            <p className="text-sm text-gray-600">
              We’re ready round the clock to respond to your emergencies
              instantly.
            </p>
          </div>
          <div className="p-6 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
            <img
              src="https://img.icons8.com/ios-filled/50/0074b2/heart-monitor.png"
              alt="ICU"
              className="mx-auto mb-4"
            />
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              ICU-Equipped Fleet
            </h4>
            <p className="text-sm text-gray-600">
              Advanced Life Support ambulances with ventilators, monitors, and
              trained staff.
            </p>
          </div>
          <div className="p-6 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
            <img
              src="https://img.icons8.com/ios-filled/50/0074b2/route.png"
              alt="Fast"
              className="mx-auto mb-4"
            />
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Fastest Response Time
            </h4>
            <p className="text-sm text-gray-600">
              Our tech-enabled dispatch ensures vehicles reach you in under 8
              minutes.
            </p>
          </div>
          <div className="p-6 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
            <img
              src="https://img.icons8.com/ios-filled/50/0074b2/wallet.png"
              alt="Affordable"
              className="mx-auto mb-4"
            />
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Affordable Pricing
            </h4>
            <p className="text-sm text-gray-600">
              Transparent and budget-friendly ambulance services with no hidden
              charges.
            </p>
          </div>
          <div className="p-6 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
            <img
              src="https://img.icons8.com/ios-filled/50/0074b2/marker.png"
              alt="Location"
              className="mx-auto mb-4"
            />
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Location Based Matching
            </h4>
            <p className="text-sm text-gray-600">
              Get matched with ambulances closest to your current location.
            </p>
          </div>
          <div className="p-6 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
            <img
              src="https://img.icons8.com/ios-filled/50/0074b2/android-os.png"
              alt="App"
              className="mx-auto mb-4"
            />
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              One-Tap Booking
            </h4>
            <p className="text-sm text-gray-600">
              Book instantly using our mobile app with live updates and
              tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <div
        id="emergency"
        className=" text-white py-8 mt-12"
        style={{
          background:
            "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">
                <img width="48" height="48" src="https://img.icons8.com/color/48/siren.png" alt="siren"/>
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Emergency?</h3>
              <p className="text-red-100">
                Call immediately for urgent medical assistance
              </p>
            </div>
          </div>
          <a
            href="tel:108"
            className="flex inline-block bg-white text-red-600 font-bold py-3 px-12 rounded-full text-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex gap-1">
              <img
                src="https://i.pinimg.com/1200x/7e/21/b9/7e21b9661c85d61676143a8ae2c9a73b.jpg"
                height={25}
                width={25}
                alt=""
              />
              <span>Call 108</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AmbulancePage;
