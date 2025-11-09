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
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IShipment } from '../../components/interface/IShipment';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule, 
    MatSortModule,
    MatPaginatorModule

  ],
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})

// shipmentId: string,
//   shipmentOrigin: string,
//   shipmentDestination: string,
//   shipmentStatus: string,
//   estimatedDeliveryDate: string,
//   userId: string,
//   driverDetails: IDriverDetail,
//   trackingDetails: ITrackingDetail
//   createdOn: string,
//   updatedOn: string
export class ShipmentComponent implements AfterViewInit{
  displayedColumns: string[] = ['shipmentId', 'shipmentOrigin', 'shipmentDestination', 'shipmentStatus', 'estimatedDeliverydate', 'userId','driverDetails','createdOn','updatedOn','action'];
  dataSource!: MatTableDataSource<IShipment>;
  httpService = inject(HttpService);
  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  row:any;
  
  constructor(private router: Router) {  }

  ngOnInit() {
      this.httpService.getAllShipments().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource<IShipment>(result.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
      })
  }
  
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    onAdd() {
      this.router.navigate(['/add-shipment'])
    }

    onEdit(shipmentId: any): void {
    console.log('Edit clicked for row:', shipmentId);
     this.router.navigate(['/edit-shipment/',shipmentId ])
    // Add logic for editing here, e.g., opening a dialog or navigating to an edit route.
  }

    onDelete(shipmentId: string): void {
  if (!shipmentId) return;

  if (confirm('Are you sure you want to delete this user?')) { // confirmation popup
    this.httpService.deleteShipment(shipmentId).subscribe({
      next: (res : any) => {
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
