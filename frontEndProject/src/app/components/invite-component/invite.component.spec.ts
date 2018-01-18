import { TruncateModule } from 'ng2-truncate';
import { GroupService } from './../../services/group.service';
import { FbService } from './../../services/fb.service';
import { InviteComponent } from './invite.component';

import { TestBed, async } from '@angular/core/testing';
import { Group } from '../../models/group';

let InviteFriendsTriggered = false;
let AcceptInviteTriggered = false;
let DeclineInviteTriggered = false;
class FakeFbService {
    shareSite(): void {
        InviteFriendsTriggered = true;
    }
}
class FakeGroupService {
    getInvites(): Promise<[Group]> {
        return new Promise<any>((resolve, reject) => {
            const group = new Group();
            group.name = 'dsgs';
            group._id = 'sgsqg';
            resolve({groupList: []});
        });
    }
    acceptInvite(groupID: String): Promise<any> {
        AcceptInviteTriggered = true;
        return new Promise<any>((resolve, reject) => {
            resolve(true);
        });
    }
    declineInvite(groupID: String): Promise<any> {
        DeclineInviteTriggered = true;
         return new Promise<any>((resolve, reject) => {
            resolve(true);
        });
    }
}
describe('InviteComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
              InviteComponent,
            ],
            providers: [
                { provide: FbService, useClass: FakeFbService},
                { provide: GroupService, useClass: FakeGroupService}
            ],
            imports: [
                TruncateModule
            ]
          }).compileComponents();
    }));
    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(InviteComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it('should get invites on init', async(() => {
        const fixture = TestBed.createComponent(InviteComponent);
        const app = fixture.debugElement.componentInstance;
        app.ngOnInit();
        setTimeout(() => {
            expect(app.groups).toBeTruthy();
        }, 50);
    }));
    it('inviteFriends Should trigger shareSite', async(() => {
        const fixture = TestBed.createComponent(InviteComponent);
        const app = fixture.debugElement.componentInstance;
        InviteFriendsTriggered = false;
        app.inviteFriends();
        expect(InviteFriendsTriggered).toBeTruthy();
    }));
    it('acceptInvite should trigger service acceptInvite', async(() => {
        const fixture = TestBed.createComponent(InviteComponent);
        const app = fixture.debugElement.componentInstance;
        AcceptInviteTriggered = false;
        app.acceptInvite();
        expect(AcceptInviteTriggered).toBeTruthy();
    }));
    it('declineInvite should trigger service declineInvite', async(() => {
        const fixture = TestBed.createComponent(InviteComponent);
        const app = fixture.debugElement.componentInstance;
        DeclineInviteTriggered = false;
        app.declineInvite();
        expect(DeclineInviteTriggered).toBeTruthy();
    }));

});
