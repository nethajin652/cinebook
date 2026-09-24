import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storage';
import { CITIES, OFFERS } from '../data/mockMovies';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [selectedCity, setSelectedCityState] = useState(() => storageService.getSelectedCity());

  const [booking, setBooking] = useState({
    movie: null,
    theatre: null,
    show: null,
    date: null,
    selectedSeats: [], // [{ seatNumber: "C4", tier: "Gold", price: 180 }]
    promoCode: null,
    discountAmount: 0,
    convenienceFee: 30,
  });

  const setSelectedCity = (city) => {
    storageService.setSelectedCity(city);
    setSelectedCityState(city);
  };

  const startBooking = (movie) => {
    setBooking(prev => ({
      ...prev,
      movie,
      selectedSeats: [],
      promoCode: null,
      discountAmount: 0
    }));
  };

  const selectShowtime = ({ movie, theatre, show, date }) => {
    setBooking(prev => ({
      ...prev,
      movie: movie || prev.movie,
      theatre,
      show,
      date,
      selectedSeats: [],
      promoCode: null,
      discountAmount: 0
    }));
  };

  const toggleSeat = (seatNumber, tier, price) => {
    setBooking(prev => {
      const exists = prev.selectedSeats.find(s => s.seatNumber === seatNumber);
      let updatedSeats;
      if (exists) {
        updatedSeats = prev.selectedSeats.filter(s => s.seatNumber !== seatNumber);
      } else {
        if (prev.selectedSeats.length >= 8) {
          throw new Error("You can select a maximum of 8 seats per transaction.");
        }
        updatedSeats = [...prev.selectedSeats, { seatNumber, tier, price }];
      }

      // Re-evaluate discount if promo code was active
      let discount = prev.discountAmount;
      if (prev.promoCode) {
        const promo = OFFERS.find(o => o.code === prev.promoCode);
        if (promo) {
          const ticketTotal = updatedSeats.reduce((sum, s) => sum + s.price, 0);
          if (promo.flatDiscount) {
            discount = ticketTotal >= 300 ? promo.flatDiscount : 0;
          } else if (promo.discountPercent) {
            const calculated = Math.round((ticketTotal * promo.discountPercent) / 100);
            discount = Math.min(calculated, promo.maxDiscount || calculated);
          }
        }
      }

      return {
        ...prev,
        selectedSeats: updatedSeats,
        discountAmount: discount
      };
    });
  };

  const clearSeats = () => {
    setBooking(prev => ({
      ...prev,
      selectedSeats: [],
      promoCode: null,
      discountAmount: 0
    }));
  };

  const applyPromo = (codeStr) => {
    const code = (codeStr || '').trim().toUpperCase();
    const promo = OFFERS.find(o => o.code.toUpperCase() === code);
    if (!promo) {
      throw new Error(`Promo code "${codeStr}" is invalid.`);
    }

    const ticketTotal = booking.selectedSeats.reduce((sum, s) => sum + s.price, 0);
    if (ticketTotal === 0) {
      throw new Error("Please select seats first to apply a coupon.");
    }

    let discount = 0;
    if (promo.flatDiscount) {
      if (ticketTotal < 300) {
        throw new Error("Minimum ticket value of ₹300 required for this offer.");
      }
      discount = promo.flatDiscount;
    } else if (promo.discountPercent) {
      const calculated = Math.round((ticketTotal * promo.discountPercent) / 100);
      discount = Math.min(calculated, promo.maxDiscount || calculated);
    }

    setBooking(prev => ({
      ...prev,
      promoCode: promo.code,
      discountAmount: discount
    }));

    return { discount, promo };
  };

  const removePromo = () => {
    setBooking(prev => ({
      ...prev,
      promoCode: null,
      discountAmount: 0
    }));
  };

  const getPriceBreakdown = () => {
    const ticketAmount = booking.selectedSeats.reduce((sum, s) => sum + s.price, 0);
    const convenienceFee = booking.selectedSeats.length > 0 ? booking.convenienceFee : 0;
    const discount = booking.discountAmount || 0;
    const totalAmount = Math.max(0, ticketAmount + convenienceFee - discount);

    return {
      ticketAmount,
      convenienceFee,
      discountAmount: discount,
      totalAmount,
      seatsCount: booking.selectedSeats.length
    };
  };

  const resetBooking = () => {
    setBooking({
      movie: null,
      theatre: null,
      show: null,
      date: null,
      selectedSeats: [],
      promoCode: null,
      discountAmount: 0,
      convenienceFee: 30,
    });
  };

  return (
    <BookingContext.Provider value={{
      selectedCity,
      setSelectedCity,
      booking,
      setBooking,
      startBooking,
      selectShowtime,
      toggleSeat,
      clearSeats,
      applyPromo,
      removePromo,
      getPriceBreakdown,
      resetBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
