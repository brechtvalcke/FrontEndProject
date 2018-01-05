import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {StoreUserInfo} from '../../../global/storeUserInfo';

@Component({
    selector: 'navigation-platform-component',
    templateUrl: 'navigationPlatform.component.html',
    styleUrls: ['navigationPlatform.component.scss']
})

export class NavigationPlatformComponent implements OnInit{
    user: User;
    notifications: number;
    constructor(private storeUserInfo: StoreUserInfo) {}
    ngOnInit() {
        this.user = this.storeUserInfo.MyUser;
    }
}
