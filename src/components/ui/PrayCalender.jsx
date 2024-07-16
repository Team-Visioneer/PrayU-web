import React from "react";

const PrayCalender = ({ dates }) => {
  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  return (
    <div className="flex justify-center space-x-4">
      {dates.map((date) => {
        const isToday = date.date === currentDate;
        const day = new Date(date.date).getDate(); // Extract the day part of the date
        return (
          <div key={date.date} className="flex flex-col items-center">
            <span
              className={`text-sm ${
                isToday ? "font-bold text-black" : "text-gray-400"
              }`}
            >
              {day}
            </span>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded ${
                isToday ? "bg-red-100" : "bg-gray-200"
              }`}
            >
              <span
                className={`text-2xl ${
                  isToday ? "text-red-500" : "text-gray-500"
                }`}
              >
                {date.emoji}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PrayCalender;
