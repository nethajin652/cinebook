import React from 'react';
import { QRCode } from './QRCode';
import { Film, MapPin, Calendar, Clock, Ticket, CheckCircle2, Download, Printer } from 'lucide-react';

export const BookingTicket = ({ booking, onPrint, showActions = true }) => {
  if (!booking) return null;

  const seatsList = booking.seats?.map(s => s.seatNumber).join(', ') || '';

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        id="printable-ticket" 
        className="relative bg-gradient-to-b from-[#181a28] to-[#12141f] border border-gray-700/80 rounded-3xl overflow-hidden shadow-2xl text-white"
      >
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-rose-600 to-rose-700 p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-['Outfit'] font-black text-lg sm:text-xl tracking-tight leading-none">
                CineBook <span className="font-normal text-xs uppercase tracking-widest text-rose-200">M-Ticket</span>
              </div>
              <div className="text-[11px] text-rose-100 font-medium">Digital Cinema Admission Pass</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] uppercase font-bold tracking-widest text-rose-200">Booking ID</div>
            <div className="font-mono font-bold text-xs sm:text-sm text-white">{booking.bookingId}</div>
          </div>
        </div>

        {/* Movie Info Section */}
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center sm:items-start border-b border-gray-800">
          <img
            src={booking.moviePoster}
            alt={booking.movieTitle}
            className="w-24 h-36 object-cover rounded-xl shadow-lg shrink-0 border border-gray-700/60"
          />

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                {booking.format || "2D"}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {booking.bookingStatus}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-['Outfit']">
              {booking.movieTitle}
            </h3>

            <div className="text-xs text-gray-300 flex items-center justify-center sm:justify-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="font-semibold text-gray-200">{booking.theatreName}</span>
            </div>
            <div className="text-[11px] text-gray-400">
              {booking.theatreLocation} • {booking.screen || "Audi 1"}
            </div>
          </div>
        </div>

        {/* Perforated Divider Tear */}
        <div className="relative flex items-center my-1">
          <div className="w-6 h-6 rounded-full bg-[#0b0c10] -ml-3 border-r border-gray-700/80" />
          <div className="flex-1 border-b-2 border-dashed border-gray-700 mx-2" />
          <div className="w-6 h-6 rounded-full bg-[#0b0c10] -mr-3 border-l border-gray-700/80" />
        </div>

        {/* Showtimes & Seats Grid */}
        <div className="p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-b border-gray-800">
          <div className="p-2.5 rounded-xl bg-[#1c1f30]">
            <div className="text-[10px] uppercase font-bold text-gray-400 flex items-center justify-center gap-1">
              <Calendar className="w-3 h-3 text-rose-400" /> Date
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">{booking.date}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#1c1f30]">
            <div className="text-[10px] uppercase font-bold text-gray-400 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-rose-400" /> Time
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">{booking.time}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#1c1f30]">
            <div className="text-[10px] uppercase font-bold text-gray-400 flex items-center justify-center gap-1">
              <Ticket className="w-3 h-3 text-rose-400" /> Seats
            </div>
            <div className="text-xs sm:text-sm font-bold text-rose-400 mt-1">{seatsList || 'N/A'}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#1c1f30]">
            <div className="text-[10px] uppercase font-bold text-gray-400">Total Paid</div>
            <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-1">₹{booking.totalAmount}</div>
          </div>
        </div>

        {/* QR Code & Verification Stub */}
        <div className="p-5 sm:p-6 bg-[#0f111a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Gate Check-in QR</div>
            <p className="text-[11px] text-gray-400 max-w-xs">
              Present this digital pass directly at the cinema gate for laser scanning. No physical printout mandatory.
            </p>
            <div className="text-[10px] text-gray-400 font-mono">
              Booked by: <span className="text-gray-300 font-semibold">{booking.userName}</span>
            </div>
          </div>

          <div className="shrink-0">
            <QRCode text={`CINEBOOK-${booking.bookingId}-${booking.movieId}`} size={120} />
          </div>
        </div>
      </div>

      {/* Ticket Action Buttons */}
      {showActions && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all shadow border border-white/10"
          >
            <Printer className="w-4 h-4" />
            <span>Print Ticket</span>
          </button>
        </div>
      )}
    </div>
  );
};
