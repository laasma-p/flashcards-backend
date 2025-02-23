const express = require("express");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, firstName, password } = req.body;

    try {
      const formattedUsername = username.toLowerCase();

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username: formattedUsername }, { email }],
        },
      });

      if (existingUser) {
        return res.status(400).json({
          message:
            existingUser.username === formattedUsername
              ? "User with this username already exists"
              : "User with this email already exists",
        });
      }

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.create({
        username: formattedUsername,
        email,
        firstName,
        password: hashedPassword,
      });

      res
        .status(201)
        .json({ message: "Registration successful! You can now log in." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
