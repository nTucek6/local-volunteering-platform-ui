import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment ';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
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
      .pipe(tap(() => this.authorizedSubject.next(true)));
  }

  refreshToken(): Observable<UserDto> {
    return this.http
      .post<UserDto>(`${this.apiUrl}/refreshToken`, null)
      .pipe(tap(() => this.authorizedSubject.next(true)));
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/logout`, null)
      .pipe(tap(() => this.authorizedSubject.next(false)));
  }

  setUser(user: UserDto): void {
    this.userSubject.next(user);
  }

  setAuthorized(flag: boolean) {
    this.authorizedSubject.next(flag);
  }
}
