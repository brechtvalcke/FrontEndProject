import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import {PROTECTED_ROUTES} from './protected-routes';
import {LandingComponent} from '../components/landing-component/landing.component';
import {MainComponent} from '../components/main-component/main.component';
import {NavigationLoggedOutComponent} from '../components/navigation-component/navigationLoggedOut-component/navigationLoggedOut.component';
import {NavigationPlatformComponent} from '../components/navigation-component/navigationPlatform.component/navigationPlatform.component';
import {LoggedInGuard} from '../guards/loggedInGuard';

// routing Const

const routes: Routes = [
    {path: 'dashboard', component: MainComponent , children: PROTECTED_ROUTES}, // , canActivate: [LoggedInGuard]},
    {path: '', component: NavigationLoggedOutComponent, outlet: 'header'},
    {path: '', component:  LandingComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
