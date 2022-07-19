const { reject } = require('bcrypt/promises');
const BaseRepository = require('./baseRepository');

class ForeCastRepository extends BaseRepository {
    constructor(collection) {
        super();
        this.key = "date";
        collection = collection ?? 'ShortTerm' 
        this.collection = this.DataBase.collection(collection);
    }
}

module.exports  = ForeCastRepository;