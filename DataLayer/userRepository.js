const { reject } = require('bcrypt/promises');
const BaseRepository = require('./baseRepository');

/**
 * This class implements a User Repository
 */
class UserRepository extends BaseRepository {
    constructor(collection) {
        super();
        this.key = "phoneNumber";
        collection = collection ?? 'Users' 
        this.collection = this.DataBase.collection(collection);
    }
}

module.exports  = UserRepository;