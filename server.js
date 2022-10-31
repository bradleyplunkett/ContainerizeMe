const tracer = require('dd-trace').init({
  logInjection: true
});

module.exports = tracer;
const axios = require('axios');

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;

app.listen(parseInt(port, 10), () => {
  console.log(`Listening for requests on http://localhost:${port}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route