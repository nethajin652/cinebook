const Booking = require('../models/Booking');
const Show = require('../models/Show');

exports.createBooking = async (req, res) => {
  try {
    const {
      movieId,
      movieTitle,
      moviePoster,
      theatreId,
      theatreName,
      theatreLocation,
      showId,
      screen,
      date,
      time,
      format,
      seats,
      ticketAmount,
      convenienceFee,
      discountAmount,
      promoCode,
      totalAmount,
      paymentMethod
    } = req.body;

    const bookingId = `CB-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const booking = new Booking({
      bookingId,
      userId: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      movieId,
      movieTitle,
      moviePoster,
      theatreId,
      theatreName,
      theatreLocation,
      showId,
      screen,
      date,
      time,
      format,
      seats,
      ticketAmount,
      convenienceFee: convenienceFee || 30,
      discountAmount: discountAmount || 0,
      promoCode,
      totalAmount,
      paymentMethod,
      paymentStatus: 'Completed',
      bookingStatus: 'Confirmed',
      qrCodeData: `CINEBOOK-${bookingId}`
    });

    await booking.save();

    // Mark seats as booked on the show
    if (showId && seats) {
      const seatNumbers = seats.map(s => s.seatNumber);
      await Show.findByIdAndUpdate(showId, {
        $addToSet: { bookedSeats: { $each: seatNumbers } }
      });
    }

    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error processing booking', error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.bookingStatus = 'Cancelled';
    booking.paymentStatus = 'Refunded';
    await booking.save();

    // Release seats
    if (booking.showId && booking.seats) {
      const seatNumbers = booking.seats.map(s => s.seatNumber);
      await Show.findByIdAndUpdate(booking.showId, {
        $pull: { bookedSeats: { $in: seatNumbers } }
      });
    }

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};
