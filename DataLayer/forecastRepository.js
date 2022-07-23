const { reject } = require("bcrypt/promises");
const { LongTermForecast } = require("../DomainLayer/Models/forecast");
const BaseRepository = require("./baseRepository");

class ForeCastRepository extends BaseRepository {
  constructor(collection) {
    super();
    this.key = "date";
    collection = collection ?? "ShortTerm";
    this.collection = this.DataBase.collection(collection);
  }
}
class LongTermForeCastRepository extends BaseRepository {
  constructor(collection) {
    super();
    collection = collection ?? "LongTerm";
    this.collection = this.DataBase.collection(collection);
  }

  getByDate(date) {
    return new Promise((resolve, reject) => {
      var query = this.collection.where("date", "==", date);
      query.get().then((d) => {
        if (d) {
          var res = d.docs.map((r) => {
            var data = r.data();
            data.id = r.id;
            return new LongTermForecast(data).toJson();
          });
          resolve(res);
        } else {
          reject();
        }
      });
    });
  }
}

module.exports = { ForeCastRepository, LongTermForeCastRepository };
