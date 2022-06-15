class Base {
  constructor() {
    this.error = [];
  }

  CheckNumber(config, property) {
    var value = this[property];
    if (!config.nullable && !value) this.error.push(`${property} cannot be null`);
    if (typeof value != "number")
      this.error.push(`${property} must be a valid number`);
    if (config.max != undefined && value > config.max)
        this.error.push(`${property} must smaller then ${config.max}`);
    if (config.min != undefined && value < config.min)
        this.error.push(`${property} must greater then ${config.min}`);
  };
}

class Child extends Base{
    constructor(object){
        super();
        this.number = object?.number;
        this.CheckNumber({"nullable":false},"number");
    }
}

module.exports = {Base,Child};
