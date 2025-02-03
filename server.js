const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Allows JSON body parsing
app.use(cors());

// Import Routes
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB Connection Error:", err));
