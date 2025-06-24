import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment ';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';
import { EventDTO } from '../dto/event.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiAuthUrl = `${environment.apiUrl}/auth`;

  private apiUrl = `${environment.apiUrl}/user`;

  private http: HttpClient = inject(HttpClient);

  getCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiAuthUrl}`);
  }

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/${id}`);
  }

  getUserVolunteerHistory(id : number): Observable<EventDTO[]> {
    return this.http.get<EventDTO[]>(`${this.apiUrl}/volunteer-history/${id}`);
  }

}
