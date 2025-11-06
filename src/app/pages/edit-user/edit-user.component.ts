import { Component,inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../http.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { IUser } from '../../components/interface/User';

@Component({
  selector: 'app-edit',
  imports: [MatCardModule, ReactiveFormsModule,MatInputModule,MatSelectModule,CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditComponent {
    httpService = inject(HttpService);
    editUserForm: FormGroup;
  userIds: any;
  
    constructor(private fb: FormBuilder,private route: ActivatedRoute,private router:Router) {
      this.editUserForm = this.fb.group({
        userId: [{ value: '', disabled: true }, Validators.required],
        userName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        roleCategory: ['', Validators.required],
        contactNumber: ['', [Validators.required]],
      });
    }
  onSubmit(){
    console.log(this.editUserForm.getRawValue())
    const formValue = this.editUserForm.getRawValue();
      console.log('Form Data:', this.editUserForm.getRawValue());
      const user: IUser = {
            userId: formValue.userId,
            userName: formValue.userName,
            email: formValue.email,
            passwordHash: formValue.password,
            userRole: formValue.roleCategory,
            contactNumber: formValue.contactNumber,
            createdOn: formValue.createdOn,
            updatedOn: ''
    };

    console.log('User added:', user);

    this.httpService.updateUser(user).subscribe({
      next: (response: any) => {
        console.log('Update successful:', response);
        if(response.isSuccess){
          alert(response.message);
        }
        this.editUserForm.reset();
      }
    });

    this.editUserForm.reset();
    this.router.navigate(['/user']);

  }

    ngOnInit(): void {
        this.userIds = this.route.snapshot.paramMap.get('id');
        console.log('User ID:', this.userIds);

        if (this.userIds) {
          this.httpService.getUserByUserId(this.userIds).subscribe({
            next: (response: any) => {
              console.log('API Response:', response);
              
              this.editUserForm = this.fb.group({
              userId: [{value: response.data[0].userId, disabled: true},, Validators.required],
              userName: [response.data[0].userName, Validators.required],
              email: [response.data[0].email, Validators.required],
              password: [response.data[0].passwordHash, Validators.required],
              roleCategory: [response.data[0].userRole.toLowerCase(), Validators.required],
              contactNumber: [response.data[0].contactNumber, [Validators.required]],
            });
            }
          });
      }
    }
}