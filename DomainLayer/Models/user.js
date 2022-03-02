var crypto = require('crypto');
const Region = require('./region');
/**Enum of possible Roles */
const Role = {
    /**User only access limited functionalities of the system*/
    User: 2,
    /**User only access to Admin functionalities of the system*/
    Admin: 1,
    /**User only is the Root Admin*/
    Root: 0
}
/**
 * Class that describes a User
 */
class User {
    /**Private property that stores User's Password */
    #hashedPassword;
    /**Constructor
     * @param {object} object - Object containig User's properties.
     */
    constructor(object) {
        if(!object)
            throw 'Object provided cannot be null.'
        if (object.firstName == null)
            throw "Name cannot be null";
        if (object.lastName == null)
            throw "Lastname cannot be null";
        if (!(new RegExp('^[0-9]+$').test(object.phoneNumber))) //Checks if there is only numbers on the phone
            throw "Invalid Phone";
        /**Firs Name */
        this.firstName = object.firstName;
        /**Last Name */
        this.lastName = object.lastName;
        /**Phone Number */
        this.phoneNumber = object.phoneNumber;
        try{
        /**Regions that this user is subscribed */
            this.setRegions(object.regions);
        }
        catch{
            throw "Invalid Region"
        }
        /**User's permission role */
        this.roleLevel = object?.roleLevel ?? Role.User;
        this.#hashedPassword = object?.hashedPassword;
        if(!object?.hashedPassword && object.password)
            this.setPassword(object.password);
    }

    setRegions(regions){
        this.regions = regions.map((r) => Region.RegionCode(r));
    }
    
    /**Sets User's password
     * @param {string} newPassword - User's new Password
     */
    setPassword(newPassword) {
        this.#hashedPassword = crypto.createHash('sha256').update(newPassword).digest('base64');
    }

    /**Check if the password matches the User's password
     * @param {string} passWord - Password to verify
     * @returns {bool} True if the provided password matches the User's password
     */
    checkPassword(passWord) {
        return this.#hashedPassword === crypto.createHash('sha256').update(passWord).digest('base64');
    }
    /**
     * Set the permission this user will have.
     * @param {number} role - 0 is Root User, 1 is Admin User, 2 is Regular User 
     */
    setRole(role) {
        this.roleLevel = role;
    }

    /**Return Object Json Formated
     * @summary Return the User Object json formated, be aware that using the exposed option will expose the hashed password.
     * @param {bool} exposed -expose HashedPassword
     */
    toJson(option){
        var json = JSON.parse(JSON.stringify(this));
        if(option?.exposed ===true)
            json.hashedPassword = this.#hashedPassword;
        return json;
    }
}


module.exports = {User};
