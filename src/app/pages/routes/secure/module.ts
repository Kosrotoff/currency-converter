import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {ProfilePage} from './profile';
import {ConverterPage} from './converter';

import {SecureRoutingModule}    from './routes';
import {CommonModule} from '@angular/common';
import {DropdownComponent} from '../../../components/dropdown';
import {DropdownCurrencyComponent} from '../../../components/items/dropdown/currency';


@NgModule({
    declarations: [
        ProfilePage,
        ConverterPage,
        DropdownComponent,
        DropdownCurrencyComponent
    ],
    imports: [
        CommonModule,
        SecureRoutingModule,
        HttpClientModule,
        FormsModule
    ],
})
export class SecureModule {}