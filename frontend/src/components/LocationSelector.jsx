import React from 'react';
import { MapPin, Check } from 'lucide-react';
import { CITIES } from '../data/mockMovies';
import { useBooking } from '../context/BookingContext';
import { Modal } from './Modal';

export const LocationSelectorModal = ({ isOpen, onClose }) => {
  const { selectedCity, setSelectedCity } = useBooking();

  const handleSelect = (city) => {
    setSelectedCity(city);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Your City" maxWidth="max-w-2xl">
      <div className="space-y-4">
        <p className="text-sm text-gray-400">
          Showing movies and cinemas running in your chosen region.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {CITIES.map((city) => {
            const isSelected = selectedCity?.id === city.id;
            return (
              <button
                key={city.id}
                onClick={() => handleSelect(city)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left group ${
                  isSelected
                    ? 'border-rose-500 bg-rose-500/10 text-white shadow-lg shadow-rose-950/40'
                    : 'border-gray-800 bg-[#1a1c29] text-gray-300 hover:border-gray-700 hover:bg-[#222536]'
                }`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {city.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate group-hover:text-white">
                    {city.name}
                  </div>
                  <div className="text-[11px] text-gray-500 truncate">{city.state}</div>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export const LocationButton = ({ onClick }) => {
  const { selectedCity } = useBooking();

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-gray-700"
      title="Change City"
    >
      <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
      <span className="font-semibold">{selectedCity?.name || "Chennai"}</span>
    </button>
  );
};
