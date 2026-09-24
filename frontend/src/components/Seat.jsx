import React from 'react';

export const Seat = ({ seatNumber, tier, price, isBooked, isSelected, onToggle }) => {
  const handleClick = () => {
    if (isBooked) return;
    onToggle(seatNumber, tier, price);
  };

  return (
    <button
      type="button"
      disabled={isBooked}
      onClick={handleClick}
      title={
        isBooked 
          ? `Seat ${seatNumber} is already booked` 
          : `${seatNumber} (${tier}) - ₹${price}`
      }
      className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-150 flex items-center justify-center select-none ${
        isBooked
          ? 'bg-[#252836] text-gray-600 cursor-not-allowed border border-transparent'
          : isSelected
          ? 'bg-rose-500 text-white shadow-lg shadow-rose-600/40 border-2 border-white scale-110 z-10 animate-in zoom-in-75'
          : 'bg-[#181a29] text-gray-300 border border-gray-700/80 hover:border-rose-500 hover:text-white hover:bg-[#25293d] hover:scale-105 active:scale-95'
      }`}
    >
      {seatNumber.slice(1)}
    </button>
  );
};
