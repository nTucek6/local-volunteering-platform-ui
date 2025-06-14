import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { EventService } from 'src/app/shared/services/event.service';
import { HomePageResponse } from 'src/app/shared/dto/home-page.dto';
import { TranslateModule } from '@ngx-translate/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  events?: HomePageResponse;
  isLoading: boolean = true;

  private eventService = inject(EventService);

  ngOnInit() {
    this.eventService.getEventsForHomePage().subscribe((response) => {
      this.events = response;
      this.isLoading = false;
    });
  }
}
