import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Module} from './app/module';


platformBrowserDynamic()
    .bootstrapModule(Module)
    .catch(error => console.log(error));
