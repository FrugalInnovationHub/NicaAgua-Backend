const BaseRepository = require('./baseRepository');
/**
 * This class implements a Region Repository
 */
class RegionRepository extends BaseRepository {
    constructor(collection) {
        super();
        collection = this.getCollection(collection ?? 'Regions');
        this.key = "code";
        this.collection = this.DataBase.collection(collection);
    }
}

module.exports  = RegionRepository;