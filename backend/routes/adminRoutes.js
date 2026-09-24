const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/stats', authenticateUser, authorizeAdmin, adminController.getDashboardStats);
router.get('/bookings', authenticateUser, authorizeAdmin, adminController.getAllBookings);

module.exports = router;
