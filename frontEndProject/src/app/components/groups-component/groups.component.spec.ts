import { Observable } from 'rxjs/Observable';
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

class FakeGroupService {
    constructor() {

    }
}
class FakeRouter {
    navigate(...params): void {

    }
}
class FakeActivatedRoute {
    params = new Observable<{[key: string]: any}>();
}
class FakeSocketService {

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
              AppComponent
            ],
            providers: [
                {provide: GroupService, useClass: FakeGroupService},
                {provide : Router, useClass: FakeRouter},
                {provide: ActivatedRoute, useClass: FakeActivatedRoute},
                {provide: SocketService, userClass: FakeSocketService},
            ],
            imports : [
                TruncateModule,
                FormsModule,
                BrowserModule
            ]
        }).compileComponents();
    }));
    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(GroupsComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));


});
