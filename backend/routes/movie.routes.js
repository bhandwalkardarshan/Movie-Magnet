const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model'); 
const User = require('../models/user.model'); 
const verifyToken = require('../middleware/verifyToken')

// CREATE
router.post('/movies', async (req, res) => {
    const movie = new Movie(req.body);
    try {
        await movie.save();
        res.status(201).send(movie);
    } catch (e) {
        res.status(400).send(e);
    }
});

// READ
// /movies?search=  ->  To search movie with title or genre
// /movies?sort=title&order=desc  -> to sort by title in descending order
// /movies?sort=year&order=desc  -> to sort by year in descending order
router.get('/movies', async (req, res) => {
    const { page = 1, limit , search = '', year, sort, order = 'asc' } = req.query;
    
    let query = { 
        $or: [
            { title: new RegExp(search, 'i') },
            { genre: new RegExp(search, 'i') }
        ]
    };

    let sortQuery = {};

    if (year) {
        query.year = year;
    }

    if (sort === 'year') {
        sortQuery.year = order === 'desc' ? -1 : 1;
    } else if (sort === 'title') {
        sortQuery.title = order === 'desc' ? -1 : 1;
    }

    try {
        const movies = await Movie.find(query)
            .sort(sortQuery)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        res.status(200).send(movies);
    } catch (e) {
        res.status(500).send({ message: 'An error occurred while retrieving the movies. Please try again later.' });
    }
});

// READ a specific movie by ID
router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found. Please check the ID and try again.' });
        }
        res.send(movie);
    } catch (e) {
        if (e instanceof mongoose.Error.CastError) {
            res.status(400).send({ message: 'Invalid ID format. Please check the ID and try again.' });
        } else {
            res.status(500).send({ message: 'An error occurred while retrieving the movie. Please try again later.' });
        }
    }
});


// UPDATE
router.patch('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found. Please check the ID and try again.' });
        }
        res.send(movie);
    } catch (e) {
        if (e instanceof mongoose.Error.CastError) {
            res.status(400).send({ message: 'Invalid ID format. Please check the ID and try again.' });
        } else {
            res.status(500).send({ message: 'An error occurred while updating the movie. Please try again later.' });
        }
    }
});

// DELETE
router.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found. Please check the ID and try again.' });
        }
        res.send(movie);
    } catch (e) {
        if (e instanceof mongoose.Error.CastError) {
            res.status(400).send({ message: 'Invalid ID format. Please check the ID and try again.' });
        } else {
            res.status(500).send({ message: 'An error occurred while deleting the movie. Please try again later.' });
        }
    }
});

// to get movies from watchlist
router.put('/users/watchlist/:movieId', verifyToken, async (req, res) => {
    const userId = req.user.userId; // Extract userId from the request object
    const { movieId } = req.params;
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({message:'User not found'});
    }
  
    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
      res.send({"user":user,message:"Movie Added to Watchlist "});
    } else {
      res.status(409).send({message:'Movie is already in the watchlist'});
    }
  });
  
//   to get movies in watchlist 
router.get('/users/watchlist',verifyToken, async (req, res) => {
    const userId = req.user.userId; 
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    const movies = await Movie.find({
      '_id': { $in: user.watchlist }
    });
  
    res.send(movies);
  });

//   to delete movie from watchlist
router.delete('/users/watchlist/:movieId', verifyToken, async (req, res) => {
    const { movieId } = req.params;
    const userId = req.user.userId; 
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    const index = user.watchlist.indexOf(movieId);
    if (index !== -1) {
        user.watchlist.splice(index, 1);
        await user.save();
        res.send({"user":user, message:"Movie removed from watchlist"});
    } else {
        res.status(409).send({message:'Movie is not in the watchlist'});
    }
  });
  
  

module.exports = router;
