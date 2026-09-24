import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, MapPin, Ticket } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { storageService } from '../services/storage';
import { SeatLayout } from '../components/SeatLayout';
import { BookingSummary } from '../components/BookingSummary';
import { useToast } from '../components/Toast';

export const SeatSelection = () => {
  const { movieId, showId } = useParams();
  const navigate = useNavigate();
  const { booking, toggleSeat, selectedCity } = useBooking();
  const { showToast } = useToast();

  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [movie, setMovie] = useState(booking.movie);

  useEffect(() => {
    storageService.init();
    if (!movie) {
      const found = storageService.getMovieById(movieId);
      if (found) setMovie(found);
    }
    const occupied = storageService.getOccupiedSeatsForShow(showId);
    setOccupiedSeats(occupied);
  }, [movieId, showId, movie]);

  const handleToggleSeat = (seatNumber, tier, price) => {
    try {
      toggleSeat(seatNumber, tier, price);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleProceed = () => {
    if (booking.selectedSeats.length === 0) {
      showToast("Please select at least one seat to proceed.", "error");
      return;
    }
    navigate('/payment');
  };

  const theatre = booking.theatre;
  const show = booking.show;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Top Breadcrumb & Showtime Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <Link
            to={`/booking/${movieId}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Theatres
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
            {movie?.title || "Movie"}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-1">
            <span className="text-rose-400 font-semibold">{theatre?.name || "Cinema Hall"}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {booking.date || "Today"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-white font-semibold">
              <Clock className="w-3.5 h-3.5 text-rose-500" /> {show?.time || "Showtime"}
            </span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300">
              {show?.format || "2D"}
            </span>
          </div>
        </div>

        <div className="text-xs text-gray-400 flex items-center gap-2 bg-[#161826] px-4 py-2 rounded-xl border border-gray-800 w-fit">
          <Ticket className="w-4 h-4 text-rose-500" />
          <span>Max 8 seats per booking</span>
        </div>
      </div>

      {/* Main Grid: Seat Map on Left/Center, Booking Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Seat Layout View */}
        <div className="lg:col-span-8 bg-[#12141f] border border-gray-800/80 rounded-3xl p-4 sm:p-8 shadow-2xl overflow-hidden">
          <SeatLayout
            showId={showId}
            occupiedSeats={occupiedSeats}
            selectedSeats={booking.selectedSeats}
            onToggleSeat={handleToggleSeat}
          />
        </div>

        {/* Pricing & Checkout Summary Sidebar */}
        <div className="lg:col-span-4 sticky top-24">
          <BookingSummary onProceed={handleProceed} />
        </div>

      </div>
    </div>
  );
};
