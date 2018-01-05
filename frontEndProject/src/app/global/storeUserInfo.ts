import {User} from '../models/user';
import {Injectable} from '@angular/core';

@Injectable()
export class StoreUserInfo {
    get MyUser(): User {
        return <User> JSON.parse(localStorage.getItem('user'));
    }
    set MyUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}
