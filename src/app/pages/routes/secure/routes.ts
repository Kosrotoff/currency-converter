import {NgModule}       from '@angular/core';
import {RouterModule}   from '@angular/router';
import {Routes}         from '@angular/router';

import {ProfilePage}     from './profile';
import {ConverterPage}     from './converter';


const routes: Routes = [
    {path: '', component: ProfilePage},
    {path: 'converter', component: ConverterPage},
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecureRoutingModule {}