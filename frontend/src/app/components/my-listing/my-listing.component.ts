import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { FreeListing } from 'src/app/interface/freeListing';
import { User } from 'src/app/interface/user';
import { FreeListServiceService } from 'src/app/services/freeList-service/free-list-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
@Component({
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrls: ['./my-listing.component.css']
})
export class MyListingComponent implements OnInit {
  userToken: string;
  freeListing: FreeListing[] = [
    {
      "_id": "",
      "userToken": "",
      "picture": [],
      "title": "",
      "category": "",
      "description": "",
      "pickUpTime": "",
      "listFor": 1,
      "location": {
        "lng": 88.48699665399437,
        "lat": 23.412221981538707

      }
    }];
  user: User[] = [
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

      }
    }
  ];
  errMsg: any;
  constructor(private route: ActivatedRoute,private spinner: NgxSpinnerService, private _toast: NgToastService, private _router: Router, private _userService: UserServiceService, private _freeList: FreeListServiceService) {
    this.userToken = String(localStorage.getItem("userId"));
    console.log(this.userToken);
   }

  ngOnInit(): void {
    this.getFreeListUserData();
  }
 
  getFreeListUserData() {
    this.spinner.show();
    this._freeList.getFreeListingDataByUserToken(this.userToken).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeListing = res;
        console.log(this.freeListing);
        
      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeListing = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get ALL FREE LIST user token Method excuted successfully"));

  }

  removeUserFreeListItem(listId:string)
  {
    console.log(listId);
  }

}
