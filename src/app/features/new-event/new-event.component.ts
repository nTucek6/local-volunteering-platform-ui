import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  inject,
  Injector,
  afterNextRender,
} from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventCategory } from 'src/app/shared/model/event-category';
import { MatSelectModule } from '@angular/material/select';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { EventService } from 'src/app/shared/services/event.service';
import { NewEventDto } from 'src/app/shared/dto/new-event.dto';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-new-event',
  imports: [
    MatButtonModule,
    MatTimepickerModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule,
  ],
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventComponent {
  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  private eventService = inject(EventService);
  private authService = inject(AuthService);

  selectedImages: File[] = [];
  imagePreviews: string[] = [];

  eventCategories = Object.values(EventCategory);

  selectedLocation: string = '';
  selectedCategory?: EventCategory;
  selectedDateTime: Date = new Date();
  selectedTitle: string = '';
  selectedDescription: string = '';
  selectedDetails: string = '';
  selectedAddress: string = '';

  private _injector = inject(Injector);

  triggerResize() {
    afterNextRender(
      () => {
        if (this.autosize != undefined) this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      }
    );
  }

  onFileSelected(event: any) {
    const files: File[] = Array.from(event.target.files);

    const availableSlots = 3 - this.selectedImages.length;
    const filesToAdd = files.slice(0, availableSlots);

    if (files.length > availableSlots) {
      alert(
        `Možete dodati najviše 3 slike. Dodano je samo prvih ${availableSlots} novih slika.`
      );
    }

    this.selectedImages = [...this.selectedImages, ...filesToAdd];

    filesToAdd.forEach((file) => {
      const url = URL.createObjectURL(file);
      this.imagePreviews.push(url);
    });
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  formSubmit() {
    if (
      !this.selectedCategory ||
      !this.selectedTitle.trim() ||
      !this.selectedDescription.trim() ||
      !this.selectedLocation.trim() ||
      !this.selectedDateTime
    ) {
      alert('Molimo popunite sva obavezna polja.');
      return;
    }

    if (this.selectedImages.length < 1) {
      alert('Molimo dodajte barem jednu sliku.');
      return;
    }

    const userId = this.authService.getUserId();
    if (userId != undefined) {
      const newEventDTO: NewEventDto = {
        category: this.selectedCategory,
        title: this.selectedTitle,
        description: this.selectedDescription,
        details: this.selectedDetails,
        location: this.selectedLocation,
        address: this.selectedAddress,
        startDateTime: this.selectedDateTime,
        creatorId: userId,
        images: this.selectedImages,
      };

      this.eventService.createEvent(newEventDTO).subscribe({
        next: (response) => {
          alert('Događaj je uspješno kreiran.');
        },
        error: (error) => {
          alert('Došlo je do greške prilikom kreiranja događaja.');
          console.error('Error creating event:', error);
        },
      });
    }
  }
}
