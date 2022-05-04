import {NgModule}       from '@angular/core';
import {RouterModule}   from '@angular/router';
import {Routes}         from '@angular/router';

import {ProfilePage}     from './profile';
import {ConverterPage}     from './converter';

import {CanActivateViaAuthGuard} from '../../../services/guard';


const routes: Routes = [
    {path: 'profile', component: ProfilePage, canActivate: [CanActivateViaAuthGuard]},
    {path: 'converter', component: ConverterPage, canActivate: [CanActivateViaAuthGuard]},
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecureRoutingModule {}