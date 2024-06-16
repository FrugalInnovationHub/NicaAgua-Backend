const HistoricalRepository = require('../../DataLayer/historicalRepository')

class HistoricalService {
    constructor() {
        this.historicalRepository = new HistoricalRepository();
    }

    getHistorical(community, month) {
        return new Promise((resolve, reject) => {
            this.historicalRepository.getHistoricalDataByMonth(community,month).then((hist) =>{
                resolve(hist.toJson());
            }).catch((e) => {
                reject(e);
            })

        });
    }
    addHistoricalData(data) {
        return new Promise((resolve, reject) => {
            this.historicalRepository.addOrUpdateHistoricalData(data)
            .then(() => resolve())
            .catch((e) => reject(e));
        });
    }
}

module.exports = HistoricalService;