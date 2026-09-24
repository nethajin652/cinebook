import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Ticket, Calendar, Clock, MapPin, Eye, 
  XCircle, CheckCircle2, AlertTriangle, ArrowRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storage';
import { BookingTicket } from '../components/BookingTicket';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';

export const BookingHistory = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [bookings, setBookings] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [cancelTargetId, setCancelTargetId] = useState(null);

  const loadBookings = () => {
    storageService.init();
    if (currentUser) {
      const userBookings = storageService.getUserBookings(currentUser.id);
      setBookings(userBookings);
    } else {
      // Guest or all mock bookings
      setBookings(storageService.getBookings());
    }
  };

  useEffect(() => {
    loadBookings();
  }, [currentUser]);

  const handleCancelBooking = (bookingId) => {
    const updated = storageService.cancelBooking(bookingId);
    if (updated) {
      showToast("Booking has been cancelled and seats released. Refund simulated.", "info");
      setCancelTargetId(null);
      loadBookings();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wider">
            <Ticket className="w-4 h-4" />
            <span>Admission Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mt-1">
            My Booking History
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Access previous tickets, gate admission QR codes, and cancellation options.
          </p>
        </div>

        <Link
          to="/movies"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-xs font-bold shadow-md shadow-rose-600/20 w-fit"
        >
          <span>Book New Show</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((b) => {
            const seatsStr = b.seats?.map(s => s.seatNumber).join(', ') || '';
            const isCancelled = b.bookingStatus === 'Cancelled';

            return (
              <div
                key={b.bookingId}
                className="bg-[#141624] border border-gray-800 hover:border-gray-700/90 rounded-2xl p-4 sm:p-6 shadow-md flex flex-col md:flex-row gap-5 items-start md:items-center justify-between transition-all"
              >
                {/* Left: Poster + Movie Details */}
                <div className="flex gap-4 items-center">
                  <img
                    src={b.moviePoster}
                    alt={b.movieTitle}
                    className="w-16 h-24 sm:w-20 sm:h-28 object-cover rounded-xl shadow-md shrink-0 border border-gray-700/60"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-gray-400">
                        {b.bookingId}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isCancelled
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {b.bookingStatus}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {b.movieTitle}
                    </h3>

                    <div className="text-xs text-gray-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{b.theatreName} ({b.theatreLocation})</span>
                    </div>

                    <div className="text-xs text-gray-300 flex flex-wrap items-center gap-3 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" /> {b.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-rose-400" /> {b.time}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-rose-400">Seats: {seatsStr}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Price + Action Buttons */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-gray-800">
                  <div className="text-left md:text-right">
                    <div className="text-[10px] uppercase font-bold text-gray-400">Total Paid</div>
                    <div className="text-lg font-black text-emerald-400 font-['Outfit']">₹{b.totalAmount}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTicket(b)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Ticket</span>
                    </button>

                    {!isCancelled && (
                      <button
                        onClick={() => setCancelTargetId(b.bookingId)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-500/20 border border-rose-500/30 transition-all"
                        title="Cancel Booking"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-[#12141e] border border-dashed border-gray-800 rounded-3xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-800/60 flex items-center justify-center text-gray-500">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white">No Bookings Found</h3>
          <p className="text-xs text-gray-400 max-w-sm">
            You haven't made any movie reservations yet. Browse our now showing cinema listing to book tickets!
          </p>
          <Link
            to="/movies"
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/30"
          >
            Explore Movies
          </Link>
        </div>
      )}

      {/* Ticket Modal */}
      {selectedTicket && (
        <Modal
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
          title={`Ticket Pass – ${selectedTicket.bookingId}`}
          maxWidth="max-w-xl"
        >
          <BookingTicket booking={selectedTicket} showActions={true} />
        </Modal>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancelTargetId && (
        <Modal
          isOpen={!!cancelTargetId}
          onClose={() => setCancelTargetId(null)}
          title="Confirm Ticket Cancellation"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Are you sure you want to cancel?</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Your reserved seats will be released back to the cinema pool and your payment of booking <strong className="text-white">{cancelTargetId}</strong> will be marked as refunded.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setCancelTargetId(null)}
                className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:text-white text-xs font-semibold"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancelBooking(cancelTargetId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Yes, Cancel Tickets
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
