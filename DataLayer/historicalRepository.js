const BaseRepository = require("./baseRepository");
const Historical = require("../DomainLayer/Models/historical");
class HistoricalRepository extends BaseRepository {
  /**
   * Instantiates a Repository
   * @param {string} collection Name of Collection to be implemented.
   */
  constructor(collection) {
    super();
    this.key = "Community";
    collection = collection ?? "historicalData";
    this.collection = this.DataBase.collection(collection);
  }

  /**
   * Gets the latest Forecast of the repository based on the Date.
   * @returns Promise that when resolved returns the latest forecast.
   */
  getHistoricalDataByMonth(community, month) {
    return new Promise((resolve, reject) => {
        this.getById(community).then((d) => {
            if (!d) reject(Error("No Data Found"));

            // Filter data by requested month
            let filteredData = {};
            filteredData[community] = {};
            if (d[month]) {
                filteredData[community][month] = d[month];
            } else {
                reject(Error("No Data Found for the requested month"));
                return;
            }

            resolve(new Historical(filteredData));
        }).catch((e) => reject(e));
    });
}
  /**
     * Add or update historical data.
     * @param {Object} data - Data to be added or updated.
     * @returns Promise that resolves when data is added or updated.
     */
    addOrUpdateHistoricalData(data) {
        return new Promise((resolve, reject) => {
            const community = data.community;
            const updates = data.data;

            this.getById(community).then((existingData) => {
                if (!existingData) {
                    existingData = {};
                }

                updates.forEach(update => {
                    const month = update.month;
                    const values = update.values[0];

                    if (!existingData[month]) {
                        existingData[month] = {};
                    }

                    for (const year in values) {
                        existingData[month][year] = values[year];
                    }
                });

                this.collection.doc(community).set(existingData)
                .then(() => resolve())
                .catch((e) => reject(e));
            }).catch((e) => reject(e));
        });
    }
}

module.exports = HistoricalRepository;