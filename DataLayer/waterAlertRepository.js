const { reject } = require('bcrypt/promises');
const BaseRepository = require('./baseRepository');
const {WaterAlert} = require('../DomainLayer/Models/waterAlert')

/**
 * This class implements a repository of Water Alerts
 */
class WaterAlertRepository extends BaseRepository {
    /**
   * Instantiates a Repository
   * @param {string} collection Name of Collection to be implemented.
   */
    constructor(collection) {
        super();
        collection = collection ?? 'WaterAlert' ;
        this.collection = this.DataBase.collection(collection);
    }

    /**
     * Fecthes all Water Alerts that match the querie passed as Parameter. 
     * @param {*} object {dateTimeStart: Date , dateTimeEnd:Date, limit: number, regions: [regions]}
     * @returns Promise that when resolved will return an array of Water Alerts
     */
    getWaterAlerts(object){
        return new Promise((resolve, reject) => {
            var query = this.collection;
            query = object.dateTimeStart ? query.where("dateTime",">=", new Date(object.dateTimeStart).getTime()): query;
            query = object.dateTimeEnd ? query.where("dateTime","<",new Date(object.dateTimeEnd).getTime()): query;
            query = query.limit(parseInt(object.limit?? 10));
            query.orderBy('dateTime','desc');
            query.get().then((d) => {
                if (d) {
                    var res = d.docs.map((r) => {
                        var data = r.data();
                        data.id = r.id;
                        return new WaterAlert(data)});
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
 * @param {*} waterAlerts List of Water Alerts
 * @param {*} regions List of Regionss
 * @returns 
 */
function filterRegions(waterAlerts,regions){
    regions = typeof(regions)=="string" ? [regions] : regions;
    return Array.isArray(regions) ? waterAlerts.filter((w) => w.regions.some(r=> regions.indexOf(r) >= 0)) : waterAlerts;
}

module.exports  = WaterAlertRepository;