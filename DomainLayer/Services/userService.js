const UserRepository = require('../../DataLayer/userRepository')
const {User} = require('../Models/user')

/**
 * This class implements all logical operations related to a User Object.
 */
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
            var newUser = new User(object).toJson({exposed: true});
            console.log(newUser);
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

    /**
     * Delete specific User from Repository
     * @param {string} id
     * @returns Promise to be resolved if deletion is successful.
     */
    deleteUser = (id) => this.userRepository.delete(id);

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

    /**
     * Get user data with matching phone number
     * @param {string} phoneNumber Phone Number
     * @returns Promise to be resolved with a Json object.
     */
    getUser(phoneNumber) {
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

    /**
     * Get all users.
     * @returns Promise to be resolved with an array of Json object.
     */
    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.userRepository.getAll()
                .then((u) => {
                    if (u) {
                        var users = u.map((e) => new User(e).toJson());
                        resolve(users);
                    }
                    reject('Error Fetching Users')
                })
                .catch((err) => {
                    reject("Invalid Inputs.")
                })
        });
    }

    /**
     * Set User's default community.
     * @param {string} object
     * @returns Promise to be resolved if this operation is successful
     */
    setDefaultCommunity(object) {
        return new Promise((resolve, reject) => {
            this.userRepository.getById(object.phoneNumber)
                .then((u) => {
                    if (u) {
                        var user = new User(u);
                        user.setDefaultCommunity(object.community);
                        user = user.toJson({exposed: true});
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

    /**
     * Set User's role.
     * @param {string} object
     * @returns Promise to be resolved if this operation is successful
     */
    setRole(object) {
        return new Promise((resolve, reject) => {
            this.userRepository.getById(object.phoneNumber)
                .then((u) => {
                    if (u) {
                        var user = new User(u);
                        user.setRole(object.roleLevel);
                        user = user.toJson({exposed: true});
                        this.userRepository.upsert(user).then((u) => resolve())
                            .catch(() => reject('No user found.'))
                    }
                })
                .catch((err) => {
                    reject("Invalid Inputs.")
                })
        });
    }

    /**
     * Set User's password.
     * @param {string} object
     * @returns Promise to be resolved if this operation is successful
     */
    setPassword(object) {
        return new Promise((resolve, reject) => {
            this.userRepository.getById(object.phoneNumber)
                .then((u) => {
                    if (u) {
                        var user = new User(u);
                        user.setPassword(object.password);
                        user = user.toJson({exposed: true});
                        this.userRepository.upsert(user).then((u) => resolve(true))
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