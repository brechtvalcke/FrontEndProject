import { ChatTabComponent } from './chatTab.component';
import { TestBed, async } from '@angular/core/testing';

describe('GroupsComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChatTabComponent
            ],
            providers: [

            ],
            imports : [

            ]
        }).compileComponents();
    }));
    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(ChatTabComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it('default tab should be 0', async() => {
        const fixture = TestBed.createComponent(ChatTabComponent);
        const app = fixture.debugElement.componentInstance;
        app.ngOnInit();
        expect(app.activeTab).toBe(0);
    });
    it('should set the clicked tab as tab', async(() => {
        const fixture = TestBed.createComponent(ChatTabComponent);
        const app = fixture.debugElement.componentInstance;
        app.ngOnInit();
        app.changeTab(0);
        expect(app.activeTab).toBe(0);
        app.changeTab(1);
        expect(app.activeTab).toBe(1);
    }));
});
