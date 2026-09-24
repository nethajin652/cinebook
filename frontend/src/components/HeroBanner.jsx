import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Ticket, Star, ChevronLeft, ChevronRight, Clock, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { TrailerModal } from './TrailerModal';

export const HeroBanner = ({ featuredMovies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  // Auto-advance banner every 6 seconds
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredMovies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  if (!featuredMovies || featuredMovies.length === 0) return null;

  const currentMovie = featuredMovies[currentIndex];

  const handleBookTickets = () => {
    startBooking(currentMovie);
    navigate(`/booking/${currentMovie.id}`);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % featuredMovies.length);
  };

  return (
    <>
      <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] overflow-hidden bg-black">
        {/* Background Banner Image with Smooth Fade */}
        <div 
          key={currentMovie.id}
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform scale-105"
          style={{ backgroundImage: `url(${currentMovie.banner})` }}
        >
          {/* Multi-gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/80 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl space-y-4 pt-10 sm:pt-0 animate-in fade-in slide-in-from-left-6 duration-700">
            
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold">
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Sparkles className="w-3.5 h-3.5" /> Featured Premiere
              </span>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-400 border border-white/10">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{currentMovie.rating} / 10</span>
                <span className="text-[11px] text-gray-400 font-normal">({currentMovie.votesCount})</span>
              </div>
              <span className="flex items-center gap-1 text-gray-300">
                <Clock className="w-3.5 h-3.5 text-gray-400" /> {currentMovie.duration}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none font-['Outfit'] drop-shadow-lg">
              {currentMovie.title}
            </h1>

            {/* Genres & Languages */}
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-300">
              <span className="text-rose-400 font-semibold">{currentMovie.genre.join(" • ")}</span>
              <span>|</span>
              <span className="text-gray-300">{currentMovie.language.join(", ")}</span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-base text-gray-300 line-clamp-3 leading-relaxed drop-shadow">
              {currentMovie.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={handleBookTickets}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm sm:text-base shadow-xl shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Ticket className="w-5 h-5" />
                <span>Book Tickets</span>
              </button>

              <button
                onClick={() => setSelectedTrailer(currentMovie)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Trailer</span>
              </button>
            </div>

          </div>
        </div>

        {/* Carousel Slide Controls */}
        <div className="absolute right-6 bottom-8 z-20 hidden sm:flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 backdrop-blur-md hover:scale-110 transition-all"
            title="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-gray-300 font-mono">
            <span>0{currentIndex + 1}</span>
            <span>/</span>
            <span>0{featuredMovies.length}</span>
          </div>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 backdrop-blur-md hover:scale-110 transition-all"
            title="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide indicator dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {featuredMovies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? 'w-8 bg-rose-500' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trailer Modal */}
      {selectedTrailer && (
        <TrailerModal
          isOpen={!!selectedTrailer}
          onClose={() => setSelectedTrailer(null)}
          trailerUrl={selectedTrailer.trailer}
          movieTitle={selectedTrailer.title}
        />
      )}
    </>
  );
};
