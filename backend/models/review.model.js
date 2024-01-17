const mongoose = require('mongoose');

// Review schema
const reviewSchema = new mongoose.Schema({
    user: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

// Create a model based on the review schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review