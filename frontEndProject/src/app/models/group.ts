import {User} from './user';
import {TimeSlot} from './timeSlot';
import {Activity} from './activity';
import {Message} from './message';

export class Group {
    public _id: String;
    public id: String;
    public name: String;
    public createBy: String;
    public createdOn: String;
    public messages: [Message];
    public users: [User];
    public timeSlots: [TimeSlot];
    public activities: [Activity];
}
