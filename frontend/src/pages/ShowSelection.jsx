import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Film } from 'lucide-react';
import { storageService } from '../services/storage';
import { THEATRES_DATA } from '../data/mockTheatres';
import { useBooking } from '../context/BookingContext';
import { DateSelector } from '../components/DateSelector';
import { TheatreCard } from '../components/TheatreCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const ShowSelection = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { selectedCity, selectShowtime } = useBooking();

  const [movie, setMovie] = useState(null);
  const [selectedDateStr, setSelectedDateStr] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [selectedDateDisplay, setSelectedDateDisplay] = useState('Today');

  useEffect(() => {
    storageService.init();
    const found = storageService.getMovieById(movieId);
    if (found) {
      setMovie(found);
    }
  }, [movieId]);

  if (!movie) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Loading movie screenings..." />
      </div>
    );
  }

  const cityKey = (selectedCity?.id || 'chennai').toLowerCase();
  const theatres = THEATRES_DATA[cityKey] || THEATRES_DATA['chennai'] || [];

  const handleDateSelect = (dateStr, display) => {
    setSelectedDateStr(dateStr);
    setSelectedDateDisplay(display);
  };

  const handleSelectShow = (theatre, show) => {
    selectShowtime({
      movie,
      theatre,
      show,
      date: selectedDateDisplay
    });
    navigate(`/booking/${movie.id}/${show.id}/seats`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Back button & Movie mini header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <Link
            to={`/movies/${movie.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {movie.title}
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
              {movie.title}
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-white/10 text-gray-300">
              {movie.certificate || "UA"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <span>{movie.genre.join(', ')}</span>
            <span>•</span>
            <span>{movie.language.join(', ')}</span>
            <span>•</span>
            <span className="text-rose-400 font-semibold">{movie.duration}</span>
          </div>
        </div>

        {/* City Indicator */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161826] border border-gray-800 text-xs font-semibold text-gray-300 w-fit">
          <MapPin className="w-4 h-4 text-rose-500" />
          <span>Showing in {selectedCity?.name}</span>
        </div>
      </div>

      {/* Step 1: Date Selector Bar */}
      <section>
        <DateSelector
          selectedDate={selectedDateStr}
          onSelectDate={handleDateSelect}
        />
      </section>

      {/* Step 2: Theatres & Show Timings */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white font-['Outfit']">
            Available Theatres in {selectedCity?.name} ({theatres.length})
          </h2>
          <span className="text-xs text-gray-400">Click any showtime to pick seats</span>
        </div>

        <div className="space-y-4">
          {theatres.map(theatre => (
            <TheatreCard
              key={theatre.id}
              theatre={theatre}
              onSelectShow={handleSelectShow}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
