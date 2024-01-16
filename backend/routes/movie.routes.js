const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model'); 

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
    const { page = 1, limit = 3, search = '', year, sort, order = 'asc' } = req.query;
    
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


module.exports = router;
