import {NgModule}       from '@angular/core';
import {RouterModule}   from '@angular/router';
import {Routes}         from '@angular/router';

import {MainPage}       from '../main';
import {SigninPage}     from './auth/signin';
import {SignupPage}     from './auth/signup';


const routes: Routes = [
    {path: '', component: MainPage},
    {path: 'signin', component: SigninPage},
    {path: 'signup', component: SignupPage},
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {}