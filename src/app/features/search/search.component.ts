import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
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
import { MatTimepickerModule } from '@angular/material/timepicker';
import { EventFilterParams } from 'src/app/shared/model/event-filter-params';
import { EventService } from 'src/app/shared/services/event.service';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

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
    MatTimepickerModule,
    MatIcon,
    TranslateModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private route = inject(Router);
  private eventService = inject(EventService);
  private cdr = inject(ChangeDetectorRef);

  eventCategories = Object.values(EventCategory);
  eventsDto: SearchEventDto[] = [];

  page: number = 0;
  size: number = 10;
  ascending: boolean = false;

  displayedColumns: string[] = [
    'location',
    'title',
    'category',
    'date',
    'owner',
  ];

  /*eventsDto: SearchEventDto[] = [ 
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
  */

  selectedLocation: string = '';
  selectedCategory?: EventCategory;
  selectedDateFrom: Date = new Date();
  selectedDateTo: Date = new Date();
  selectedTitle: string = '';

  formSubmit() {
    const eventFilterParams: EventFilterParams = {
      category: this.selectedCategory,
      location: this.selectedLocation,
      title: this.selectedTitle,
    };

    this.eventService
      .getAllEvents(
        this.page,
        this.size,
        eventFilterParams,
        this.ascending
        //this.selectedDate.toDateString()
      )
      .subscribe((response) => {
        this.eventsDto = [...response];
        this.cdr.markForCheck();
      });
  }

  navigateToDetails(eventId: number) {
    this.route.navigate(['/details/' + eventId]);
  }

  clearCategory() {
    this.selectedCategory = undefined;
  }
}
