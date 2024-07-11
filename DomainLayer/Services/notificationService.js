var request = require("request");
require('dotenv').config();
var notificationToken = process.env.NOTIFICATION_TOKEN;

/**
 * This function is used to chunk the array into smaller arrays.
 * Ex: [1,2,3,4,5,6,7,8,9].chunk(3) => [[1,2,3],[4,5,6],[7,8,9]]
 */
Object.defineProperty(Array.prototype, "chunk", {
  value: function (chunkSize) {
    var R = [];
    for (var i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  },
});

/**
 * Generate notification based on the topics.
 * @param {String[]} topics Topics to which the notification should be sent.
 * @param {String} title Title of the notification.
 * @param {String} body Body of the notification.
 * @returns A JSON string which contains the notification structure defined by FCM, check documentation at https://firebase.google.com/docs/cloud-messaging/http-server-ref
 */
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
/**
 * Sends an HTTP Call to Firebase Notification API.
 * @param {Array<string>} topics Array containing chuncks of topics.
 * @param {string} title 
 * @param {string} body 
 */

function sendNotification(topics, title, body) {  
  topics.chunk(3).forEach(e => {
    const notification = generateNotification(e, title, body);
    request({
    method: "POST",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      "Authorization":notificationToken,
      "Content-Type": "application/json"
    },
    body:notification,
  },(error,response,body) => {
      if(error) console.log("Error: ",error);
      else console.log("StatusCode: ",response.statusCode);
  });
});
}

module.exports = sendNotification;
