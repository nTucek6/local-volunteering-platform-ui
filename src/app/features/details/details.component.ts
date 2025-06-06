import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventDTO } from 'src/app/shared/dto/event.dto';
import { TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, MatIconModule, TitleCasePipe],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  eventId: string | null = '';

  event: EventDTO | null = null;

  eventsPetsImg: EventDTO[] = [];

  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('id');

      if (this.eventId != null) {
        const id = this.eventId;
        this.eventService.getEventById(parseInt(id)).subscribe((response) => {
          this.event = response;
        });
      }
    });
  }
}
