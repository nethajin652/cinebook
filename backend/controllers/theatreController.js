const Theatre = require('../models/Theatre');
const Show = require('../models/Show');

exports.getTheatresByLocation = async (req, res) => {
  try {
    const { location } = req.query;
    const query = location ? { location: new RegExp(location, 'i') } : {};
    const theatres = await Theatre.find(query);
    res.json(theatres);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching theatres', error: error.message });
  }
};

exports.getShowsByMovieAndDate = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { date, location } = req.query;

    const query = { movieId };
    if (date) query.date = date;

    const shows = await Show.find(query).populate('theatreId');
    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shows', error: error.message });
  }
};

exports.createTheatre = async (req, res) => {
  try {
    const theatre = new Theatre(req.body);
    await theatre.save();
    res.status(201).json({ message: 'Theatre created', theatre });
  } catch (error) {
    res.status(400).json({ message: 'Error creating theatre', error: error.message });
  }
};

exports.createShow = async (req, res) => {
  try {
    const show = new Show(req.body);
    await show.save();
    res.status(201).json({ message: 'Show created', show });
  } catch (error) {
    res.status(400).json({ message: 'Error creating show', error: error.message });
  }
};
