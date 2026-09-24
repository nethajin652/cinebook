import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Ticket, Eye, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  const handleBookNow = (e) => {
    e.stopPropagation();
    startBooking(movie);
    navigate(`/booking/${movie.id}`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/movies/${movie.id}`);
  };

  const isUpcoming = movie.status === 'upcoming';

  return (
    <div 
      onClick={handleViewDetails}
      className="group relative flex flex-col bg-[#141624] border border-gray-800/80 hover:border-rose-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-rose-950/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-900">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141624] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Rating or Upcoming Badge */}
          {isUpcoming ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500 text-black shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Upcoming
            </span>
          ) : (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-amber-400 font-bold text-xs shadow-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{movie.rating}</span>
              <span className="text-[10px] text-gray-400 font-normal">/10</span>
            </div>
          )}

          {/* Certificate Badge */}
          {movie.certificate && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
              {movie.certificate}
            </span>
          )}
        </div>

        {/* Formats Banner at bottom of poster */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap gap-1">
          {movie.formats?.slice(0, 2).map((fmt, i) => (
            <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-900/80 backdrop-blur-md text-gray-300 border border-gray-700/60">
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Movie Details Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-base text-white group-hover:text-rose-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>

          {/* Genre & Duration */}
          <div className="flex items-center justify-between text-xs text-gray-400 mt-1.5">
            <span className="truncate max-w-[150px] font-medium text-gray-300">
              {Array.isArray(movie.genre) ? movie.genre.slice(0, 2).join(', ') : movie.genre}
            </span>
            <span className="flex items-center gap-1 text-[11px] shrink-0 text-gray-400">
              <Clock className="w-3 h-3" /> {movie.duration}
            </span>
          </div>

          {/* Languages */}
          <div className="text-[11px] text-gray-400 mt-1 truncate">
            {Array.isArray(movie.language) ? movie.language.join(', ') : movie.language}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center gap-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white border border-gray-700/60 transition-all"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          {!isUpcoming ? (
            <button
              onClick={handleBookNow}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-md shadow-rose-600/20 active:scale-95 transition-all"
              title="Book Tickets"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>
          ) : (
            <button
              onClick={handleViewDetails}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all"
            >
              <span>Explore</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
