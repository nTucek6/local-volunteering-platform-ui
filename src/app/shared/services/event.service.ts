import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventDTO } from '../dto/event.dto';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { EventFilterParams } from '../model/event-filter-params';

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
    eventFilterParams?: EventFilterParams,
    ascending?: boolean,
    sortBy?: string,
  ): Observable<EventDTO[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (sortBy != undefined) {
      params = params.set('sortBy', sortBy);
    }
    if (ascending != undefined) {
      params = params.set('ascending', ascending.toString());
    }

    if (eventFilterParams != undefined) {
      Object.entries(eventFilterParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }
    return this.http.get<EventDTO[]>(`${this.apiUrl}`, { params });
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
