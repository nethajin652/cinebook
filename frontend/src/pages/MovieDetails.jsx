import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, Clock, Calendar, Globe, Play, Ticket, 
  ArrowLeft, Share2, Sparkles, Check 
} from 'lucide-react';
import { storageService } from '../services/storage';
import { useBooking } from '../context/BookingContext';
import { TrailerModal } from '../components/TrailerModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useToast } from '../components/Toast';

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startBooking } = useBooking();
  const { showToast } = useToast();

  const [movie, setMovie] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    storageService.init();
    const found = storageService.getMovieById(id);
    if (found) {
      setMovie(found);
    }
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Loading movie details..." />
      </div>
    );
  }

  const handleBookTickets = () => {
    startBooking(movie);
    navigate(`/booking/${movie.id}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast("Movie link copied to clipboard!", "success");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isUpcoming = movie.status === 'upcoming';

  return (
    <div className="pb-16">
      {/* Hero Backdrop Header */}
      <div className="relative w-full min-h-[460px] lg:min-h-[520px] bg-black overflow-hidden flex items-end">
        {/* Backdrop image */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105 opacity-40"
          style={{ backgroundImage: `url(${movie.banner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-transparent to-[#0b0c10]" />

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <Link
            to="/movies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Movies
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
            {/* Poster with Play Trailer overlay */}
            <div className="relative w-48 sm:w-60 md:w-72 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-700/80 shrink-0 group">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsTrailerOpen(true)}
                className="absolute inset-0 bg-black/40 group-hover:bg-black/60 flex flex-col items-center justify-center gap-2 text-white opacity-90 group-hover:opacity-100 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-rose-600/90 group-hover:bg-rose-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider drop-shadow">Watch Trailer</span>
              </button>
            </div>

            {/* Movie Info */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
                {isUpcoming ? (
                  <span className="px-3 py-1 rounded-full font-bold uppercase bg-amber-500 text-black">
                    Upcoming Release
                  </span>
                ) : (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{movie.rating} / 10</span>
                    <span className="text-gray-400 font-normal">({movie.votesCount} votes)</span>
                  </div>
                )}
                {movie.certificate && (
                  <span className="px-2.5 py-1 rounded-md font-bold bg-white/10 text-white border border-white/20">
                    {movie.certificate}
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-md font-semibold bg-white/10 text-gray-300">
                  {movie.formats?.join(', ')}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight">
                {movie.title}
              </h1>

              {/* Meta details line */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-rose-500" /> {movie.duration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-rose-500" /> {movie.releaseDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4 text-rose-500" /> {movie.language.join(', ')}
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {movie.genre.map((g, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#1a1d2e] border border-gray-700/80 text-gray-200"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                {!isUpcoming ? (
                  <button
                    onClick={handleBookTickets}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-base shadow-xl shadow-rose-600/30 active:scale-95 transition-all"
                  >
                    <Ticket className="w-5 h-5" />
                    <span>Book Tickets</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500/20 text-amber-300 font-bold text-sm border border-amber-500/40 cursor-default"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Releasing on {movie.releaseDate}</span>
                  </button>
                )}

                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Trailer</span>
                </button>

                <button
                  onClick={handleShare}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                  title="Share Movie"
                >
                  {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Details & Cast Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Synopsis */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-['Outfit'] border-b border-gray-800 pb-2">
            About the Movie
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-4xl">
            {movie.description}
          </p>
        </section>

        {/* Cast & Crew */}
        {movie.cast && movie.cast.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white font-['Outfit'] border-b border-gray-800 pb-2">
              Starring Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movie.cast.map((member, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#141624] border border-gray-800/80 group">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2.5 border-2 border-gray-700 group-hover:border-rose-500 transition-colors">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors">
                    {member.name}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    as {member.role}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={movie.trailer}
        movieTitle={movie.title}
      />
    </div>
  );
};
