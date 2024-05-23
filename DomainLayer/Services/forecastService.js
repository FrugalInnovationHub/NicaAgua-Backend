const {ForeCastRepository} = require("../../DataLayer/forecastRepository");
const {ShortTermForecasts} = require("../Models/forecast");
const sendNotification = require("./notificationService");
const WaterAlertService = require("./waterAlertService");

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
      var newForecast = new ShortTermForecasts(object);
      const waterAlertService =new WaterAlertService();
      waterAlertService.addDryAlert(newForecast.dryRegions);
      waterAlertService.addWetAlert(newForecast.wetRegions);
      this.foreCastRepository.upsert(newForecast.toJson()).then(() => resolve()).catch((e) => reject(e));
    });}

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
