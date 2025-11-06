import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SettingComponent } from './pages/setting/setting.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { ShipmentComponent } from './pages/shipment/shipment.component';
import { UserEditDialogComponent } from './pages/dialog/user-edit-dialog/user-edit-dialog.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import {AddUserComponent} from './pages/add-user/add-user.component';
import { EditComponent } from './pages/edit-user/edit-user.component';
import {AddShipmentComponent} from './pages/add-shipment/add-shipment.component';
import {EditShipmentComponent } from './pages/edit-shipment/edit-shipment.component';
//src\app\pages\edit-usersrc\app\pages\edit-user\edituser.component.ts

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'shipment',
    component: ShipmentComponent,
  },
  {
    path: 'setting',
    component: SettingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
   {
    path: 'edituser/:id',
    component: EditComponent
  },
  {
    path: 'add-shipment',
    component: AddShipmentComponent
  },
  {
    path: 'edit-shipment/:id',
    component: EditShipmentComponent
  },
];
