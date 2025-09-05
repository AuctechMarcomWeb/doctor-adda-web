import React, { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateUserLocation } from "../redux/slices/userSlice"; // create this action in Redux
import axios from "axios";

const LocationDropdown = () => {
  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const dropdownRef = useRef(null);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Handle search
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) return setResults([]);

    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${value}&key=${GOOGLE_API_KEY}`
      );
      setResults(res.data.results || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Select a place from search results
  const handleSelect = (place) => {
    setSearchTerm(place.formatted_address);
    setResults([]);
    setOpen(false);

    dispatch(
      updateUserLocation({
        address: place.formatted_address,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      })
    );
  };

  // Use current location
  const useCurrentLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      // Reverse geocode to get address
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );

      const address = res.data.results[0]?.formatted_address || "";

      setSearchTerm(address);
      setOpen(false);

      dispatch(
        updateUserLocation({
          address,
          latitude,
          longitude,
        })
      );
    });
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <FaMapMarkerAlt />
        <span>{userLocation?.address || "Your Location"} ▾</span>
      </div>

      {open && (
        <div className="absolute mt-2 w-72 bg-white border rounded shadow-lg z-50 p-2">
          <input
            type="text"
            placeholder="Search location"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border p-2 rounded mb-2"
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded mb-2"
            onClick={useCurrentLocation}
          >
            📍 Use My Location
          </button>

          <div className="max-h-60 overflow-auto">
            {results.map((place, idx) => (
              <div
                key={idx}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleSelect(place)}
              >
                {place.formatted_address}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;
