const WeatherRepository = require("../../DataLayer/weatherRepository");
const {
  WeatherLog,
  groupByDateTime,
} = require("../Models/weatherLog");
class WeatherService {
  constructor() {
    this.weatherRepository = new WeatherRepository();
  }

  /**
   * Add WeatherLog to the Reposiotory.
   * @param {*} object An object that implements the class WeatherLog.
   * @returns A promise that will be resolved if the operation is successfull.
   */
  addWeatherLog(object) {
    return new Promise((resolve, reject) => {
      var newLog = new WeatherLog(object).toJson();
      this.weatherRepository
        .add(newLog)
        .then(() => resolve())
        .catch(() => reject());
    });
  }

  /**
   * Add a list of WeatherLog to the Reposiotory.
   * @param {*} object A list of objects that implements the class WeatherLog.
   * @returns A promise that will be resolved if the operation is successfull.
   */
  addWeatherLogs(object) {
    return new Promise((resolve, reject) => {
      var newLog = object.map((o) => new WeatherLog(o).toJson());
      var logs = groupByDateTime(newLog);
      this.weatherRepository
        .addSet(logs)
        .then(() => resolve())
        .catch(() => reject());
    });
  }

  /**
   * Fetches a list of WeatherLogs that match the query passed as parameter.
   * @param {*} object Object containing query.
   * @returns A promise that when resolved will return an array of WeatherLogs
   */
  getWeatherLogList = (object) => this.weatherRepository.getWeatherLogs(object);

  /**
   * Fetches single WeatherLog with a matching Id.
   * @param {*} id Id of object to be fetched.
   * @returns A promise that when resolved will return an object that implements a WeatherLog
   */
  getWeatherLog = (id) => this.weatherRepository.getById(id);
}

module.exports = WeatherService;
