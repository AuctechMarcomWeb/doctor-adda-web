import React, { useState, useEffect, useRef } from "react";
import useLoadGoogleMaps from "../../Utils";

const LocationDropdown = ({ onClose, setSelectedLocation }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const mapsLoaded = useLoadGoogleMaps();

  // Fetch suggestions using the new AutocompleteSuggestion API
  useEffect(() => {
    if (!mapsLoaded || !search) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    let debounceTimer;
    (async () => {
      const {
        AutocompleteSuggestion,
        AutocompleteSessionToken,
      } = await google.maps.importLibrary("places");

      const token = new AutocompleteSessionToken();

      debounceTimer = setTimeout(async () => {
        try {
          const {
            suggestions,
          } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input: search,
            sessionToken: token,
            includedRegionCodes: ["IN"], // optional restriction
          });

          setSuggestions(suggestions || []);
          setActiveIndex(-1);
        } catch (err) {
          console.error("Autocomplete fetch error:", err);
          setSuggestions([]);
        }
      }, 300);
    })();

    return () => clearTimeout(debounceTimer);
  }, [search, mapsLoaded]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Handle suggestion select
  const handleSelect = async (suggestion) => {
    try {
      const { placePrediction } = suggestion;
      const place = await placePrediction.toPlace();

      await place.fetchFields({
        fields: ["displayName", "formattedAddress"],
      });

      const location = place.displayName || place.formattedAddress;
      setSelectedLocation(location);
      onClose();
    } catch (err) {
      console.error("Place details fetch error:", err);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelect(suggestions[activeIndex]);
      }
    }
  };

  // Use current location
  const handleUseCurrentLocation = () => {
    if (!mapsLoaded) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const geocoder = new window.google.maps.Geocoder();
          const latlng = { lat: coords.latitude, lng: coords.longitude };

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
              let city = "";
              let state = "";
              results[0].address_components.forEach((c) => {
                if (c.types.includes("locality")) city = c.long_name;
                if (c.types.includes("administrative_area_level_1"))
                  state = c.long_name;
              });

              const location =
                city && state
                  ? `${city}, ${state}`
                  : results[0].formatted_address;
              setSelectedLocation(location);
              onClose();
            }
          });
        },
        (err) => console.error("Geolocation error:", err)
      );
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 left-0 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-[9999]"
    >
      <div className="p-3">
        {/* Search Box */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-2 max-h-40 overflow-y-auto text-sm text-gray-700">
            {suggestions.map((s, idx) => (
              <p
                key={s.placePrediction.placeId}
                className={`px-2 py-1 cursor-pointer rounded ${
                  idx === activeIndex ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelect(s)}
              >
                {s.placePrediction.text.text}
              </p>
            ))}
          </div>
        )}

        <hr className="my-2" />

        {/* Use Current Location */}
        <button
          onClick={handleUseCurrentLocation}
          className="text-blue-600 text-sm hover:underline"
        >
          📍 Use Current Location
        </button>
      </div>
    </div>
  );
};

export default LocationDropdown;
