import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IShipment } from '../../components/interface/IShipment';
import { HttpService } from '../../http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatIconModule, TableComponent, BaseChartDirective, FormsModule, CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  trackingId = '';
  shipment: IShipment | null = null;  searched = false;
  loading = false;
  httpService = inject(HttpService);

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
        }
        else{
          this.shipment = null;
        }
      }
    });
  }
}
