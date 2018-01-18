import { UserService } from './../../../services/user.service';
import { StoreUserInfo } from './../../../global/storeUserInfo';
import { FbService } from './../../../services/fb.service';
import { TestBed, async } from '@angular/core/testing';

import { ClickOutsideModule } from 'ng-click-outside/lib/click-outside.module';
import { NavigationPlatformComponent } from './navigationPlatform.component';
import { User } from '../../../models/user';

class FakeFbService {
    logout(): void {
    }
}
class FakeUserService {
    getUserInfo(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const user = new User();
            user.name = 'testnaam';
            user.photoUrl = 'testUrl';
            resolve(user);
        });
    }
}
describe('NavigationPlatformComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
              NavigationPlatformComponent,
            ],
            imports: [ClickOutsideModule],
            providers: [
                { provide: FbService, useClass: FakeFbService},
                StoreUserInfo,
                {provide: UserService, useClass: FakeUserService}
                ]
          }).compileComponents();
    }));
    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(NavigationPlatformComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it('user should be set on init', async(() => {
        const fixture = TestBed.createComponent(NavigationPlatformComponent);
        const app = fixture.debugElement.componentInstance;
        app.ngOnInit();
        setTimeout(() => {
            expect(app.user).toBeTruthy();
        }, 10);
    }));
    it('toggleDropDown should toggle showDropDown', async(() => {
        const fixture = TestBed.createComponent(NavigationPlatformComponent);
        const app = fixture.debugElement.componentInstance;
        app.showDropDown = false;
        app.toggleDropDown();
        expect(app.showDropDown).toBeTruthy();
        app.toggleDropDown();
        expect(app.showDropDown).toBeFalsy();
    }));
    it('showDropDown should be false by default', async(() => {
        const fixture = TestBed.createComponent(NavigationPlatformComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.showDropDown).toBeFalsy();
    }));

});
