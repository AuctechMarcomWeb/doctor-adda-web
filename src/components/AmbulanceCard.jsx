import React from "react";

const AmbulanceCard = ({ name, type, capacity, price, location, rating, image }) => {
  return (
    <div className="flex bg-white shadow-md rounded-xl p-4 gap-4 items-start hover:shadow-lg transition-all">
      <img src={image} alt={name} className="w-20 h-20 rounded-full object-cover" />

      <div className="flex-1">
        <h2 className="text-blue-600 text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-700"><span className="lni lni-car text-gray-500 mr-1"></span> <strong>Type:</strong> {type}</p>
        <p className="text-sm text-gray-700"><span className="lni lni-users text-gray-500 mr-1"></span> <strong>Capacity:</strong> {capacity} Unit</p>
        <p className="text-sm text-gray-700"><span className="lni lni-rupee text-gray-500 mr-1"></span> <strong>Price:</strong> ₹{price}</p>
        <p className="text-sm text-gray-700"><span className="lni lni-map-marker text-gray-500 mr-1"></span> <strong>Location:</strong> {location}</p>
        <div className="mt-2 inline-block bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
          ⭐ {rating}
        </div>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">View More</button>
    </div>
  );
};

export default AmbulanceCard;
