import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from 'src/app/core/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [MatSidenavModule, SidebarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  title = 'Local Volunteering Platform';
}
