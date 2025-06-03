import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
    selector: 'app-card',
    imports: [CommonModule, MatCardModule],
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
 @Input () title? : string;
 @Input () location? : string;
 @Input () date? : string;
 @Input () imagePath? : string = 'https://material.angular.dev/assets/img/examples/shiba2.jpg';
}
