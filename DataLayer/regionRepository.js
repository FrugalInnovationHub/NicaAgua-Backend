const { reject } = require('bcrypt/promises');
const BaseRepository = require('./baseRepository');

class RegionRepository extends BaseRepository {
    constructor(collection) {
        super();
        collection = collection ?? 'Regions' ;
        this.key = "code";
        this.collection = this.DataBase.collection(collection);
    }
}

module.exports  = RegionRepository;