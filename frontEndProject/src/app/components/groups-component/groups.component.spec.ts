import { ActivityService } from './../../services/activity.service';
import { TimeslotService } from './../../services/timeslot.service';
import { NetworkCalls } from './../../global/networkCalls';
import { Message } from './../../models/message';
import { Group } from './../../models/group';
import { ChatBubbleComponent } from './chat-component/chatBubble-component/chatBubble.component';
import { ClickOutsideModule } from 'ng-click-outside/lib/click-outside.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { ActivityPickerComponent } from './groupDetail-component/activityPicker-component/activityPicker.component';
import { SocketService } from './../../services/socket.service';
import { GroupService } from './../../services/group.service';
import { GroupsComponent } from './groups.component';
import { TestBed, async } from '@angular/core/testing';
import { Router , ActivatedRoute} from '@angular/router';
import { GroupDetailComponent } from './groupDetail-component/groupDetail.component';
import { GroupListComponent } from './groupList-component/groupList.component';
import { ChatHeaderComponent } from './chatHeader-component/chatHeader.component';
import { ChatComponent } from './chat-component/chat.component';
import { ChatTabComponent } from './chatTab-component/chatTab.component';
import { TimePickerComponent } from './groupDetail-component/timePicker-component/timePicker.component';
import { TruncateModule } from 'ng2-truncate/dist/truncate.module';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import {RouterTestingModule} from '@angular/router/testing';
import { setTimeout } from 'timers';
import { Observer } from 'rxjs/Observer';
import { ActivityVoteEvent } from '../../models/activityVoteEvent';
import { TimeslotVoteEvent } from '../../models/timeslotVoteEvent';
import { TimeslotAddEvent } from '../../models/timeslotAddEvent';
import { ActivityAddEvent } from '../../models/activityAddEvent';
import { UserTyping } from '../../models/UserTyping';
class FakeGroupService {
    constructor() {

    }
    getAllGroups(): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            resolve({GroupList:[new Group(), new Group]});
        });
    }
}
class FakeRouter {
    navigate(...params): void {

    }
}
class FakeActivatedRoute {
    constructor(){
        this.params = new Observable<{[key: string]: any}>(observer =>
        this._params = observer).share();
    }
    params: Observable<{[key: string]: any}>;
    private _params: Observer<{[key: string]: any}>;
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
describe('GroupsComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
              GroupsComponent,
              GroupListComponent,
              GroupDetailComponent,
              GroupDetailComponent,
              ChatHeaderComponent,
              ChatComponent,
              ChatTabComponent,
              TimePickerComponent,
              ActivityPickerComponent,
              AppComponent,
              ChatBubbleComponent,
            ],
            providers: [
                {provide: GroupService, useClass: FakeGroupService},
                {provide : Router, useClass: FakeRouter},
                {provide: ActivatedRoute, useClass: FakeActivatedRoute},
                {provide: SocketService, userClass: FakeSocketService},
                NetworkCalls
            ],
            imports : [
                TruncateModule,
                FormsModule,
                BrowserModule,
                ClickOutsideModule,
                RouterTestingModule,
            ]
        }).compileComponents();
    }));
    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(GroupsComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));


});