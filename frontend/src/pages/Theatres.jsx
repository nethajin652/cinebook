import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Film, Building2, Filter } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { THEATRES_DATA } from '../data/mockTheatres';
import { LocationSelectorModal } from '../components/LocationSelector';
import { TheatreCard } from '../components/TheatreCard';
import { storageService } from '../services/storage';

export const Theatres = () => {
  const { selectedCity, startBooking, selectShowtime } = useBooking();
  const navigate = useNavigate();
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  const cityKey = (selectedCity?.id || 'chennai').toLowerCase();
  const theatresInCity = THEATRES_DATA[cityKey] || THEATRES_DATA['chennai'] || [];
  const movies = storageService.getMovies();

  const handleSelectShow = (theatre, show) => {
    // Pick the first now_showing movie or current movie
    const nowShowingMovie = movies.find(m => m.status === 'now_showing') || movies[0];
    const todayStr = new Date().toISOString().split('T')[0];
    
    selectShowtime({
      movie: nowShowingMovie,
      theatre,
      show,
      date: todayStr
    });
    navigate(`/booking/${nowShowingMovie.id}/${show.id}/seats`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Cinemas & Multiplexes</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-['Outfit'] tracking-tight mt-1">
            Theatres in {selectedCity?.name || "Chennai"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Select a theatre to explore available screenings, sound systems, and amenities.
          </p>
        </div>

        <button
          onClick={() => setIsCityModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a1d2e] border border-gray-700/80 hover:border-rose-500 text-xs sm:text-sm font-semibold text-white transition-all w-fit"
        >
          <MapPin className="w-4 h-4 text-rose-500" />
          <span>Change City ({selectedCity?.name})</span>
        </button>
      </div>

      {/* Theatres List */}
      <div className="space-y-6">
        {theatresInCity.length > 0 ? (
          theatresInCity.map(theatre => (
            <TheatreCard
              key={theatre.id}
              theatre={theatre}
              onSelectShow={handleSelectShow}
            />
          ))
        ) : (
          <div className="p-12 text-center bg-[#131522] rounded-2xl border border-gray-800 text-gray-400">
            No theatres listed for {selectedCity?.name} yet. Please switch to Chennai or Bengaluru.
          </div>
        )}
      </div>

      <LocationSelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
      />
    </div>
  );
};
