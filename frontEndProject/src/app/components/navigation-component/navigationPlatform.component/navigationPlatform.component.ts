import { FbService } from './../../../services/fb.service';
import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {StoreUserInfo} from '../../../global/storeUserInfo';

@Component({
    selector: 'navigation-platform-component',
    templateUrl: 'navigationPlatform.component.html',
    styleUrls: ['navigationPlatform.component.scss']
})

export class NavigationPlatformComponent implements OnInit {
    user: User;
    notifications: number;
    showDropDown = false;
    constructor(private storeUserInfo: StoreUserInfo, private fbService: FbService) {}
    ngOnInit() {
        this.user = this.storeUserInfo.MyUser;
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
