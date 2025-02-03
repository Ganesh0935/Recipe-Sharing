const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth"); // Import the auth middleware

// Create a new recipe (Protected Route)
router.post("/add", auth, async (req, res) => {
  const { title, ingredients, instructions } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      user: req.user.id // Get user ID from token
    });

    await newRecipe.save();
    res.json({ message: "Recipe added successfully!", recipe: newRecipe });

  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ message: "Error adding recipe" });
  }
});

// Get all recipes (Public Route)
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
});

module.exports = router;
// Update Recipe (Protected Route)
router.put("/update/:id", auth, async (req, res) => {
  const { title, ingredients, instructions } = req.body;

  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Ensure the logged-in user is the owner
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;

    await recipe.save();
    res.json({ message: "Recipe updated successfully!", recipe });

  } catch (error) {
    res.status(500).json({ message: "Error updating recipe" });
  }
});
// Delete Recipe (Protected Route)
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Ensure the logged-in user is the owner
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await recipe.deleteOne();
    res.json({ message: "Recipe deleted successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe" });
  }
});
