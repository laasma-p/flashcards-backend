const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Flashcard = sequelize.define(
  "flashcard",
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  }
);

module.exports = Flashcard;
