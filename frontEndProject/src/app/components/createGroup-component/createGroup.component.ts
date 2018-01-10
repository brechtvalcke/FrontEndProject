import {Component, OnInit} from '@angular/core';

import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Group} from '../../models/group';
import {GroupService} from '../../services/group.service';
import {Router} from '@angular/router';
import {isUndefined} from 'util';
import {StoreUserInfo} from '../../global/storeUserInfo';
import { FbService } from '../../services/fb.service';

@Component({
    selector: 'create-group-component',
    templateUrl: 'createGroup.component.html',
    styleUrls: ['createGroup.component.scss']
})

export class CreateGroupComponent implements OnInit {
    users: [User];
    selectedUsers = [];
    constructor(private userService: UserService,
                private groupService: GroupService,
                private storeUserInfo: StoreUserInfo,
                private router: Router,
                private fbService: FbService) {}
    ngOnInit() {
        this.getUsers();
    }
    private getUsers() {
        this.userService.getAllFriends()
            .then(users => this.users = users['userList'] )
            .catch(error => console.log(error));
    }
    createGroup() {
        const group = new Group();
        group.createBy = this.storeUserInfo.MyUser._id;
        group.users = this.getSelectedUsers();
        this.groupService.createGroup(group)
            .then(result => this.router.navigate(['/dashboard/group', result._id]))
            .catch(error => console.log(error));
    }
    changedSelectState(userId: String) {
        if (isUndefined(this.selectedUsers) || this.selectedUsers.indexOf(userId) === -1) {
            this.selectedUsers.push(userId);
        }else {
            this.selectedUsers.splice(this.selectedUsers.indexOf(userId), 1);
        }
    }
    shareClicked(): void {
        this.fbService.shareSite();
    }
    private getSelectedUsers(): User[] {
        return this.selectedUsers.map( id => {
            const user = new User();
            user.setId(id);
            return user;
        });
    }
}
