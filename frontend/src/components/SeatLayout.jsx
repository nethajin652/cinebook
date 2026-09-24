import React from 'react';
import { Seat } from './Seat';
import { SEAT_TIERS } from '../data/mockTheatres';

export const SeatLayout = ({
  showId,
  occupiedSeats = [],
  selectedSeats = [],
  onToggleSeat
}) => {
  const selectedSeatNumbers = selectedSeats.map(s => s.seatNumber);

  return (
    <div className="w-full flex flex-col items-center select-none">
      
      {/* Cinema Screen Graphic */}
      <div className="w-full max-w-2xl px-4 mb-8 flex flex-col items-center">
        <div className="w-full cinema-screen-glow mb-2" />
        <div className="text-[11px] uppercase tracking-[0.25em] text-gray-400 font-bold flex items-center gap-2">
          <span>Screen This Way</span>
        </div>
      </div>

      {/* Seat Matrix Container */}
      <div className="w-full overflow-x-auto pb-6 px-2 flex justify-start sm:justify-center">
        <div className="min-w-[340px] max-w-2xl space-y-6 mx-auto sm:mx-0">
          {SEAT_TIERS.map((tierConfig) => (
            <div key={tierConfig.tier} className="space-y-2.5">
              {/* Tier Header with Price Pill */}
              <div className="flex items-center justify-between pb-1.5 border-b border-gray-800/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    {tierConfig.name}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    — ₹{tierConfig.price}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 hidden sm:inline">
                  {tierConfig.perks}
                </span>
              </div>

              {/* Rows inside this tier */}
              <div className="space-y-2">
                {tierConfig.rows.map(rowLetter => {
                  const totalSeats = tierConfig.seatsPerRow;
                  const leftSeats = Math.ceil(totalSeats / 2);

                  return (
                    <div key={rowLetter} className="flex items-center justify-center gap-2 sm:gap-3">
                      {/* Row Label */}
                      <span className="w-4 text-xs font-bold text-gray-400 text-center">
                        {rowLetter}
                      </span>

                      {/* Left Block */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {Array.from({ length: leftSeats }, (_, idx) => {
                          const seatNum = `${rowLetter}${idx + 1}`;
                          const isBooked = occupiedSeats.includes(seatNum);
                          const isSelected = selectedSeatNumbers.includes(seatNum);

                          return (
                            <Seat
                              key={seatNum}
                              seatNumber={seatNum}
                              tier={tierConfig.tier}
                              price={tierConfig.price}
                              isBooked={isBooked}
                              isSelected={isSelected}
                              onToggle={onToggleSeat}
                            />
                          );
                        })}
                      </div>

                      {/* Aisle Walkway Spacer */}
                      <div className="w-4 sm:w-6" />

                      {/* Right Block */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {Array.from({ length: totalSeats - leftSeats }, (_, idx) => {
                          const seatNum = `${rowLetter}${leftSeats + idx + 1}`;
                          const isBooked = occupiedSeats.includes(seatNum);
                          const isSelected = selectedSeatNumbers.includes(seatNum);

                          return (
                            <Seat
                              key={seatNum}
                              seatNumber={seatNum}
                              tier={tierConfig.tier}
                              price={tierConfig.price}
                              isBooked={isBooked}
                              isSelected={isSelected}
                              onToggle={onToggleSeat}
                            />
                          );
                        })}
                      </div>

                      {/* Right Row Label */}
                      <span className="w-4 text-xs font-bold text-gray-400 text-center">
                        {rowLetter}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Status Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 pb-2 border-t border-gray-800/80 w-full max-w-lg text-xs">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#181a29] border border-gray-700/80" />
          <span className="text-gray-400">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-rose-500 border border-white" />
          <span className="text-white font-semibold">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#252836]" />
          <span className="text-gray-500">Booked</span>
        </div>
      </div>

    </div>
  );
};
