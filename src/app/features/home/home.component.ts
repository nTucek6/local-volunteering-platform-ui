import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "../../shared/components/carousel/carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  pets = [
    {
      id: 1,
      title: 'Pet adoption fair',
      city: 'Zagreb',
      date: '25.5.2025.',
    },
    {
      id: 2,
      title: 'Dog Shelter Clean-up',
      city: 'Osijek',
      date: '1.6.2025.',
    },
     {
      id: 3,
      title: 'Dog Shelter Clean-up',
      city: 'Osijek',
      date: '1.6.2025.',
    },
     {
      id: 4,
      title: 'Dog Shelter Clean-up',
      city: 'Osijek',
      date: '1.6.2025.',
    },
  ];

 actions = [
    {
      id: 5,
      title: 'Comunity Garden Day',
      city: 'Varaždin',
      date: '29.5.2025.',
    },
    {
      id: 6,
      title: 'Senior Tech Support',
      city: 'Rijeka',
      date: '1.6.2025.',
    },
     {
      id: 7,
      title: 'Neighborhood Cleanup',
      city: 'Rijeka',
      date: '12.6.2025.',
    },
     {
      id: 8,
      title: 'Help the homeless',
      city: 'Split',
      date: '20.6.2025.',
    },
  ];

}
