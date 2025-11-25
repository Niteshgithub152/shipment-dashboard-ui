import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IShipment } from '../core/interface/IShipment';
import { HttpService } from '../core/services/http.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AppService } from '../core/services/app.service';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatIconModule, FormsModule, SharedModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private appService = inject(AppService);

  trackingId = '';
  shipment: IShipment | null = null;  searched = false;
  loading = false;
  httpService = inject(HttpService);
  currentStatus : any;
  statusList = [
    { id: 1, label: 'Created' },
    { id: 2, label: 'Item Picked' },
    { id: 3, label: 'In Transit' },
    { id: 4, label: 'Out for Delivery' },
    { id: 5, label: 'Delivered' }
  ]

mapStatus(status: string): number {
  switch (status) {
    case 'Created': return 1;
    case 'Item Picked': return 2;
    case 'In Transit': return 3;
    case 'Out for Delivery': return 4;
    case 'Out For Delivery': return 4;
    case 'Delivered': return 5;
    default: return 1;
  }
}

trackShipment() {
    if (!this.trackingId.trim()) return;

    this.loading = true;
    this.searched = true;
    this.shipment = null;

    const timeout = setTimeout(() => {
    if (this.loading) {
      this.loading = false;
      console.warn('Tracking request timed out');
    }
  }, 10000); 

    // Call backend API
    this.httpService.getShipmentbyShipmentId(this.trackingId).subscribe({
      next: (res: any) => {
        clearTimeout(timeout); // cancel timeout when response comes
        this.loading = false;

        if (res.isSuccess && res.data && res.data.length > 0) {
          this.shipment = res.data[0];
          this.currentStatus = this.mapStatus(this.shipment?.shipmentStatus ?? '');
        }
        else{
          this.shipment = null;
        }
      }
    });
  }
}
