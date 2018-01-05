import {Routes} from '@angular/router';
import {GroupsComponent} from '../components/groups-component/groups.component';
import {CreateGroupComponent} from '../components/createGroup-component/createGroup.component';
import {InviteComponent} from '../components/invite-component/invite.component';
import {NavigationPlatformComponent} from '../components/navigation-component/navigationPlatform.component/navigationPlatform.component';

export const PROTECTED_ROUTES: Routes = [
    {path: 'group/:id', component : GroupsComponent},
    {path: '', component : GroupsComponent},
    {path: 'create', component : CreateGroupComponent},
    {path: 'invite', component : InviteComponent},
];
