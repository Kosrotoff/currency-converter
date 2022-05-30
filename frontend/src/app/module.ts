import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {routes} from './routes';

import {MasterLayout} from './pages/layouts/master';
import {NotFoundLayout} from './pages/layouts/not-found';

import {App} from './components/app';

import AuthService from './services/auth';


@NgModule({
    declarations: [
        App, MasterLayout, NotFoundLayout
    ],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule.forRoot(routes),
        HttpClientModule
    ],
    providers: [
        AuthService
    ],
    bootstrap: [App]
})
export default class Module {
}
