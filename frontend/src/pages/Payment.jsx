import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ArrowLeft, Ticket, Calendar, Clock, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storage';
import { PaymentMethod } from '../components/PaymentMethod';
import { useToast } from '../components/Toast';

export const Payment = () => {
  const navigate = useNavigate();
  const { booking, getPriceBreakdown, resetBooking } = useBooking();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [selectedMethod, setSelectedMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // If no seats selected, send back to movies
  if (!booking.selectedSeats || booking.selectedSeats.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-[#141624] border border-gray-800 rounded-2xl text-center space-y-4">
        <Ticket className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">No Seats Selected</h2>
        <p className="text-xs text-gray-400">Please choose your movie and seats before proceeding to checkout.</p>
        <Link
          to="/movies"
          className="inline-block px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all"
        >
          Browse Movies
        </Link>
      </div>
    );
  }

  const { ticketAmount, convenienceFee, discountAmount, totalAmount, seatsCount } = getPriceBreakdown();

  const handlePaymentSubmit = (paymentDetails) => {
    setIsProcessing(true);

    // Simulate realistic 2-second payment gateway processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }

      // Generate randomized 7-digit booking ID
      const randomId = Math.floor(1000000 + Math.random() * 9000000);
      const bookingId = `CB-${randomId}`;

      const newBooking = {
        bookingId,
        userId: currentUser?.id || "guest-user",
        userName: currentUser?.name || "CineBook Guest",
        userEmail: currentUser?.email || "guest@cinebook.com",
        userMobile: currentUser?.mobile || "9876543210",
        movieId: booking.movie?.id,
        movieTitle: booking.movie?.title,
        moviePoster: booking.movie?.poster,
        theatreId: booking.theatre?.id,
        theatreName: booking.theatre?.name,
        theatreLocation: booking.theatre?.location || "Chennai",
        screen: "Audi 1 (Dolby 7.1)",
        date: booking.date || "Today",
        time: booking.show?.time || "06:30 PM",
        format: booking.show?.format || "2D",
        seats: booking.selectedSeats,
        ticketAmount,
        convenienceFee,
        discountAmount,
        promoCode: booking.promoCode || "",
        totalAmount,
        paymentMethod: selectedMethod,
        paymentStatus: 'Completed',
        bookingStatus: 'Confirmed',
        bookingDate: new Date().toISOString()
      };

      storageService.createBooking(newBooking);
      showToast("Payment Successful! Booking Confirmed.", "success");

      // Redirect to confirmation screen after short visual success indication
      setTimeout(() => {
        resetBooking();
        navigate(`/booking-confirmation/${bookingId}`);
      }, 1200);

    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Seat Selection
        </button>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
          Checkout & Payment
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Review your cinema tickets and complete simulated payment to receive digital QR passes.
        </p>
      </div>

      {paymentSuccess ? (
        <div className="p-12 text-center bg-[#141624] border border-emerald-600/40 rounded-3xl space-y-4 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white font-['Outfit']">Payment Successful ✓</h2>
          <p className="text-sm text-gray-300">Generating your cinema admission ticket and QR pass...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Payment Methods & Details */}
          <div className="lg:col-span-7 bg-[#12141f] border border-gray-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
            <PaymentMethod
              selectedMethod={selectedMethod}
              onSelectMethod={setSelectedMethod}
              onPaymentSubmit={handlePaymentSubmit}
              isProcessing={isProcessing}
            />
          </div>

          {/* Right Column: Order Ticket Summary */}
          <div className="lg:col-span-5 bg-[#151724] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <h3 className="font-bold text-base text-white">Order Summary</h3>
              <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                {seatsCount} {seatsCount === 1 ? 'Seat' : 'Seats'}
              </span>
            </div>

            {/* Movie preview snippet */}
            <div className="flex gap-4 items-center">
              <img
                src={booking.movie?.poster}
                alt={booking.movie?.title}
                className="w-16 h-24 object-cover rounded-xl shadow-md shrink-0 border border-gray-700/60"
              />
              <div className="space-y-1 min-w-0">
                <h4 className="font-bold text-sm text-white truncate">{booking.movie?.title}</h4>
                <div className="text-xs text-gray-400 truncate">{booking.theatre?.name}</div>
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <span>{booking.date}</span>
                  <span>•</span>
                  <span className="text-white font-semibold">{booking.show?.time}</span>
                </div>
              </div>
            </div>

            {/* Seat Numbers list */}
            <div className="p-3 bg-[#1b1e2e] rounded-xl border border-gray-800 flex items-center justify-between text-xs">
              <span className="text-gray-400">Seats:</span>
              <span className="font-bold text-white tracking-wide">
                {booking.selectedSeats?.map(s => s.seatNumber).join(', ')}
              </span>
            </div>

            {/* Billing breakdown */}
            <div className="space-y-2.5 text-xs text-gray-300 pt-2 border-t border-gray-800">
              <div className="flex justify-between">
                <span>Tickets Subtotal</span>
                <span className="font-semibold text-white">₹{ticketAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience Fee (incl. GST)</span>
                <span className="font-semibold text-white">₹{convenienceFee}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount ({booking.promoCode})</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white uppercase tracking-wider">Total Amount</span>
                <span className="text-2xl font-black text-rose-500 font-['Outfit']">₹{totalAmount}</span>
              </div>
            </div>

            {/* User Details Notice */}
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[11px] text-gray-400 space-y-1">
              <div>Booking contact: <strong className="text-gray-200">{currentUser?.email || "guest@cinebook.com"}</strong></div>
              <div>Ticket QR will be sent via simulated SMS & email.</div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
