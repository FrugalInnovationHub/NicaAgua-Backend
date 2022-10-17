var request = require("request");

var options = {
  method: "POST",
  url: "https://fcm.googleapis.com/fcm/send",
  headers: {
    Authorization:
      "Bearer AAAAuJ9ccbc:APA91bG90TxQneaATwKRQnhI3mZdev96dOIysvgow4z16vXUnpjIpku45gce8GKPGCW4NgNasO_nG2DAjIDdUpJ2kj0KwUXCtqt7KYyNa_aiqnEvTY3uRiChgYVXfd3agyPw5Gd2Tibs",
    "Content-Type": "application/json",
  },
  body: null,
};

Object.defineProperty(Array.prototype, "chunk", {
  value: function (chunkSize) {
    var R = [];
    for (var i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  },
});



function generateNotification(topics, title, body) {
  var conditions = topics.map((a) => `'${a.replace(" ", "_")}' in topics`); //Replace empty spaces with underscore.
  var c = conditions.join(" || ");
  var notification = {
    condition: c,
    notification: {
      title: `${title}`,
      body: `${body}`,
    },
  };
  return JSON.stringify(notification);
}

function sendNotification(topics, title, body) {  
  var notifications = topics.chunk(3).map(e =>request({...options,body:generateNotification(e,title,body)},(a) => {console.log(a)}));
  console.log(notifications);
}



module.exports = sendNotification;
