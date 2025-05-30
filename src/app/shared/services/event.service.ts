import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventDTO } from '../dto/event.dto';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment ';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${environment.apiUrl}/event`;

  private http: HttpClient = inject(HttpClient)

  getEventById(id: number): Observable<EventDTO[]> {
    return this.http.get<EventDTO[]>(`${this.apiUrl}/${id}`);
  }
}
