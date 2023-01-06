require("dotenv").config();

module.exports = {
  host: "localhost",
  username: process.env.USER,
  password: process.env.PASSWORD,
  db: process.env.DATABASE,
  dialect: "postgres",
};
