import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from '../../../core/services/auth/signup/signup.service';
import { SignupRequest, SignupResponse } from '../../../core/models/data';
import { AuthRoutingModule } from "../auth-routing.module";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
    role: new FormControl<string>('CUSTOMER'),
  });
  constructor(private signupService: SignupService) {}
  onSubmit() {
    const request: SignupRequest = {
      firstName: this.signupForm.value.firstName || '',
      lastName: this.signupForm.value.lastName || '',
      email: this.signupForm.value.email || '',
      password: this.signupForm.value.password || '',
      role: this.signupForm.value.role || '',
    };

    this.signupService.signup(request).subscribe((response: SignupResponse) => {
      localStorage.setItem('token', response.data);
      console.log(localStorage.getItem('token'))
    });
  }
}
