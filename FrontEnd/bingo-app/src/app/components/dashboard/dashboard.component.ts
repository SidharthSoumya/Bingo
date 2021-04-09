import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GamePlayService } from './../../services/game-play.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {

  public username = '';
  public mobile;
  public imgSrc = 'assets/images/profile.jpg';
  public now = new Date();
  public time;
  public sub : Subscription;
  public onlinePlayerList = [];
  public isNewGame = false;
  public temp:number[] = [];
  public bingoValues = [];
  constructor(
    private gamePlay: GamePlayService,
    private toastr: ToastrService,
    private rouetr: Router,
    private auth: AuthenticationService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private router: Router,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getPlayerData();
    this.time =  this.now.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    this.getOnlinePlayers();
    this.updateTime();
    this.generateRandom();
  }

  private updateTime() {
    const source = interval(10000);
    source.subscribe(ele => {
      this.now = new Date();
      this.time =  this.now.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    });
  }

  private generateRandom() {
    var row = []
    while (this.temp.length < 25) {
      const num = Math.floor(Math.random() * 25) + 1;
      if (this.temp.indexOf(num) === -1) {
        this.temp.push(num);
        const data = {
          value: num,
          isClicked: false
        }
        row.push(data);
        if (row.length === 5){
          this.bingoValues.push(row)
          row = [];
        }
      }
    }
    console.log('Bingo Values :', this.bingoValues);
  }

  private getPlayerData() {
    this.gamePlay.getPlayerDetails().subscribe(res => {
      if(res !== null) {
        console.log(res);
        this.username = res.player_name;
        this.mobile = res.mobile_numbr;
        this.imgSrc = "data:image/jpg;base64,"+res.img_location;
      }
    }, err => {
      this.toastr.warning(err.error.msg);
      this.logout();
    })
  }

  private checkBingo() {

  }

  public sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  public getOnlinePlayers() {
    this.spinner.show()
    this.gamePlay.getOnlinePlayerDetails().subscribe(res => {
      console.log(res);
      if(res !== null) {
        this.onlinePlayerList = res.res;
      }
      this.spinner.hide();
      console.log(this.onlinePlayerList);
    }, err => {
      this.spinner.hide();
      this.toastr.warning(err.error.msg);
    });
  }

  public clickButton(rowInd, colInd) {
    console.log(rowInd, colInd);
    this.bingoValues[rowInd][colInd].isClicked = true;
    this.checkBingo();
  }

  public startNewGame() {
    Swal.fire({
      title: 'Start a New Game',
      text: 'Do you want to Find Players',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then(res => {
      if (res.isConfirmed) {
        this.isNewGame = true;
        this.modalService.dismissAll();
      }
    });
  }

  openSm(content) {
    this.getOnlinePlayers();
    this.modalService.open(content, { size: 'sm' });
  }

  public logout() {
    this.auth.logout().subscribe(res => {
      if (res !== null) {
        localStorage.setItem('access_token', '');
        this.router.navigate(['./sign-in']);
      }
    }, err => {
      console.log("Error...");
      localStorage.setItem('access_token', '');
      this.router.navigate(['./sign-in']);
      this.toastr.warning(err.error.msg)
    })
  }

  ngOnDestroy(): void {
  }

}
