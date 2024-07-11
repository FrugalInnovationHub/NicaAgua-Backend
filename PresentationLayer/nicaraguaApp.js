var http = require('http');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const cors = require("cors");
app.use(cors())
app.use(bodyparser.json({ limit: '50mb' }))
app.use(bodyparser.urlencoded({ extended: false }));


require('./Controllers/versionInfoController')(app);
require('./Controllers/userController')(app);
require('./Controllers/regionsController')(app);
require('./Controllers/weatherController')(app);
require('./Controllers/waterAlertController')(app);
require('./Controllers/forecastController')(app);
require('./Controllers/longTermForecastController')(app);
require('./Controllers/weatherComparisonController.js')(app);
require('./Controllers/historicalController')(app);

module.exports =app;