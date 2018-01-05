import {User} from './user';

export class Message {
    public senderId: String;
    public message: String;
    public dateSent: Date;
    public usersViewed: User[];
    public groupId: String;
}
