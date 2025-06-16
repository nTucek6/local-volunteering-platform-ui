import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventCategory } from '../model/event-category';
import { EventSummaryDto } from '../dto/event-summary.dto';
import { environment } from 'src/environments/environment ';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  //private apiUrl = '/api/admin';
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getTotalEvents(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-events`);
  }

  getEventCountByCategory(): Observable<Record<EventCategory, number>> {
    return this.http.get<Record<EventCategory, number>>(`${this.apiUrl}/events-by-category`);
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-users`);
  }

  getTop5Events(): Observable<EventSummaryDto[]> {
    return this.http.get<EventSummaryDto[]>(`${this.apiUrl}/top5-events`);
  }
}
