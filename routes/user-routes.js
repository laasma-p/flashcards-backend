const express = require("express");
const User = require("../models/User");
const verifyToken = require("../middleware/jwt");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user, {
      attributes: [
        "id",
        "username",
        "firstName",
        "email",
        "xp",
        "streak",
        "profilePicture",
        "bio",
        "createdAt",
      ],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
