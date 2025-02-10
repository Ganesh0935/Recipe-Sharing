const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipeTitle: { type: String, required: true },
    description: { type: String, required: true },
    instructions: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
}, { timestamps: true });

module.exports = mongoose.model("Recipe", RecipeSchema);
