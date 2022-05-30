import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';

import AuthService from '../services/auth';


@Injectable()
export default class TokenInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService
    ) {
    }


    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                }
            });
        }

        return next.handle(request);
    }
}
