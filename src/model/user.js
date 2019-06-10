import { Firebase } from '../util/firebase';
import { Model } from './model';

export class User extends Model {
    constructor(id) {
        super();

        if(id) this.getById(id);
    }

    get name() {
        return this._data.name;
    }

    set name(value) {
        this._data.name = value;
    }

    get email() {
        return this._data.email;
    }

    set email(value) {
        this._data.email = value;
    }

    get photo() {
        return this._data.photo;
    }

    set photo(value) {
        this._data.photo = value;
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            User.findByEmail(id).onSnapshot(doc => {
                this.fromJSON(doc.data());
                resolve(doc);
            });
        });
    }

    save() {
        return User.findByEmail(this.email).set(this.toJSON());
    }

    addContact(contact) {
        return User.getContactsReference(this.email)
            .doc(btoa(contact.email))
            .set(contact.toJSON());        
    }

    static getContactsReference(id){
        return User.getDatabaseReference()
            .doc(id)
            .collection('contacts');
    }

    static getDatabaseReference() {
        return Firebase.db().collection('/users');
    }

    static findByEmail(email) {
        return User.getDatabaseReference().doc(email);
    }

    getContacts() {
        return new Promise((resolve, reject) => {
            User.getContactsReference(this.email).onSnapshot(docs => {
                let contacts = [];
                docs.forEach(doc => {
                    let data = doc.data();
                    data.id = doc.id;
                    contacts.push(data);
                });
                this.trigger('contactschange', docs);
                resolve(contacts);
            });
        });
    }
}