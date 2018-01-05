import { FbService } from './../../../services/fb.service';
import {Component} from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import {UserService} from '../../../services/user.service';
import {StoreUserInfo} from '../../../global/storeUserInfo';
@Component({
    selector: 'navigation-logged-out-component',
    templateUrl: 'navigationLoggedOut.component.html',
    styleUrls: ['navigationLoggedOut.component.scss']
})

export class NavigationLoggedOutComponent {
    constructor(private fbService: FbService,
                private userService: UserService,
                private storeUserInfo: StoreUserInfo,
                private router: Router) {}

    LogInClicked(event: any): void {
        this.fbService.login().then(result => {
            this.userService.getUserInfo()
                .then(user => this.storeUserInfo.MyUser = user)
                .catch(error => console.log(error));
            this.router.navigate(['']);
        });
    }

}
