import {Component, OnInit} from '@angular/core';

import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'create-group-component',
    templateUrl: 'createGroup.component.html',
    styleUrls: ['createGroup.component.scss']
})

export class CreateGroupComponent implements OnInit{
    users: [User];
    selectedUsers: [String];
    constructor(private userService: UserService) {}
    ngOnInit() {
        this.getUsers();
    }
    private getUsers() {
        this.userService.getAllFriends()
            .then(users => this.users = users['userList'])
            .catch(error => console.log(error));
    }
    createGroup() {
    }
    changedSelectState(userId: String) {
    }
}
