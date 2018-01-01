import {Component} from '@angular/core';
import {User} from '../../models/user';
import {Group} from '../../models/group';

@Component({
    selector: 'invite-component',
    templateUrl: 'invite.component.html',
    styleUrls: ['invite.component.scss']
})

export class InviteComponent {
    groups: [Group];
}
