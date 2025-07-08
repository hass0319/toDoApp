import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap} from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.auth.api;
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor( private http: HttpClient) { }

  login(username:string, password: string): Observable<any>{
    const credentials = {username, password}
    const loginReq$ = this.http.post<any>(this.apiUrl, credentials);
    const loginRes$ = loginReq$.pipe(
      tap(res => {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('username', username);
        this._isLoggedIn$.next(true);
      })
    );
    return loginRes$;
  }

  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn$.next(false);
  }

  get username(): string| null {
    return localStorage.getItem('username');
  }

  get token(): string| null {
    return localStorage.getItem('token');
  }

  private hasToken(): boolean{
    return !!localStorage.getItem('token');
  }
}
