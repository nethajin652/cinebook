const Movie = require('../models/Movie');
const Theatre = require('../models/Theatre');
const User = require('../models/User');
const Booking = require('../models/Booking');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const totalTheatres = await Theatre.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const revenueResult = await Booking.aggregate([
      { $match: { bookingStatus: 'Confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({
      totalMovies,
      totalTheatres,
      totalUsers,
      totalBookings,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};
