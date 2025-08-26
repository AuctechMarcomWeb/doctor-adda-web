import React, { useState } from "react";

const DashboardService = () => {
  const [services, setServices] = useState([{ name: "" }]);
  const [codEnabled, setCodEnabled] = useState(true);
  const [onlinePaymentEnabled, setOnlinePaymentEnabled] = useState(false);

  const updateServiceName = (index, value) => {
    setServices(prev => prev.map((s, i) => (i === index ? { ...s, name: value } : s)));
  };

  const addService = () => {
    setServices(prev => [...prev, { name: "" }]);
  };

  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-44">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Services & Preference</h2>

      <div>
        <p className="text-gray-800 font-semibold mb-2">Services Offered</p>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-3 sm:p-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                value={service.name}
                onChange={e => updateServiceName(index, e.target.value)}
                placeholder="Service name"
                className="w-full bg-white p-2 sm:p-3 rounded-lg border outline-none"
              />
            </div>
          ))}
        </div>
        <button onClick={addService} className="text-blue-600 mt-3 font-semibold">Add More</button>
      </div>

      <div className="mt-8">
        <p className="text-gray-800 font-semibold mb-3">COD Preference</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            className={`py-3 rounded-lg font-semibold ${codEnabled ? "bg-gradient-to-r from-teal-600 to-green-400 text-white" : "bg-white border"}`}
            onClick={() => setCodEnabled(true)}
          >
            Yes
          </button>
          <button
            className={`py-3 rounded-lg font-semibold ${!codEnabled ? "bg-gradient-to-r from-red-400 to-red-500 text-white" : "bg-white border"}`}
            onClick={() => setCodEnabled(false)}
          >
            No
          </button>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-gray-800 font-semibold mb-3">Online Payment</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            className={`py-3 rounded-lg font-semibold ${onlinePaymentEnabled ? "bg-gradient-to-r from-teal-600 to-green-400 text-white" : "bg-white border"}`}
            onClick={() => setOnlinePaymentEnabled(true)}
          >
            Yes
          </button>
          <button
            className={`py-3 rounded-lg font-semibold ${!onlinePaymentEnabled ? "bg-gradient-to-r from-red-400 to-red-500 text-white" : "bg-white border"}`}
            onClick={() => setOnlinePaymentEnabled(false)}
          >
            No
          </button>
        </div>
      </div>

      <div className="mt-10">
        <button className="w-full py-3 md:py-4 rounded-full text-white font-semibold bg-gradient-to-r from-teal-600 to-green-400">Save Changes</button>
      </div>
    </div>
  );
};

export default DashboardService; 