import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment ';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserCredentials } from '../model/user-credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.authUrl}/api/v1`;

  private http: HttpClient = inject(HttpClient);

  authenticate(userCredentials: UserCredentials): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/login`, userCredentials);
  }

  refreshToken() : Observable<void>{
   return this.http.post<void>(`${this.apiUrl}/refreshToken`, null);
  }

  logout(): Observable<void> {
   return this.http.post<void>(`${this.apiUrl}/logout`, null);
  }
}
