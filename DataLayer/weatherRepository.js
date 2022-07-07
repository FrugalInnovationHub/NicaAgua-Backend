const { reject } = require('bcrypt/promises');
const { WeatherLog,WeatherLogList } = require('../DomainLayer/Models/weatherLog');
const BaseRepository = require('./baseRepository');

class WeatherRepository extends BaseRepository {
    constructor(collection) {
        super();
        this.key = "date";
        collection = collection ?? 'Weather'
        this.collection = this.DataBase.collection(collection);
    }

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

function filterRegions(weatherLogs,regions){
    regions = typeof(regions)=="string" ? [regions] : regions;
    return Array.isArray(regions) ? weatherLogs.filter((w) => w.regions.some(r=> regions.indexOf(r) >= 0)) : weatherLogs;
}

module.exports = WeatherRepository;