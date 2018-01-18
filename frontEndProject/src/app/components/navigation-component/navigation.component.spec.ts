import { FbService } from './../../services/fb.service';
import { NavigationPlatformComponent } from './navigationPlatform.component/navigationPlatform.component';
import { TestBed, async } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { NavigationLoggedOutComponent } from './navigationLoggedOut-component/navigationLoggedOut.component';
import { ClickOutsideModule } from 'ng-click-outside/lib/click-outside.module';

class FakeFbService {
    isLoggedIn(): boolean {
        return false;
    }
}
describe('NavigationComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
              NavigationComponent,
              NavigationPlatformComponent,
              NavigationLoggedOutComponent
            ],
            imports: [ClickOutsideModule],
            providers: [{ provide: FbService, useClass: FakeFbService}]
          }).compileComponents();
    }));
    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(NavigationComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it('IsDropped should be closed by default', async(() => {
        const fixture = TestBed.createComponent(NavigationComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.isDropped).toBeFalsy();
    }));
    it('showDropDown should toggel IsDropped', async(() => {
        const fixture = TestBed.createComponent(NavigationComponent);
        const app = fixture.debugElement.componentInstance;
        app.IsDropped = false;
        app.showDropDown();
        expect(app.isDropped).toBeTruthy();
        app.showDropDown();
        expect(app.isDropped).toBeFalsy();
    }));
});
