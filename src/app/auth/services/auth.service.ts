import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl
  private http: HttpClient = inject(HttpClient)

  private _currentUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  //!Al mundo exterior
  public currentUser = computed(() => this._currentUser())
  public authStatus = computed(() => this._authStatus())

  constructor(){
    //cuando se use pro primera vez el servicio revisemos el estado del status
    this.checkAuthStatus().subscribe()
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token)
    return true;
  }

  login(email: string, password: string): Observable<boolean>{
    const url = `${this.baseUrl}/auth/login`
    const body = { email, password}

    return this.http.post<LoginResponse>(url, body)
    .pipe(
      //Cuando nada malo pasa
      map(({user, token}) => this.setAuthentication(user, token)),
      catchError(err => throwError(() => err.error.message))
    )
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`
    const token = localStorage.getItem('token')

    if(!token) {
      this.logout()
      return of(false)
    };

    //verificamos el token y lo colocamos en los headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<CheckTokenResponse>(url, {headers})
    .pipe(
      map(({user, token}) => this.setAuthentication(user, token)),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false)
      })
    )
  }

  logout(){
    this._authStatus.set(AuthStatus.notAuthenticated);
    this._currentUser.set(null);
    localStorage.removeItem('token')
  }
}
