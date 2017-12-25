import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from '../components/main-component/main.component';

// components
import {PROTECTED_ROUTES} from './protected-routes';

// routing Const

const routes: Routes = [
    {path: 'dashboard', component: MainComponent , children: PROTECTED_ROUTES }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
