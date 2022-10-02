import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { FreeListing } from 'src/app/interface/freeListing';
import { User } from 'src/app/interface/user';
import { FreeListServiceService } from 'src/app/services/freeList-service/free-list-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

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
      },
      likes: [],
      disable: false,
      createdAt: new Date(500000000000),
      updatedAt: new Date(500000000000)

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
  userData: any[] = [];
  userToken!: string;
  errMsg!: string;
  status!: any;
  
  likesListing: boolean = false;
  countLikesListing: any[] = [];
  constructor(private spinner: NgxSpinnerService, private _toast: NgToastService, private _router: Router, private _userService: UserServiceService, private _freeList: FreeListServiceService) {
    this.userToken = String(localStorage.getItem("userId"));
  }

  ngOnInit(): void {
    this.getFreeListUserData();


  }
  getFreeListUserData() {
    this.spinner.show();
    this._freeList.getAllFreeListing().subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeListing = res;
        console.log(this.freeListing);
        for (var i = 0; i < this.freeListing.length; i++) {
          this._userService.getUserDataById(this.freeListing[i].userToken).subscribe(
            res => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);

              this.user.push(res[0]);

              console.log(this.user[1]);
              // console.log(this.user);

              console.log(this.removeDupliactes(this.user) );
              console.log(this.removeDupliactes(this.freeListing[0].likes));
              this.countLikesListing = this.removeDupliactes(this.freeListing[0].likes);
              console.log(this.countLikesListing);


              
              
            }, err => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              this.user = [];
              this.errMsg = err;
              console.log(this.errMsg)
            }, () => console.log("Get User Data method excuted successfully"))

        }
      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeListing = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get ALL FREE LIST Method excuted successfully"));

    console.log("Free List " + this.freeListing[0]);

    console.log("User " + this.user);
  }
   removeDupliactes = (values: any[]) => {
    let concatArray = values.map(eachValue => {
      return Object.values(eachValue).join('')
    })
    let filterValues = values.filter((value, index) => {
      return concatArray.indexOf(concatArray[index]) === index
  
    })
    return filterValues
  }
  getUserDataByToken(userTokenFreeList: string) {
    this._userService.getUserDataById(userTokenFreeList).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);


        this.userData.push(res[0]);

        console.log(this.userData[0].profilePicture);
        console.log(this.userData);
      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.user = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get User Data method excuted successfully"))

  }
}
