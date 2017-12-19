import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// components
import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation-component/navigation.component';
import {GroupsComponent} from './components/groups-component/groups.component';
import {GroupListComponent} from './components/groups-component/groupList-component/groupList.component';
import {ChatComponent} from './components/groups-component/chat-component/chat.component';
import {GroupDetailComponent} from './components/groups-component/groupDetail-component/groupDetail.component';
import {CreateGroupComponent} from './components/createGroup-component/createGroup.component';
// Modules
import {CustomHttpModule} from './../coreClasses/CustomHttpModule';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        GroupsComponent,
        GroupListComponent,
        ChatComponent,
        GroupDetailComponent,
        CreateGroupComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        {
            provide: CustomHttpModule, useClass: CustomHttpModule
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
