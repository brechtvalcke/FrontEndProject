import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'invite-component',
    templateUrl: 'invite.component.html',
    styleUrls: ['invite.component.scss']
})

export class InviteComponent implements OnInit{
    users:[]

    constructor(private userService: UserService) {}
    ngOnInit() {
        this.isLoggedIn = this.loginService.isLoggedIn();
    }
}
