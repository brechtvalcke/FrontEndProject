import {Headers} from '@angular/http';

export class NetworkCalls {
    public baseURL = ''; // 'https://howestmeetme.herokuapp.com';
    public header = function () {
        const headers = new Headers();
        // headers.append('Authorization', localStorage.getItem('acces_token'));
        headers.append('Content-Type', 'application/json');
        return {'headers': headers};
    };
    public changeGroupName(groupId: String) {
        return `api/group/changeName/${groupId}`;
    }
    public voteActivity(groupId: String, activityId: String) {
        return `api/group/activity/vote/${groupId}/${activityId}`;
    }
    public addActivity(groupId: String) {
        return `api/group/activity/${groupId}`;
    }
    public voteTimeslot(groupId: String, timeslotId: String){
        return `api/group/timeslot/vote/${groupId}/${timeslotId}`;
    }
    public addTimeslot(groupId: String) {
        return `api/group/timeslot/${groupId}`;
    }
    public getGroups() {
        return '/api/group';
    }
    public getGroup(id: String) {
        return '/api/group/' + id;
    }
    public getFriends() {
        return '/api/user/friends';
    }
    public getInvites() {
        return 'api/group/invites';
    }
    public acceptInvite(id: String) {
        return 'api/group/invites/' + id + '/accepted';
    }
    public declineInvite(id: String) {
        return 'api/group/invites/' + id + '/decline';
    }
    public creatGroup() {
        return '/api/group/';
    }
    public getUser() {
        return '/api/user/';
    }
    public socketConnect() {
        return 'http://localhost:80';
    }
}
