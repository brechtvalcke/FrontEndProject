import { StoreUserInfo } from './../global/storeUserInfo';
import { UserService } from './user.service';
import { FacebookService, InitParams, LoginResponse, LoginStatus, LoginOptions } from 'ngx-facebook';
import {Injectable} from '@angular/core';
import {CustomHttpModule} from '../../coreClasses/CustomHttpModule';


@Injectable()
export class FbService {
    private headers = new Headers({ 'Content-Type' : 'application/json' });
    constructor(
        private http: CustomHttpModule,
        private fb: FacebookService,
        private userService: UserService,
        private storeUserInfo: StoreUserInfo,
    ) {
              fb.init(this.initParams);
        }
        private initParams: InitParams = {
            appId: '397459757339390',
            xfbml: true,
            version: 'v2.11'
        };
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
                    resolve(response);
                })
                .catch(error => reject(error));
            });
        }
        getAccesToken(): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                this.fb.getLoginStatus()
                .then( (status: LoginStatus) => resolve(status.authResponse.accessToken))
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
    handleError(error: any): Promise < any > {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
