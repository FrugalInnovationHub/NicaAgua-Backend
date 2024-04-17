const {WeatherLogList } = require('../DomainLayer/Models/weatherLog');
const BaseRepository = require('./baseRepository');

/**
 * This Class Implements a Weather Repository
 */
class WeatherRepository extends BaseRepository {
    constructor(collection) {
        super();
        this.key = "date";
        collection = this.getCollection(collection ?? 'Weather');
        this.collection = this.DataBase.collection(collection);
    }

     /**
     * Fecthes all WeatherLogs that match the querie passed as Parameter. 
     * @param {*} object {dateTimeStart: Date , dateTimeEnd:Date, limit: number, regions: [regions]}
     * @returns Promise that when resolved will return an array of Water Alerts
     */
    getWeatherLogs(object) {
        return new Promise((resolve, reject) => {
            var query = this.collection;
            query = object.dateTimeStart ? query.where("dateTime",">=",object.dateTimeStart): query;
            query = object.dateTimeEnd ? query.where("dateTime","<",object.dateTimeEnd): query;
            query = query.limit(parseInt(object.limit?? 10))
            query.get().then((d) => {
                if (d) {
                    var res = d.docs.map((r) => {
                        var data = r.data();
                        data.id = r.id;
                        return new WeatherLogList(data)});
                    res = filterRegions(res,object.regions)
                    resolve(res);
                }
                else {
                    reject()
                }
            }
            )
        })
    }
}

/**
 * Auxiliary Function to filter by regions
 * @param {*} waterAlerts List of WeatherLogs
 * @param {*} regions List of Regionss
 * @returns 
 */
function filterRegions(weatherLogs,regions){
    regions = typeof(regions)=="string" ? [regions] : regions;
    return Array.isArray(regions) ? weatherLogs.filter((w) => w.regions.some(r=> regions.indexOf(r) >= 0)) : weatherLogs;
}

module.exports = WeatherRepository;