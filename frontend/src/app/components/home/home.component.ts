import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/interface/user';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   userName: String = "";
   user:User[]= [
    {
      _id: "",
      profilePicture: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      mobileNumber: "",
      aboutYou: "",
      likes: [],
      dislikes: [],
      myLocation: {
        "lng": 88.48699665399437,
        "lat": 23.412221981538707
       
  },
  rewardPoints:0
    }
  ];
  
  status: any;
  errMsg: any;
  constructor(private _userService:UserServiceService,private spinner: NgxSpinnerService, private _toast: NgToastService) { }

  ngOnInit(): void {
    this.userName = String(localStorage.getItem("firstName")) ;
    this.getHighestMemberRewardPoint();
  }

  getHighestMemberRewardPoint()
  {
    this.spinner.show();
    this._userService.getHighestRewardPointMember().subscribe(
      res=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.user = res;
        console.log(this.user);
      },
      err=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.user = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get getHighestMemberRewardPoint method excuted successfully"))
  }
}
