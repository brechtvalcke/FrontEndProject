import { FbService } from './../services/fb.service';
import {Injectable} from '@angular/core';
import {CanActivate, CanDeactivate, Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private fbService: FbService, private router: Router) {}

    canActivate(): boolean {
        const LoggedIn = this.fbService.isLoggedIn();
        return LoggedIn;
    }
}





