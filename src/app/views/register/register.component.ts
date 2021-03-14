import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl, NgForm } from '@angular/forms';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRegister } from 'src/app/shared/models/UserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private logging: LoggingService) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.RegisterForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  //#region validations

  checkPassword(group: AbstractControl) {
    const pass = group.get('password');
    const cpass = group.get('confirmPassword');
    if (pass.value === cpass.value || cpass.pristine) {
      return null;
    } else {
      return { 'notSame': true }
    }
  }

  getFirstNameError() {
    const firstName = this.RegisterForm.get('firstName');
    if (firstName.hasError('required')) {
      return 'First Name is Required';
    }
  }

  getLastNameError() {
    const lastName = this.RegisterForm.get('lastName');
    if (lastName.hasError('required')) {
      return 'Last Name is Required';
    }
  }

  getEmailError() {
    const email = this.RegisterForm.get('email');
    if (email.hasError('required')) {
      return 'Email is Required';
    }
    else if (email.hasError('email')) {
      return 'Invalid Email Address';
    }
  }


  getPasswordError() {
    const password = this.RegisterForm.get('password');
    if (password.hasError('required')) {
      return 'Password is Required';
    }

    if (password.hasError('minlength')) {
      return 'Password must be minimum 8 characters';
    }
  }

  getConfirmPasswordError() {
    const confirmPass = this.RegisterForm.get('confirmPassword');
    if (confirmPass.hasError('required')) {
      return 'Confirm Password is Required';
    }

    if (confirmPass.hasError('minlength')) {
      return 'Password must be minimum 8 characters';
    }
  }





  //#endregion

  onSubmitRegisterForm(form) {
    if (form.valid) {
      this.spinner.show();
      const objdata: UserRegister = form.value;
      this.authService.register(objdata).subscribe(data => {
        if (data.success) {
          this.logging.notify('Registration Sucessfull, Please Verify Email Address');
          form.resetForm();
        } else {
          this.logging.notify(data.message);
        }
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.logging.log(err);
      })

    } else {
      this.logging.notify('Invalid Input, Provide Valid Inputs');
    }
  }

}
