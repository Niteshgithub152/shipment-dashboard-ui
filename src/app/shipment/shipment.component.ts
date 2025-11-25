import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IShipment } from '../core/interface/IShipment';
import { HttpService } from '../core/services/http.service';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})

export class ShipmentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['shipmentId', 'shipmentOrigin', 'shipmentDestination', 'shipmentStatus', 'estimatedDeliverydate', 'userId', 'driverDetails', 'currentLocation', 'createdOn', 'updatedOn', 'action'];
  dataSource!: MatTableDataSource<IShipment>;
  httpService = inject(HttpService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  row: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.httpService.getAllShipments().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource<IShipment>(result.data);
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  addShipment() {
    this.router.navigate(['/shipment/new'])
  }

  onEdit(shipmentId: any): void {
    console.log('Edit clicked for row:', shipmentId);
    this.router.navigate(['/shipment/manage/', shipmentId])
    // Add logic for editing here, e.g., opening a dialog or navigating to an edit route.
  }

  onDelete(shipmentId: string): void {
    if (!shipmentId) return;

    if (confirm('Are you sure you want to delete this user?')) { // confirmation popup
      this.httpService.deleteShipment(shipmentId).subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            alert(res.message); // or use Angular Material Snackbar
          } else {
            alert('Failed to delete user');
          }
        }
      });
    }
    this.httpService.getAllShipments();
    this.router.navigate(['/shipment']);
  }

  trackByShipmentId(index: number, shipment: IShipment): string {
    return shipment.shipmentId;
  }
}
