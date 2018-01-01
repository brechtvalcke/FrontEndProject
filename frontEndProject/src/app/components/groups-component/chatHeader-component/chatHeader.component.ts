import {Component, Input} from '@angular/core';

@Component({
    selector: 'chat-header-component',
    templateUrl: 'ChatHeader.component.html',
    styleUrls: ['ChatHeader.component.scss']
})

export class ChatHeaderComponent {
    @Input() groupName;

}
