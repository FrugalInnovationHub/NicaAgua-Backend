const functions = require("firebase-functions");
const app = require("./PresentationLayer/nicaraguaApp");
require('dotenv').config();

if(process.env.ENVIRONMENT === 'staging')
    exports.staging = functions.https.onRequest(app);

if(process.env.ENVIRONMENT === 'production')
    exports.api = functions.https.onRequest(app);

