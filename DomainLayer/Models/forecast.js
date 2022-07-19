var moment = require('moment');
/**Represents a Forecast */
class Forecast {
  /**Constructor
   * @param {object} object - Object containing the properties of a Forecast
   */
  constructor(object) {
    var err = "";
    if (object.fiveDays == null) err += "Forecast for Five Days cannot be null.\n";
    if (object.fiveDaysMin == null) err += "Forecast for Five Days cannot be null.\n";
    if (object.fiveDaysMax == null) err += "Forecast for Five Days cannot be null.\n";
    if (object.tenDays == null) err += "Forecast for Ten Days cannot be null.\n";
    if (object.tenDaysMin == null) err += "Forecast for Ten Days cannot be null.\n";
    if (object.tenDaysMax == null) err += "Forecast for Ten Days cannot be null.\n";
    if (object.fifteenDays == null)
      err += "Forecast for Fifteen Days cannot be null.\n";
    if (object.fifteenDaysMin == null)
      err += "Forecast for Fifteen Days cannot be null.\n";
    if (object.fifteenDaysMax == null)
      err += "Forecast for Fifteen Days cannot be null.\n";
    if (err == "") {
      if (object.fiveDays > object.tenDays || object.tenDays > object.fifteenDays)
        err += "(10,15) days forecast cannot be greater than (5,10) days forecast.\n";

      if (
        object.fiveDaysMin > object.fiveDaysMax ||
        object.tenDaysMin > object.tenDaysMax ||
        object.fifteenDaysMin > object.fifteenDaysMax
      )
        err += "Min cannot be greater than Max.\n";
    }

    if (err != "") throw err;
    /**5 Days Precipitation Forecast */
    this.fiveDays = object.fiveDays;
    /**5 Days Max Preciptation based on previews data*/
    this.fiveDaysMin = object.fiveDaysMin;
    /**5 Days Min Preciptation based on previews data*/
    this.fiveDaysMax = object.fiveDaysMax;
    /**10 Days Precipitation Forecast */
    this.tenDays = object?.tenDays;
    /**10 Days Max Preciptation based on previews data*/
    this.tenDaysMin = object.tenDaysMin;
    /**10 Days Min Preciptation based on previews data*/
    this.tenDaysMax = object.tenDaysMax;
    /**15 Days Precipitation Forecast */
    this.fifteenDays = object?.fifteenDays;
    /**15 Days Max Preciptation based on previews data*/
    this.fifteenDaysMin = object.fifteenDaysMin;
    /**15 Days Min Preciptation based on previews data*/
    this.fifteenDaysMax = object.fifteenDaysMax;
    this.date = object.date ?? moment(new Date()).format('DD-MM-YYYY');
  }

  toJson() {
    return JSON.parse(JSON.stringify(this));
  }
}

module.exports = Forecast;
