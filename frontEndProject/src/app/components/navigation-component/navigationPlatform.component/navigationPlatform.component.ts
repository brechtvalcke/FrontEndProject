import {Component} from '@angular/core';
import {User} from '../../../models/user';

@Component({
    selector: 'navigation-platform-component',
    templateUrl: 'navigationPlatform.component.html',
    styleUrls: ['navigationPlatform.component.scss']
})

export class NavigationPlatformComponent {
    user: User;
    notifications: number;
}
