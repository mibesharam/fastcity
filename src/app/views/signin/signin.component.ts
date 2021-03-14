import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  showResendBtn: boolean;
  returnUrl: string;
  constructor(private fb: FormBuilder, private logging: LoggingService, private router: Router,
    private route: ActivatedRoute, private authService: AuthService, private spinner: NgxSpinnerService) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.checkiSLogin();
  }

  ngOnInit() {

    this.showResendBtn = false;
    this.initializeForm();
    this.checkIsVerification();

  }

  checkiSLogin() {
    const user = this.authService.currentUserValue;
    if (user) {
      this.router.navigate([this.returnUrl.toString()]);
    }
    // this.authService.isLogin().subscribe(data => {
    //   if (data) {
    //     this.router.navigate([this.returnUrl.toString()]);
    //   }
    // }, err => {
    //   this.logging.log(err);
    //   this.router.navigate([this.returnUrl.toString()]);
    // })
  }

  checkIsVerification() {
    const data = this.route.snapshot.data;

    if (data && data.isVerification) {
      //this is verification link
      const email = this.route.snapshot.queryParams.email;
      const token = this.route.snapshot.queryParams.token;

      this.loginForm.patchValue({
        email: email
      });

      this.spinner.show();
      this.authService.verifyUser(email, token).subscribe(data => {
        if (data.success) {
          this.logging.notify('Verification Successfull');
        } else {
          if (data.errorCode && data.errorCode === 10001) {
            this.showResendBtn = true;
          } else if (data.errorCode && data.errorCode === 10002) {
            this.router.navigateByUrl('/login');
          }
          this.logging.notify(data.message);
        }
        this.spinner.hide();
      }, err => {
        this.logging.log(err);
        this.spinner.hide();
      })
    }
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  getEmailError() {
    const email = this.loginForm.get('email');
    if (email.hasError('required')) {
      return 'Email is required';
    }

    if (email.hasError('email')) {
      return 'Invalid Email Address';
    }

  }

  getPasswordError() {
    const password = this.loginForm.get('password');
    if (password.hasError('required')) {
      return 'Password is required';
    }

  }

  onClickResendVerification() {
    const email = this.loginForm.get('email');
    if (email.valid) {
      this.spinner.show();
      this.authService.resendVerification(email.value).subscribe(data => {
        if (data.success) {
          this.logging.notify('Verification Mail Sent');
        } else {
          this.logging.notify(data.message);
        }
        this.spinner.hide();
      }, err => {
        this.logging.log(err);
        this.spinner.hide();
      })
    } else {
      this.logging.notify('Please Provide Valid Email');
    }
  }


  onSubmitLogin(form) {
    if (form.valid) {
      this.spinner.show();
      this.authService.login(form.value.email, form.value.password).subscribe(data => {
        if (data.success) {
          this.logging.notify('Login Successfully');
          this.router.navigate([this.returnUrl.toString()]);
        } else {
          if (data.errorCode && data.errorCode === 10001) {
            this.showResendBtn = true;
          }
          this.logging.notify(data.message);
        }
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.logging.log(err);
      })
    } else {
      this.logging.notify('Please Provide valid Inputs');

    }
  }

}
