import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventDTO } from 'src/app/shared/dto/event.dto';
import { EventCategory } from 'src/app/shared/model/event-category';
import { MatIconModule } from '@angular/material/icon';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
    selector: 'app-details',
    imports: [CommonModule, MatIconModule],
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  eventId: string | null = '';

  event: EventDTO | null = null;

  eventsPetsImg: EventDTO[] = [];

  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);

  images : string[] = ['https://material.angular.dev/assets/img/examples/shiba2.jpg','https://material.angular.dev/assets/img/examples/shiba2.jpg', 'https://material.angular.dev/assets/img/examples/shiba2.jpg'];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('id');
    });

    this.event = {
        id: 1,
        category: EventCategory.PETS,
        title: 'Animal Shelter Clean-Up Day',
        description: 'Volunteer to clean cagse, wash bedding, and organize....',
        location: 'Hope Shelter',
        startDateTime: new Date(),
        upvote: 5,
        creatorId: 1,
        volunteerCount: 10,
    }
      this.eventService
      .getAllEvents(0, 5, { category: EventCategory.PETS})
      .subscribe((response) => {
        this.eventsPetsImg = response;
        console.log(response);
      });
  }
}
