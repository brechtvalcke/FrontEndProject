import {Headers} from '@angular/http';

export class NetworkCalls {
    public baseURL = ''; // 'https://howestmeetme.herokuapp.com';
    public header = function () {
        const headers = new Headers();
        // headers.append('Authorization', localStorage.getItem('acces_token'));
        headers.append('Content-Type', 'application/json');
        return {'headers': headers};
    };

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
    public socketConnect() {
        return 'http://localhost:80';
    }
}
