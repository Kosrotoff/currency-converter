import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import Module from './app/module';
import {environment} from './environments/environment';

import 'materialize-css/dist/js/materialize';


if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(Module)
    .catch(err => console.error(err));
