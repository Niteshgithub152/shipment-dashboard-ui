import { Injectable } from '@angular/core';
import { IShipmentStatus } from '../interface/IShipment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private _user: any = {}; 
  public shipmentStatusList!: IShipmentStatus[];
  
  public userSub: BehaviorSubject<any> = new BehaviorSubject<any>({});

  get user(): any {
    return this._user;
  }

  set user(value: any) {
    this._user = value;
    this.userSub.next(this._user);
  }
}
