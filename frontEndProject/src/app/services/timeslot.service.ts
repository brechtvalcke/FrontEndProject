import {Injectable} from '@angular/core';
import {CustomHttpModule} from '../../coreClasses/CustomHttpModule';
import {Router} from '@angular/router';
import {Group} from '../models/group';
import {NetworkCalls} from '../global/networkCalls';

@Injectable()
export class TimeslotService {
    private networkCalls = new NetworkCalls();
    private headers = new Headers({ 'Content-Type' : 'application/json' });
    constructor(private http: CustomHttpModule, private router: Router ) {}

    voteTimeslot(groupId: String, timeslotId: String): Promise<[Group]> {
        return this.http
            .put(this.networkCalls.voteTimeslot(groupId, timeslotId), {})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }


    handleError(error: any): Promise < any > {
        console.error('An error occurred', error); // TODO remove console
        return Promise.reject(error.message || error);
    }
}
