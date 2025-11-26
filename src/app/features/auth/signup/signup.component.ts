import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from '../../../core/services/auth/signup/signup.service';
import { SignupRequest, SignupResponse } from '../../../core/models/data';
import { AuthRoutingModule } from "../auth-routing.module";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    lastName: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{8,}$')]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
    role: new FormControl<string>('CUSTOMER'),
  });
  constructor(private signupService: SignupService, private router: Router) { }
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
    /* to navigate to home page after signup */
    this.router.navigate(['/home']);
  }
}
