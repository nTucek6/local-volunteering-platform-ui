import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment ';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCredentials } from '../model/user-credentials';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private http: HttpClient = inject(HttpClient);

  currentUser:any;

  getCurrentUser(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}`);
  }
}
