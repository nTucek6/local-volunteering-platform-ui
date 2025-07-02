import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventDTO } from '../dto/event.dto';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { EventFilterParams } from '../model/event-filter-params';

import { environment } from 'src/environments/environment ';
import { HomePageDto, HomePageResponse } from '../dto/home-page.dto';
import { SearchEventDto, SearchPageResponse } from '../dto/search-event.dto';
import { NewEventDto } from '../dto/new-event.dto';

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
    sortBy?: string
  ): Observable<SearchPageResponse> {
    const pad = (n: number) => n.toString().padStart(2, '0');

    const formatLocalDateTime = (d: Date) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
        d.getHours()
      )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

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
          if (key === 'startDateTimeFrom' || key === 'startDateTimeTo') {
            const dateObj = new Date(value);
            params = params.set(key, formatLocalDateTime(dateObj));
          } else {
            params = params.set(key, value.toString());
          }
        }
      });
    }
    return this.http.get<SearchPageResponse>(`${this.apiUrl}`, { params });
  }

  getEventsForHomePage(): Observable<HomePageResponse> {
    return this.http.get<HomePageResponse>(`${this.apiUrl}/home`);
  }

  deleteEvent(id: number): Observable<void> {
    console.log(id)
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createEvent(newEventDto: NewEventDto): Observable<EventDTO> {
    const formData = new FormData();

    formData.append('category', newEventDto.category);
    formData.append('title', newEventDto.title);
    formData.append('description', newEventDto.description);
    formData.append('details', newEventDto.details);
    formData.append('location', newEventDto.location);
    formData.append('address', newEventDto.address);
    formData.append('startDateTime', newEventDto.startDateTime.toISOString());
    formData.append('creatorId', newEventDto.creatorId.toString());

    newEventDto.images.forEach((file: File) => {
      formData.append('images', file);
    });

    return this.http.post<EventDTO>(`${this.apiUrl}`, formData);
  }
}
