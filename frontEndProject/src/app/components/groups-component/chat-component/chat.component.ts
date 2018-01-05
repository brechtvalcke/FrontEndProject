import { SocketService } from './../../../services/socket.service';
import { Message } from './../../../models/message';
import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Group} from '../../../models/group';

@Component({
    selector: 'chat-component',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.scss']
})

export class ChatComponent implements OnInit {
    constructor(private socketService: SocketService) {}
    private _group: Group;
    @Input() set group(value: Group) {
        this._group = value;
        this.MessageSendString = '';
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
    get group(): Group {
        return this._group;
    }
    @ViewChild('chatContainer') chatContainer;
    MessageSendString: String = '';
    showTimeAboveMessage(message: Message): Boolean {
        let show = false;
        for (let i = 0; i <= this.group.messages.length - 1; i++) {
            if (this.group.messages[i] === message) {
                if (!this.group.messages[i - 1]) {
                    show = true;
                } else {
                    const prevMessage = this.group.messages[i - 1];
                    message.dateSent = new Date(message.dateSent);
                    prevMessage.dateSent = new Date(prevMessage.dateSent);
                    const timeDiff = message.dateSent.getTime() - prevMessage.dateSent.getTime();
                    if (timeDiff > 3600000) {
                        return true;
                    }
                }
            }

        }
        return show;
    }
    sendMessage(): void {
        console.log(this.MessageSendString);
        this.socketService.sendMesage(this.group._id, this.MessageSendString);
        this.MessageSendString = '';
    }

    ngOnInit() {
        this.socketService.MessageObservable.subscribe((newMessage) => {
            if (newMessage.groupId === this.group._id) {
                this.group.messages.push(newMessage);
                this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
            }
        });
    }
}
