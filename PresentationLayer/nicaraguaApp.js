var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('./PresentationLayer/Local.key', 'utf8');
var certificate = fs.readFileSync('./PresentationLayer/Local.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var WeatherService = require('../DomainLayer/Services/weatherService');
var RegionService = require('../DomainLayer/Services/regionService');
const express = require('express');
var cors = require('cors');
var app = express();
const bodyparser = require('body-parser');
const PermissionMiddleWare = require('./permissionMiddleWare');
const JwtIssuer = require('./jwtIssuer');

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
const httpsPort = 3000;
// httpServer.listen(81, () => console.log('Express server is running at port #80 HTTP'));
httpsServer.listen(httpsPort, () => console.log(`Express server is running at port ${httpsPort} HTTPS`));



app.use(cors());
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
