const RegionRepository = require('../../DataLayer/regionRepository' )
const Region = require('../Models/region')

class RegionService {
    constructor() {
        this.regionRepository = new RegionRepository();
    }

       /**Saves a new User in the DataBase 
     * @summary Check if there is already a User with registered with the provided phone number. Case there is no user registered with this number then creates a new register for this user.
     * @param {object} object - Object containing new User's information
    */
        addRegion(object) {
            return new Promise((resolve, reject) => {
                var newRegion = new Region(object).toJson();
                this.regionRepository.getById(newRegion.code)
                    .then((u) => {
                        if (!u)
                            this.regionRepository.upsert(newRegion)
                                .then(() => resolve())
                                .catch((err) => {
                                    reject(err)
                                });
                        else {
                            reject("There is already a region with this code.")
                        }
                    })
                    .catch((err) => {
                        reject(err)
                    })
            });
        }

        getRegions() {
            return new Promise((resolve, reject) => {
                this.regionRepository.getAll()
                    .then((u) => {
                        if (u != null){
                            var regions = u.map((r) => new Region(r))
                            resolve(regions);
                        }
                        else {
                            reject("There is already a region with this code.")
                        }
                    })
                    .catch((err) => {
                        reject(err)
                    })
            });
        }

        deleteRegion(id){
            return this.regionRepository.delete(id);
        }
}

module.exports = RegionService