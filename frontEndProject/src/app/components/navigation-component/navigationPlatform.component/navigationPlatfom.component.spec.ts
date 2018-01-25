import { SocketService } from './../../../services/socket.service';
import { NetworkCalls } from './../../../global/networkCalls';
import { Message } from './../../../models/message';
import { Observable } from 'rxjs/Observable';
import { Group } from './../../../models/group';
import { GroupService } from './../../../services/group.service';
import { UserService } from './../../../services/user.service';
import { StoreUserInfo } from './../../../global/storeUserInfo';
import { FbService } from './../../../services/fb.service';
import { TestBed, async } from '@angular/core/testing';

import { ClickOutsideModule } from 'ng-click-outside/lib/click-outside.module';
import { NavigationPlatformComponent } from './navigationPlatform.component';
import { User } from '../../../models/user';
import { TimeslotVoteEvent } from '../../../models/timeslotVoteEvent';
import { TimeslotAddEvent } from '../../../models/timeslotAddEvent';
import { ActivityAddEvent } from '../../../models/activityAddEvent';
import { UserTyping } from '../../../models/UserTyping';
import { ActivityVoteEvent } from '../../../models/activityVoteEvent';
import { Observer } from 'rxjs/Observer';
import { InterComponentCommunicationService } from '../../../services/interComponentCommunication.service';

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
class FakeGroupService {
    constructor() {

    }
    getInvites(): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            resolve({GroupList: [new Group(), new Group]});
        });
    }
}
class FakeSocketService {
    MessageObservable: Observable<Message>;
    private _messageObserver: Observer<Message>;

    ActivityVoteObservable: Observable<ActivityVoteEvent>;
    private _activityVoteObserver: Observer<ActivityVoteEvent>;

    TimeslotVoteObservable: Observable<TimeslotVoteEvent>;
    private _timeslotVoteObserver: Observer<TimeslotVoteEvent>;

    TimeslotAddObservable: Observable<TimeslotAddEvent>;
    private _timeslotAddObserver: Observer<TimeslotAddEvent>;

    ActivityAddObservable: Observable<ActivityAddEvent>;
    private _activityAddObserver: Observer<ActivityAddEvent>;

    GroupNameChangedObservable: Observable<Group>;
    private _groupNameChangedObserver: Observer<Group>;

    UsersTyping: [UserTyping] = [new UserTyping()];

    UsersTypingObservable: Observable<[UserTyping]>;
    private _usersTypingObserver: Observer<[UserTyping]>;

    constructor(private networkCalls:NetworkCalls) {
        this.MessageObservable = new Observable<Message>(observer =>
        this._messageObserver = observer).share();

        this.ActivityVoteObservable = new Observable<ActivityVoteEvent>(observer =>
        this._activityVoteObserver = observer).share();

        this.TimeslotVoteObservable = new Observable<TimeslotVoteEvent>(observer =>
        this._timeslotVoteObserver = observer).share();

        this.TimeslotAddObservable = new Observable<TimeslotAddEvent>(observer =>
        this._timeslotAddObserver = observer).share();

        this.ActivityAddObservable = new Observable<ActivityAddEvent>(observer =>
        this._activityAddObserver = observer).share();

        this.GroupNameChangedObservable = new Observable<Group>(observer =>
        this._groupNameChangedObserver = observer).share();

        this.UsersTypingObservable = new Observable<[UserTyping]>(observer =>
            this._usersTypingObserver = observer).share();


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
                {provide: UserService, useClass: FakeUserService},
                {provide: GroupService, useClass: FakeGroupService },
                {provide: SocketService, userClass: FakeSocketService},
                InterComponentCommunicationService
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
