const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const router = require("./router");

dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

const db = require("./models");
db.sequelize.sync();

// Routes
app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
