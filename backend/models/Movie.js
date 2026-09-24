const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  language: [{
    type: String,
  }],
  genre: [{
    type: String,
  }],
  duration: {
    type: String, // e.g. "2h 45m"
    required: true,
  },
  rating: {
    type: Number,
    default: 8.5,
  },
  votesCount: {
    type: String,
    default: "12.4K",
  },
  releaseDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cast: [{
    name: String,
    role: String,
    image: String,
  }],
  trailer: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['now_showing', 'upcoming'],
    default: 'now_showing',
  },
  formats: [{
    type: String, // "2D", "3D", "IMAX 2D", "4DX"
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Movie', movieSchema);
