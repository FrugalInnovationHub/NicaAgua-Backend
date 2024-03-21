const functions = require("firebase-functions");
const app = require("./PresentationLayer/nicaraguaApp")

exports.api = functions.https.onRequest(app);
