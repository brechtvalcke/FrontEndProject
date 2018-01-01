import {Injectable} from '@angular/core';
import {CanActivate, CanDeactivate, Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {}

    canActivate() {
        const LoggedIn = this.loginService.isLoggedIn();
        return LoggedIn;
    }
}





