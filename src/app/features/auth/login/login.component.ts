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
import { JwtToken } from 'src/app/shared/model/jwt-token';
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
    const userCredentials: UserCredentials = {
      email: this.email,
      password: this.password,
    };

    this.authService
      .authenticate(userCredentials)
      .subscribe((jwtToken: JwtToken) => {});

    this.router.navigate(['/']);
  }

  successfulLogin(jwtToken: JwtToken) {
    localStorage.setItem('token', jwtToken.token); // store token value to localstorage
    this.userService
      .getCurrentUser()
      .subscribe(
        (currentUser) => (this.userService.currentUser = currentUser)
      );
    this.router.navigate(['/']);
  }
}
