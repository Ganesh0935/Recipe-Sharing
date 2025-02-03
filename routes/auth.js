const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

module.exports = router;

const auth = require("../middleware/auth");

// Get User Profile (Protected Route)
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

// Update User Profile (Protected Route)
router.put("/profile/update", auth, async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.json({ message: "Profile updated successfully!", user });

  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();
      res.json({ message: "User registered" });

    } catch (error) {
      res.status(500).json({ message: "Error registering user" });
    }
  }
);
