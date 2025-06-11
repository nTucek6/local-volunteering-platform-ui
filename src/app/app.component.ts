import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {

  private authService = inject(AuthService)

  ngOnInit(){
    this.authService.refreshToken().subscribe((response)=>{
      this.authService.setUser(response);
      console.log(response)
    })
  }
}
