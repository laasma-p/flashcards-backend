const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Flashcard = require("./Flashcard");

const Deck = sequelize.define("deck", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Deck.hasMany(Flashcard, { foreignKey: "deckId", onDelete: "CASCADE" });
Flashcard.belongsTo(Deck, { foreignKey: "deckId" });

module.exports = Deck;
