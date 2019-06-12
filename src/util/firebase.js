import { firebaseConfig } from './firebase-config';

const firebase = require('firebase');
require('firebase/firestore')

export class Firebase {

    constructor() {
        this._config = firebaseConfig;

        this.init();
    }

    init(){
        if(!window._initializedFirebase){
            firebase.initializeApp(this._config);
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });
            window._initializedFirebase = true;
        }        
    }

    initAuth(){
        return new Promise((resolve, reject) => {
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result => {
                let token = result.credential.accessToken;
                let user = result.user;

                resolve({
                    user, 
                    token
                });
            }).catch(err => {
                reject(err);
            });
        })
    }

    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }
}