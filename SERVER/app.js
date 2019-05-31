const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");


const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
    res.status(200).json({
        message: "Welcome to Automart, an online marketplace for automobile"
    });
})

module.exports = app;