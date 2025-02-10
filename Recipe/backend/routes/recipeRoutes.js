const express = require('express');
const { uploadRecipe, getRecipes } = require('../controllers/recipeController');

const router = express.Router();

router.post('/upload', uploadRecipe);
router.get('/all', getRecipes);

module.exports = router;
