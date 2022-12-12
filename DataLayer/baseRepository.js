const { initializeApp,cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
const serviceAccount = require('./../config.json').dataBase;

/**Initialize Firebase App.*/
initializeApp({
    credential: cert(serviceAccount)
});

/**Connect to Database */
const db = getFirestore();

/**
 * This class implements methods that are common to all Repositories.
 */
class BaseRepository {
    constructor() {
        this.DataBase = db;
    }

    /**
     * Returns a array of Json objects in that collection that matches the filter conditions.
     * @returns Json Object
     */
    getAll() {
        return new Promise((resolve, reject) => {
           this.collection.get().then((d) => {
                if (d) {
                    var res = d.docs.map((r) => r.data());
                    resolve(res);
                }
            })
        });
    }

    /**
     * Returns the object in that collection with the matching ID.
     * @param {string} id Id to search for
     * @returns A Promise
     */
    getById(id) {
        return new Promise((resolve, reject) => {
           this.collection.doc(id).get().then((d) => {
                try {
                    resolve(d.exists ? d.data() : null);
                }
                catch (err) {
                    reject(err);
                }
            })
        });
    }

    /**
     * Delete the object in that collection with the matching ID.
     * @param {string} id 
     * @returns A Promise.
     */
    delete(id) {
        return new Promise((resolve, reject) => {
            this.collection.doc(id).delete().then(() => {
                try {
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            })
        });
    }

    /**
     * Update or insert object in a collection.
     * @param {*} object 
     * @returns A Primise.
     */
    upsert(object) {
        return new Promise((resolve, reject) => {
            this.collection.doc(object[this.key]).set(object).then(() => {
                try {
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            })
        });
    }
    /**
     * Add object to a collection.
     * @param {*} object 
     * @returns A Primise.
     */
    add(object) {
        return new Promise((resolve, reject) => {
            this.collection.add(object).then(() => {
                try {
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            })
        });
    }

    /**
     * Add an array of objects to a collection.
     * @param {*} object 
     * @returns A Primise.
     */
    addSet(object) {
        var self = this;
        var promises = object.map(o => self.upsert(o));
        return Promise.all(promises);
    }
}

module.exports = BaseRepository;