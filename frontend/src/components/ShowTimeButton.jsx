import React from 'react';

export const ShowTimeButton = ({ show, onClick, isSelected }) => {
  // Determine pricing or availability badge
  const isFilling = show.bookedSeats && show.bookedSeats.length >= 6;

  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center min-w-[96px] sm:min-w-[108px] py-2 px-3 rounded-xl border text-center transition-all ${
        isSelected
          ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-900/50 scale-105'
          : 'bg-[#181a29] border-gray-800 text-gray-200 hover:border-rose-500/60 hover:bg-[#222538]'
      }`}
    >
      <span className="text-xs sm:text-sm font-bold tracking-tight group-hover:text-white">
        {show.time}
      </span>
      <div className="flex items-center gap-1 mt-0.5">
        <span className={`text-[10px] font-semibold ${isSelected ? 'text-rose-100' : 'text-rose-400'}`}>
          {show.format || "2D"}
        </span>
        <span className="text-[10px] text-gray-400 font-normal">• ₹{show.price}</span>
      </div>

      {isFilling && (
        <span className="mt-1 text-[9px] font-bold uppercase tracking-wider text-amber-400">
          Filling Fast
        </span>
      )}
    </button>
  );
};
