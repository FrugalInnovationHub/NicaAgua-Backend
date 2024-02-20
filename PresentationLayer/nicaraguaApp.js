var http = require('http');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json({ limit: '50mb' }))
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/',(req,res) => {
	res.send("Welcome to Nicaragua Project!")
})

require('./Controllers/userController')(app);
require('./Controllers/regionsController')(app);
require('./Controllers/weatherController')(app);
require('./Controllers/waterAlertController')(app);
require('./Controllers/forecastController')(app);
require('./Controllers/longTermForecastController')(app);

module.exports =app;