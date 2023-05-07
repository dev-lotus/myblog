import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { FreeListing } from 'src/app/interface/freeListing';
import { User } from 'src/app/interface/user';
import { FreeListServiceService } from 'src/app/services/freeList-service/free-list-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { count } from 'rxjs';
import { NgForm } from '@angular/forms';
import { RequestServiceService } from 'src/app/services/request-service/request-service.service';
import { FreeBorrow } from 'src/app/interface/freeBorrow';
import { FreeBorrowServieService } from 'src/app/services/freeBorrow-servie/free-borrow-servie.service';
import { FreeWantedServiceService } from 'src/app/services/freeWanted-service/free-wanted-service.service';
import { FreeWanted } from 'src/app/interface/freeWanted';
@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {
  lat = 23.41248256345665;
  lng = 88.48786130507187;
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-streets-v11'

  // data
  source: any;
  markers: any;

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

      },
      rewardPoints:0
    }
  ];
 
  userData: any[] = [];
  userToken!: string;
  errMsg!: string;
  status!: any;
  freeListId: string;
  freeListUserToken!: string;
  getListingType!:string;

  likesListing: boolean = false;
  countLikesListing: any[] = [];
  
  haversineDistanceResult: any[] =[];
  currentUserLat!: number;
  currentUserLng!: number;

  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService, private _toast: NgToastService, private _router: Router, private _userService: UserServiceService, private _freeList: FreeListServiceService,private _requestService: RequestServiceService,private _freeBorrow: FreeBorrowServieService, private _freeWanted: FreeWantedServiceService) {
    (mapboxgl as any).accessToken = "pk.eyJ1IjoibG90dXNiaXN3YXMiLCJhIjoiY2t5ZTd4ZnFjMDUycjJucG1vamhuMmFxbSJ9.iot_0EeUP_G4rtV33DV_QA";
    this.userToken = String(localStorage.getItem("userId"));
    const routeParams = this.route.snapshot.paramMap;
    this.freeListId = String(routeParams.get('id'));

    const urlParams = new URLSearchParams(window.location.search);
    this.freeListUserToken = String(urlParams.get('token'));
    const type = new URLSearchParams(window.location.search);
    this.getListingType = String(urlParams.get('type'));

    console.log(this.getListingType);
    
    console.log(this.freeListUserToken);
   
    this.currentUserLat = Number(localStorage.getItem("myLocationLat"));
    this.currentUserLng = Number(localStorage.getItem("myLocationLng"));
  }

  ngOnInit(): void {
    this.initializeMap();
    if(this.getListingType == "borrow")
    {
      this.getFreeBorrowUserData();
    }
    else if(this.getListingType == 'listing')
    {
      this.getFreeListUserData();
    }
    else if(this.getListingType =='wanted')
    {
      this.getFreeWantedUserData();

    }
    else {
      alert("WRONG");
    }
   
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }


  }

  buildMap(lat: number, lng: number) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 14,
      center: [lng, lat]
    });


    const trackPin =
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      });


  }
  getFreeListUserData() {
    this.spinner.show();
    this._freeList.getFreeListingDataById(this.freeListId, this.freeListUserToken).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeListing = res;
        console.log(this.freeListing);
        for (var i = 0; i < this.freeListing.length; i++) {

          this.haversineDistanceResult.push(this.calcCrow(this.currentUserLat,this.currentUserLng,this.freeListing[i].location.lat,this.freeListing[i].location.lng).toFixed(1));

          this._userService.getUserDataById(this.freeListUserToken).subscribe(
            res => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);

              this.user.push(res[0]);

              console.log(this.user[1]);
              // console.log(this.user);

              console.log(this.removeDupliactes(this.user));
              this.lng = this.freeListing[0].location.lng;
              this.lat = this.freeListing[0].location.lat;
              console.log(this.lng, this.lat);
              this.setHomeLocation(this.lng, this.lat);
              console.log(this.removeDupliactes(this.freeListing[0].likes));
              this.countLikesListing = this.removeDupliactes(this.freeListing[0].likes);
              console.log(this.countLikesListing);


              
              this.likesListing = !!this.countLikesListing.find(like => {  
                return like.listId === this.freeListId && like.userToken === this.userToken;
              });


              // if (this.countLikesListing.length <= 1) {
              //   console.log("1");
              //   if (this.countLikesListing[0].listId == this.freeListId && this.countLikesListing[0].userToken == this.userToken) {
              //     this.likesListing = true;
              //     console.log(this.likesListing);
              //   }
              //   else {
              //     this.likesListing = false;

              //   }
              // }
              // if (this.countLikesListing.length >= 2) {
              //   console.log("2");


              //   // for (var k = 0; k < this.countLikesListing.length; k++) {
              //   //   if (this.countLikesListing[k].listId == this.freeListId && this.countLikesListing[k].userToken == this.userToken) {
              //   //     this.likesListing = true;
              //   //     console.log(this.likesListing);
              //   //   }
              //   //   else {
              //   //     this.likesListing = false;

              //   //   }
              //   // }

              // }
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
  
  // BORROW

  getFreeBorrowUserData() {
    this.spinner.show();
    this._freeBorrow.getFreeBorrowListingDataById(this.freeListId, this.freeListUserToken).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeBorrow = res;
        console.log(this.freeBorrow);
        for (var i = 0; i < this.freeBorrow.length; i++) {

          this.haversineDistanceResult.push(this.calcCrow(this.currentUserLat,this.currentUserLng,this.freeBorrow[i].location.lat,this.freeBorrow[i].location.lng).toFixed(1));

          this._userService.getUserDataById(this.freeListUserToken).subscribe(
            res => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);

              this.user.push(res[0]);

              console.log(this.user[1]);
              // console.log(this.user);

              console.log(this.removeDupliactes(this.user));
              this.lng = this.freeBorrow[0].location.lng;
              this.lat = this.freeBorrow[0].location.lat;
              console.log(this.lng, this.lat);
              this.setHomeLocation(this.lng, this.lat);
              console.log(this.removeDupliactes(this.freeBorrow[0].likes));
              this.countLikesListing = this.removeDupliactes(this.freeBorrow[0].likes);
              console.log(this.countLikesListing);


              
              this.likesListing = !!this.countLikesListing.find(like => {  
                return like.listId === this.freeListId && like.userToken === this.userToken;
              });


          
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
        this.freeBorrow = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get ALL FREE borrow Method excuted successfully"));

    console.log("Free Borrow " + this.freeBorrow[0]);

    console.log("User " + this.user);
  }

  addLikeFreeBorrowItem(listId: string, userTokenVal: string) {
   
      this._freeBorrow.updateAddLikeFreeBorrow(listId, userTokenVal).subscribe(
        res => {
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
          this.status = res;
          console.log(this.status);
          if (this.status == true) {
            this._toast.success({ detail: "SUCCESS", summary: 'You liked this listing', position: 'br' });
            setTimeout(function () {
              window.location.reload();
            }, 2000);

          }
          else {
            this._toast.warning({ detail: "FAILED", summary: 'Unable to like this listing', position: 'br' });

          }
        }, err => {
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
          this.errMsg = err;
          this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

        },
        () => console.log("LIKE LISTING FREE BORROW successfully EXECUTED")
      )
    // }
    // else {
    //   alert("You already Liked it");
    // }
    console.log(listId, userTokenVal);

  }

  removeLikeFreeBorrow(listId: string, userTokenVal: string) {
   
      this._freeBorrow.updateRemoveLikeFreeBorrow(listId, userTokenVal).subscribe(
        res => {
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
          this.status = res;
          console.log(this.status);
          if (this.status == true) {
            this._toast.success({ detail: "SUCCESS", summary: 'You unliked this listing', position: 'br' });
            setTimeout(function () {
              window.location.reload();
            }, 2000);

          }
          else {
            this._toast.warning({ detail: "FAILED", summary: 'Unable to unliked this listing', position: 'br' });

          }
        }, err => {
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
          this.errMsg = err;
          this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

        },
        () => console.log("LIKE LISTING FREE BORROW successfully EXECUTED")
      )
    // }
    // else {
    //   alert("You already Liked it");
    // }
    console.log(listId, userTokenVal);

  }

  ///


   // WANTED

   getFreeWantedUserData() {
    this.spinner.show();
    this._freeWanted.getFreeWantedListingDataById(this.freeListId, this.freeListUserToken).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeWanted = res;
        console.log(this.freeWanted);
        for (var i = 0; i < this.freeWanted.length; i++) {

          this.haversineDistanceResult.push(this.calcCrow(this.currentUserLat,this.currentUserLng,this.freeWanted[i].location.lat,this.freeWanted[i].location.lng).toFixed(1));

          this._userService.getUserDataById(this.freeListUserToken).subscribe(
            res => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);

              this.user.push(res[0]);

              console.log(this.user[1]);
              // console.log(this.user);

              console.log(this.removeDupliactes(this.user));
              this.lng = this.freeWanted[0].location.lng;
              this.lat = this.freeWanted[0].location.lat;
              console.log(this.lng, this.lat);
              this.setHomeLocation(this.lng, this.lat);
              console.log(this.removeDupliactes(this.freeWanted[0].likes));
              this.countLikesListing = this.removeDupliactes(this.freeWanted[0].likes);
              console.log(this.countLikesListing);


              
              this.likesListing = !!this.countLikesListing.find(like => {  
                return like.listId === this.freeListId && like.userToken === this.userToken;
              });


          
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
        this.freeWanted = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get ALL FREE Wanted Method excuted successfully"));

    console.log("Free Wanted " + this.freeWanted[0]);

    console.log("User " + this.user);
  }

  addLikeFreeWantedItem(listId: string, userTokenVal: string) {
   
    this._freeWanted.updateAddLikeFreeWanted(listId, userTokenVal).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "SUCCESS", summary: 'You liked this listing', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);

        }
        else {
          this._toast.warning({ detail: "FAILED", summary: 'Unable to like this listing', position: 'br' });

        }
      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

      },
      () => console.log("LIKE LISTING FREE WANTED successfully EXECUTED")
    )
  // }
  // else {
  //   alert("You already Liked it");
  // }
  console.log(listId, userTokenVal);

}

