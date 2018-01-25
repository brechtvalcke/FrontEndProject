import { SocketService } from './../../../services/socket.service';
import { UserService } from './../../../services/user.service';
import { GroupService } from './../../../services/group.service';
import { FbService } from './../../../services/fb.service';
import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {StoreUserInfo} from '../../../global/storeUserInfo';
import { InterComponentCommunicationService } from '../../../services/interComponentCommunication.service';

@Component({
    selector: 'navigation-platform-component',
    templateUrl: 'navigationPlatform.component.html',
    styleUrls: ['navigationPlatform.component.scss']
})

export class NavigationPlatformComponent implements OnInit {
    user: User;
    notifications: number;
    showDropDown = false;
    constructor(private storeUserInfo: StoreUserInfo,
         private fbService: FbService,
          private userService: UserService,
        private groupService: GroupService,
    private socketService: SocketService,
        private interComponentCommunicationService: InterComponentCommunicationService
) {}
    ngOnInit() {
        this.userService.getUserInfo()
        .then(user => {
            this.storeUserInfo.MyUser = user;
            this.user = user;
        })
        .catch(error => console.log(error));
        this.groupService.getInvites()
        .then(groups => {
            this.notifications = groups['groupList'].length;
        })
        .catch(error => console.log(error));
        this.socketService.InvitedObservable.subscribe((id) => {
            this.notifications++;
        });
        this.interComponentCommunicationService.InviteAcceptedOrDeclined.subscribe((accepted) => {
            this.notifications--;
        });
    }
    logOut() {
        this.fbService.logout();
    }
    toggleDropDown() {
        this.showDropDown = !this.showDropDown;
    }
    onClickedOutside(e: Event) {
        this.showDropDown = false;
    }
    inviteFriends() {
        this.fbService.shareSite();
    }
}