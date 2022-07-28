const {LongTermForeCastRepository} = require("../../DataLayer/forecastRepository");
const {LongTermForecast, LongTermForecasts} = require("../Models/forecast");

class LongTermForeCastService {
  constructor() {
    this.foreCastRepository = new LongTermForeCastRepository();
  }

  /**Saves a new User in the DataBase
   * @summary Check if there is already a User with registered with the provided phone number. Case there is no user registered with this number then creates a new register for this user.
   * @param {object} object - Object containing new User's information
   */
  addForecast(object) {
    return new Promise((resolve, reject) => {
      var newForecast = new LongTermForecasts(object).toJson();
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

  getForecasts() {
    return new Promise((resolve, reject) => {
      this.foreCastRepository
        .getLatest()
        .then((u) => {
          if (u != null) {
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

  deleteForecast(id) {
    return this.foreCastRepository.delete(id);
  }
}

module.exports = LongTermForeCastService;
