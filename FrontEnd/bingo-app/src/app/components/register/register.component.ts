import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, matchingPasswords, mobileNumberValidator } from 'src/app/validators/validators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public profileImgUrl = '/assets/images/profile2.jpg';
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.createFormInstance();
  }

  ngOnInit(): void {
  }
  private createFormInstance(){
    this.registerForm = this.fb.group({
      name: ['', Validators.compose([Validators.required ])],
      emailId: ['', Validators.compose([Validators.required, emailValidator])],
      mobileNo: ['', Validators.compose([Validators.required, mobileNumberValidator])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      profilePhoto: [null, Validators.compose([Validators.required])],
      profilePhotoName: ['', Validators.compose([Validators.required])],
    }, {
      validator: matchingPasswords('password', 'confirmPassword')
    });
  }

  public onSelectFile(e) {
    const FILE = <File>e.target.files[0];
    this.registerForm.get('profilePhoto').setValue(FILE);
    this.registerForm.get('profilePhotoName').setValue(FILE.name);

    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]); // read file as data url

        reader.onload = (ev) => { // called once readAsDataURL is completed
            this.profileImgUrl = reader.result.toString();
        };
    }
  }

  public submitRegisterForm(data) {
    this.spinner.show();
    const DATA = {
      'name': data.name,
      'emailId': data.emailId,
      'mobileNo': data.mobileNo,
      'password': data.password
    }
    const f_data = new FormData();
    // f_data.append('name', data.name);
    // f_data.append('emailId', data.emailId);
    // f_data.append('mobileNo', data.mobileNo);
    // f_data.append('password', data.password);
    f_data.append('registration_data', JSON.stringify(DATA))
    if(data.profilePhoto !== null) {
      f_data.append('img', data.profilePhoto, data.profilePhotoName);
    }
    this.auth.register(f_data).subscribe(res => {
      if(res !== null) {
        this.router.navigate(['/sign-in']);
        this.toastr.success(res['message']);
        this.spinner.hide();
      }
    }, err => {
      this.toastr.warning(err.error.message);
      this.spinner.hide();
    })
  }

}
