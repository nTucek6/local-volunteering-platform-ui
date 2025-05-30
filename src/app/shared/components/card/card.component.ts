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
 @Input () title : string | undefined;
 @Input () location : string | undefined;
 @Input () date : string | undefined;
}
