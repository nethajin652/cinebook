const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, bookingController.createBooking);
router.get('/my-bookings', authenticateUser, bookingController.getUserBookings);
router.get('/:bookingId', authenticateUser, bookingController.getBookingById);
router.post('/:bookingId/cancel', authenticateUser, bookingController.cancelBooking);

module.exports = router;
