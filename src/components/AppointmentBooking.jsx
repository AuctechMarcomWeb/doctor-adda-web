import React, { useState, useEffect } from "react";

// Helper to compare dates (ignoring time)
const areDatesEqual = (d1, d2) =>
  new Date(d1).toDateString() === new Date(d2).toDateString();

const AppointmentBooking = ({ clinicData }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const selectedDateSlots =
    clinicData?.availability?.find((d) =>
      areDatesEqual(d.date, selectedDate)
    )?.slots || [];

  return (
    <div className="mt-6">
      {/* === DATE SELECTION === */}
      <h4 className="text-sm font-semibold mb-2">Select Date</h4>
      <div className="flex flex-wrap gap-2">
        {clinicData?.availability
          ?.filter((d) => d.isAvailable)
          .map((d, i) => {
            const formattedDate = new Date(d.date).toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
            });

            return (
              <button
                key={i}
                onClick={() => {
                  setSelectedDate(d.date);
                  setSelectedSlot(null);
                }}
                className={`px-3 py-2 text-sm rounded-lg font-medium ${
                  areDatesEqual(selectedDate, d.date)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                }`}
              >
                {formattedDate}
              </button>
            );
          })}
      </div>

      {/* === SLOT SELECTION === */}
      <div className="mt-6">
        <h4 className="font-bold text-sm mb-2">Available Slots</h4>
        <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto">
          {selectedDateSlots.length > 0 ? (
            selectedDateSlots.map((slot, i) => {
              const isBooked = slot.isBooked;
              const isSelected = selectedSlot === slot.startTime;

              return (
                <button
                  key={i}
                  onClick={() => !isBooked && setSelectedSlot(slot.startTime)}
                  disabled={isBooked}
                  className={`px-2 py-2 text-sm rounded-lg font-medium ${
                    isBooked
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              );
            })
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

export default AppointmentBooking;
