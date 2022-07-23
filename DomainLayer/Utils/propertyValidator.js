class Config {
  constructor() {
    /**
     * Boolean Number can be null or not
     */
    this.nullable = false;
    /**Max value this number can be */
    this.max = null;
    /**Min value this number can be */
    this.min = null;
  }
}

class Base {
  constructor() {
    this.error = [];
  }
  /**
   *
   * @param {Config} config
   * @param {*} property
   */
  CheckNumber(config, property) {
    var value = this[property];
    if (!config.nullable && !value)
      this.error.push(`${property} cannot be null`);
    if (typeof value != "number")
      this.error.push(`${property} must be a valid number`);
    if (config.max != undefined && value > config.max)
      this.error.push(`${property} must smaller then ${config.max}`);
    if (config.min != undefined && value < config.min)
      this.error.push(`${property} must greater then ${config.min}`);
  }

  CheckNull(property){
    if(this[property] == null)
      this.error.push(`${property} cannot be null`);
  }


  /**
   * Throw exception in case of malformed object
   */
  CheckErrors() {
    if (this.error.length != 0) {
      var error = this.error.join('\n');
      throw error;
    }
  }

  /**
   *
   * @returns Json formated object
   */
  toJson() {
    delete this.error;
    return JSON.parse(JSON.stringify(this));
  }
}

class Child extends Base {
  constructor(object) {
    super();
    this.number = object?.number;
    this.CheckNumber({ nullable: false }, "number");
    this.CheckErrors();
  }
}

module.exports = { Base, Child };
