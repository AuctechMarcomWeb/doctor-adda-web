import React, { useState, useEffect } from "react";
import { AppointmentDateFormat } from "../Utils";

const TimeSlotsSection = ({ availability = [] }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Helper: Compare dates in YYYY-MM-DD format
  const areDatesEqual = (date1, date2) => {
    if (!date1 || !date2) return false;
    return String(date1) === String(date2);
  };

  // Handle date click
  const handleDateClick = (dateObj) => {
    setSelectedDate(dateObj.date);
    setSelectedDateData(dateObj);
    setSelectedSlot(null);
  };

  // Default date selection on first load
  useEffect(() => {
    if (availability.length > 0 && !selectedDate) {
      handleDateClick(availability[0]);
    }
  }, [availability, selectedDate]);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 space-y-6">
      {/* Date Selector */}
      <div>
        <h4 className="text-sm font-semibold mb-2">Select Date</h4>
        <div className="flex flex-wrap gap-2">
          {availability.map((d, i) => (
            <button
              key={i}
              onClick={() => handleDateClick(d)}
              className={`px-3 py-2 text-sm rounded-lg font-medium ${
                areDatesEqual(selectedDate, d.date)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50"
              }`}
            >
              {d.date ? AppointmentDateFormat(d.date) : "N/A"}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <h4 className="font-bold text-sm mb-2">Available Slots</h4>
        <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto">
          {selectedDateData?.slots?.filter((slot) => !slot.isBooked)?.length > 0 ? (
            selectedDateData.slots
              .filter((slot) => !slot.isBooked)
              .map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSlot(slot.startTime)}
                  className={`px-2 py-2 text-sm rounded-lg font-medium ${
                    selectedSlot === slot.startTime
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))
          ) : (
            <p className="text-gray-500 text-sm col-span-2">
              No slots available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotsSection;
