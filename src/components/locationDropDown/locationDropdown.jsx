import React, { useState, useEffect, useRef } from "react";
import useLoadGoogleMaps from "../../Utils";

/**
 * LocationDropdown
 * Props:
 *  - onClose(): called when dropdown should close
 *  - setSelectedLocation(locationString | { address, lat, lng }): called with selected location
 */
const LocationDropdown = ({ onClose, setSelectedLocation }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]); // array of place prediction objects
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const mapsLoaded = useLoadGoogleMaps();

  // Debounce timer ref
  const debounceRef = useRef(null);

  // 1) AUTOCOMPLETE SUGGESTIONS
  useEffect(() => {
    if (!mapsLoaded) return;
    if (!search || search.trim().length === 0) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    // clear any existing debounce timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      try {
        const service = new window.google.maps.places.AutocompleteService();
        const sessionToken =
          new window.google.maps.places.AutocompleteSessionToken();

        service.getPlacePredictions(
          {
            input: search,
            componentRestrictions: { country: "IN" }, // optional, adapt if needed
            sessionToken,
          },
          (predictions, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              Array.isArray(predictions)
            ) {
              setSuggestions(predictions);
              setActiveIndex(-1);
            } else {
              setSuggestions([]);
              setActiveIndex(-1);
            }
          }
        );
      } catch (err) {
        console.error("AutocompleteService error:", err);
        setSuggestions([]);
      }
    }, 300); // debounce 300ms

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, mapsLoaded]);

  // 2) CLOSE WHEN CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // 3) SELECT A PREDICTION -> fetch place details (address / geometry)
  const handleSelect = async (prediction) => {
    if (!prediction || !mapsLoaded) return;

    try {
      // create PlacesService with an off-DOM div
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const placeId = prediction.place_id;
      service.getDetails(
        {
          placeId,
          fields: ["formatted_address", "geometry", "name"],
        },
        (placeResult, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            placeResult
          ) {
            const address = placeResult.formatted_address || placeResult.name;
            const lat = placeResult.geometry?.location?.lat?.();
            const lng = placeResult.geometry?.location?.lng?.();

            // update parent
            setSelectedLocation?.({
              address,
              latitude: lat,
              longitude: lng,
            });

            // reflect in input and close dropdown
            setSearch(address);
            setSuggestions([]);
            setActiveIndex(-1);
            onClose?.();

            // focus the input (optional UX)
            setTimeout(() => {
              inputRef.current?.focus();
            }, 50);
          } else {
            console.error("getDetails failed:", status);
          }
        }
      );
    } catch (err) {
      console.error("Place details fetch error:", err);
    }
  };

  // 4) KEYBOARD NAVIGATION
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
    } else if (e.key === "Escape") {
      onClose?.();
    }
  };

  // 5) USE CURRENT LOCATION (geolocation -> reverse geocode)
  const handleUseCurrentLocation = () => {
    if (!mapsLoaded) {
      // optionally show a small message to user
      console.warn("Google Maps not loaded yet");
      return;
    }

    if (!navigator.geolocation) {
      console.warn("Geolocation not supported by browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const geocoder = new window.google.maps.Geocoder();
          const latlng = { lat: coords.latitude, lng: coords.longitude };

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (
              status === window.google.maps.GeocoderStatus.OK &&
              results?.[0]
            ) {
              // Prefer a full formatted address (results[0])
              const formatted = results[0].formatted_address;

              // Pass object to parent (address + lat/lng)
              setSelectedLocation?.({
                address: formatted,
                latitude: coords.latitude,
                longitude: coords.longitude,
              });

              // reflect in input and reset suggestions
              setSearch(formatted);
              setSuggestions([]);
              setActiveIndex(-1);
              onClose?.();

              // focus input so user can still type if needed
              setTimeout(() => inputRef.current?.focus(), 50);
            } else {
              // fallback: use lat/lng string
              const fallback = `${coords.latitude.toFixed(
                6
              )}, ${coords.longitude.toFixed(6)}`;
              setSelectedLocation?.({
                address: fallback,
                latitude: coords.latitude,
                longitude: coords.longitude,
              });
              setSearch(fallback);
              setSuggestions([]);
              setActiveIndex(-1);
              onClose?.();
            }
          });
        } catch (err) {
          console.error("Reverse geocode error:", err);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 left-0 w-80 bg-white shadow-lg rounded-md border border-gray-200 z-[9999]"
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
          <div className="mt-2 max-h-48 overflow-y-auto text-sm text-gray-700">
            {suggestions.map((p, idx) => (
              <div
                key={p.place_id}
                className={`px-2 py-2 cursor-pointer rounded ${
                  idx === activeIndex ? "bg-blue-50" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelect(p)}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                {/* display the prediction description */}
                <div className="font-medium">{p.description}</div>
                <div className="text-xs text-gray-500">
                  {/* show main_text + secondary_text if available */}
                  {p.structured_formatting?.secondary_text || ""}
                </div>
              </div>
            ))}
          </div>
        )}

        <hr className="my-2" />

        {/* Use Current Location */}
        <div className="flex gap-2">
          {!mapsLoaded ? (
            <p className="text-gray-400 text-sm">Loading Google Maps…</p>
          ) : (
            <button
              onClick={handleUseCurrentLocation}
              className="flex-1 text-blue-600 text-sm hover:underline"
              type="button"
            >
              📍 Use Current Location
            </button>
          )}

          {/* optional clear button */}
          <button
            onClick={() => {
              setSearch("");
              setSuggestions([]);
              setActiveIndex(-1);
              // keep focus for quick input
              setTimeout(() => inputRef.current?.focus(), 50);
            }}
            className="text-sm text-gray-500 hover:underline"
            type="button"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDropdown;
