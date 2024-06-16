const WaterAlertRepository = require('../../DataLayer/waterAlertRepository')
const { WaterAlert } = require('../Models/waterAlert')
const sendNotification = require("./notificationService")

/**
 * This class implements all operations related to Water Alerts.
 */
class WaterAlertService {
    constructor() {
        this.waterAlertRepository = new WaterAlertRepository();
    }

    /**
     * Create a new Water Alert.
     * Sends an PUSH notification to the related comunities
     * @param {*} object Object to be persisted to the database.
     * @returns A Promise that will resolve when the operation is successful.
     */
    addWaterAlert(object) {
        return new Promise((resolve, reject) => {
            var waterAlert = new WaterAlert(object).toJson();
            sendNotification(waterAlert.regions,"Anuncio", waterAlert.message)
            this.waterAlertRepository.add(waterAlert).then(() => resolve()).catch(() => reject());
        });
    }

    /**
     * Generate alert  to Dry Regions for the current Period
     * @param {*} regions Dry Regions for this forecast
     */
    addDryAlert(regions){
        if(regions.length > 0){
        const data = {message:"Los próximos días serán excepcionalmente secos",regions:regions}
        this.addWaterAlert(data);
        }
    }

    /**
     * Generate alert  to Wet Regions for the current Period
     * @param {*} regions Wet Regions for this forecast
     */
    addWetAlert(regions){
        if(regions.length > 0){
        const data = {message:"Los próximos días serán excepcionalmente lluviosos",regions:regions}
        this.addWaterAlert(data);
        }
    }

    /**
     * Get Water Alert by its ID
     * @param {*} id Id of water alert to be fetched.
     * @returns A Promise that when resolved will return a Water Alert Json Object
     */
     getWaterAlert = (id) => this.waterAlertRepository.getById(id);

    
     getWaterAlerts = (object) => this.waterAlertRepository.getWaterAlerts(object);
    }

module.exports = WaterAlertService;