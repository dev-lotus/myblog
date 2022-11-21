import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/interface/user';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-karma-points',
  templateUrl: './karma-points.component.html',
  styleUrls: ['./karma-points.component.css']
})
export class KarmaPointsComponent implements OnInit {
  
  karmaPoints: number = 0;
  level1Trophy: string = "https://img.icons8.com/nolan/512/FF8177/B12A5B/trophy.png";
  level2Trophy: string = "https://img.icons8.com/nolan/512/ECC84E/45C595/trophy.png";
  level3Trophy: string = "https://img.icons8.com/nolan/512/2AF598/009EFD/trophy.png";
  level4Trophy: string = "https://img.icons8.com/nolan/512/D9E021/FB872B/trophy.png";
  currentTrophy: string = "";
  userToken!: string;
  status: any;
  errMsg: any;

  constructor(private spinner: NgxSpinnerService, private _toast: NgToastService, private _userService: UserServiceService) {
    this.userToken = String(localStorage.getItem("userId"));
  }

  ngOnInit(): void {

    this.getUserData();


  }

  getUserData() {
    this.spinner.show();
    this._userService.getUserDataById(this.userToken).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
       localStorage.setItem("rewardPoints", String(this.status[0].rewardPoints));

        this.karmaPoints = Number(this.status[0].rewardPoints);

        if (this.karmaPoints >= 0 && this.karmaPoints <= 999) {
          this.currentTrophy = this.level1Trophy;
        }
        else if (this.karmaPoints >= 1000 && this.karmaPoints <= 2499) {
          this.currentTrophy = this.level2Trophy;
        }
        else if (this.karmaPoints >= 2500 && this.karmaPoints <= 9999) {
          this.currentTrophy = this.level3Trophy;
        }
        else {
          this.currentTrophy = this.level4Trophy;
        }
      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get User Data method excuted successfully"))
  }

}
