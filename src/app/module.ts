import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Router, RouterModule} from '@angular/router';

import {App} from './components/app';
import {NotFoundComponent} from './components/not-found';
import {MasterPage} from './pages/master';

import {routes} from './routes';

import {CanActivateViaAuthGuard} from './services/guard';
import {ServiceSettings} from './services/settings';


@NgModule({
    declarations: [
        App, NotFoundComponent, MasterPage
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    bootstrap: [
        App
    ],
    providers: [
        CanActivateViaAuthGuard, ServiceSettings
    ]
})
export class Module {
    constructor(
        public router: Router,
        public settings: ServiceSettings
    ) {
    }
}