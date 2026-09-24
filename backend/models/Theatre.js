const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String, // City e.g. "Chennai", "Bengaluru"
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  amenities: [{
    type: String, // "M-Ticket", "Food & Beverage", "Recliner Seats", "Parking"
  }],
  screens: [{
    screenNumber: Number,
    name: String,
    format: String, // "IMAX", "Dolby Atmos", "4DX"
    totalSeats: Number,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Theatre', theatreSchema);
