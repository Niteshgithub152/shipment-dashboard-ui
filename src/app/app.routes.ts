import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddShipmentComponent } from './shipment/add-shipment/add-shipment.component';
import { EditShipmentComponent } from './shipment/edit-shipment/edit-shipment.component';
import { routeGuard } from './shared/guards/route.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent, canActivate: [routeGuard] },
  { path: 'user/new', component: AddUserComponent, canActivate: [routeGuard] },
  { path: 'user/manage/:id', component: EditUserComponent, canActivate: [routeGuard] },
  { path: 'shipment', component: ShipmentComponent, canActivate: [routeGuard] },
  { path: 'shipment/new', component: AddShipmentComponent, canActivate: [routeGuard] },
  { path: 'shipment/manage/:id', component: EditShipmentComponent, canActivate: [routeGuard] },
  { path: '**', redirectTo: '' }
];
