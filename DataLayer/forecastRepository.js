const { LongTermForecasts, ShortTermForecasts } = require("../DomainLayer/Models/forecast");
const BaseRepository = require("./baseRepository");

/**
 * Implements a Repository of Forecasts.
 */
class ForeCastRepository extends BaseRepository {
  /**
   * Instantiates a Repository
   * @param {string} collection Name of Collection to be implemented.
   */
  constructor(collection) {
    super();
    this.key = "date";
    collection = this.getCollection(collection ?? 'ShortTerm')
    this.collection = this.DataBase.collection(collection);
  }

  /**
   * Gets the latest Forecast of the repository based on the Date.
   * @returns Promise that when resolved returns the latest forecast.
   */
  getLatest() {
    return new Promise((resolve, reject) => {
      var query = this.collection.orderBy("date","desc");
      query = query.limit(1);
      query.get().then((d) => {
        var res = null;
        if (d) {
          if(d.docs.length > 0){
            var data = d.docs[0].data();
            data.id = d.docs[0].id;
            res = new ShortTermForecasts(data).toJson();
          };
          resolve(res);
        } else {
          reject();
        }
      });
    });
  }
}


/**
 * Implements a Repository of Forecasts.
 */
class LongTermForeCastRepository extends BaseRepository {
  /**
   * Instantiates a Repository
   * @param {string} collection Name of Collection to be implemented.
   */
  constructor(collection) {
    super();
    collection = this.getCollection(collection ?? 'LongTerm');
    this.key = "date";
    this.collection = this.DataBase.collection(collection);
  }

  /**
   * Gets the latest Long Term Forecast of the repository based on the Date.
   * @returns Promise that when resolved returns the latest long term forecast.
   */
  getLatest() {
    return new Promise((resolve, reject) => {
      var query = this.collection.orderBy("date","desc");
      query =query.limit(1);
      query.get().then((d) => {
        if (d) {
          var res = null;
          if(d.docs.length > 0){
            var data = d.docs[0].data();
            res = new LongTermForecasts(data).toJson();
          }
          resolve(res);
        } else {
          reject();
        }
      });
    });
  }

 
}

module.exports = { ForeCastRepository, LongTermForeCastRepository };
