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
      var newForecast = new ShortTermForecasts(object).toJson();
      let alertRegions = []
      newForecast.forecasts.forEach(_forecast => {
        if(_forecast.fiveDays > _forecast.fiveDaysMax || _forecast.fiveDays < _forecast.fiveDaysMin){
          // console.log("Send Notif")
          sendNotification(_forecast.community,"Anuncio", waterAlert.message)
          const isInArray = alertRegions.includes(_forecast.community);
          if(!isInArray){
            alertRegions.push(_forecast.community)
          }
        }
        if(_forecast.tenDays > _forecast.tenDaysMax || _forecast.tenDays < _forecast.tenDaysMin){
          // console.log("Send Notif")
          sendNotification(_forecast.community,"Anuncio", waterAlert.message)
          const isInArray = alertRegions.includes(_forecast.community);
          if(!isInArray){
            alertRegions.push(_forecast.community)
          }
        }
        if(_forecast.fifteenDays > _forecast.fifteenDaysMax || _forecast.fifteenDays < _forecast.fifteenDaysMin){
          // console.log("Send Notif")
          sendNotification(_forecast.community,"Anuncio", waterAlert.message)
          const isInArray = alertRegions.includes(_forecast.community);
          if(!isInArray){
            alertRegions.push(_forecast.community)
          }
        }
      });
      if(alertRegions.length>0){
        const data = {message:"Testing Dashboard Notifications",regions:alertRegions}
        new WaterAlertService().addWaterAlert(data)
      }
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
