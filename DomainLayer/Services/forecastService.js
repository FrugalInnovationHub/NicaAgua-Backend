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
      let alertRegionsMax = []
      let alertRegionsMin = []
      newForecast.forecasts.forEach(_forecast => {
        if(_forecast.fiveDays > _forecast.fiveDaysMax || _forecast.tenDays > _forecast.tenDaysMax || _forecast.fifteenDays > _forecast.fifteenDaysMax ){
          // console.log("Send Notif")
          sendNotification(_forecast.community,"Anuncio", "Se esperan condiciones mucho más lluviosas de lo normal")
          const isInArray = alertRegionsMax.includes(_forecast.community);
          if(!isInArray){
            alertRegionsMax.push(_forecast.community)
          }
        }
        if( _forecast.fiveDays < _forecast.fiveDaysMin || _forecast.tenDays < _forecast.tenDaysMin || _forecast.fifteenDays < _forecast.fifteenDaysMin){
          // console.log("Send Notif")
          sendNotification(_forecast.community,"Anuncio", "Se esperan condiciones mucho más secas de lo normal")
          const isInArray = alertRegionsMin.includes(_forecast.community);
          if(!isInArray){
            alertRegionsMin.push(_forecast.community)
          }
        }
      });
      if(alertRegionsMin.length>0){
        const data = {message:"Los próximos días serán excepcionalmente secos",regions:alertRegionsMin}
        new WaterAlertService().addWaterAlert(data)
      }
      if(alertRegionsMax.length>0){
        const data = {message:"Los próximos días serán excepcionalmente lluviosos",regions:alertRegionsMax}
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
