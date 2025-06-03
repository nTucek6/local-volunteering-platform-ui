import { Component, inject, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, CardComponent, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [DatePipe],
})
export class CarouselComponent {
  @Input() list: any;
  @Input() title: string | undefined;
  @Input() description: string | undefined;

  private datePipe = inject(DatePipe);

  formatDate(date: any): string {
    const formatted = this.datePipe.transform(date, 'dd.MM.yyyy');
    if (formatted != null) {
      return formatted;
    }
    return '';
  }
}
