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
        if(!d) reject(Error("No Data Found"));
        let obj = {};
        obj[community] = d;
        resolve(new Historical(obj))
      });
    })
  }
}

module.exports = HistoricalRepository;