const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String], // Array of strings
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Automatically add the current date
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
