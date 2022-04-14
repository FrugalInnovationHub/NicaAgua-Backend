const Region = require("./region");
const { Timestamp } = require('firebase-admin/firestore');

class WaterAlert {

  constructor(object) {
    if (!object) throw "Object provided cannot be null.";
    if (object.message == null) throw "Message cannot be null";
    if (!Array.isArray(object.regions)) throw "Regions must be an Array";
    if (object.regions.length < 1) throw "Regions must contain at least one element";

    this.message = object.message;
    this.regions = object.regions.map((a) => Region.RegionCode(a));
    this.dateTime = object.dateTime ?? Date.now();
  }

  toJson() {
    var json = JSON.parse(JSON.stringify(this));
    return json;
  }
}

module.exports = { WaterAlert };
