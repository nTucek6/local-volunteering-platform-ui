import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { EventDTO } from 'src/app/shared/dto/event.dto';
import { EventService } from 'src/app/shared/services/event.service';
import { EventFilterParams } from 'src/app/shared/model/event-filter-params';
import { EventCategory } from 'src/app/shared/model/event-category';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  actionsAPI: EventDTO | null = null;

  eventsPets: EventDTO[] = [];

  eventsCommunity: EventDTO[] = [];

  private eventService = inject(EventService);

  constructor() {}

  ngOnInit() {
    this.eventService
      .getAllEvents(0, 5, { category: EventCategory.PETS }, false)
      .subscribe((response) => {
        this.eventsPets = response;
        console.log(response);
      });

    this.eventService
      .getAllEvents(0, 5, { category: EventCategory.COMMUNITY}, false)
      .subscribe((response) => {
        this.eventsCommunity = response;
        console.log(response);
      });

    /*this.eventService.getEventById(1).subscribe((response) => {
      this.actionsAPI = response;
      console.log(response);
    }); */

    /*this.eventService.deleteEvent(1).subscribe({
      next: () => {
        console.log('Event deleted successfully');
      },
      error: (err) => {
        console.error('Delete failed', err);
      },
    }); */
  }
}
