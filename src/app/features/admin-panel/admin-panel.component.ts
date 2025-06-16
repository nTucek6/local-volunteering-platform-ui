import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { EventSummaryDto } from 'src/app/shared/dto/event-summary.dto';
import { EventCategory } from 'src/app/shared/model/event-category';
import { StatisticsService } from 'src/app/shared/services/statistics.service';

@Component({
  selector: 'app-admin-panel',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
totalEvents?: number;
  totalUsers?: number;
  eventsByCategory?: Record<EventCategory, number>;
  top5Events: EventSummaryDto[] = [];

  EventCategory = EventCategory; // for template access

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.getTotalEvents().subscribe(data => this.totalEvents = data);
    this.statisticsService.getTotalUsers().subscribe(data => this.totalUsers = data);
    this.statisticsService.getEventCountByCategory().subscribe(data => this.eventsByCategory = data);
    this.statisticsService.getTop5Events().subscribe(data => this.top5Events = data);
  }
}
