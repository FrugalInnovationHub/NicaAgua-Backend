var moment = require("moment");
const { Base } = require("../Utils/propertyValidator");
/**Represents a Short term Forecast */
class Forecast extends Base {
  /**Constructor
   * @param {object} object - Object containing the properties of a Forecast
   */
  constructor(object) {
    super();
    this.community = object.community ?? "*";
    this.fiveDays = Math.round(object.fiveDays);
    this.CheckNumber({ nullable: false, min: 0, max: null }, "fiveDays");
    this.fiveDaysMin = Math.round(object.fiveDaysMin);
    this.CheckNumber({ nullable: false, min: 0, max: null }, "fiveDaysMin");
    this.fiveDaysMax = Math.round(object.fiveDaysMax);
    this.CheckNumber(
      { nullable: false, min: this.fiveDaysMin, max: null },
      "fiveDaysMax"
    );
    this.tenDays = Math.round(object.tenDays);
    this.CheckNumber(
      { nullable: false, min: this.fiveDays, max: null },
      "tenDays"
    );
    this.tenDaysMin = Math.round(object.tenDaysMin);
    this.CheckNumber(
      { nullable: false, min: this.fiveDaysMin, max: null },
      "tenDaysMin"
    );
    this.tenDaysMax = Math.round(object.tenDaysMax);
    this.CheckNumber(
      { nullable: false, min: this.fiveDaysMax, max: null },
      "tenDaysMax"
    );
    this.fifteenDays = Math.round(object.fifteenDays);
    this.CheckNumber(
      { nullable: false, min: this.tenDays, max: null },
      "fifteenDays"
    );
    this.fifteenDaysMax = Math.round(object.fifteenDaysMax);
    this.CheckNumber(
      { nullable: false, min: this.tenDaysMax, max: null },
      "fifteenDaysMax"
    );
    this.fifteenDaysMin = Math.round(object.fifteenDaysMin);
    this.CheckNumber(
      { nullable: false, min: this.tenDaysMin, max: null },
      "fifteenDaysMin"
    );
    this.date =
      object.date != null
        ? moment(new Date(object.date)).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");
    this.CheckErrors();
  }
}
class ShortTermForecasts extends Base{
  constructor(object) {
    super();
    var today = moment(new Date()).format("YYYY-MM-DD");
    this.date =
      object.date != null
        ? moment(new Date(object.date)).format("YYYY-MM-DD")
        : today;
    this.forecasts = object.forecasts.map((f) =>
      new Forecast(f).toJson()
    );
    this.CheckErrors();
  }
}

class LongTermForecast extends Base {
  /**Constructor
   * @param {object} object - Object containing the properties of a Forecast
   */
  constructor(object) {
    super();
    if (object.dry + object.wet > 100) {
      this.error.push("Dry and Wet should sum less than 100.");
    } else {
      this.community = object.community ?? "*";
      this.CheckNull("community");
      this.dry = Math.round(object.dry);
      this.CheckNumber({ nullable: false, min: 0, max: 100 }, "dry");
      this.wet = Math.round(object.wet);
      var maxWet = this.dry <= 100 ? 100 - this.dry : null;
      this.CheckNumber({ nullable: false, min: 0, max: maxWet }, "wet");
      this.normal = 100 - this.wet - this.dry;
      this.startDate =
        object.startDate != null
          ? moment(new Date(object.startDate)).format("YYYY-MM-DD")
          : null;
      this.CheckNull("startDate");
      this.endDate =
        object.endDate != null
          ? moment(new Date(object.endDate)).format("YYYY-MM-DD")
          : null;
      this.CheckNull("endDate");
      if (new Date(this.startDate) > new Date(this.endDate))
        this.error.push("startDate must be smaller than endDate.");
    }
    this.CheckErrors();
  }
}

class LongTermForecasts extends Base {
  constructor(object) {
    super();
    var today = moment(new Date()).format("YYYY-MM-DD");
    this.date =
      object.date != null
        ? moment(new Date(object.date)).format("YYYY-MM-DD")
        : today;
    this.forecasts = object.forecasts.map((f) =>
      new LongTermForecast(f).toJson()
    );
    this.CheckErrors();
  }
}

module.exports = { Forecast, LongTermForecast, LongTermForecasts,ShortTermForecasts };
