const { reject } = require('bcrypt/promises');
const BaseRepository = require('./baseRepository');
const {WaterAlert} = require('../DomainLayer/Models/waterAlert')

class WaterAlertRepository extends BaseRepository {
    constructor(collection) {
        super();
        collection = collection ?? 'WaterAlert' ;
        this.collection = this.DataBase.collection(collection);
    }

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


function filterRegions(waterAlerts,regions){
    regions = typeof(regions)=="string" ? [regions] : regions;
    return Array.isArray(regions) ? waterAlerts.filter((w) => w.regions.some(r=> regions.indexOf(r) >= 0)) : waterAlerts;
}

module.exports  = WaterAlertRepository;