const firebase = require('firebase');
require('firebase/firestore')

export class Firebase {

    constructor() {
        this._config = {
            apiKey: "AIzaSyDJXifDfjqgt4P-3he_n1gQW73YQTzaVBk",
            authDomain: "whatsapp-clone-2b510.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-2b510.firebaseio.com",
            projectId: "whatsapp-clone-2b510",
            storageBucket: "whatsapp-clone-2b510.appspot.com",
            messagingSenderId: "625255313468",
            appId: "1:625255313468:web:5c4394ddc5bd0a10"
        };

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