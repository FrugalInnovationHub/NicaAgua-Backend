const {ForeCastRepository} = require("../../DataLayer/forecastRepository");
const {ShortTermForecasts} = require("../Models/forecast");

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
      var newForecast = new ShortTermForecasts(object).toJson();
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

  getForecast(community) {
    return new Promise((resolve, reject) => {
      this.foreCastRepository
        .getLatest()
        .then((u) => {
          if (u != null) {
            if(community != "*")
              u.forecasts = u.forecasts.filter((e)=> e.community == community);
            resolve(u);
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
