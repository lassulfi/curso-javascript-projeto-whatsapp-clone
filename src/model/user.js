import { Firebase } from '../util/firebase';
import { ClassEvent } from '../util/class.event';

export class User extends ClassEvent {

    static getDatabaseReference() {
        return Firebase.db().collection('/users');
    }

    static findByEmail(email) {
        return User.getDatabaseReference().doc(email);
    }
}