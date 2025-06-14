import { Component, inject } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.refreshToken().subscribe((response) => {
      if (response) {
        this.authService.setUser(response);
      }
    });
  }
}
