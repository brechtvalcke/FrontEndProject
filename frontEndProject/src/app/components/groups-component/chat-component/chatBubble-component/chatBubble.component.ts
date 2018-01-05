import { StoreUserInfo } from './../../../../global/storeUserInfo';
import { User } from './../../../../models/user';
import {Component, Input} from '@angular/core';
import {Message} from '../../../../models/message';

@Component({
    selector: 'chat-bubble-component',
    templateUrl: 'chatBubble.component.html',
    styleUrls: ['chatBubble.component.scss']
})

export class ChatBubbleComponent {
constructor(private storeUserInfo: StoreUserInfo) {}
    myUser: User = this.storeUserInfo.MyUser;
    @Input() message: Message;
    @Input() users: User[];
    @Input() showTime: Boolean;
    getUserById(id: String): User {
        let userToReturn: User = new User();
        if (this.users !== undefined){
            this.users.forEach(user => {
                if (user._id === id){
                    userToReturn = user;
                }
            });
        }
        return userToReturn;
    }
}
