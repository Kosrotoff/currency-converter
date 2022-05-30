import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import AuthService from '../../../../../services/auth';
import {Subscription} from 'rxjs';


@Component({
    selector: 'registration-page',
    providers: [],
    templateUrl: './resources/template.html',
    styleUrls: ['./resources/styles.css']
})
export class RegistrationPage implements OnInit, OnDestroy {
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
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    public ngOnDestroy(): void {
        if (this.authSub) {
            this.authSub.unsubscribe();
        }
    }


    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public register(): void {
        this.form.disable();

        this.authSub = this.auth.register(this.form.value).subscribe({
                next: () => {
                    this.isSuccessful = true;
                    this.resultMessage = 'Регистрация прошла успешно.';
                    this.router.navigate(['/login'], {
                        queryParams: {
                            registered: true
                        }
                    })
                },
                error: error => {
                    this.isSuccessful = false;
                    this.resultMessage = error.error.message;
                    setTimeout(() =>  this.form.enable(), 1000);
                }
            }
        );
    }
}
