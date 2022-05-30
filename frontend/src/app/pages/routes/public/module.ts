import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PublicRoutingModule} from './routes';

import {MainPage} from './main';
import {RegistrationPage} from './auth/registration';
import {LoginPage} from './auth/login';


@NgModule({
    declarations: [
        MainPage,
        RegistrationPage,
        LoginPage
    ],
    imports: [
        PublicRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class PublicModule {
}
