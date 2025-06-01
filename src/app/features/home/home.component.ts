import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { EventDTO } from 'src/app/shared/dto/event.dto';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
    selector: 'app-home',
    imports: [CommonModule, CarouselComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  actionsAPI: EventDTO | null = null;

  eventsPets: EventDTO[] = [];


private eventService =  inject(EventService);

  constructor() {}

  ngOnInit() {
    /*this.eventService.getEventById(1).subscribe((response) => {
      this.actionsAPI = response;
      console.log(response);
    }); */

    this.eventService.getAllEvents(1, 5, '1.6.2025.', false).subscribe((response) =>{
      this.eventsPets = response;
      console.log(response);
    })

  }

  pets: EventDTO[] = [
    {
      id: 1,
      title: 'Pet adoption fair',
      location: 'Zagreb',
      startDateTime: '25.5.2025.',
      description: '',
      volunteerCount: 5,
      creatorId: 1,
      category: 'PETS',
      upvote: 0,
    },
    {
      id: 2,
      title: 'Dog Shelter Clean-up',
      location: 'Osijek',
      startDateTime: '1.6.2025.',
      description: '',
      volunteerCount: 5,
      creatorId: 2,
      category: 'PETS',
      upvote: 0,
    },
    {
      id: 3,
      title: 'Dog Shelter Clean-up',
      location: 'Osijek',
      startDateTime: '1.6.2025.',
      description: '',
      volunteerCount: 5,
      creatorId: 3,
      category: 'PETS',
      upvote: 0,
    },
    {
      id: 4,
      title: 'Dog Shelter Clean-up',
      location: 'Osijek',
      startDateTime: '1.6.2025.',
      description: '',
      volunteerCount: 5,
      creatorId: 4,
      category: 'PETS',
      upvote: 0,
    },
  ];

  actions: EventDTO[] = [
    {
      id: 5,
      title: 'Comunity Garden Day',
      location: 'Varaždin',
      startDateTime: '29.5.2025.',
      description: '',
      volunteerCount: 5,
      creatorId: 5,
      category: 'COMUNITY',
      upvote: 0,
    },
    {
      id: 6,
      title: 'Senior Tech Support',
      location: 'Rijeka',
      startDateTime: '1.6.2025.',
      description: '',
      volunteerCount: 5,
      creatorId: 6,
      category: 'OTHER',
      upvote: 0,
    },
    {
      id: 7,
      title: 'Neighborhood Cleanup',
      location: 'Rijeka',
      startDateTime: '12.6.2025.',
      description: '',
      volunteerCount: 5,
      creatorId: 7,
      category: 'COMUNITY',
      upvote: 0,
    },
    {
      id: 8,
      title: 'Help the homeless',
      location: 'Split',
      startDateTime: '20.6.2025.',
      description: '',
      volunteerCount: 5,
      creatorId: 8,
      category: 'PEOPLE',
      upvote: 0,
    },
  ];
}
