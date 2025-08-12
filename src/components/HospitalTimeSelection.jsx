import React, { useState } from "react";

const HospitalTimeSelection = ({ isOpen, onClose, slotDetails, onSlotSelected }) => {

  const [selectedDate, setSelectedDate] = useState( null);
  const [selectedTime, setSelectedTime] = useState(null);

  console.log('  slotDetails :', slotDetails)

  //console.log("slotDetails popup:", slotDetails);
  //console.log(" selectedDate :", selectedDate)
 // console.log(" selectedTime :", selectedTime)


  // Convert API dates to labels and values
  const dates =
    slotDetails?.availability?.map((item) => {
      const dateObj = new Date(item.date);
      const label = dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      const value = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
      return { label, value, slots: item.slots };
    }) || [];

  // Get slots for selected date
  const slotsForSelectedDate =
    dates.find((d) => d.value === selectedDate)?.slots || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Select Slot</h1>

        {/* Doctor Name */}
        <p className="text-lg font-semibold text-gray-700 mb-6">
          Dr. {slotDetails?.name || slotDetails?.doctorId?.fullName || "Unknown"}
        </p>

        {/* Date Selection */}
        <div className="flex flex-wrap gap-3">
          {dates.map((d) => (
            <button
              key={d.value}
              onClick={() => {
                setSelectedDate(d.value);
                setSelectedTime(null);
              }}
              className={`px-5 py-2.5 rounded-full text-base font-medium transition-colors ${
                selectedDate === d.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Available Slots */}
        <h3 className="text-lg font-semibold text-blue-600 mt-8">
          Available Slots
        </h3>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {slotsForSelectedDate.map((slot, idx) => (
            <button
              key={idx}
              disabled={slot.isBooked}
              onClick={() => setSelectedTime(slot.startTime)}
              className={`py-3 text-base font-medium rounded-lg border transition-all ${
                slot.isBooked
                  ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                  : selectedTime === slot.startTime
                  ? "bg-green-500 text-white border-green-500"
                  : "text-green-600 border-green-500 hover:bg-green-50"
              }`}
            >
              {slot.startTime} - {slot.endTime}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <button
          onClick={() => onSlotSelected(selectedDate, selectedTime)}
          className="w-full mt-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!selectedTime}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default HospitalTimeSelection;
