import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/group';
import {GroupService} from '../../services/group.service';

@Component({
    selector: 'invite-component',
    templateUrl: 'invite.component.html',
    styleUrls: ['invite.component.scss']
})

export class InviteComponent implements OnInit {
    groups: Group[];
    constructor(private groupService: GroupService) { }

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
            .then(result => this.removeGroup(groupID))
            .catch(error => {});
    }
    declineInvite(groupID: String) {
        this.groupService.declineInvite(groupID)
            .then(result => this.removeGroup(groupID))
            .catch(error => {});
    }
    removeGroup(groupID: String) {
        this.groups = this.groups.filter(group => group._id !== groupID);
    }
}
