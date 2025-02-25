require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const deckRoutes = require("./routes/deck-routes");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/deck", deckRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
