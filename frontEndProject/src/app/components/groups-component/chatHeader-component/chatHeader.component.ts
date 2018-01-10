import {Component, HostListener, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Group} from '../../../models/group';
import {Router} from '@angular/router';
import { GroupService } from '../../../services/group.service';

@Component({
    selector: 'chat-header-component',
    templateUrl: 'ChatHeader.component.html',
    styleUrls: ['ChatHeader.component.scss']
})

export class ChatHeaderComponent implements OnInit {
    windowSize: number;
    isDropped: Boolean = false;
    isChangeName: Boolean = false;
    newName: String;
    private _group: Group;
    @Input() set group(value: Group) {
        this._group = value;
        this.newName = this.group.name;
    }
    get group (): Group {
        return this._group;
    }
    constructor(private router: Router, private groupService: GroupService) {}

    ngOnInit() {
        this.windowSize = window.innerWidth;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.windowSize = window.innerWidth;
    }
    goBackToGroups() {
        this.router.navigate(['/dashboard/group']);
    }

    showDropDown() {
        this.isDropped = !this.isDropped;
    }
    changeName() {
        this.isChangeName = true;
        this.onClickedOutside();

    }
    onClickedOutside() {
        this.isDropped = false;
    }
    saveName() {
        if (this.newName.length >= 3) {
            this.isChangeName = false;
            this.groupService.changeName(this.group._id, this.newName);
        }
    }
}
