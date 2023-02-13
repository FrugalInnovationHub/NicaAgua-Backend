var http = require('http');
const { program } = require('commander');
var cors = require('cors');
const express = require('express');
var corsOptions = {	origin: 'http://app.nicaagua.net' }

program.requiredOption('-p, --port <type>', 'Port where the server will run.');
program.parse(process.argv);
var app = express();
app.use(cors(corsOptions)); 
const bodyparser = require('body-parser');

var httpServer = http.createServer(app);
const httpPort = program.opts().port;
httpServer.listen(httpPort, () => console.log(`Express server is running at port ${httpPort} HTTPS`));

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
