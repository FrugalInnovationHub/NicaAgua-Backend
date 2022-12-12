const BaseRepository = require('./baseRepository');
/**
 * This class implements a Region Repository
 */
class RegionRepository extends BaseRepository {
    constructor(collection) {
        super();
        collection = collection ?? 'Regions' ;
        this.key = "code";
        this.collection = this.DataBase.collection(collection);
    }
}

module.exports  = RegionRepository;