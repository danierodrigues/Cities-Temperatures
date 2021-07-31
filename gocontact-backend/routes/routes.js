const express = require('express');
const routes = express.Router();
const {addCity, getCities} = require("../controllers/city");


//Cities
routes.get("/city", getCities);
routes.post("/city",addCity);

routes.get("/", (req, res) => {
    res.send('Root element.');
  });

module.exports = routes;