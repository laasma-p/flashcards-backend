const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Deck = require("./Deck");

const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    xp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    streak: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  }
);

User.hasMany(Deck, { foreignKey: "userId", onDelete: "CASCADE" });
Deck.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
