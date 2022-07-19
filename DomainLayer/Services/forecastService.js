const ForeCastRepository = require("../../DataLayer/forecastRepository");
const Forecast = require("../Models/forecast");

class ForecastService {
  constructor() {
    this.foreCastRepository = new ForeCastRepository();
  }

  /**Saves a new User in the DataBase
   * @summary Check if there is already a User with registered with the provided phone number. Case there is no user registered with this number then creates a new register for this user.
   * @param {object} object - Object containing new User's information
   */
  addForecast(object) {
    return new Promise((resolve, reject) => {
      var newForecast = new Forecast(object).toJson();
      this.foreCastRepository
        .getById(newForecast.date)
        .then((u) => {
          this.foreCastRepository
            .upsert(newForecast)
            .then(() => resolve())
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getForecast(date) {
    return new Promise((resolve, reject) => {
      this.foreCastRepository
        .getById(date)
        .then((u) => {
          if (u != null) {
            console.log(u);
            var forecast = new Forecast(u);
            resolve(forecast);
          } else {
            reject("No forecast for this date;");
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = ForecastService;
