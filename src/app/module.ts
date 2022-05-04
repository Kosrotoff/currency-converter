import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Router, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {App} from './components/app';
import {NotFoundComponent} from './components/not-found';
import {MasterPage} from './pages/master';

import {routes} from './routes';

import {CanActivateViaAuthGuard} from './services/guard';
import {ServiceSettings} from './services/settings';
import {CurrencyService} from './services/currency';


@NgModule({
    declarations: [
        App, NotFoundComponent, MasterPage
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule
    ],
    bootstrap: [
        App
    ],
    providers: [
        CanActivateViaAuthGuard, ServiceSettings, CurrencyService
    ]
})
export class Module {
    constructor(
        public router: Router,
        public settings: ServiceSettings
    ) {
    }
}