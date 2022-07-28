const { reject } = require("bcrypt/promises");
const { query } = require("express");
const { LongTermForecasts,Forecast } = require("../DomainLayer/Models/forecast");
const BaseRepository = require("./baseRepository");

class ForeCastRepository extends BaseRepository {
  constructor(collection) {
    super();
    this.key = "date";
    collection = collection ?? "ShortTerm";
    this.collection = this.DataBase.collection(collection);
  }

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
            res = new Forecast(data).toJson();
          };
          resolve(res);
        } else {
          reject();
        }
      });
    });
  }
}
class LongTermForeCastRepository extends BaseRepository {
  constructor(collection) {
    super();
    collection = collection ?? "LongTerm";
    this.key = "date";
    this.collection = this.DataBase.collection(collection);
  }

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
            console.log(res);
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
