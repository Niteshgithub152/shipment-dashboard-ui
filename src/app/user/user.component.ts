import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IUser } from '../core/interface/User';
import { HttpService } from '../core/services/http.service';
import { IResult } from '../core/interface/IResult';
// import { MatButton, MatAnchor } from "@angular/material/button";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-user',
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
    MatIconModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['userId', 'userName', 'email', 'role', 'contnactNo', 'createdOn', 'updatedOn', 'action'];
  dataSource!: MatTableDataSource<IUser>;
  httpService = inject(HttpService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  row: any;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.httpService.getAllUser().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource<IUser>(result.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    })
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(userId: any): void {
    console.log('Edit clicked for row:', userId);
    this.router.navigate(['/user/manage/', userId])
    // Add logic for editing here, e.g., opening a dialog or navigating to an edit route.
  }

  deleteUser(userId: string): void {
    if (!userId) return;

    if (confirm('Are you sure you want to delete this user?')) { // confirmation popup
      this.httpService.deleteUser(userId).subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            alert(res.message); // or use Angular Material Snackbar
          } else {
            alert('Failed to delete user');
          }
        }
      });
    }
    this.httpService.getAllUser();
    this.router.navigate(['/user'])
  }
  
  addUser(): void {
    this.router.navigate(['/user/new'])
  }


}


