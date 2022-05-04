import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {MainPage} from '../main';
import {SignupPage} from './auth/signup';
import {SigninPage} from './auth/signin';

import {PublicRoutingModule} from './routes';


@NgModule({
    declarations: [
        MainPage, SignupPage, SigninPage
    ],
    imports: [
        PublicRoutingModule,
        FormsModule
    ]
})
export class PublicModule {
}