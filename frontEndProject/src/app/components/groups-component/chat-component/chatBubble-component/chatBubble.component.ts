import {Component, Input} from '@angular/core';
import {Message} from '../../../../models/message';

@Component({
    selector: 'chat-bubble-component',
    templateUrl: 'chatBubble.component.html',
    styleUrls: ['chatBubble.component.scss']
})

export class ChatBubbleComponent {
    message: Message;
    @Input() messages;
}
