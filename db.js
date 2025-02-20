require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log(
      "Connection has been successfully established and models have successfully been synchronized."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
