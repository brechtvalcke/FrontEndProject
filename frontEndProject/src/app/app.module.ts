import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// components
import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation-component/navigation.component';
import {LandingComponent} from './components/landing-component/landing.component';
import {MainComponent} from './components/main-component/main.component';
import {GroupsComponent} from './components/groups-component/groups.component';
import {GroupListComponent} from './components/groups-component/groupList-component/groupList.component';
import {ChatComponent} from './components/groups-component/chat-component/chat.component';
import {ChatBubbleComponent} from './components/groups-component/chat-component/chatBubble-component/chatBubble.component';
import {ChatHeaderComponent} from './components/groups-component/chatHeader-component/chatHeader.component';
import {GroupDetailComponent} from './components/groups-component/groupDetail-component/groupDetail.component';
import {CreateGroupComponent} from './components/createGroup-component/createGroup.component';
import {InviteComponent} from './components/invite-component/invite.component';
// Modules
import {CustomHttpModule} from './../coreClasses/CustomHttpModule';
import {AppRoutingModule} from './routing/app.routing.module';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        LandingComponent,
        MainComponent,
        GroupsComponent,
        GroupListComponent,
        ChatComponent,
        ChatBubbleComponent,
        ChatHeaderComponent,
        GroupDetailComponent,
        CreateGroupComponent,
        InviteComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
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
