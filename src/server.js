require("dotenv/config");
const express = require("express");
const bodyParser = require('body-parser')

// App Setup
const app = express();

// All app.use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    const now = new Date().toString()
    console.log(`Requested ${req.url} at ${now}`)
    next()
})

// Set up database
require("./data/maas-db.js");

// Routes
const router = require("./controllers/index.js");
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Maas API listening on port localhost:3000!');
})

module.exports = app;