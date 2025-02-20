const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Deck = sequelize.define("deck", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Deck;
