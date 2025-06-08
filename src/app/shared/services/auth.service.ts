import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment ';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserCredentials } from '../model/user-credentials';
import { JwtToken } from '../model/jwt-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private http: HttpClient = inject(HttpClient);

  authenticate(userCredentials: UserCredentials): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.apiUrl}`, userCredentials);
  }

  refreshToken() : Observable<any>{
    return of();
  }

  logout(): Observable<any> {
    return of()
  }
}
