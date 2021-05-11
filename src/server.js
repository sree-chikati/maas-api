require("dotenv/config");
const express = require("express");
const bodyParser = require('body-parser')

// App Setup
const app = express();

// All app.use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Set up database
require("./data/maas-db.js");

// Routes
const router = require("./controllers/index.js");
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Maas API listening on port ${process.env.PORT}`);
});

module.exports = app;