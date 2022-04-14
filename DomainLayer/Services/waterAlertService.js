const WaterAlertRepository = require('../../DataLayer/waterAlertRepository')
const { WaterAlert } = require('../Models/waterAlert')
class WaterAlertService {
    constructor() {
        this.waterAlertRepository = new WaterAlertRepository();
    }

    /**Saves a new Water Alert in the DataBase 
     * @summary Check if there is already a User with registered with the provided phone number. Case there is no user registered with this number then creates a new register for this user.
     * @param {object} object - Object containing new Water Alert information
    */
    addWaterAlert(object) {
        return new Promise((resolve, reject) => {
            var waterAlert = new WaterAlert(object).toJson();
            this.waterAlertRepository.add(waterAlert).then(() => resolve()).catch(() => reject());
        });
    }

    /**Saves a new Water Alert in the DataBase 
     * @summary Check if there is already a User with registered with the provided phone number. Case there is no user registered with this number then creates a new register for this user.
     * @param {object} object - Object containing new Water Alert information
    */
     getWaterAlert(object) {
        return this.waterAlertRepository.getById(object);
    }

    /**Saves a new Water Alert in the DataBase 
     * @summary Check if there is already a User with registered with the provided phone number. Case there is no user registered with this number then creates a new register for this user.
     * @param {object} object - Object containing new Water Alert information
    */
     getWaterAlerts(object) {
        return this.waterAlertRepository.getWaterAlerts(object);
    }
}

module.exports = WaterAlertService;