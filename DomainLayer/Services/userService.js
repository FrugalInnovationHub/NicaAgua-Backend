const UserRepository = require('../../DataLayer/userRepository')
const { User } = require('../Models/user')
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    /**Saves a new User in the DataBase 
     * @summary Check if there is already a User with registered with the provided phone number. Case there is no user registered with this number then creates a new register for this user.
     * @param {object} object - Object containing new User's information
    */
    addUser(object) {
        return new Promise((resolve, reject) => {
            var newUser = new User(object).toJson({ exposed: true });
            this.userRepository.getById(newUser.phoneNumber)
                .then((u) => {
                    if (!u)
                        this.userRepository.upsert(newUser)
                            .then(() => resolve())
                            .catch((err) => {
                                reject(err)
                            });
                    else {
                        reject("There is already a User registered with this phone number.")
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        });
    }

    deleteUser(id){
        return this.userRepository.delete(id);
    }

    /**Start a User session, returning User's profile data. 
     * @param {string} phoneNumber - Phone number used as identity to login
     * @param {string} password - User's password  not cryptographed 
    */
    logIn(object) {
        return new Promise((resolve, reject) => {
            this.userRepository.getById(object.phoneNumber)
                .then((u) => {
                    if (u) {
                        var user = new User(u);
                        if (user.checkPassword(object.password))
                            resolve(user.toJson());
                    }
                    reject('Wrong phone number or password.')
                })
                .catch((err) => {
                    reject("Invalid Inputs.")
                })
        });
    }

    getUser(phoneNumber){
        return new Promise((resolve, reject) => {
            this.userRepository.getById(phoneNumber)
                .then((u) => {
                    if (u) {
                        var user = new User(u);
                        resolve(user.toJson())
                    }
                    reject('Invalid Phone Number')
                })
                .catch((err) => {
                    reject("Invalid Inputs.")
                })
        });
    }

    /**Start a User session, returning User's profile data. 
     * @param {string} phoneNumber - Phone number used as identity to login
     * @param {string} password - User's password  not cryptographed 
    */
    setRegions(object) {
        return new Promise((resolve, reject) => {
            this.userRepository.getById(object.phoneNumber)
                .then((u) => {
                    if (u) {
                        var user = new User(u);
                        user.setRegions(object.regions);
                        user = user.toJson({exposed:true});
                        this.userRepository.upsert(user)
                        .then((u) => resolve())
                        .catch(() => reject('No user found.'))
                    }
                })
                .catch((err) => {
                    reject("Invalid Inputs.")
                })
        });
    }

    /**Start a User session, returning User's profile data. 
     * @param {string} phoneNumber - Phone number used as identity to login
     * @param {string} password - User's password  not cryptographed 
    */
     setRole(object) {
        return new Promise((resolve, reject) => {
            this.userRepository.getById(object.phoneNumber)
                .then((u) => {
                    if (u) {
                        var user = new User(u);
                        user.setRole(object.roleLevel);
                        user = user.toJson({exposed:true});
                        this.userRepository.upsert(user).then((u) => resolve())
                        .catch(() => reject('No user found.'))
                    }
                })
                .catch((err) => {
                    reject("Invalid Inputs.")
                })
        });
    }
}

module.exports = UserService;