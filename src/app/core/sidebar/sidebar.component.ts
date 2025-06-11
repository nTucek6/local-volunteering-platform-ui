import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from 'src/app/shared/services/auth.service';

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

  protected authService = inject(AuthService);

  private route = inject(Router);

  isAuthorized = false;

  selectedLanguage = 'en';

  userId = 0;

  ngOnInit() {
    this.authService.isAuthorized$.subscribe((status) => {
      this.isAuthorized = status;
    });

    this.authService.user$.subscribe((user)=>{
      if(user != null)
      this.userId = user?.id
    });

  }

  onLanguageChange(code: string) {
    this.translate.use(code);
  }

  onLogout() {
    this.authService.logout().subscribe((response) => {
      console.log(response);
    });
  }

  navigateToLogin() {
    this.route.navigate(['/login']);
  }
}
