import { NetworkCalls } from './global/networkCalls';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// components
import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation-component/navigation.component';
import {NavigationLoggedOutComponent} from './components/navigation-component/navigationLoggedOut-component/navigationLoggedOut.component';
import {NavigationPlatformComponent} from './components/navigation-component/navigationPlatform.component/navigationPlatform.component';
import {LandingComponent} from './components/landing-component/landing.component';
import {MainComponent} from './components/main-component/main.component';
import {GroupsComponent} from './components/groups-component/groups.component';
import {GroupListComponent} from './components/groups-component/groupList-component/groupList.component';
import {ChatComponent} from './components/groups-component/chat-component/chat.component';
import {ChatBubbleComponent} from './components/groups-component/chat-component/chatBubble-component/chatBubble.component';
import {ChatHeaderComponent} from './components/groups-component/chatHeader-component/chatHeader.component';
import {ChatTabComponent} from './components/groups-component/chatTab-component/chatTab.component';
import {GroupDetailComponent} from './components/groups-component/groupDetail-component/groupDetail.component';
import {CreateGroupComponent} from './components/createGroup-component/createGroup.component';
import {InviteComponent} from './components/invite-component/invite.component';

import {LoggedInGuard} from './guards/loggedInGuard';
import {LoginService} from './services/login.service';
import {GroupService} from './services/group.service';
import {UserService} from './services/user.service';
import { FbService } from './services/fb.service';
import {StoreUserInfo} from './global/storeUserInfo';
import {SocketService} from './services/socket.service'

// Modules
import {CustomHttpModule} from './../coreClasses/CustomHttpModule';
import {AppRoutingModule} from './routing/app.routing.module';
import {HttpModule} from '@angular/http';
import { FacebookModule } from 'ngx-facebook';
import {FormsModule} from '@angular/forms';
import {TruncateModule} from 'ng2-truncate';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        NavigationLoggedOutComponent,
        NavigationPlatformComponent,
        LandingComponent,
        MainComponent,
        GroupsComponent,
        GroupListComponent,
        ChatComponent,
        ChatBubbleComponent,
        ChatHeaderComponent,
        ChatTabComponent,
        GroupDetailComponent,
        CreateGroupComponent,
        InviteComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
        FacebookModule.forRoot(),
        TruncateModule
    ],
    providers: [
        {
            provide: CustomHttpModule, useClass: CustomHttpModule
        },
        LoginService,
        LoggedInGuard,
        GroupService,
        UserService,
        FbService,
        StoreUserInfo,
        SocketService,
        NetworkCalls
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
