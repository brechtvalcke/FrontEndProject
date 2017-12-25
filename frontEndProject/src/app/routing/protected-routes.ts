import {Routes} from '@angular/router';
import {GroupsComponent} from '../components/groups-component/groups.component';
import {CreateGroupComponent} from '../components/createGroup-component/createGroup.component';
import {InviteComponent} from '../components/invite-component/invite.component';

export const PROTECTED_ROUTES: Routes = [
    {path: '', component : GroupsComponent},
    {path: 'create', component : CreateGroupComponent},
    {path: 'invite', component : InviteComponent},
];
