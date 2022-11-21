import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { FreeBorrow } from 'src/app/interface/freeBorrow';
import { FreeListing } from 'src/app/interface/freeListing';
import { FreeWanted } from 'src/app/interface/freeWanted';
import { User } from 'src/app/interface/user';
import { FreeBorrowServieService } from 'src/app/services/freeBorrow-servie/free-borrow-servie.service';
import { FreeListServiceService } from 'src/app/services/freeList-service/free-list-service.service';
import { FreeWantedServiceService } from 'src/app/services/freeWanted-service/free-wanted-service.service';
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
      onHold: false,
      disable: false,
      createdAt: new Date(500000000000),
      updatedAt: new Date(500000000000)

    }];
  freeBorrow: FreeBorrow[] = [
    {
      "_id": "",
      "userToken": "",
      "picture": [],
      "title": "",
      "description": "",
      "lendingInfo": "",
      "listFor": 1,
      "location": {
        "lng": 88.48699665399437,
        "lat": 23.412221981538707
      },
      likes: [],
      onHold: false,
      disable: false,
      createdAt: new Date(500000000000),
      updatedAt: new Date(500000000000)

    }];
  freeWanted: FreeWanted[] = [
    {
      "_id": "",
      "userToken": "",
      "picture": [],
      "title": "",
      "description": "",
      "pickUpTime": "",
      "listFor": 1,
      "location": {
        "lng": 88.48699665399437,
        "lat": 23.412221981538707
      },
      likes: [],
      onHold: false,
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

      },
      rewardPoints:0
    }
  ];
  userBorrow: User[] = [
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
  userWanted: User[] = [
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
  userData: any[] = [];
  userToken!: string;
  errMsg!: string;
  status!: any;

  likesListing: boolean = false;

  countLikesListing: any[] = [];
  countLikesListingForBorrow: any[] = [];
  countLikesListingForWanted: any[] = [];
  haversineDistanceResult: any[] = [];
  haversineDistanceResultForBorrow: any[] = [];
  haversineDistanceResultForWanted: any[] = [];
  currentUserLat!: number;
  currentUserLng!: number;

  constructor(private spinner: NgxSpinnerService, private _toast: NgToastService, private _router: Router, private _userService: UserServiceService, private _freeList: FreeListServiceService, private _freeBorrow: FreeBorrowServieService, private _freeWanted: FreeWantedServiceService) {
    this.userToken = String(localStorage.getItem("userId"));
    this.currentUserLat = Number(localStorage.getItem("myLocationLat"));
    this.currentUserLng = Number(localStorage.getItem("myLocationLng"));
  }

  ngOnInit(): void {
    this.getFreeListUserData();
    this.getFreeBorrowUserData();
    this.getFreeWantedUserData();
  }
  getFreeListUserData() {
    this.spinner.show();
    this._freeList.getAllFreeListingNearBy(this.currentUserLng, this.currentUserLat).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeListing = res;
        console.log(this.freeListing);
        for (var ele = 0; ele < this.freeListing.length; ele++) {
          if (this.freeListing[ele].disable == true) {
            this.freeListing.splice(ele, 1);
          }
        }
        for (var i = 0; i < this.freeListing.length; i++) {
          console.log(this.removeDupliactes(this.freeListing[i].likes).length);
          this.countLikesListing.push(this.removeDupliactes(this.freeListing[i].likes).length);
          console.log(this.countLikesListing);
          this.haversineDistanceResult.push(this.calcCrow(this.currentUserLat, this.currentUserLng, this.freeListing[i].location.lat, this.freeListing[i].location.lng).toFixed(1));

          this._userService.getUserDataById(this.freeListing[i].userToken).subscribe(
            res => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);

              this.user.push(res[0]);

              console.log(this.user[1]);
              // console.log(this.user);

              console.log(this.removeDupliactes(this.user));


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
        console.log(this.haversineDistanceResult);

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


  // BORROW

  getFreeBorrowUserData() {
    this.spinner.show();
    this._freeBorrow.getAllFreeBorrowNearBy(this.currentUserLng, this.currentUserLat).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeBorrow = res;
        console.log(this.freeBorrow);
        for (var ele = 0; ele < this.freeBorrow.length; ele++) {
          if (this.freeBorrow[ele].disable == true) {
            this.freeBorrow.splice(ele, 1);
          }
        }
        for (var i = 0; i < this.freeBorrow.length; i++) {
          console.log(this.removeDupliactes(this.freeBorrow[i].likes).length);
          this.countLikesListingForBorrow.push(this.removeDupliactes(this.freeBorrow[i].likes).length);
          console.log(this.countLikesListingForBorrow);
          this.haversineDistanceResultForBorrow.push(this.calcCrow(this.currentUserLat, this.currentUserLng, this.freeBorrow[i].location.lat, this.freeBorrow[i].location.lng).toFixed(1));

          this._userService.getUserDataById(this.freeBorrow[i].userToken).subscribe(
            res => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);

              this.userBorrow.push(res[0]);

              console.log(this.userBorrow[1]);
              // console.log(this.user);

              console.log(this.removeDupliactes(this.userBorrow));


            }, err => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              this.userBorrow = [];
              this.errMsg = err;
              console.log(this.errMsg)
            }, () => console.log("Get User Data for borrow method excuted successfully"))

        }
        console.log(this.haversineDistanceResultForBorrow);

      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeBorrow = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get ALL FREE LIST Method excuted successfully"));

    console.log("Free List " + this.freeBorrow[0]);

    console.log("User " + this.user);
  }


   // WANTED

   getFreeWantedUserData() {
    this.spinner.show();
    this._freeWanted.getAllFreeWantedNearBy(this.currentUserLng, this.currentUserLat).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeWanted = res;
        console.log(this.freeWanted);
        for (var ele = 0; ele < this.freeWanted.length; ele++) {
          if (this.freeWanted[ele].disable == true) {
            this.freeWanted.splice(ele, 1);
          }
        }
        for (var i = 0; i < this.freeWanted.length; i++) {
          console.log(this.removeDupliactes(this.freeWanted[i].likes).length);
          this.countLikesListingForWanted.push(this.removeDupliactes(this.freeWanted[i].likes).length);
          console.log(this.countLikesListingForWanted);
          this.haversineDistanceResultForWanted.push(this.calcCrow(this.currentUserLat, this.currentUserLng, this.freeWanted[i].location.lat, this.freeWanted[i].location.lng).toFixed(1));

          this._userService.getUserDataById(this.freeWanted[i].userToken).subscribe(
            res => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);

              this.userWanted.push(res[0]);

              console.log(this.userWanted[1]);
              // console.log(this.user);

              console.log(this.removeDupliactes(this.userWanted));


            }, err => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              this.userWanted = [];
              this.errMsg = err;
              console.log(this.errMsg)
            }, () => console.log("Get User Data for wanted method excuted successfully"))

        }
        console.log(this.haversineDistanceResultForWanted);

      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeWanted = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get ALL FREE WANTED Method excuted successfully"));

    console.log("Free WANTED " + this.freeWanted[0]);

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



  calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  toRad(Value: number) {
    return Value * Math.PI / 180;
  }
}
