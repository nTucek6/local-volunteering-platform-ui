import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventDTO } from '../dto/event.dto';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment ';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${environment.apiUrl}/event`;

  private http: HttpClient = inject(HttpClient);

  getEventById(id: number): Observable<EventDTO> {
    return this.http.get<EventDTO>(`${this.apiUrl}/${id}`);
  }

  getAllEvents(
    page: number,
    size: number,
    sortBy: string,
    ascending: boolean
  ): Observable<EventDTO[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('ascending', ascending.toString());
    return this.http.get<EventDTO[]>(`${this.apiUrl}`, { params });
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
