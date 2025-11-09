import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { IShipment } from '../../components/interface/IShipment';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-shipment',
  imports: [MatCardModule, ReactiveFormsModule,MatInputModule,MatSelectModule,CommonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './add-shipment.component.html',
  styleUrl: './add-shipment.component.scss'
})
export class AddShipmentComponent {
  httpService = inject(HttpService);
  addShipmentForm: FormGroup;
  shipmentArray: IShipment[] = [];
  
    constructor(private fb: FormBuilder, private router:Router) {
    this.addShipmentForm = this.fb.group({
      shipmentId: ['', Validators.required],
      shipmentOrigin: ['', Validators.required],
      shipmentDestination: ['', Validators.required],
      shipmentStatus: ['', Validators.required],
      estimatedDeliverydate: ['', Validators.required],
      userId: ['', Validators.required],
      driverId: ['', Validators.required],
      lattitude: [''],
      longitude: ['']
    });
  }
  
    onSubmit() {
        if (this.addShipmentForm.invalid) {
        console.log('Form is invalid');
        this.router.navigate(['/shipment']);
        return;
      }

      const formValue = this.addShipmentForm.getRawValue();
      console.log('Form Data:', this.addShipmentForm.value);
    const shipment = {
      shipmentId: formValue.shipmentId,
      shipmentOrigin: formValue.shipmentOrigin,
      shipmentDestination: formValue.shipmentDestination,
      shipmentStatus: formValue.shipmentStatus,
      estimatedDeliverydate: formValue.estimatedDeliverydate.toLocaleString(),
      userId: formValue.userId,
      driverDetails: {
        driverId: formValue.driverId,
        assignedAt: new Date().toISOString()
      },
      trackingDetails: {
        lattitude: formValue.lattitude as any,
        longitude: formValue.longitude as any,
        timeStamp: new Date().toISOString()
      },
      createdOn: new Date().toLocaleString(),
      updatedOn: ''
    };
    this.shipmentArray.push(shipment);
    console.log('Shipment added:', shipment);
    console.log('Shipment array:', this.shipmentArray);

    this.httpService.insertShipments(this.shipmentArray).subscribe({
      next: (response: any) => {
        console.log('Insert successful:', response);
        alert('Shipment(s) inserted successfully!');
        this.addShipmentForm.reset();
      }
    });

    this.addShipmentForm.reset();
    this.httpService.getAllShipments();
    this.router.navigate(['/shipment']);
    }
}

