import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './services/authentication.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'bingo-app';
  constructor(
    private auth: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy() {
    // this.auth.logout().subscribe(res => {
    //   if (res !== null) {
    //     this.toastr.success(res.message);
    //   }
    // }, err => {
    //   this.toastr.warning(err.error.message);
    // })
  }
}
