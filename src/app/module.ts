import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {App} from './components/app';
import {MasterPage} from './pages/master';

import {routes} from './routes';


@NgModule({
    declarations: [
        App, MasterPage
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    bootstrap: [
        App
    ]
})
export class Module {
}