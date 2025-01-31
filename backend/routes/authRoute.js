const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
require("../config/passport");

const router = express.Router();

// Google Authentication Route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const token = generateToken(req.user);
    // console.log(token);
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access
      secure: false, // Set to true in production (HTTPS required)
    });

    res.redirect("http://localhost:5173/profile");
  }
);

// Get User Profile
router.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Logout Route
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  req.logout(() => {
    res.redirect("http://localhost:5173");
  });
});

module.exports = router;
