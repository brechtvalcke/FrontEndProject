import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'chat-tab-component',
    templateUrl: 'chatTab.component.html',
    styleUrls: ['chatTab.component.scss']
})

export class ChatTabComponent implements OnInit {
    activeTab = 0;

    @Output() selectedTab = new EventEmitter();
    ngOnInit() {
        this.activeTab = 0;
    }

    changeTab(clickedTab: number) {
        let tab: String;
        this.activeTab = clickedTab;
        switch (clickedTab) {
            case 0:
                tab = 'chat';
                break;
            case 1:
                tab = 'detail';
                break;
        }
        this.selectedTab.emit(tab);
    }
}
