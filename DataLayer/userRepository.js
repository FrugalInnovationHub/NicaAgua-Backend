const { reject } = require('bcrypt/promises');
const BaseRepository = require('./baseRepository');

class UserRepository extends BaseRepository {
    constructor(collection) {
        super();
        this.key = "phoneNumber";
        collection = collection ?? 'Users' 
        this.collection = this.DataBase.collection(collection);
    }
}

module.exports  = UserRepository;