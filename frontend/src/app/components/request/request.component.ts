import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { FreeListing } from 'src/app/interface/freeListing';
import { Request } from 'src/app/interface/request';
import { User } from 'src/app/interface/user';
import { FreeBorrowServieService } from 'src/app/services/freeBorrow-servie/free-borrow-servie.service';
import { FreeListServiceService } from 'src/app/services/freeList-service/free-list-service.service';
import { RequestServiceService } from 'src/app/services/request-service/request-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  freeListing: any;

  request: Request[] = [
    {
      _id: "",
      listId: "",
      listType:"",
      listedUserToken: "",
      requesterUserToken: "",
      request_message: "",
      rejection_message: "",
      acceptance_status: "",
      createdAt: new Date(500000000000),
      updatedAt: new Date(500000000000)
    }];

  userReceivedRequest: User[] = [
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

  freeListingReceivedRequest: any;

  requestReceivedRequest: Request[] = [
    {
      "_id": "",
      "listId": "",
      "listType":"",
      "listedUserToken": "",
      "requesterUserToken": "",
      "request_message": "",
      "rejection_message": "",
      "acceptance_status": "",
      "createdAt": new Date(500000000000),
      "updatedAt": new Date(500000000000)
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
  receivedRequestUserData: any[] = [];
  receivedRequesfreeListingData: any[] = [];
  userToken!: string;
  errMsg!: string;
  status!: any;
  freeListingData: any[] = [];
  haversineDistanceResult: any[] = [];
  haversineDistanceResultReceivedRequest: any[] = [];
  currentUserLat!: number;
  currentUserLng!: number;
  constructor(private spinner: NgxSpinnerService, private _toast: NgToastService, private _router: Router, private _userService: UserServiceService, private _freeList: FreeListServiceService, private _freeBorrow: FreeBorrowServieService, private _request: RequestServiceService) {
    this.userToken = String(localStorage.getItem("userId"));
    this.currentUserLat = Number(localStorage.getItem("myLocationLat"));
    this.currentUserLng = Number(localStorage.getItem("myLocationLng"));
  }

  ngOnInit(): void {
    this.getAllRequestByToken();
    this.getAllRequestByTokeReceivedRequest();
    console.log(this.freeListingData);
  }
  getAllRequestByToken() {
    this.spinner.show();
    this._request.getAllRequestByTokens(this.userToken).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        if (res.length >= 1) {
          this.request = res;
          console.log(this.request);

          for (var i = 0; i < this.request.length; i++) { 
            if(this.request[i].listType == 'listing')
            {
              this._freeList.getFreeListingDataById(this.request[i].listId, this.request[i].listedUserToken).subscribe(
                res => {
                  setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this.spinner.hide();
                  }, 1000);
                  this.freeListing = res;
                  this.freeListingData.push(this.freeListing);
                  this.haversineDistanceResult.push(this.calcCrow(this.currentUserLat, this.currentUserLng, this.freeListing[0].location.lat, this.freeListing[0].location.lng).toFixed(1));
  
                  console.log(this.freeListing);
  
                }, err => {
                  setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this.spinner.hide();
                  }, 1000);
                  this.freeListing = [];
                  this.errMsg = err;
                  console.log(this.errMsg)
                }, () => console.log("Get ALL FREE LIST Method excuted successfully"));
  
            }
            else if(this.request[i].listType == 'borrow')
            {
              this._freeBorrow.getFreeBorrowListingDataById(this.request[i].listId, this.request[i].listedUserToken).subscribe(
                res => {
                  setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this.spinner.hide();
                  }, 1000);
                  this.freeListing = res;
                  this.freeListingData.push(this.freeListing);
                  this.haversineDistanceResult.push(this.calcCrow(this.currentUserLat, this.currentUserLng, this.freeListing[0].location.lat, this.freeListing[0].location.lng).toFixed(1));
  
                  console.log(this.freeListing);
  
                }, err => {
                  setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this.spinner.hide();
                  }, 1000);
                  this.freeListing = [];
                  this.errMsg = err;
                  console.log(this.errMsg)
                }, () => console.log("Get ALL FREE LIST Method excuted successfully"));
  
            }
            
          }

          for (var i = 0; i < this.request.length; i++) {


            this._userService.getUserDataById(this.request[i].listedUserToken).subscribe(
              async res => {
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);

                await this.user.push(res[0]);

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
        }




      }, err => {
        setTimeout(() => {

          this.spinner.hide();
        }, 1000);
        this.request = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get All Request Data by token method excuted successfully")
    )
  }


  getAllRequestByTokeReceivedRequest() {
    this.spinner.show();
    this._request.getAllRequestByTokensReceivedRequest(this.userToken).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        console.log("req res " + res);
        console.log(this.requestReceivedRequest);
        if (res[0]._id !='') {
          this.requestReceivedRequest = res;
          console.log(this.requestReceivedRequest);

         
          for (var i = 0; i < this.requestReceivedRequest.length; i++) {
            if(this.requestReceivedRequest[i].listType == 'listing' )
            {
              this._freeList.getFreeListingDataById(this.requestReceivedRequest[i].listId, this.requestReceivedRequest[i].listedUserToken).subscribe(
                res => {
                  setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this.spinner.hide();
                  }, 1000);
                  this.freeListingReceivedRequest = res;
                  console.log("res " + res);
                  this.receivedRequesfreeListingData.push(this.freeListingReceivedRequest);
                  this.haversineDistanceResultReceivedRequest.push(this.calcCrow(this.currentUserLat, this.currentUserLng, this.freeListingReceivedRequest[0].location.lat, this.freeListingReceivedRequest[0].location.lng).toFixed(1));
  
                  console.log(this.freeListingReceivedRequest);
                  console.log(this.receivedRequesfreeListingData);
  
                }, err => {
                  setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this.spinner.hide();
                  }, 1000);
                  this.freeListingReceivedRequest = [];
                  this.errMsg = err;
                  console.log(this.errMsg)
                }, () => console.log("Get ALL FREE LIST Method excuted successfully"));
  
            }
            else if(this.requestReceivedRequest[i].listType == 'borrow' )
            {
              this._freeBorrow.getFreeBorrowListingDataById(this.requestReceivedRequest[i].listId, this.requestReceivedRequest[i].listedUserToken).subscribe(
                res => {
                  setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this.spinner.hide();
                  }, 1000);
                  this.freeListingReceivedRequest = res;
                  console.log("res " + res);
                  this.receivedRequesfreeListingData.push(this.freeListingReceivedRequest);
                  this.haversineDistanceResultReceivedRequest.push(this.calcCrow(this.currentUserLat, this.currentUserLng, this.freeListingReceivedRequest[0].location.lat, this.freeListingReceivedRequest[0].location.lng).toFixed(1));
  
                  console.log(this.freeListingReceivedRequest);
                  console.log(this.receivedRequesfreeListingData);
  
                }, err => {
                  setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this.spinner.hide();
                  }, 1000);
                  this.freeListingReceivedRequest = [];
                  this.errMsg = err;
                  console.log(this.errMsg)
                }, () => console.log("Get ALL FREE LIST Method excuted successfully"));
  
            }
           
          }


          for (var i = 0; i < this.requestReceivedRequest.length; i++) {


            this._userService.getUserDataById(this.requestReceivedRequest[i].requesterUserToken).subscribe(
              async res => {
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);

                await this.userReceivedRequest.push(res[0]);

                console.log(this.userReceivedRequest[1]);
                // console.log(this.user);

                console.log(this.removeDupliactes(this.userReceivedRequest));

              }, err => {
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);
                this.userReceivedRequest = [];
                this.errMsg = err;
                console.log(this.errMsg)
              }, () => console.log("Get User Data method excuted successfully"))

          }

          for (var i = 0; i < this.requestReceivedRequest.length; i++) {


            this._userService.getUserDataById(this.requestReceivedRequest[i].requesterUserToken).subscribe(
              async res => {
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);

                await this.receivedRequestUserData.push(res[0]);

                console.log(this.receivedRequestUserData);
                // console.log(this.user);


              }, err => {
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);
                this.receivedRequestUserData = [];
                this.errMsg = err;
                console.log(this.errMsg)
              }, () => console.log("Get User Data method excuted successfully"))

          }
        }
        else{
          this.requestReceivedRequest.splice(0,res.length);
       this.freeListingReceivedRequest.splice(0,res.length);
       this.receivedRequesfreeListingData.splice(0,res.length);
       this.userReceivedRequest.splice(0,res.length);
        }

      }, err => {
        setTimeout(() => {

          this.spinner.hide();
        }, 1000);
        this.requestReceivedRequest = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get All Request Data by token method excuted successfully")
    )
  }
  removeDupliactes = (values: any[]) => {
    let concatArray = values.map(eachValue => {
      return Object.values(eachValue).join('')
    })
    let filterValues = values.filter((value, index) => {
      return concatArray.indexOf(concatArray[index]) === index

    })
    return filterValues;
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

  sendRejectionMessageForm(form: NgForm, request_id: any) {
    // console.log(form.value.request_message);
    this.spinner.show();
    var acceptance_status = "rejected";
    this._request.addRejectionMessage(String(request_id), form.value.rejection_message, acceptance_status).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "MESSAGE SENT", summary: 'Rejection Message has been sent', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
          this._router.navigate(['/request'])
            .then(() => {
              window.location.reload();
            });
        }
        else {
          this._toast.warning({ detail: "MESSAGE NOT SENT", summary: 'Unable to send your message', position: 'br' });

        }

      },
      err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

      },
      () => console.log("REJECTION message FUNCTION  successfully")
    )
  }

  acceptanceUpdate(request_id: any,listId:any, acceptance_status:string) {
    this.spinner.show();
    // var acceptance_status = "accepted";
    this._request.updateAcceptanceStatus(String(request_id),String(listId), acceptance_status).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "SUCCESS", summary: 'We have updated the status', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
          this._router.navigate(['/request'])
            .then(() => {
              window.location.reload();
            });
        }
        else {
          this._toast.warning({ detail: "FAILED", summary: 'Unable to update the status', position: 'br' });

        }

      },
      err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

      },
      () => console.log("ACCEPTANCE STATUS FUNCTION  successfully")
    )
  }
 
  onHoldStatus(listId: any, onHoldStatus:boolean) {
    this.spinner.show();
    this._freeList.updateOnHoldStatus(String(listId), onHoldStatus).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "SUCCESS", summary: 'We have updated the status', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
          this._router.navigate(['/request'])
            .then(() => {
              window.location.reload();
            });
        }
        else {
          this._toast.warning({ detail: "FAILED", summary: 'Unable to update the status', position: 'br' });

        }

      },
      err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

      },
      () => console.log("ON HOLD STATUS FUNCTION  successfully")
    )
  }
}
