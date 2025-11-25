import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IUser } from '../../core/interface/User';
import { HttpService } from '../../core/services/http.service';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-add-user',
  imports: [SharedModule, MatCardModule, MatInputModule, MatSelectModule, MatIconModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  httpService = inject(HttpService);
  addUserForm: FormGroup;
  userArray: IUser[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.addUserForm = this.fb.group({
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roleCategory: ['', Validators.required],
      contactNumber: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.addUserForm.invalid) {
      console.log('Form is invalid');
      this.router.navigate(['/user']);
      return;
    }

    const formValue = this.addUserForm.value;
    console.log('Form Data:', this.addUserForm.value);
    const user: IUser = {
      userId: formValue.userId,
      userName: formValue.userName,
      email: formValue.email,
      passwordHash: formValue.password,
      userRole: formValue.roleCategory,
      contactNumber: formValue.contactNumber,
      createdOn: '',
      updatedOn: ''
    };
    this.userArray.push(user);
    console.log('User added:', user);
    console.log('User array:', this.userArray);

    this.httpService.insertUsers(this.userArray).subscribe({
      next: (response: any) => {
        console.log('Insert successful:', response);
        alert('User(s) inserted successfully!');
        this.addUserForm.reset();
      }
    });

    this.addUserForm.reset();
    this.router.navigate(['/user']);
  }
}
