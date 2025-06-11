import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserCredentials } from 'src/app/shared/model/user-credentials';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule,
  ],
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  email: string = '';
  password: string = '';

  formSubmit() {
    if (!this.email.trim() || !this.password.trim()) {
      alert('Molimo unesite email i lozinku.');
      return;
    }

    const userCredentials: UserCredentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.authenticate(userCredentials).subscribe((response) => {
      console.log(response);
      this.authService.setUser(response);
    });

    this.router.navigate(['/']);
  }
}
