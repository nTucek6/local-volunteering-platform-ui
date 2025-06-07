import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  id: string | null = '';

  private route = inject(ActivatedRoute);

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
