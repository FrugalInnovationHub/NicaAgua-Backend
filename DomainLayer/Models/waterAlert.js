const { Base } = require("../Utils/propertyValidator");

/** This class is the implementation of a Weather Alert. */
class WaterAlert extends Base{
  constructor(object) {
    super();
    this.CheckNullObject(object);
    this.CheckErrors();
    /**Message of Water Alert */
    this.message = object.message;
    this.CheckNull("message");
    /**Regions that this Water Alert applies */
    this.regions = object.regions?.map((a) => a) ?? null;
    if (this.regions == null || this.regions?.length < 1 || !Array.isArray(this.regions)){
      this.error.push("Regions must be an Array with at least one element.");
    }
    /**Time of creation of this Water Alert */
    this.dateTime = object.dateTime ?? Date.now();
    this.priority = object.priority ?? "Low";
    this.CheckErrors();
  }
}

module.exports = { WaterAlert };
