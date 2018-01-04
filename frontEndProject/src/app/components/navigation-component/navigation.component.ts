import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
    selector: 'navigation-component',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.scss']
})

export class NavigationComponent implements OnInit {
    isLoggedIn: Boolean = false;
    constructor(private loginService: LoginService) {}
    ngOnInit() {
        this.isLoggedIn = this.loginService.isLoggedIn();
    }
}
