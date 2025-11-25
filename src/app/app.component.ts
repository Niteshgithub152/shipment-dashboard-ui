import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './core/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from './core/services/auth.service';
import { SharedModule } from './shared/shared.module';
import { HttpService } from './core/services/http.service';
import { AppService } from './core/services/app.service';




@Component({
  selector: 'app-root',
  imports: [
    SharedModule,
    RouterOutlet,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    LayoutModule,
    FormsModule,
    MatExpansionModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly httpService = inject(HttpService);
  private readonly appService = inject(AppService);

  title = 'shipment-dashboard';
  isSidebarOpen = true;
  isAdmin = true;
  breakpointObserver = inject(BreakpointObserver);
  authService = inject(AuthService);
  managementOpen = false;
  loginCheck: boolean | undefined;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.loginCheck = this.authService.loggedIn;
    this.httpService.getShipmentStatusCode().subscribe((res) => {
      this.appService.shipmentStatusList = res.data;
    });
    // if(this.loginCheck){
    //   alert('welcome')
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        if (this.breakpointObserver.isMatched([Breakpoints.XSmall, Breakpoints.Small])) {
          this.isSidebarOpen = false
        } else {
          this.isSidebarOpen = true;
        }
      })
    // } else{
    //    this.router.navigate(['/login']);
    // }
  }
}
