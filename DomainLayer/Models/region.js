/**Represents a Region */
class Region {
    /**Constructor
     * @param {object} object - Object containing the properties of a Region
     */
    constructor(object) {
        if (object.name == null)
            throw "Name cannot be null."
        if (object.country == null)
            throw "Country cannot be null."
        if (object?.latitude != undefined && typeof object?.latitude != 'number')
            throw "Latitude must be a number."
        if (object?.longitude != undefined && typeof object?.longitude != 'number')
            throw "Longitude must be a number."
        /**Region's code */
        this.code = Region.RegionCode(object.code);
        /**Region's name */
        this.country = object?.country;
        /**Region's name */
        this.name = object?.name;
        /**Region's latitude */
        this.latitude = object?.latitude;
        /**Regions longitude */
        this.longitude = object?.longitude;
    }
    
    static RegionCode(value){
        if (!value || typeof(value) != "string" || value.length !=5  )
            throw "Code cannot be null, must be a string and must be 5 characters long."
        return value;
    }

     toJson(){
        return JSON.parse(JSON.stringify(this));
    }
}

module.exports = Region;