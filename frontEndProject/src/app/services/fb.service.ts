import { Router } from '@angular/router';
import { StoreUserInfo } from './../global/storeUserInfo';
import { UserService } from './user.service';
import { FacebookService, InitParams, LoginResponse, LoginStatus, LoginOptions } from 'ngx-facebook';
import {Injectable} from '@angular/core';
import {CustomHttpModule} from '../../coreClasses/CustomHttpModule';


@Injectable()
export class FbService {
    private headers = new Headers({ 'Content-Type' : 'application/json' });
    private dirtyChecker: any;
    constructor(
        private http: CustomHttpModule,
        private fb: FacebookService,
        private userService: UserService,
        private storeUserInfo: StoreUserInfo,
        private router: Router
    ) {
              fb.init(this.initParams);
              this.startDirtyCheckingToken();
        }
        private initParams: InitParams = {
            appId: '397459757339390',
            xfbml: true,
            version: 'v2.11'
        };
        private shareParams = {
            href: 'https://howestmeetme.herokuapp.com/',
            method: 'share',
        }
        private loginOptions: LoginOptions = {
            scope: 'email,user_friends'
        };
        login(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                this.fb.login(this.loginOptions)
                .then((response: LoginResponse) => {
                    localStorage.setItem('access_token', response.authResponse.accessToken);
                    this.userService.getUserInfo()
                    .then(user => this.storeUserInfo.MyUser = user)
                    .catch(error => console.log(error));
                    clearInterval(this.dirtyChecker);
                    this.startDirtyCheckingToken();
                    resolve(response);
                })
                .catch(error => reject(error));
            });
        }
        logout(): void {
            clearInterval(this.dirtyChecker);
            localStorage.removeItem('access_token');
            this.router.navigate(['landing']);
            this.fb.logout();
        }
        getAccesToken(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                this.fb.getLoginStatus()
                .then( (status: LoginStatus) => {
                    if (status.status === 'connected') {
                        resolve(status.authResponse.accessToken);
                    }
                })
                .catch(error => reject(error));
            });
        }
        isLoggedIn(): boolean {
            const token = localStorage.getItem('access_token');
            if (token === undefined || token === null || token === '' ) {
                return false;
              }
              return true;
        }

        shareSite(): void {
            this.fb.ui(this.shareParams);
        }
        // enige optie om token up to date te houden zonder in elke service de token up te daten voor men een request uitvoert ( geneste callbacks )
        startDirtyCheckingToken(): void {
            this.dirtyChecker = setInterval(() => {
                this.getAccesToken().then(token => {
                    localStorage.setItem('access_token', token);
                });
            }, 100);
        }
    handleError(error: any): Promise < any > {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
