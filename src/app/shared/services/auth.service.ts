import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment ';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { UserCredentials } from '../model/user-credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.authUrl}/api/v1`;

  private http: HttpClient = inject(HttpClient);

  private authorized = new BehaviorSubject<boolean>(false);
  isAuthorized$ = this.authorized.asObservable();

  authenticate(userCredentials: UserCredentials): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/login`, userCredentials)
      .pipe(tap(() => this.setAuthorized(true)));
  }

  refreshToken(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/refreshToken`, null).pipe(
      tap(()=>this.setAuthorized(false))
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, null);
  }

  setAuthorized(status: boolean): void {
    this.authorized.next(status);
  }

  getAuthorized(): boolean {
    return this.authorized.value;
  }
}
