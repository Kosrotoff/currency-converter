import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';

import {MainPage} from './main';
import {RegistrationPage} from './auth/registration';
import {LoginPage} from './auth/login';


const routes: Routes = [
    {path: '', component: MainPage},
    {path: 'registration', component: RegistrationPage},
    {path: 'login', component: LoginPage},
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PublicRoutingModule {
}
