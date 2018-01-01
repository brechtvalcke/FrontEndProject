import {User} from './user';

export class Message {
    public id: String;
    public messages: [String];
    public dateSent: Date;
    public user: User;
}
