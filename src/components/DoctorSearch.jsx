import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorSearch = () => {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All Specialties");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [warning, setWarning] = useState(""); // 🔹 Warning message
  const navigate = useNavigate();

  // Example list (replace with API)
  const suggestions = [
    "Skin Problem",
    "Ayurveda",
    "Veterinary",
    "Dermatologist",
    "Allergy",
    "Ambulance",
    "Blood Test",
    "Doctor",
    "Hair Loss",
  ];

  // 🔹 Handle input change
  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length > 0) {
      const filtered = suggestions.filter((s) =>
        s.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(suggestions);
    }
    setShowSuggestions(true);
  };

  // 🔹 Show default list on focus
  const handleFocus = () => {
    if (query.length === 0) {
      setFilteredSuggestions(suggestions);
    }
    setShowSuggestions(true);
  };

  // 🔹 Select suggestion
  const handleSelect = (value) => {
    setQuery(value);
    setShowSuggestions(false);
    setWarning(""); // clear warning if selected
  };

  // 🔹 Submit Search
  const handleSearch = () => {
    if (query.trim() === "" && specialty === "All Specialties") {
      setWarning("⚠️ Please select something before searching");
      return;
    }
    setWarning(""); // clear any warning
    navigate("/popular");
  };

  // 🔹 Enter Key Press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="hidden md:grid mt-8 w-full max-w-xl mx-auto text-black relative">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between w-full">
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // delay to allow click
            placeholder="Search doctors, specialties, or locations"
            className="w-full px-4 py-2 text-sm 2xl:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />

          {/* Dropdown Suggestions */}
          {showSuggestions && (
            <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
              <h4 className="px-4 py-2 text-gray-800 text-base font-semibold border-b bg-gray-50">
                Popular Searches
              </h4>
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(item)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-xs"
                  >
                    {item}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No results found</li>
              )}
            </ul>
          )}
        </div>

        {/* Specialties Dropdown */}
        <select
          value={specialty}
          onChange={(e) => {
            setSpecialty(e.target.value);
            setWarning("");
          }}
          className="w-full md:w-1/3 px-4 py-2 text-sm 2xl:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          <option>All Specialties</option>
          <option>Radiology</option>
          <option>Cardiology</option>
          <option>Neurology</option>
          <option>Dentistry</option>
          <option>Orthopedic</option>
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full md:w-auto px-6 py-2 bg-[#297cff] text-sm 2xl:text-base text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Warning Message */}
      {warning && (
        <p className="text-red-500 text-sm mt-2 text-center">{warning}</p>
      )}
    </div>
  );
};

export default DoctorSearch;