import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Group} from '../../../models/group';
import {Router} from '@angular/router';

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
    @Input() group;
    constructor(private router: Router) {}

    ngOnInit() {
        this.windowSize = window.innerWidth;
        this.newName = this.group.name;
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
        }
    }
}
