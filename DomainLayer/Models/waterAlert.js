const Region = require("./region");
const { Timestamp } = require('firebase-admin/firestore');
const { Base } = require("../Utils/propertyValidator");

class WaterAlert extends Base{

  constructor(object) {
    super();
    this.message = object.message;
    this.CheckNull("message");
    this.regions = object.regions?.map((a) => Region.RegionCode(a)) ?? null;
    if (this.regions == null || this.regions?.length < 1 || !Array.isArray(this.regions)){
      this.error.push("Regions must be an Array with at least one element.");
    }
    this.dateTime = object.dateTime ?? Date.now();
    this.CheckErrors();
  }
}

module.exports = { WaterAlert };
