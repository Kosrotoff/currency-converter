import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Token, User} from '../types';

import {Observable, tap} from 'rxjs';


@Injectable()
export default class AuthService {
    constructor(
        private http: HttpClient
    ) {
        this.token = null;
    }


    // ----- [ PRIVATE PROPERTIES ] ------------------------------------------------------------------------------------

    private token: Token;


    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public register(user: User): Observable<{token: Token}> {
        return this.http.post<({token: Token})>('api/auth/register', user);
    }

    public login(user: User): Observable<{token: string}> {
        return this.http.post<({token: string})>('api/auth/login', user)
            .pipe(
                tap(
                    ({token}) => {
                        localStorage.setItem('auth-token', token);
                        this.setToken(token);
                    }
                )
            )
    }

    public setToken(token: Token): void {
        this.token = token;
    }

    public getToken(): Token {
        return this.token;
    }

    public isAuthenticated(): boolean {
        return !!this.token;
    }

    public logout(): void {
        this.setToken(null);
    }
}