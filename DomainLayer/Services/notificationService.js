var request = require('request');

var options = {
  'method': 'POST',
  'url': 'https://fcm.googleapis.com/fcm/send',
  'headers': {
    'Authorization': 'Bearer AAAAuJ9ccbc:APA91bG90TxQneaATwKRQnhI3mZdev96dOIysvgow4z16vXUnpjIpku45gce8GKPGCW4NgNasO_nG2DAjIDdUpJ2kj0KwUXCtqt7KYyNa_aiqnEvTY3uRiChgYVXfd3agyPw5Gd2Tibs',
    'Content-Type': 'application/json'
  },
  body: null
};

function sendNotification(topics,title,body){
  var conditions = topics.map((a)=> `'${a.replace(" ","_")}' in topics`); //Replace empty spaces with underscore.
  var c = conditions.join(" || ");
    var notification = {
        "condition": c,
        "notification": {
          "title": `${title}`,
          "body": `${body}`
        }
      }
    var sender = {...options,body:JSON.stringify(notification)}
    request(sender, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
      });
}

module.exports = sendNotification;