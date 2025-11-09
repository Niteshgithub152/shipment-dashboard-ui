import { Component, inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {BreakpointObserver, Breakpoints, LayoutModule} from '@angular/cdk/layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';




@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    HeaderComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    LayoutModule,
    FormsModule,
    MatExpansionModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'shipment-dashboard';
  isSidebarOpen = true;
  isAdmin = true;
  breakpointObserver = inject(BreakpointObserver);
  authService=inject(AuthService);
managementOpen = false;
loginCheck:boolean | undefined;
constructor(private router: Router){
  
}
ngOnInit(){
this.loginCheck=this.authService.loggedIn;
  console.log(this.authService.loggedIn)
  // if(this.loginCheck){
  //   alert('welcome')
  this.breakpointObserver.observe([Breakpoints.XSmall,Breakpoints.Small])
  .subscribe(result=>{
     if(this.breakpointObserver.isMatched([Breakpoints.XSmall,Breakpoints.Small])){
           this.isSidebarOpen = false
     }else{
      this.isSidebarOpen = true;
     }
  })
// } else{
//    this.router.navigate(['/login']);
// }
}
}
