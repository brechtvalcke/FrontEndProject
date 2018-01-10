import {Injectable} from '@angular/core';
import {CustomHttpModule} from '../../coreClasses/CustomHttpModule';
import {Router} from '@angular/router';
import {Group} from '../models/group';
import {NetworkCalls} from '../global/networkCalls';
import { Activity } from '../models/activity';

@Injectable()
export class ActivityService {
    private networkCalls = new NetworkCalls();
    private headers = new Headers({ 'Content-Type' : 'application/json' });
    constructor(private http: CustomHttpModule, private router: Router ) {}

    voteActivity(groupId: String, activityId: String): Promise<[Group]> {
        return this.http
            .put(this.networkCalls.voteActivity(groupId, activityId), {})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    addActivity(activity: Activity, groupId: String) {
        return this.http
            .post(this.networkCalls.addActivity(groupId), activity)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }


    handleError(error: any): Promise < any > {
        console.error('An error occurred', error); // TODO remove console
        return Promise.reject(error.message || error);
    }
}
