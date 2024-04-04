var request = require("request");
require('dotenv').config();
var notificationToken = process.env.NOTIFICATION_TOKEN;

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
  var notifications = topics.chunk(3).map(e =>request({
    method: "POST",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      "Authorization":notificationToken,
      "Content-Type": "application/json"
    },
    body:generateNotification(e,title,body)},(a) => {console.log(a)}));
  console.log(notifications);
}

module.exports = sendNotification;
