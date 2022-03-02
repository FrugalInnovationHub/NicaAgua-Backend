const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./../config.json').dataBase;

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

class BaseRepository {
    constructor() {
        this.DataBase = db;
    }

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
}

module.exports = BaseRepository;