import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { SearchEventsComponent } from "../../../shared/components/search-events/search-events.component";

@Component({
  selector: 'app-overview',
  imports: [TranslateModule, SearchEventsComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  private route = inject(ActivatedRoute);

  id: string | null = '';

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id != null) {
        /* const id = this.eventId;
        this.eventService.getEventById(parseInt(id)).subscribe((response) => {
          this.event = response;
        }); */
      }
    });
  }
}
