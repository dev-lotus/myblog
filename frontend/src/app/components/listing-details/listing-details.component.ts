import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { FreeListing } from 'src/app/interface/freeListing';
import { User } from 'src/app/interface/user';
import { FreeListServiceService } from 'src/app/services/freeList-service/free-list-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
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
  freeListId: string;
  freeListUserToken!: string ;
  constructor(private route: ActivatedRoute,private spinner: NgxSpinnerService, private _toast: NgToastService, private _router: Router, private _userService: UserServiceService, private _freeList: FreeListServiceService) {
       (mapboxgl as any).accessToken = environment.mapbox.accessToken ;
       this.userToken = String(localStorage.getItem("userId"));
       const routeParams = this.route.snapshot.paramMap;
       this.freeListId = String(routeParams.get('id'));

       const urlParams = new URLSearchParams(window.location.search);
       this.freeListUserToken  = String(urlParams.get('token'));

       console.log(this.freeListUserToken);
   
  }

  ngOnInit(): void {
    this.initializeMap();
    this.getFreeListUserData();

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
              this._userService.getUserDataById(this.freeListUserToken).subscribe(
                res => {
                  setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this.spinner.hide();
                  }, 1000);
    
                  this.user.push(res[0]);
    
                  console.log(this.user[1]);
                  // console.log(this.user);
    
                  console.log(this.removeDupliactes(this.user) );
                  this.lng = this.freeListing[0].location.lng;
                  this.lat =  this.freeListing[0].location.lat;
                  console.log(this.lng, this.lat);
                  this.setHomeLocation(this.lng,this.lat);
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

      setHomeLocation(longitude:number, latitude: number) {

        this.buildMap(latitude,longitude);

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
          el.style.backgroundImage = "url(./../../../assets/images/icons/freeListing.png)";
      
          new mapboxgl.Marker(el)
            .setLngLat([feature.geometry.coordinates.lng, feature.geometry.coordinates.lat])
            .addTo(this.map);
      
        }
        
      }

      addLikeFreeListItem(listId:string, userTokenVal:string)
  {
    console.log(listId, userTokenVal);
    this._freeList.updateAddLikeFreeListing(listId,userTokenVal).subscribe(
      res=>{
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
      },err=>{
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });

      },
      () => console.log("LIKE LISTING FREE successfully EXECUTED")
    )
  }

}
