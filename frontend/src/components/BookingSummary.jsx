import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, ArrowRight, X, ShieldCheck, Ticket } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useToast } from './Toast';

export const BookingSummary = ({ onProceed }) => {
  const { booking, getPriceBreakdown, applyPromo, removePromo } = useBooking();
  const { showToast } = useToast();
  const [promoInput, setPromoInput] = useState('');

  const { ticketAmount, convenienceFee, discountAmount, totalAmount, seatsCount } = getPriceBreakdown();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    try {
      const { discount } = applyPromo(promoInput);
      showToast(`Coupon applied! You saved ₹${discount}`, 'success');
      setPromoInput('');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleRemovePromo = () => {
    removePromo();
    showToast("Coupon removed.", 'info');
  };

  return (
    <div className="w-full bg-[#151724] border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-gray-800">
        <h4 className="font-bold text-base text-white flex items-center gap-2">
          <Ticket className="w-4 h-4 text-rose-500" />
          <span>Booking Summary</span>
        </h4>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-semibold border border-rose-500/20">
          {seatsCount} {seatsCount === 1 ? 'Seat' : 'Seats'} Selected
        </span>
      </div>

      {/* Selected Seats Chips */}
      {seatsCount > 0 ? (
        <div className="space-y-2">
          <div className="text-xs text-gray-400 font-medium">Selected Seats:</div>
          <div className="flex flex-wrap gap-2">
            {booking.selectedSeats.map(s => (
              <span
                key={s.seatNumber}
                className="px-3 py-1 rounded-lg bg-[#202336] border border-rose-500/40 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
              >
                <span>{s.seatNumber}</span>
                <span className="text-[10px] text-gray-400 font-normal">({s.tier} • ₹{s.price})</span>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-xs text-gray-400 italic py-2 text-center bg-[#191c2c] rounded-xl border border-dashed border-gray-800">
          Click on any available seat above to select
        </div>
      )}

      {/* Promo Code Box */}
      <div className="pt-2">
        {booking.promoCode ? (
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 text-xs font-medium">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-400" />
              <span>Coupon <strong>{booking.promoCode}</strong> applied (-₹{discountAmount})</span>
            </div>
            <button
              onClick={handleRemovePromo}
              className="p-1 text-emerald-400 hover:text-white transition-colors"
              title="Remove coupon"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Promo Code (e.g. FIRST20)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                disabled={seatsCount === 0}
                className="w-full bg-[#191c2c] border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={seatsCount === 0 || !promoInput.trim()}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white disabled:opacity-40 transition-all"
            >
              Apply
            </button>
          </form>
        )}
      </div>

      {/* Price Calculations */}
      <div className="pt-3 border-t border-gray-800/80 space-y-2.5 text-xs text-gray-300">
        <div className="flex justify-between">
          <span>Tickets Subtotal ({seatsCount} seats)</span>
          <span className="font-semibold text-white">₹{ticketAmount}</span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <span>Convenience Fee</span>
            <span className="text-[10px] text-gray-500">(incl. GST)</span>
          </span>
          <span className="font-semibold text-white">₹{convenienceFee}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-400 font-semibold">
            <span>Special Discount</span>
            <span>- ₹{discountAmount}</span>
          </div>
        )}
        <div className="pt-3 border-t border-gray-800 flex justify-between items-baseline">
          <span className="text-sm font-bold text-white uppercase tracking-wider">Total Payable</span>
          <span className="text-2xl font-black text-rose-500 font-['Outfit']">₹{totalAmount}</span>
        </div>
      </div>

      {/* Proceed CTA */}
      <button
        type="button"
        onClick={onProceed}
        disabled={seatsCount === 0}
        className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-lg shadow-rose-600/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 active:scale-95 transition-all"
      >
        <span>Proceed to Payment</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>100% Safe & Secure Booking Guarantee</span>
      </div>
    </div>
  );
};
