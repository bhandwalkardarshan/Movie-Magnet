const mongoose = require('mongoose');

//  Movie schema
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    director: { type: String, required: true },
    cast: [{ type: String }],
    synopsis: { type: String },
    posterURL: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

// Create a model based on the schema
const Movie = mongoose.model('Movie', movieSchema);

// Export the Movie model
module.exports = Movie;
