import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { FreeBorrow } from 'src/app/interface/freeBorrow';
import { FreeListing } from 'src/app/interface/freeListing';
import { FreeWanted } from 'src/app/interface/freeWanted';
import { User } from 'src/app/interface/user';
import { FreeBorrowServieService } from 'src/app/services/freeBorrow-servie/free-borrow-servie.service';
import { FreeListServiceService } from 'src/app/services/freeList-service/free-list-service.service';
import { FreeWantedServiceService } from 'src/app/services/freeWanted-service/free-wanted-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


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
  freeListingMapDataObject: any[] = [];
  freeBorrowMapDataObject: any[] = [];
  freeWantedMapDataObject: any[] = [];

  constructor(private datePipe: DatePipe, private spinner: NgxSpinnerService, private _toast: NgToastService, private _router: Router, private _userService: UserServiceService, private _freeList: FreeListServiceService, private _freeBorrow: FreeBorrowServieService, private _freeWanted: FreeWantedServiceService) {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.userToken = String(localStorage.getItem("userId"));
    this.currentUserLat = Number(localStorage.getItem("myLocationLat"));
    this.currentUserLng = Number(localStorage.getItem("myLocationLng"));
  }

  ngOnInit(): void {
    this.getFreeListUserData();
    this.getFreeBorrowUserData();
    this.getFreeWantedUserData();
    this.initializeMap();
    this.setHomeMarker();
  }

  // FREE LISTING

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

          var mapData = {
            type: 'Free Listing Data',
            geometry: {
              type: 'Point',
              'coordinates': {
                "lng": this.freeListing[ele].location.lng,
                "lat": this.freeListing[ele].location.lat
              },
            },
            properties: {
              availStatus: this.freeListing[ele].onHold == false ? 'Available' : 'On Hold',
              title: this.freeListing[ele].title,
              picture: this.freeListing[ele].picture[0],
              createdAt: this.freeListing[ele].createdAt,
              likes: this.freeListing[ele].likes.length,
              listing_id: this.freeListing[ele]._id,
              userToken: this.freeListing[ele].userToken
            }
          };

          this.freeListingMapDataObject.push(mapData);
          console.log(this.freeListingMapDataObject);


          // alert(this.freeListingMapDataObject.length);
          console.log(this.freeListingMapDataObject);

          for (const listFree of this.freeListingMapDataObject) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = "url(../../../assets/images/icons/freeListing.png)";

            // make a marker for each feature and add it to the map
            new mapboxgl.Marker(el)
              .setLngLat([listFree.geometry.coordinates.lng, listFree.geometry.coordinates.lat])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(
                    `<p ${listFree.properties.availStatus == 'Available' ? 'style="color:white; background-color:#198754; padding: 5px;"' : 'style="color:white; background-color:#ffc107; padding: 5px;"'}>${listFree.properties.availStatus}</p><div style="text-align:center; padding-bottom: 5px;"><img src="${listFree.properties.picture}" width="130" /></div> <p>Someone is giving away</p> 
      <h5><b>${listFree.properties.title}</b></h5> 
      <p> <img src="https://img.icons8.com/color/344/filled-like.png" width="20"/> ${listFree.properties.likes} Liked</p>
      <p>Added on: ${this.datePipe.transform(listFree.properties.createdAt, 'mediumDate')}</p>
       <p>Added at:  ${this.datePipe.transform(listFree.properties.createdAt, 'shortTime')}</p>
      <div style="padding-top:10px;"><a href="/listing-details/${listFree.properties.listing_id}?token=${listFree.properties.userToken}&type=listing" style="text-decoration:none; color:black; background-color:#54B4D3; padding:4px;">View Details</a></div>
       `
                  )
              )
              .addTo(this.map);


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

          var mapData = {
            type: 'Free Borrow Data',
            geometry: {
              type: 'Point',
              'coordinates': {
                "lng": this.freeBorrow[ele].location.lng,
                "lat": this.freeBorrow[ele].location.lat
              },
            },
            properties: {
              availStatus: this.freeBorrow[ele].onHold == false ? 'Available' : 'On Hold',
              title: this.freeBorrow[ele].title,
              picture: this.freeBorrow[ele].picture[0],
              createdAt: this.freeBorrow[ele].createdAt,
              likes: this.freeBorrow[ele].likes.length,
              listing_id: this.freeBorrow[ele]._id,
              userToken: this.freeBorrow[ele].userToken
            }
          };

          this.freeBorrowMapDataObject.push(mapData);
          console.log(this.freeBorrowMapDataObject);


          // alert(this.freeListingMapDataObject.length);
          console.log(this.freeBorrowMapDataObject);

          for (const borrowFree of this.freeBorrowMapDataObject) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = "url(../../../assets/images/icons/freeBorrow.png)";

            // make a marker for each feature and add it to the map
            new mapboxgl.Marker(el)
              .setLngLat([borrowFree.geometry.coordinates.lng, borrowFree.geometry.coordinates.lat])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(
                    `<p ${borrowFree.properties.availStatus == 'Available' ? 'style="color:white; background-color:#198754; padding: 5px;"' : 'style="color:white; background-color:#ffc107; padding: 5px;"'}>${borrowFree.properties.availStatus}</p><div style="text-align:center; padding-bottom: 5px;"><img src="${borrowFree.properties.picture}" width="130" /></div> <p>Someone is lending</p> 
      <h5><b>${borrowFree.properties.title}</b></h5> 
      <p> <img src="https://img.icons8.com/color/344/filled-like.png" width="20"/> ${borrowFree.properties.likes} Liked</p>
      <p>Added on: ${this.datePipe.transform(borrowFree.properties.createdAt, 'mediumDate')}</p>
       <p>Added at:  ${this.datePipe.transform(borrowFree.properties.createdAt, 'shortTime')}</p>
      <div style="padding-top:10px;"><a href="/listing-details/${borrowFree.properties.listing_id}?token=${borrowFree.properties.userToken}&type=borrow" style="text-decoration:none; color:black; background-color:#54B4D3; padding:4px;">View Details</a></div>
       `
                  )
              )
              .addTo(this.map);


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
          var mapData = {
            type: 'Free Wanted Data',
            geometry: {
              type: 'Point',
              'coordinates': {
                "lng": this.freeWanted[ele].location.lng,
                "lat": this.freeWanted[ele].location.lat
              },
            },
            properties: {
              availStatus: this.freeWanted[ele].onHold == false ? 'Available' : 'On Hold',
              title: this.freeWanted[ele].title,
              picture: this.freeWanted[ele].picture[0],
              createdAt: this.freeWanted[ele].createdAt,
              likes: this.freeWanted[ele].likes.length,
              listing_id: this.freeWanted[ele]._id,
              userToken: this.freeWanted[ele].userToken
            }
          };

          this.freeWantedMapDataObject.push(mapData);
          console.log(this.freeWantedMapDataObject);


          // alert(this.freeListingMapDataObject.length);
          console.log(this.freeWantedMapDataObject);

          for (const wantedFree of this.freeWantedMapDataObject) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = "url(../../../assets/images/icons/freeWanted.png)";

            // make a marker for each feature and add it to the map
            new mapboxgl.Marker(el)
              .setLngLat([wantedFree.geometry.coordinates.lng, wantedFree.geometry.coordinates.lat])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(
                    `<p ${wantedFree.properties.availStatus == 'Available' ? 'style="color:white; background-color:#198754; padding: 5px;"' : 'style="color:white; background-color:#ffc107; padding: 5px;"'}>${wantedFree.properties.availStatus}</p><div style="text-align:center; padding-bottom: 5px;"><img src="${wantedFree.properties.picture}" width="130" /></div> <p>Someone is in need of</p> 
      <h5><b>${wantedFree.properties.title}</b></h5> 
      <p> <img src="https://img.icons8.com/color/344/filled-like.png" width="20"/> ${wantedFree.properties.likes} Liked</p>
      <p>Added on: ${this.datePipe.transform(wantedFree.properties.createdAt, 'mediumDate')}</p>
       <p>Added at:  ${this.datePipe.transform(wantedFree.properties.createdAt, 'shortTime')}</p>
      <div style="padding-top:10px;"><a href="/listing-details/${wantedFree.properties.listing_id}?token=${wantedFree.properties.userToken}&type=wanted" style="text-decoration:none; color:black; background-color:#54B4D3; padding:4px;">View Details</a></div>
       `
                  )
              )
              .addTo(this.map);


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


  private initializeMap() {
    var lat = Number(localStorage.getItem("myLocationLat"));
    var lng = Number(localStorage.getItem("myLocationLng"));

    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.map.flyTo({
          center: [lng, lat]
        })
      });
    }

    this.buildMap()

  }

  buildMap() {
    var lat = Number(localStorage.getItem("myLocationLat"));
    var lng = Number(localStorage.getItem("myLocationLng"));

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
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

    /// Add map controls
    const navControl = new mapboxgl.NavigationControl({
      visualizePitch: true
    });

    this.map.addControl(navControl, "bottom-right");
    this.map.addControl(trackPin, "bottom-right")
  }

  changeCenterLocation() {
    var lat = Number(localStorage.getItem("myLocationLat"));
    var lng = Number(localStorage.getItem("myLocationLng"));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.map.flyTo({
          center: [lng, lat],
          zoom: 13
        })
      });
    }
  }

  setHomeMarker() {

    var lat = Number(localStorage.getItem("myLocationLat"));
    var lng = Number(localStorage.getItem("myLocationLng"));
    const homeLocationJson = {
      type: 'Home Location',
      features: [
        {
          type: 'Home Location',
          geometry: {
            type: 'Point',
            'coordinates': {
              'lng': lng,
              'lat': lat
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
      el.style.backgroundImage = "url(https://img.icons8.com/flat-round/2x/home.png)";

      new mapboxgl.Marker(el)
        .setLngLat([feature.geometry.coordinates.lng, feature.geometry.coordinates.lat])
        .addTo(this.map);

    }

  }


}
