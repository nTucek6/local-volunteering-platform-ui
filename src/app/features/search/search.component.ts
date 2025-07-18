import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ChangeDetectorRef,
  Input,
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
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  imports: [
    TranslateModule,
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
    MatPaginatorModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Input() userId?: string;
  @Input() title?: string;

  private route = inject(Router);
  private eventService = inject(EventService);
  private cdr = inject(ChangeDetectorRef);

  eventCategories = Object.values(EventCategory);
  eventsDto: SearchEventDto[] = [];

  page: number = 0;
  size: number = 5;
  length: number = 0;
  ascending: boolean = false;

  displayedColumns: string[] = [
    'location',
    'title',
    'category',
    'date',
    'owner',
  ];

  selectedLocation: string = '';
  selectedCategory?: EventCategory;
  selectedDateFrom?: Date;
  selectedDateTo?: Date;
  selectedTitle: string = '';

  ngOnInit() {
    if (this.userId != undefined) {
      console.log(this.userId);
    }
  }

  formSubmit() {
    const eventFilterParams: EventFilterParams = {
      category: this.selectedCategory,
      location: this.selectedLocation,
      title: this.selectedTitle,
      startDateTimeFrom: this.selectedDateFrom,
      startDateTimeTo: this.selectedDateTo,
    };

    if (this.userId != undefined) {
      eventFilterParams.creatorId = parseInt(this.userId);
    }

    this.eventService
      .getAllEvents(
        this.page,
        this.size,
        eventFilterParams,
        this.ascending
      )
      .subscribe((response) => {
        const firstKey : number = Number.parseInt(Object.keys(response)[0]);
        this.length = firstKey;
        this.eventsDto = response[firstKey];

        //this.eventsDto = [...response];
        this.cdr.markForCheck();
      });
  }

  navigateToDetails(eventId: number) {
    this.route.navigate(['/details/' + eventId]);
  }

  clearCategory() {
    this.selectedCategory = undefined;
  }


  handlePageEvent(e: PageEvent) {
   // this.pageEvent = e;
    //this.length = e.length;
    this.size = e.pageSize;
    this.page = e.pageIndex;
    this.formSubmit();
  }

}
