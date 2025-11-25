import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../../core/services/http.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { IShipment } from '../../core/interface/IShipment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-shipment',
  imports: [SharedModule, MatCardModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, RouterLink],
  templateUrl: './edit-shipment.component.html',
  styleUrl: './edit-shipment.component.scss'
})
export class EditShipmentComponent {
onSubmit() {
  if (this.editShipmentForm.invalid) {
    console.warn('Form is invalid');
    return;
  }

  const formValue = this.editShipmentForm.getRawValue();
  console.log('Form Data:', formValue);

  const shipment: IShipment = {
    shipmentId: formValue.shipmentId,
    shipmentOrigin: formValue.shipmentOrigin,
    shipmentDestination: formValue.shipmentDestination,
    shipmentStatus: formValue.shipmentStatus,
    estimatedDeliverydate: formValue.estimatedDeliverydate.toISOString(), // convert to ISO string
    userId: formValue.userId,
    driverDetails: {
      driverId: formValue.driverId,
      assignedAt: new Date().toISOString(),
    },
    trackingDetails: {
      currentLocation: formValue.currentLocation,
      timeStamp: new Date().toISOString(),
    },
    createdOn: new Date().toLocaleString(),
    updatedOn: new Date().toLocaleString(),
  };

  console.log('Shipment object ready for API:', shipment);

  // ✅ Call your update API
  this.httpService.UpdateShipment(shipment).subscribe({
    next: (response: any) => {
      alert(response.message);
      this.httpService.getAllShipments();
    },
    error: (err: any) => {
      console.error('Error updating shipment:', err);
      alert('Failed to update shipment');
    },
  });

    this.editShipmentForm.reset();
    this.router.navigate(['/shipment']);
}

ngOnInit(): void {
  this.shipmentId = this.route.snapshot.paramMap.get('id');
  console.log('Shipment ID:', this.shipmentId);

  if (this.shipmentId) {
    this.httpService.getShipmentbyShipmentId(this.shipmentId).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        const shipment = response.data[0]; // assuming API returns an array like user API

        this.editShipmentForm = this.fb.group({
          shipmentId: [{ value: shipment.shipmentId, disabled: true }, Validators.required],
          shipmentOrigin: [shipment.shipmentOrigin, Validators.required],
          shipmentDestination: [shipment.shipmentDestination, Validators.required],
          shipmentStatus: [shipment.shipmentStatus, Validators.required],
          estimatedDeliverydate: [new Date(shipment.estimatedDeliverydate), Validators.required],
          userId: [shipment.userId, Validators.required],
          driverId: [shipment.driverDetails?.driverId || '', Validators.required],
          currentLocation: [shipment.trackingDetails?.currentLocation || ''],
        });
      }
    });
  }
}


    httpService = inject(HttpService);
    editShipmentForm!: FormGroup;
    shipmentId: any;

    constructor(private fb: FormBuilder,private route: ActivatedRoute,private router:Router) {
      this.editShipmentForm = this.fb.group({
      shipmentId: [{ value: '', disabled: true }, Validators.required],
      shipmentOrigin: ['', Validators.required],
      shipmentDestination: ['', Validators.required],
      shipmentStatus: ['', Validators.required],
      estimatedDeliverydate: [null, Validators.required],
      userId: ['', Validators.required],
      driverId: ['', Validators.required],
      currentLocation: [''],
    });
    }
}
