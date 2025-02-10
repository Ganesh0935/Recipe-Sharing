const Recipe = require('../models/Recipe');


exports.uploadRecipe = async (req, res) => {
    try {
        const { userId, recipeTitle, description, instructions, ingredients } = req.body;
        console.log(req.body);
        if (!userId || !recipeTitle || !description || !instructions || !ingredients) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRecipe = new Recipe({ userId, recipeTitle, description, instructions, ingredients });
        await newRecipe.save();

        res.status(201).json({ message: "Recipe uploaded successfully", recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


exports.getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('userId', 'username email'); // Fetch user details
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
