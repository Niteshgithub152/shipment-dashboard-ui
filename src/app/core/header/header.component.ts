import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppService } from '../services/app.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-header',
  imports: [SharedModule, MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  appService = inject(AppService);
  router = inject(Router);
  @Output() sidebarToggle = new EventEmitter<void>();

  public currentUrl: string = '/';
  public user: any;

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    })
    this.appService.userSub.subscribe((res) => this.user = res);
  }
  sideBarButtonClick() {
    this.sidebarToggle.emit();
  }

  logout() {
    this.authService.logout()
  }
}
