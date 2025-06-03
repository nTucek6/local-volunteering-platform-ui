import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EventCategory } from 'src/app/shared/model/event-category';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { SearchEventDto } from 'src/app/shared/dto/search-event.dto';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatButtonModule,
    TitleCasePipe,
    DatePipe,
    MatTableModule,
    RouterLink,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private route = inject(Router);

  eventCategories = Object.values(EventCategory);

  displayedColumns: string[] = [
    'location',
    'title',
    'category',
    'date',
    'owner',
  ];

  eventsDto: SearchEventDto[] = [
    {
      id: 1,
      category: EventCategory.PETS,
      title: 'TITLE',
      location: 'Zagreb',
      startDateTime: new Date(),
      creatorId: 1,
      creatorProfileImageURL: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
        {
      id: 1,
      category: EventCategory.PETS,
      title: 'TITLE',
      location: 'Zagreb',
      startDateTime: new Date(),
      creatorId: 1,
      creatorProfileImageURL: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
        {
      id: 1,
      category: EventCategory.PETS,
      title: 'TITLE',
      location: 'Zagreb',
      startDateTime: new Date(),
      creatorId: 1,
      creatorProfileImageURL: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
        {
      id: 1,
      category: EventCategory.PETS,
      title: 'TITLE',
      location: 'Zagreb',
      startDateTime: new Date(),
      creatorId: 1,
      creatorProfileImageURL: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  ];

  selectedLocation: string = '';
  selectedCategory?: EventCategory;
  selectedDate: Date = new Date();

  formSubmit() {}
}
