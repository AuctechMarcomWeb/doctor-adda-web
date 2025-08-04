import React, { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

const TimeSlotsSection = ({ availableDates = [] }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  // Default date selection
  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].date)
    }
  }, [availableDates, selectedDate])

  // Get selected date object
  const selectedDateObj = availableDates.find(
    (d) =>
      new Date(d.date).toDateString() ===
      new Date(selectedDate).toDateString()
  )

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Select Date</h2>

      {/* Date Selector */}
      <div className="flex flex-wrap gap-3">
        {availableDates.map((dateItem, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedDate(dateItem.date)
              setSelectedSlot(null)
            }}
            className={`px-4 py-2 rounded-full border text-sm transition duration-200 ${
              selectedDate === dateItem.date
                ? 'bg-blue-600 text-white border-blue-600 shadow'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50'
            }`}
          >
            {dateItem.label}
          </button>
        ))}
      </div>

      {/* Time Slots */}
      {selectedDateObj?.slots?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {selectedDateObj.slots.map((slot, i) => (
            <button
              key={i}
              onClick={() => setSelectedSlot(slot.startTime)}
              className={`px-4 py-2 rounded-lg text-sm transition duration-200 ${
                selectedSlot === slot.startTime
                  ? 'bg-lightblue-600 text-grey shadow'
                  : 'bg-gray-100 text-gray-800 hover:bg-green-50'
              }`}
            >
              🕒 {slot.startTime}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No slots available for this date.</p>
      )}

      {/* Selected Preview
      {selectedDate && selectedSlot && (
        <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm border border-green-300">
          ✅ You selected: <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>
        </div>
      )} */}
    </div>
  )
}

export default TimeSlotsSection
