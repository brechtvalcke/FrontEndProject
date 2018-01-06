import {Component, HostListener, Input, OnInit} from '@angular/core';
import { Group } from '../../../models/group';

@Component({
    selector: 'chat-header-component',
    templateUrl: 'ChatHeader.component.html',
    styleUrls: ['ChatHeader.component.scss']
})

export class ChatHeaderComponent implements OnInit {
    windowSize: number;
    isDropped: Boolean = false;
    @Input() group;
    ngOnInit() {
        this.windowSize = window.screen.width;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.windowSize = window.screen.width;
    }
    showDropDown() {
        this.isDropped = !this.isDropped;
    }
    onClickedOutside() {
        this.isDropped = false;
    }
}
