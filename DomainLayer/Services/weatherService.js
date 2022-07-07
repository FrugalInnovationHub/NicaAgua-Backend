const WeatherRepository = require('../../DataLayer/weatherRepository')
const { WeatherLog, WeatherLogParameter, WeatherDayLog,groupByDateTime } = require('../Models/weatherLog')
class WeatherService {
    constructor() {
        this.weatherRepository = new WeatherRepository();
    }

    /**Saves a new User in the DataBase 
     * @summary Check if there is already a User with registered with the provided phone number. Case there is no user registered with this number then creates a new register for this user.
     * @param {object} object - Object containing new User's information
    */
    addWeatherLog(object) {
        return new Promise((resolve, reject) => {
            var newLog = new WeatherLog(object).toJson();
            this.weatherRepository.add(newLog).then(() => resolve()).catch(() => reject());
        });
    }

     /**Saves a new User in the DataBase 
     * @summary Check if there is already a User with registered with the provided phone number. Case there is no user registered with this number then creates a new register for this user.
     * @param {object} object - Object containing new User's information
    */
      addWeatherLogs(object) {
        return new Promise((resolve, reject) => {
            var newLog = object.map(o => new WeatherLog(o).toJson());
            var logs = groupByDateTime(newLog);
            console.log(logs);
            this.weatherRepository.addSet(logs).then(() => resolve()).catch(() => reject());
        });
    }

    /**Saves a new User in the DataBase 
     * @summary Check if there is already a User with registered with the provided phone number. Case there is no user registered with this number then creates a new register for this user.
     * @param {object} object - Object containing new User's information
    */
     getWeatherLogList(object) {
        return this.weatherRepository.getWeatherLogs(object);
    }

    getWeatherLog(id) {
        return this.weatherRepository.getById(id);
    }
}

module.exports = WeatherService;