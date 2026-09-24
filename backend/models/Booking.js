const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: String,
  userEmail: String,
  userMobile: String,
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  movieTitle: String,
  moviePoster: String,
  theatreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theatre',
    required: true,
  },
  theatreName: String,
  theatreLocation: String,
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: true,
  },
  screen: String,
  date: String,
  time: String,
  format: String,
  seats: [{
    seatNumber: String,
    tier: String, // Recliner, Gold, Silver
    price: Number,
  }],
  ticketAmount: {
    type: Number,
    required: true,
  },
  convenienceFee: {
    type: Number,
    default: 30,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  promoCode: String,
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'CineWallet'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Completed',
  },
  bookingStatus: {
    type: String,
    enum: ['Confirmed', 'Cancelled'],
    default: 'Confirmed',
  },
  qrCodeData: String,
  bookingDate: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
