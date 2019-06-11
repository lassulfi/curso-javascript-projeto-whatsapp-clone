import { Model } from "./model";
import { Firebase } from "../util/firebase";

export class Chat extends Model {
    constructor() {
        super();
    }

    get users() { return this._data.users; }
    set users(value) {this._data.users = value; }

    get timestamp() { return this._data.timestamp; }
    set timestamp(value) {this._data.timestamp = value; }

    static getDatabaseReference() {
        return Firebase.db().collection('/chats');
    }

    static create(userEmail, contactEmail) {
        return new Promise((resolve, reject) => {
            let users = {};
            users[btoa(userEmail)] = true;
            users[btoa(contactEmail)] = true;

            Chat.getDatabaseReference().add({
                users,
                timestamp: new Date()
            }).then(doc => {
                Chat.getDatabaseReference().doc(doc.id).get().then(chat => {
                    resolve(chat);
                }).catch(err => {
                    reject(err);
                })
            }).catch(err => {
                reject(err);
            });
        });
    }

    static find(userEmail, contactEmail) {
        return Chat.getDatabaseReference()
            .where(btoa(userEmail), '==', true)
            .where(btoa(contactEmail), '==', true)
            .get();
    }

    static createIfNotExists(userEmail, contactEmail) {
        return new Promise((resolve, reject) => {
            Chat.find(userEmail, contactEmail).then(chats => {
                if(chats.empty){
                    //Create new chat
                    Chat.create(userEmail, contactEmail).then(chat => {
                        resolve(chat);
                    });
                } else {
                    chats.forEach(chat => {
                        resolve(chat);
                    });
                }
            }).catch(err => { reject(err); });
        })
    }
}