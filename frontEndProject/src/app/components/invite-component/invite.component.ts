import { InterComponentCommunicationService } from './../../services/interComponentCommunication.service';
import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/group';
import {GroupService} from '../../services/group.service';
import {FbService} from '../../services/fb.service';

@Component({
    selector: 'invite-component',
    templateUrl: 'invite.component.html',
    styleUrls: ['invite.component.scss']
})

export class InviteComponent implements OnInit {
    groups: Group[];
    constructor(private groupService: GroupService, private fbService: FbService, private interComponentCommunicationService: InterComponentCommunicationService) { }

    ngOnInit() {
        this.getInvites();
    }
    private getInvites() {
        this.groupService.getInvites()
            .then(groups => this.groups = groups['groupList'])
            .catch(error => console.log(error));
    }
    acceptInvite(groupID: String) {
        this.groupService.acceptInvite(groupID)
            .then(result => {
                this.removeGroup(groupID);
                this.interComponentCommunicationService.sendAcceptedOrDeclined(true);
            })
            .catch(error => {});
    }
    declineInvite(groupID: String) {
        this.groupService.declineInvite(groupID)
            .then(result => {
                this.removeGroup(groupID);
                this.interComponentCommunicationService.sendAcceptedOrDeclined(false);
            })
            .catch(error => {});
    }
    removeGroup(groupID: String) {
        this.groups = this.groups.filter(group => group._id !== groupID);
    }
    inviteFriends() {
        this.fbService.shareSite();
    }
}
