import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {environment} from '../environments/environment';

import AuthService from '../app/services/auth';


describe('Сервис аутентификации', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('должен создавать экземпляр класса', () => {
        expect(service).toBeTruthy();
    });

    it('должен получать токен от сервера при успешной авторизации пользователя', (done) => {
        let actualToken: string;

        service.login({email: 'email', password: 'password'})
            .subscribe({
                next: ({token}) => {
                    actualToken = token;
                },
                complete: () => {
                    expect(actualToken).toBe('token');
                    done();
                }
            });

        httpMock.expectOne(`${environment.serverUrl}/api/auth/login`).flush({token: 'token'});
        httpMock.verify();
    });

    it('должен возвращать токен', (done) => {
        expect(service.getToken()).toBeNull();

        service.login({email: 'email', password: 'password'})
            .subscribe({
                complete: () => {
                    expect(service.getToken()).not.toBeNull();
                    done();
                }
            });

        httpMock.expectOne(`${environment.serverUrl}/api/auth/login`).flush({token: 'token'});
        httpMock.verify();
    });

    it('должен определять авторизован ли пользователь', (done) => {
        expect(service.isAuthenticated()).toBeFalse();

        service.login({email: 'email', password: 'password'})
            .subscribe({
                complete: () => {
                    expect(service.isAuthenticated()).toBeTrue();
                    done();
                }
            });

        httpMock.expectOne(`${environment.serverUrl}/api/auth/login`).flush({token: 'token'});
        httpMock.verify();
    });

    it('должен удалять токен при разавторизации пользователя', (done) => {
        service.login({email: 'email', password: 'password'})
            .subscribe({
                complete: () => {
                    expect(service.isAuthenticated()).toBeTrue();
                    service.logout();
                    expect(service.isAuthenticated()).toBeFalse();
                    done();
                }
            });

        httpMock.expectOne(`${environment.serverUrl}/api/auth/login`).flush({token: 'token'});
        httpMock.verify();
    });
});
