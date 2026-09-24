const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  theatreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theatre',
    required: true,
  },
  screen: {
    type: String,
    default: 'Screen 1',
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },
  time: {
    type: String, // e.g. "10:00 AM"
    required: true,
  },
  format: {
    type: String, // "2D", "3D", "IMAX 2D"
    default: "2D",
  },
  language: {
    type: String,
    default: "Tamil",
  },
  pricing: {
    recliner: { type: Number, default: 250 },
    gold: { type: Number, default: 180 },
    silver: { type: Number, default: 120 },
  },
  bookedSeats: [{
    type: String, // e.g. "A3", "C4"
  }],
  status: {
    type: String,
    enum: ['available', 'filling_fast', 'almost_full', 'sold_out'],
    default: 'available',
  }
});

module.exports = mongoose.model('Show', showSchema);
