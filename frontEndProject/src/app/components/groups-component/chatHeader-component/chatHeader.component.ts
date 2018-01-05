import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../../../models/group';

@Component({
    selector: 'chat-header-component',
    templateUrl: 'ChatHeader.component.html',
    styleUrls: ['ChatHeader.component.scss']
})

export class ChatHeaderComponent implements OnInit {
    @Input() group;
    ngOnInit() {
    }
}
