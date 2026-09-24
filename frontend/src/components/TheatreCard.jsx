import React from 'react';
import { MapPin, Info, Coffee } from 'lucide-react';
import { ShowTimeButton } from './ShowTimeButton';

export const TheatreCard = ({ theatre, onSelectShow, selectedShowId }) => {
  return (
    <div className="w-full bg-[#141624] border border-gray-800/80 rounded-2xl p-4 sm:p-6 shadow-md hover:border-gray-700/80 transition-all">
      {/* Theatre Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800/80 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              {theatre.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>{theatre.area}, {theatre.location}</span>
            {theatre.distance && (
              <span className="text-gray-500">• {theatre.distance}</span>
            )}
          </div>
        </div>

        {/* Amenities pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 sm:pt-0">
          {theatre.amenities?.map((amenity, i) => (
            <span
              key={i}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Show Timings Grid */}
      <div className="pt-4">
        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
          Available Showtimes
        </div>
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {theatre.shows?.map(show => (
            <ShowTimeButton
              key={show.id}
              show={show}
              isSelected={selectedShowId === show.id}
              onClick={() => onSelectShow(theatre, show)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
