import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  private translate = inject(TranslateService);

  selectedLanguage =  "en";

  userId = 1;

  onLanguageChange(code: string) {
    this.translate.use(code);
  }
}
