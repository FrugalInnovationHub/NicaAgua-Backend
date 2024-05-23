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
      const notifications = newForecast.getNotifications();
      sendNotification(notifications.dry.regions,notifications.dry.title,notifications.dry.body);
      sendNotification(notifications.wet.regions,notifications.wet.title,notifications.wet.body);
      const waterAlertService =new WaterAlertService();;
      if(notifications.dry.regions.length>0){
        const data = {message:"Los próximos días serán excepcionalmente secos",regions:notifications.dry.regions}
        waterAlertService.addWaterAlert(data);
      }
      if(notifications.wet.regions.length>0){
        const data = {message:"Los próximos días serán excepcionalmente lluviosos",regions:notifications.wet.regions}
        waterAlertService.addWaterAlert(data);
      }
      this.foreCastRepository
        .getById(newForecast.date)
        .then((u) => {
          this.foreCastRepository
            .upsert(newForecast.toJson())
            .then(() => resolve())
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          console.log(err);
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
