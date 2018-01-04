import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/group';
import {GroupService} from '../../services/group.service';

@Component({
    selector: 'invite-component',
    templateUrl: 'invite.component.html',
    styleUrls: ['invite.component.scss']
})

export class InviteComponent implements OnInit {
    groups: [Group];
    constructor(private groupService: GroupService) { }

    ngOnInit() {
        this.getInvites();
    }
    private getInvites() {
        this.groupService.getInvites()
            .then(groups => {this.groups = groups['groupList']; console.log(groups);})
            .catch(error => console.log(error));
    }
}
