var moment = require("moment");
const Notification = require("./notification");
const { Base } = require("../Utils/propertyValidator");
/**Represents a Short term Forecast */
class Forecast extends Base {
  /**Constructor
   * @param {object} object - Object containing the properties of a Forecast
   */
  constructor(object) {
    super();
    /**Community that this forecast s related to.
     * @defaultvalue '*'
     */
    this.community = object.community ?? "*";
    /**Forecast for five days
     * @summary the value will be rounded and cannot be smaller than zero
    */
    this.fiveDays = Math.round(object.fiveDays);
    this.CheckNumber({ nullable: false, min: 0, max: null }, "fiveDays");
    /**This is the minimum expected value for five days based on historical data.
    * @summary In the app this is the start of the shaded area.
    */
    this.fiveDaysMin = Math.round(object.fiveDaysMin);
    this.CheckNumber({ nullable: false, min: 0, max: null }, "fiveDaysMin");
    /**This is the maximum expected value for five days based on historical data.
    * @summary In the app this is the end of the shaded area.
    */
    this.fiveDaysMax = Math.round(object.fiveDaysMax);
    this.CheckNumber(
      { nullable: false, min: this.fiveDaysMin, max: null },
      "fiveDaysMax"
    );
    /**Forecast for ten days
    * @summary the value will be rounded and cannot be smaller than zero
   */
    this.tenDays = Math.round(object.tenDays);
    this.CheckNumber(
      { nullable: false, min: this.fiveDays, max: null },
      "tenDays"
    );
    /**This is the minimum expected value for ten days based on historical data.
    * @summary In the app this is the start of the shaded area.
    */
    this.tenDaysMin = Math.round(object.tenDaysMin);
    this.CheckNumber(
      { nullable: false, min: this.fiveDaysMin, max: null },
      "tenDaysMin"
    );
    /**This is the maximum expected value for ten days based on historical data.
    * @summary In the app this is the end of the shaded area.
    */
    this.tenDaysMax = Math.round(object.tenDaysMax);
    this.CheckNumber(
      { nullable: false, min: this.fiveDaysMax, max: null },
      "tenDaysMax"
    );
    /**Forecast for fifteen days
    * @summary the value will be rounded and cannot be smaller than zero
   */
    this.fifteenDays = Math.round(object.fifteenDays);
    this.CheckNumber(
      { nullable: false, min: this.tenDays, max: null },
      "fifteenDays"
    );
    /**This is the maximum expected value for fifteen days based on historical data.
    * @summary In the app this is the start of the shaded area.
    */
    this.fifteenDaysMax = Math.round(object.fifteenDaysMax);
    this.CheckNumber(
      { nullable: false, min: this.tenDaysMax, max: null },
      "fifteenDaysMax"
    );
    /**This is the minimum expected value for fifteen days based on historical data.
    * @summary In the app this is the start of the shaded area.
    */
    this.fifteenDaysMin = Math.round(object.fifteenDaysMin);
    this.CheckNumber(
      { nullable: false, min: this.tenDaysMin, max: null },
      "fifteenDaysMin"
    );
    /**Date this forecast was generated. */
    this.date =
      object.date != null
        ? moment(new Date(object.date)).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");
    this.CheckErrors();
  }

  // get isWet() { return this.fiveDays > this.fiveDaysMax || this.tenDays > this.tenDaysMax || this.fifteenDays > this.fifteenDaysMax }
  // get isDry() { return this.fiveDays < this.fiveDaysMin || this.tenDays < this.tenDaysMin || this.fifteenDays < this.fifteenDaysMin }
  get isWet() { return this.fiveDays > this.fiveDaysMax }
  get isDry() { return this.fiveDays < this.fiveDaysMin }
}

/**List of Forecasts */
class ShortTermForecasts extends Base {
  constructor(object) {
    super();
    var today = moment(new Date()).format("YYYY-MM-DD");
    /**Date this forecast was generated */
    this.date =
      object.date != null
        ? moment(new Date(object.date)).format("YYYY-MM-DD")
        : today;
    this._forecasts = object.forecasts.map((f) =>
      new Forecast(f)
    );
    /**List of Forecasts for this date*/
    this.CheckErrors();
  }

  get forecasts() { return this._forecasts.map(e => e.toJson()) };

  get dryRegions() {
    let set = new Set();
    for (let f of this._forecasts) 
      if (f.isDry) set.add(f.community);
    return Array.from(set);
  }

  get wetRegions() {
    let set = new Set();
    for (let f of this._forecasts) 
      if (f.isWet) set.add(f.community);
  
    return Array.from(set);
  }

  toJson() {
    return { date: this.date, forecasts: this.forecasts }
  }
}

/**Implementation of a LongTerm Forecast*/
class LongTermForecast extends Base {
  /**Constructor
   * @param {object} object - Object containing the properties of a Forecast
   */
  constructor(object) {
    super();
    if (object.dry + object.wet > 100) {
      this.error.push("Dry and Wet should sum less than 100.");
    } else {
      /**Community that this Longterm forecast is related to 
       * @defaultvalue '*'
      */
      this.community = object.community ?? "*";
      this.CheckNull("community");
      /**Probablility of a dryer season */
      this.dry = Math.round(object.dry);
      this.CheckNumber({ nullable: false, min: 0, max: 100 }, "dry");
      /**Probablility of a wetter season */
      this.wet = Math.round(object.wet);
      var maxWet = this.dry <= 100 ? 100 - this.dry : null;
      this.CheckNumber({ nullable: false, min: 0, max: maxWet }, "wet");
      /**Probablility of a normal season */
      this.normal = 100 - this.wet - this.dry;
      /**Starting Date for this Forecast */
      this.startDate =
        object.startDate != null
          ? moment(new Date(object.startDate)).format("YYYY-MM-DD")
          : null;
      this.CheckNull("startDate");
      /**End Date for this Forecast */
      this.endDate =
        object.endDate != null
          ? moment(new Date(object.endDate)).format("YYYY-MM-DD")
          : null;
      this.CheckNull("endDate");

      this.text = object.text ?? "No hay informaciones";
      if (new Date(this.startDate) > new Date(this.endDate))
        this.error.push("startDate must be smaller than endDate.");
    }
    this.CheckErrors();
  }
}

/**List of Long Term forecasts. */
class LongTermForecasts extends Base {
  constructor(object) {
    super();
    var today = moment(new Date()).format("YYYY-MM-DD");
    /**Date of creation of this set of Long Term Forecast */
    this.date =
      object.date != null
        ? moment(new Date(object.date)).format("YYYY-MM-DD")
        : today;

    /**Array of Forecasts */
    this.forecasts = object.forecasts.map((f) =>
      new LongTermForecast(f).toJson()
    );
    this.CheckErrors();
  }
}

module.exports = { Forecast, LongTermForecast, LongTermForecasts, ShortTermForecasts };
