import {Component} from '@angular/core';
import {User} from '../../models/user';

@Component({
    selector: 'create-group-component',
    templateUrl: 'createGroup.component.html',
    styleUrls: ['createGroup.component.scss']
})

export class CreateGroupComponent {
    users: [User];
}
