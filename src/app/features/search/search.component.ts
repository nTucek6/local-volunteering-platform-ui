import { Component } from '@angular/core';
import { SearchEventsComponent } from "../../shared/components/search-events/search-events.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  imports: [SearchEventsComponent, TranslateModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {}
