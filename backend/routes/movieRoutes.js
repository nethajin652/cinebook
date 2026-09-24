const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', authenticateUser, authorizeAdmin, movieController.createMovie);
router.put('/:id', authenticateUser, authorizeAdmin, movieController.updateMovie);
router.delete('/:id', authenticateUser, authorizeAdmin, movieController.deleteMovie);

module.exports = router;
