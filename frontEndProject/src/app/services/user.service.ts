import {Injectable} from '@angular/core';
import {CustomHttpModule} from '../../coreClasses/CustomHttpModule';
import {Router} from '@angular/router';
import {Group} from '../models/group';
import {NetworkCalls} from '../global/networkCalls';
import {User} from '../models/user';

@Injectable()
export class UserService {
    private networkCalls = new NetworkCalls();
    private headers = new Headers({ 'Content-Type' : 'application/json' });
    constructor(private http: CustomHttpModule, private router: Router ) {}

    getAllFriends(): Promise<[User]> {
        return this.http
            .get(this.networkCalls.getFriends())
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    handleError(error: any): Promise < any > {
        console.error('An error occurred', error); // TODO remove console
        return Promise.reject(error.message || error);
    }
}
