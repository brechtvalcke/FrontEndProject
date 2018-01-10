import { StoreUserInfo } from './../../../global/storeUserInfo';

import { SocketService } from './../../../services/socket.service';
import { Message } from './../../../models/message';
import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Group} from '../../../models/group';
import { UserTyping } from '../../../models/UserTyping';
import { User } from '../../../models/user';

@Component({
    selector: 'chat-component',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.scss']
})

export class ChatComponent implements OnInit {
    constructor(private socketService: SocketService, private storeUserInfo: StoreUserInfo ) {}
    private _group: Group;
    private nextTimeScrollDown: Boolean;
    private prevScrollHeight: number;
    private UsersTyping = this.socketService.UsersTyping;
    private myUser = this.storeUserInfo.MyUser;
    @Input() set group(value: Group) {
        if (this._group) {
            this.socketService.sendStopTyping(this._group); // send stop typing to old group
        }
        this._group = value;
        this.MessageSendString = '';
        this.nextTimeScrollDown = true;
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
    getUserById(userId: String): User {
        let UserToReturn = new User();
        this.group.users.forEach((u: User) => {
            if (u._id === userId) {
                UserToReturn = u;
            }
        });
        return UserToReturn;
    }
    scrollDownIfNeeded(chatContainer): number {
        if (this.nextTimeScrollDown) {
            this.nextTimeScrollDown = false;
            this.prevScrollHeight = chatContainer.scrollHeight;
            return chatContainer.scrollHeight;
        }
        if (this.prevScrollHeight) {
            const scrollDiff = this.prevScrollHeight - chatContainer.scrollHeight;
            this.prevScrollHeight = chatContainer.scrollHeight;
            const newScrollPosition = chatContainer.scrollTop - scrollDiff;
            return newScrollPosition;
        }
        this.prevScrollHeight = chatContainer.scrollHeight;
        return chatContainer.scrollTop;
    }
    sendMessage(): void {
        this.socketService.sendMesage(this.group._id, this.MessageSendString);
        this.socketService.sendStopTyping(this.group._id);
        this.MessageSendString = '';
        this.nextTimeScrollDown = true;
    }
    OnInput(): void {
        if (this.MessageSendString !== '' && this.MessageSendString) {
            this.socketService.sendStartedTyping(this.group._id);
        }else{
            this.socketService.sendStopTyping(this.group._id)
        }
    }
    OnLostFocus(): void {
        this.socketService.sendStopTyping(this.group._id);
    }
    ngOnInit() {
        this.socketService.MessageObservable.subscribe((newMessage) => {
            if (newMessage.groupId === this.group._id) {
                this.group.messages.push(newMessage);
                this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
            }
        });
        this.socketService.UsersTypingObservable.subscribe((UsersTyping: [UserTyping]) => {
            console.log(UsersTyping);
            this.UsersTyping = UsersTyping;
        });
    }
}