removeLikeFreeWanted(listId: string, userTokenVal: string) {
 
    this._freeWanted.updateRemoveLikeFreeWanted(listId, userTokenVal).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "SUCCESS", summary: 'You unliked this listing', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);

        }
        else {
          this._toast.warning({ detail: "FAILED", summary: 'Unable to unliked this listing', position: 'br' });

        }
      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

      },
      () => console.log("LIKE LISTING FREE WANTED successfully EXECUTED")
    )
  // }
  // else {
  //   alert("You already Liked it");
  // }
  console.log(listId, userTokenVal);

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

  setHomeLocation(longitude: number, latitude: number) {

    this.buildMap(latitude, longitude);

    const homeLocationJson = {
      type: 'Listing Location',
      features: [
        {
          type: 'Listing Location',
          geometry: {
            type: 'Point',
            'coordinates': {
              'lng': longitude,
              'lat': latitude
            }
          },
          properties: {
            title: 'Home'
          }
        }
      ]
    };

    for (const feature of homeLocationJson.features) {
      const el = document.createElement('div');
      el.className = 'marker';
      if(this.getListingType == "borrow")
      {
        el.style.backgroundImage = "url(./../../../assets/images/icons/freeBorrow.png)";

      }
      else if(this.getListingType == 'listing')
      {
        el.style.backgroundImage = "url(./../../../assets/images/icons/freeListing.png)";

      }
      else if(this.getListingType =='wanted')
      {
        el.style.backgroundImage = "url(./../../../assets/images/icons/freeWanted.png)";
  
      }
     
      new mapboxgl.Marker(el)
        .setLngLat([feature.geometry.coordinates.lng, feature.geometry.coordinates.lat])
        .addTo(this.map);

    }

  }

  addLikeFreeListItem(listId: string, userTokenVal: string) {
    // var count = 0;

    // for (var i = 0; i < this.freeListing[0].likes.length; i++) {

    //   if (this.freeListing[0].likes[i].listId == listId && this.freeListing[0].likes[i].userToken == userTokenVal) {
    //     count++;
    //   }

    // }
    // if (count == 0) {
      this._freeList.updateAddLikeFreeListing(listId, userTokenVal).subscribe(
        res => {
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
          this.status = res;
          console.log(this.status);
          if (this.status == true) {
            this._toast.success({ detail: "SUCCESS", summary: 'You liked this listing', position: 'br' });
            setTimeout(function () {
              window.location.reload();
            }, 2000);

          }
          else {
            this._toast.warning({ detail: "FAILED", summary: 'Unable to like this listing', position: 'br' });

          }
        }, err => {
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
          this.errMsg = err;
          this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

        },
        () => console.log("LIKE LISTING FREE successfully EXECUTED")
      )
    // }
    // else {
    //   alert("You already Liked it");
    // }
    console.log(listId, userTokenVal);

  }

  removeLikeFreeListing(listId: string, userTokenVal: string) {
    // var count = 0;

    // for (var i = 0; i < this.freeListing[0].likes.length; i++) {

    //   if (this.freeListing[0].likes[i].listId == listId && this.freeListing[0].likes[i].userToken == userTokenVal) {
    //     count++;
    //   }

    // }
    // if (count == 0) {
      this._freeList.updateRemoveLikeFreeListing(listId, userTokenVal).subscribe(
        res => {
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
          this.status = res;
          console.log(this.status);
          if (this.status == true) {
            this._toast.success({ detail: "SUCCESS", summary: 'You unliked this listing', position: 'br' });
            setTimeout(function () {
              window.location.reload();
            }, 2000);

          }
          else {
            this._toast.warning({ detail: "FAILED", summary: 'Unable to unliked this listing', position: 'br' });

          }
        }, err => {
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 1000);
          this.errMsg = err;
          this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

        },
        () => console.log("LIKE LISTING FREE successfully EXECUTED")
      )
    // }
    // else {
    //   alert("You already Liked it");
    // }
    console.log(listId, userTokenVal);

  }

  calcCrow(lat1:number, lon1: number, lat2: number, lon2: number) 
  {
    var R = 6371; // km
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }
  
  // Converts numeric degrees to radians
   toRad(Value: number) 
  {
      return Value * Math.PI / 180;
  }

  sendRequestMessageForm(form:NgForm)
  {
    // console.log(form.value.request_message);
    this.spinner.show();
    var acceptance_status = "pending";
    // console.log(form.value);
    this._requestService.addRequestMessageData(this.freeListId,form.value.listType,this.freeListUserToken,this.userToken,form.value.request_message,acceptance_status ).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "REQUEST SENT", summary: 'Please wait while your request is accepted',position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
          this._router.navigate(['/request'])
          .then(() => {
            window.location.reload();
          });
        }
        else {
          this._toast.warning({ detail: "REQUEST FAILED", summary: 'Unable to send your request',position: 'br'});

        }

      },
      err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime',position: 'br'});

      },
      () => console.log("Request message sent successfully")
    )
  }

}
