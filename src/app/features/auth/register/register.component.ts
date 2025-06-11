import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule
  ],
})
export class RegisterComponent {
  private router = inject(Router);

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstname: string = '';
  lastname: string = '';

  formSubmit() {
    if (
      !this.email.trim() ||
      !this.password.trim() ||
      !this.confirmPassword.trim() ||
      !this.firstname.trim() ||
      !this.lastname.trim()
    ) {
      alert('Sva polja su obavezna.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Lozinke se ne podudaraju.');
      return;
    }

    this.router.navigate(['/']);
  }
}
