import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/services/user.service';
import { UserDto } from 'src/app/shared/dto/user.dto';
import { EventService } from 'src/app/shared/services/event.service';
import { EventFilterParams } from 'src/app/shared/model/event-filter-params';
import { EventDTO } from 'src/app/shared/dto/event.dto';
import { SearchEventDto } from 'src/app/shared/dto/search-event.dto';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, TranslateModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private eventService = inject(EventService);

  id: string | null = '';

  user: UserDto | null = null;

  myEvents: SearchEventDto[] = [];

  myPastEvents: EventDTO[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id != null) {
        const userId: number = Number(this.id);
        this.userService.getUserById(userId).subscribe((response) => {
          this.user = response;
          this.getMyEvents();
          this.getMyPastEvents();
        });
      }
    });
  }

  getMyEvents() {
    const eventFilterParams: EventFilterParams = {
      //startDateTimeFrom: new Date(new Date().setHours(0,0,0,0)),
    };

    if (this.id != null) {
      eventFilterParams.creatorId = parseInt(this.id);
    }

    this.eventService
      .getAllEvents(0, 5, eventFilterParams, false)
      .subscribe((response) => {
        const firstKey: number = Number.parseInt(Object.keys(response)[0]);
        this.myEvents = response[firstKey];
      });
  }

  getMyPastEvents() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const eventFilterParams: EventFilterParams = {
      startDateTimeTo: yesterday,
    };

    if (this.id != null) {
      this.userService
        .getUserVolunteerHistory(Number(this.id))
        .subscribe((response) => {
          this.myPastEvents = response;
        });
    }
  }

  deleteEvent(eventId : number){
  
    this.eventService.deleteEvent(eventId).subscribe((resposne) => {
     const eventIndex = this.myEvents.findIndex(x=> x.id == eventId);
     this.myEvents.splice(eventIndex, 1);
     alert("Event deleted succesfully!");
    }); 

  }

}
