import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from './components/interface/User';
import { IResult } from './components/interface/IResult';
import { IShipment } from './components/interface/IShipment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http = inject (HttpClient);
  baseUrl = "https://localhost:44321"
  constructor() { }

  getAllUser(){
    return this.http.get<IResult<IUser>[]>(this.baseUrl + "/api/GetUsers")
  }
  getUserByUserId(userId:string){
    return this.http.get<IResult<IUser>[]>(this.baseUrl + `/api/GetUserByUserId?userId=${userId}`)
  }

  //https://localhost:44321/api/GetUserByUserId?userId=Nitesh_K

 insertUsers(users: IUser[]) {
  return this.http.post<IResult<IUser[]>>(
    this.baseUrl + '/api/InsertUsers',
    users
  );
}

 updateUser(user: IUser) {
  return this.http.put<IResult<IUser>>(
    this.baseUrl + '/api/UpdateUser',
    user
  );
}

deleteUser(userId: string) {
  return this.http.delete<IResult<IUser>>(`${this.baseUrl}/api/DeleteUser?userId=${userId}`);
}

// Shipment routes
  getAllShipments(){
    return this.http.get<IResult<IShipment>[]>(this.baseUrl + "/api/GetAllShipments")
  }

   insertShipments(shipments: IShipment[]) {
  return this.http.post<IResult<IShipment[]>>(
    this.baseUrl + '/api/InsertShipments',
    shipments
  );
}

 UpdateShipment(shipment: IShipment) {
  return this.http.put<IResult<IShipment>>(
    this.baseUrl + '/api/UpdateShipment',
    shipment
  );
}

DeleteShipment(shipmentId: string) {
  return this.http.delete<IResult<IShipment>>(`${this.baseUrl}/api/DeleteShipment?shipmentId=${shipmentId}`);
}
}
