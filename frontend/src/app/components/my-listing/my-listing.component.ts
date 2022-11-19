import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
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
      },
      likes: [],
      onHold:false,
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

      }
    }
  ];
  errMsg: any;
  status: any;
  constructor(private route: ActivatedRoute,private spinner: NgxSpinnerService, private _toast: NgToastService, private _router: Router, private _userService: UserServiceService, private _freeList: FreeListServiceService, private _freeBorrow: FreeBorrowServieService, private _freeWanted: FreeWantedServiceService) {
    this.userToken = String(localStorage.getItem("userId"));
    console.log(this.userToken);
   }

  ngOnInit(): void {
    this.getFreeListUserData();
    this.getFreeBorrowUserData();
    this.getFreeWantedUserData();
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

  removeUserFreeListItem(listId:string, userTokenVal:string)
  {
    console.log(listId, userTokenVal);
    this._freeList.deleteFreeListing(listId,userTokenVal).subscribe(
      res=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "SUCCESS", summary: 'Listing has been deleted', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);

        }
        else {
          this._toast.warning({ detail: "FAILED", summary: 'Unable to delete your listing', position: 'br' });

        }
      },err=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

      },
      () => console.log("DELETE ListiNG METHOD successfully EXECUTED")
    )
  }
  disableStatusListingOnClick(listId:string, userTokenVal:string, disableStatus:boolean)
  {
    console.log(listId, userTokenVal);
    this._freeList.updateDisableStatusFreeListing(listId,userTokenVal,disableStatus).subscribe(
      res=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "SUCCESS", summary: 'We have updated the listing status', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);

        }
        else {
          this._toast.warning({ detail: "FAILED", summary: 'Unable to update the listing status', position: 'br' });

        }
      },err=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

      },
      () => console.log("updated the listing status successfully EXECUTED")
    )
  }

  // BORROW

  getFreeBorrowUserData() {
    this.spinner.show();
    this._freeBorrow.getFreeBorrowListingDataByUserToken(this.userToken).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeBorrow = res;
        console.log(this.freeBorrow);
        
      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeBorrow = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get ALL FREE BORROW user token Method excuted successfully"));

  }

  removeUserFreeBorrowItem(listId:string, userTokenVal:string)
  {
    console.log(listId, userTokenVal);
    this._freeBorrow.deleteFreeBorrow(listId,userTokenVal).subscribe(
      res=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "SUCCESS", summary: 'Listing has been deleted', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);

        }
        else {
          this._toast.warning({ detail: "FAILED", summary: 'Unable to delete your listing', position: 'br' });

        }
      },err=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

      },
      () => console.log("delete Free Borrow METHOD successfully EXECUTED")
    )
  }

  disableStatusBorrowListingOnClick(listId:string, userTokenVal:string, disableStatus:boolean)
  {
    console.log(listId, userTokenVal);
    this._freeBorrow.updateDisableStatusFreeBorrow(listId,userTokenVal,disableStatus).subscribe(
      res=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "SUCCESS", summary: 'We have updated the listing status', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);

        }
        else {
          this._toast.warning({ detail: "FAILED", summary: 'Unable to update the listing status', position: 'br' });

        }
      },err=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

      },
      () => console.log("updateDisableStatusFreeBorrow successfully EXECUTED")
    )
  }

  
  // WANTED

  getFreeWantedUserData() {
    this.spinner.show();
    this._freeWanted.getFreeWantedListingDataByUserToken(this.userToken).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeWanted = res;
        console.log(this.freeWanted);
        
      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeWanted = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get ALL FREE WANTED user token Method excuted successfully"));

  }

  removeUserFreeWantedItem(listId:string, userTokenVal:string)
  {
    console.log(listId, userTokenVal);
    this._freeWanted.deleteFreeWanted(listId,userTokenVal).subscribe(
      res=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "SUCCESS", summary: 'Listing has been deleted', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);

        }
        else {
          this._toast.warning({ detail: "FAILED", summary: 'Unable to delete your listing', position: 'br' });

        }
      },err=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

      },
      () => console.log("delete Free Wanted METHOD successfully EXECUTED")
    )
  }

  disableStatusWantedListingOnClick(listId:string, userTokenVal:string, disableStatus:boolean)
  {
    console.log(listId, userTokenVal);
    this._freeWanted.updateDisableStatusFreeWanted(listId,userTokenVal,disableStatus).subscribe(
      res=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "SUCCESS", summary: 'We have updated the listing status', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);

        }
        else {
          this._toast.warning({ detail: "FAILED", summary: 'Unable to update the listing status', position: 'br' });

        }
      },err=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

      },
      () => console.log("updateDisableStatusFreeWANTED successfully EXECUTED")
    )
  }



}
