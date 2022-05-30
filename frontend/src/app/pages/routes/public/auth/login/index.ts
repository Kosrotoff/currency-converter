import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';

import AuthService from '../../../../../services/auth';


@Component({
    selector: 'login-page',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class LoginPage implements OnInit, OnDestroy {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {
    }


    // ----- [ PRIVATE PROPERTIES ] ------------------------------------------------------------------------------------

    private authSub: Subscription;


    // ----- [ PUBLIC PROPERTIES ] -------------------------------------------------------------------------------------

    public form: FormGroup;
    public isSuccessful: boolean;
    public resultMessage: string;


    // ----- [ LIFECYCLE EVENTS ] --------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required]),
        });
    }

    public ngOnDestroy(): void {
        if (this.authSub) {
            this.authSub.unsubscribe();
        }
    }


    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public login(): void {
        this.form.disable();

        this.authSub = this.auth.login(this.form.value).subscribe({
                next: () => {
                    this.isSuccessful = true;
                    this.resultMessage = 'Вход в аккаунт успешно выполнен.';
                    this.router.navigate(['/'])
                },
                error: error => {
                    this.isSuccessful = false;
                    this.resultMessage = error.error.message;
                    setTimeout(() => this.form.enable(), 1000);
                }
            }
        );
    }
}
