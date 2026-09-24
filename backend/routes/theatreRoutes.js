const express = require('express');
const router = express.Router();
const theatreController = require('../controllers/theatreController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/', theatreController.getTheatresByLocation);
router.get('/shows/:movieId', theatreController.getShowsByMovieAndDate);
router.post('/', authenticateUser, authorizeAdmin, theatreController.createTheatre);
router.post('/shows', authenticateUser, authorizeAdmin, theatreController.createShow);

module.exports = router;
