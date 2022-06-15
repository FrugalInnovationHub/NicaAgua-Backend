/**Represents a Forecast */
class Forecast {
    /**Constructor
     * @param {object} object - Object containing the properties of a Forecast
     */
    constructor(object) {
        if (object.fiveDays == null)
            throw "Forecast for Five Days cannot be null."
        if (object.tenDays == null)
            throw "Forecast for Ten Days cannot be null."
        if (!object.fifteenDays) 
            throw "Forecast for Fifteen Days cannot be null."
        if (object.seasonalWet == null)
            throw "Probability for a weeter season cannot be null."
        if (object.seasonalDry == null)
            throw "Probability for a dryer season cannot be null."
        if (typeof(object?.latitude) != "number")
                throw "Latitude of forecast must be a number."
        if (typeof(object?.longitude) != "number")
                throw "Longitude of forecast must be a number."
        /**Five Days Precipitation Forecast */
        this.fiveDays = object.fiveDays;
        /**Ten Days Precipitation Forecast */
        this.tenDays = object?.tenDays;
        /**Fifteen Days Precipitation Forecast */
        this.fifteenDays = object?.fifteenDays;
        /**Probability of a weter season*/
        this.seasonalWet = object?.seasonalWet;
        /**Probability of a dryer season*/
        this.seasonalDry = object?.seasonalDry;
        /**Latitude of the forecast */
        this.longitude = object.longitude;
        /**Longitude of the forecast */
        this.latitude = object.latitude;

    }
    
     toJson(){
        return JSON.parse(JSON.stringify(this));
    }
}

module.exports = Forecast;