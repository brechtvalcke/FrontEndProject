import { FbService } from './fb.service';
import {Injectable} from '@angular/core';
import {CustomHttpModule} from '../../coreClasses/CustomHttpModule';
import {Router} from '@angular/router';
import {Group} from '../models/group';
import {NetworkCalls} from '../global/networkCalls';

@Injectable()
export class GroupService {
    private networkCalls = new NetworkCalls();
    private headers = new Headers({ 'Content-Type' : 'application/json' });
    constructor(private http: CustomHttpModule, private router: Router, private fbService: FbService) {}

    getAllGroups(): Promise<[Group]> {
        
        return this.http
            .get(this.networkCalls.getGroups())
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    getGroup(groupID: String): Promise<Group> {
        return this.http
            .get(this.networkCalls.getGroup(groupID))
            .toPromise()
            .then(res => res.json().groupList[0])
            .catch(this.handleError);
    }
    getInvites(): Promise<[Group]> {
        return this.http
            .get(this.networkCalls.getInvites())
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    acceptInvite(groupID: String): Promise<any> {
        return this.http
            .put(this.networkCalls.acceptInvite(groupID), null)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    declineInvite(groupID: String): Promise<any> {
        return this.http
            .delete(this.networkCalls.declineInvite(groupID))
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    createGroup(body: Group): Promise<Group> {
        return this.http
            .post(this.networkCalls.creatGroup(), body)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    changeName(groupId: String, name: String): Promise<any> {
        return this.http
        .put(this.networkCalls.changeGroupName(groupId), {name: name})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }
    handleError(error: any): Promise < any > {
        console.error('An error occurred', error); // TODO remove console
        return Promise.reject(error.message || error);
    }
}
