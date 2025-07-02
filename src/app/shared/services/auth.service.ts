import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment ';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { UserCredentials } from '../model/user-credentials';
import { UserDto } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.authUrl}/api/v1`;

  private http: HttpClient = inject(HttpClient);

  private authorizedSubject = new BehaviorSubject<boolean>(false);
  isAuthorized$ = this.authorizedSubject.asObservable();

  private userSubject = new BehaviorSubject<UserDto | null>(null);
  user$ = this.userSubject.asObservable();

  authenticate(userCredentials: UserCredentials): Observable<UserDto> {
    return this.http
      .post<UserDto>(`${this.apiUrl}/login`, userCredentials)
      .pipe(
        tap(() => this.authorizedSubject.next(true)),
        catchError((error: HttpErrorResponse) => {
          alert(error.error);
          return throwError(() => error);
        })
      );
  }

  refreshToken(): Observable<UserDto> {
    return this.http
      .post<UserDto>(`${this.apiUrl}/refreshToken`, null)
      .pipe(tap(() => this.authorizedSubject.next(true)));
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<UserDto>(`${this.apiUrl}/me`).pipe(
      map(() => true),
      catchError((err) => {
        return of(false);
      })
    );
  }

  isUserAdmin(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => {
        if (user) {
          return user.role === 'ADMIN';
        }
        return false;
      })
    );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/logout`, null)
      .pipe(tap(() => this.authorizedSubject.next(false)));
  }

  setUser(user: UserDto): void {
    this.userSubject.next(user);
  }

  getUserId() {
    return this.userSubject.getValue()?.id;
  }

  setAuthorized(flag: boolean) {
    this.authorizedSubject.next(flag);
  }
  getAuthorized(): boolean {
    return this.authorizedSubject.getValue();
  }
}
