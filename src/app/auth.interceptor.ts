import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log('Request URL: ' + request.url);
    const token = this.auth.token;

    const authReq = token ?
    request.clone({setHeaders: {Authorization: `bearer ${token}`}}):
    request;

    return next.handle(authReq);
  }
}
