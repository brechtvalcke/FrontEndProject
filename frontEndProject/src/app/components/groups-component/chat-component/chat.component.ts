import {Component, Input} from '@angular/core';
import {Group} from '../../../models/group';

@Component({
    selector: 'chat-component',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.scss']
})

export class ChatComponent {
    @Input() group: Group;
}
