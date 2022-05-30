import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {ConverterPage} from './converter';

import AuthGuard from '../../../services/guards/auth-guard';

import TokenInterceptor from '../../../middlewares/token-interceptor';


const routes: Routes = [
    {path: 'converter', component: ConverterPage, canActivate: [AuthGuard]},
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: TokenInterceptor
        },
    ]
})
export class SecureRoutingModule {
}
