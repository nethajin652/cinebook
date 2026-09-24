import React from 'react';
import { Calendar } from 'lucide-react';

export const DateSelector = ({ selectedDate, onSelectDate }) => {
  // Generate 7 days starting from today
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const isoString = d.toISOString().split('T')[0];
    const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    const month = d.toLocaleDateString('en-US', { month: 'short' });

    dates.push({
      dateStr: isoString,
      dayName,
      dayNum,
      month,
      display: `${dayName}, ${dayNum} ${month}`
    });
  }

  // If no selectedDate, choose first (Today)
  const activeDate = selectedDate || dates[0].dateStr;

  return (
    <div className="w-full bg-[#12141f] border border-gray-800 rounded-2xl p-3 sm:p-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
        <Calendar className="w-4 h-4 text-rose-500" />
        <span>Select Date</span>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {dates.map((item) => {
          const isSelected = activeDate === item.dateStr;
          return (
            <button
              key={item.dateStr}
              onClick={() => onSelectDate(item.dateStr, item.display)}
              className={`flex flex-col items-center justify-center min-w-[76px] sm:min-w-[88px] py-2.5 px-3 rounded-xl border transition-all shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-b from-rose-500 to-rose-600 border-rose-400 text-white shadow-lg shadow-rose-950/50 scale-[1.02]'
                  : 'bg-[#181a29] border-gray-800 text-gray-300 hover:border-gray-700 hover:bg-[#202336]'
              }`}
            >
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${isSelected ? 'text-rose-100' : 'text-gray-400'}`}>
                {item.dayName}
              </span>
              <span className="text-lg sm:text-xl font-extrabold my-0.5 font-['Outfit']">
                {item.dayNum}
              </span>
              <span className={`text-[10px] font-semibold uppercase ${isSelected ? 'text-rose-100' : 'text-gray-500'}`}>
                {item.month}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
