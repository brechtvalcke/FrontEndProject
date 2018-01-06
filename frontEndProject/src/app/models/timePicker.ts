export class TimePicker {

    constructor() {
        this.setupTime();
        this.setupPeriod();
        this.handleFormState();
        this.handleTimeState();
    }

    bindEvent(el, callback, eventName) {
        for (let i = 0; i < el.length; i++) {
            el[i].addEventListener(eventName, callback, false);
        }
    }
    setupTime() {
        const hours = document.querySelectorAll('.analog--hour');
        const minutes = document.querySelectorAll('.analog--minute');

        const updateHours = function(evt) {
            const hours = evt.target.innerHTML;
            const superHour = document.querySelector('.hours');
            const mainHour = document.querySelectorAll('.hours')[1];
            superHour.innerHTML = hours;
            mainHour.innerHTML = hours;
            active(evt.target);
        };

        let updateMinutes = function(evt) {
            const minutes = evt.target.innerHTML;
            const superMinutes = document.querySelector('.minutes');
            const mainMinutes = document.querySelectorAll('.minutes')[1];
            superMinutes.innerHTML = minutes;
            mainMinutes.innerHTML = minutes;
            active(evt.target);
        };

        let active = function(el) {
            console.log(el);
        };

        this.bindEvent(minutes, updateMinutes, 'click');
        this.bindEvent(hours, updateHours, 'click');
    }

    setupPeriod() {
        const period = document.querySelectorAll('.digital--period');
        const am = document.querySelectorAll('.digital--period')[0];
        const pm = document.querySelectorAll('.digital--period')[1];

        const updatePeriod = function(evt) {
            const period = evt.target.innerHTML;

            if (period === 'am') {
                am.className = 'digital--period light';
                pm.className = 'digital--period ultra-light';
            } else {
                am.className = 'digital--period ultra-light';
                pm.className = 'digital--period light';
            }

            document.querySelector('.period').innerHTML = period;
        };

        this.bindEvent(period, updatePeriod, 'click');
    }

    handleFormState() {
        const number = document.querySelectorAll('.analog--hours');

        const setActive = function(evt) {
            const number = evt.target;
            const timePicker = document.querySelector('.time-picker');
            timePicker.className = 'time-picker minutes-state';
        };

        this.bindEvent(number, setActive, 'click');
    }

    handleTimeState() {
        const number = document.querySelectorAll('span[data-deg]');
        const hand = document.querySelectorAll('.analog--hand');

        const setHourState = function(evt) {
            const el = evt.target;
            const deg = el.dataset.deg;
            const elClass = el.className;
            hand[0].className = 'analog--hand ' + deg;
        };

        const setMintueState = function(evt) {
            const el = evt.target;
            const deg = el.dataset.deg;
            const elClass = el.className;
            hand[1].className = 'analog--hand ' + deg;
        };

        this.bindEvent(number, setHourState, 'mouseenter');
        this.bindEvent(number, setMintueState, 'mouseenter');
    }
}
