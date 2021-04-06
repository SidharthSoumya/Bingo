import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { matchingPasswords } from 'src/app/validators/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.createFormInstance();
  }

  ngOnInit(): void {
  }

  private createFormInstance(){
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password:  ['', Validators.compose([Validators.required])]
    });
  }

  public submitLoginForm(data) {
    this.spinner.show();
    const DATA = {
      'username': data.username,
      'password': data.password
    };
    this.auth.login(DATA).subscribe(res => {
      if (res !== null) {
        this.toastr.success(res['message']);
        const TOKEN = res['access_token'];
        // this.toastr.success(res['access_token']);
        localStorage.setItem('access_token', TOKEN);
        this.router.navigate(['/dashboard']);
        this.spinner.hide();
      }
    }, err => {
      this.toastr.warning(err.error.message);
      this.spinner.hide();
    });
  }

}
