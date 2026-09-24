import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Home, Ticket, Printer, ArrowRight, Share2 } from 'lucide-react';
import { storageService } from '../services/storage';
import { BookingTicket } from '../components/BookingTicket';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    storageService.init();
    const found = storageService.getBookingById(bookingId);
    if (found) {
      setBooking(found);
    }
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Retrieving booking receipt..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      {/* Success banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-emerald-950/40 mb-2 animate-in zoom-in-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit'] tracking-tight">
          Booking Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
          Your cinema tickets have been booked successfully. Present the digital QR pass below at the cinema admission checkpoint.
        </p>
      </div>

      {/* Render the printable digital pass */}
      <BookingTicket booking={booking} showActions={true} />

      {/* Bottom Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-800">
        <Link
          to="/bookings"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-600/30 transition-all active:scale-95"
        >
          <Ticket className="w-4 h-4" />
          <span>View in Booking History</span>
        </Link>

        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1a1d2e] hover:bg-[#22263d] border border-gray-700 text-gray-200 hover:text-white text-xs sm:text-sm font-semibold transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
};
