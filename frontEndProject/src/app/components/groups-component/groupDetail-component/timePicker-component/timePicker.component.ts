import { Router , ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'timer-picker-component',
    templateUrl: 'timePicker.component.html',
    styleUrls: ['timePicker.component.scss']
})

export class TimePickerComponent implements OnInit {
    value: any;
    @Output() close = new EventEmitter();
    @Output() time = new EventEmitter();
    ngOnInit() {}

    saveTime() {
        this.time.emit(this.value);
        this.closePopUp();
    }
    closePopUp() {
        this.value = '';
        this.close.emit(true);
    }
}




