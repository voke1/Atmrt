const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const orderRoutes =  require("./routes/order_route");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger("dev"));


app.use("/order/:orderID/price", orderRoutes);

module.exports = app;








