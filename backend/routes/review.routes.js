const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model'); 
const Review = require('../models/review.model'); 
const verifyToken = require('../middleware/verifyToken')

// POST route to create a review
router.post('/movies/:id/reviews', verifyToken, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send({ error: 'Movie not found' });
        }

        const review = new Review({
            ...req.body,
            user: req.user.userId
        });

        await review.save();
        movie.reviews.push(review);
        await movie.save();

        res.status(201).send(review);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// GET route to fetch reviews of a movie
router.get('/movies/:id/reviews', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('reviews');
        if (!movie) {
            return res.status(404).send({ error: 'Movie not found' });
        }

        res.send(movie.reviews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// DELETE route to delete a review
router.delete('/reviews/:id', verifyToken, async (req, res) => {
    try {
        const review = await Review.findOne({ _id: req.params.id, user: req.user.userId }); 
        if (!review) {
            return res.status(404).send({ error: 'Review not found' });
        }

        // Find the movie and remove the review's ID from the reviews array
        const movie = await Movie.findOne({ reviews: req.params.id });
        if (movie) {
            movie.reviews.pull(req.params.id);
            await movie.save();
        }

        await Review.findByIdAndDelete(req.params.id );
        res.send(review);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


module.exports = router;
