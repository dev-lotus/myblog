
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { ImgbbUploadService } from 'src/app/services/imgbb-upload/imgbb-upload.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FreeListServiceService } from 'src/app/services/freeList-service/free-list-service.service';
import { FreeListing } from 'src/app/interface/freeListing';

@Component({
  selector: 'app-edit-free-listing',
  templateUrl: './edit-free-listing.component.html',
  styleUrls: ['./edit-free-listing.component.css']
})
export class EditFreeListingComponent implements OnInit {

  latitude = 23.41248256345665;
  longitude = 88.48786130507187;
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-streets-v11'

  // data
  source: any;
  markers: any;

  freeListType !: string;
  freeListId!: string;
  userToken!: string;
  freeListing: FreeListing[] = [
    {
      "_id":"",
      "userToken":"",
      "picture": [],
      "title": "",
      "category":"",
      "description": "",
      "pickUpTime": "",
      "listFor": 1,
      "location": {
      "lng": 88.48699665399437,
      "lat": 23.412221981538707

      

}
  }];
  listForArr = [
    { id: 1, label: "1 Day", value: 1, status: "true" },
    { id: 2, label: "2 Day", value: 2, status: "false" },
    { id: 3, label: "4 Day", value: 4, status: "false" },
    { id: 4, label: "6 Day", value: 6, status: "false" },
    { id: 5, label: "8 Day", value: 8, status: "false" },
    { id: 6, label: "10 Day", value: 10, status: "false" },
    { id: 7, label: "12 Day", value: 12, status: "false" },
    { id: 8, label: "15 Day", value: 15, status: "false" },
    { id: 9, label: "18 Day", value: 18, status: "false" },
    { id: 10, label: "20 Day", value: 20, status: "false" },
    { id: 11, label: "25 Day", value: 25, status: "false" },
    { id: 12, label: "28 Day", value: 28, status: "false" },

  ];
  categoryArr = [
    { id: 1, label: "Food", value: "Food", status: "true" },
    { id: 2, label: "Non-Food", value: "Non-Food", status: "false" },
  ];

  freeListingPicture: any[]=[];
  listingPicture!: string;
  
  errMsg!: string;
  status!: any;
  onClickLng !: number;
  onClickLat !: number;

  constructor( private route: ActivatedRoute, private spinner: NgxSpinnerService, private _toast: NgToastService, private readonly ImgbbService: ImgbbUploadService, private _router: Router, private _freeList: FreeListServiceService) {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    const routeParams = this.route.snapshot.paramMap;
    this.freeListId = String(routeParams.get('id'));
    console.log(this.freeListId);

    this.userToken = String(localStorage.getItem("userId"));

  }

  ngOnInit(): void {
    this.getFreeListUserData();
  
    this.initializeMap();
  }

  getFreeListUserData() {
    this.spinner.show();
    this._freeList.getFreeListingDataById(this.freeListId, this.userToken).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeListing = res;
        console.log(this.freeListing);
        console.log(this.freeListing[0].title);
        this.freeListingPicture = this.freeListing[0].picture;
        this.latitude = this.freeListing[0].location.lat;
        this.longitude = this.freeListing[0].location.lng;
        this.setFreeListingLocation();
        for (var i = 0; i < this.listForArr.length; i++) {
          if (this.freeListing[0].listFor == this.listForArr[i].value) {
            this.listForArr[i].status = "true";
          }
        }

        for (var i = 0; i < this.categoryArr.length; i++) {
          if (this.freeListing[0].category == this.categoryArr[i].value) {
            this.categoryArr[i].status = "true";
          }
        }

      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeListing = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get User Data method excuted successfully"))
  }
  onInput(file: any) {

    this.spinner.show();
    this.ImgbbService
      .upload(file.target.files[0])
      .subscribe((res: any) => {
        this.listingPicture = res['data']['url'];
        this.freeListingPicture.push(this.listingPicture);
        console.log(this.listingPicture);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);

      })
  }

  private initializeMap() {
    var lat = this.latitude;
    var lng = this.longitude;
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.map.flyTo({
          center: [lng, lat]
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

    /// Add map controls
    const navControl = new mapboxgl.NavigationControl({
      visualizePitch: true
    });

    this.map.addControl(navControl, "bottom-right");
    this.map.addControl(trackPin, "bottom-right")

    var marker = new mapboxgl.Marker();

    const add_marker = (event: { lngLat: any; }) => {
      var coordinates = event.lngLat;
      console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
      this.onClickLng = coordinates.lng;
      this.onClickLat = coordinates.lat;
      marker.setLngLat(coordinates).addTo(this.map);
      //  this.myLocationButton = "enabled";
      console.log("click");
    }

    this.map.on('click', add_marker);

  }

  setFreeListingLocation() {

    var lat = this.freeListing[0].location.lat;
    var lng = this.freeListing[0].location.lng;
    this.buildMap(lat, lng);
    this.onClickLat = lat;
    this.onClickLng = lng;
    console.log(lat, lng);
    const homeLocationJson = {
      type: 'Free Listing Location',
      features: [
        {
          type: 'Free Listing Location',
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
      el.style.backgroundImage = "url(./../../../assets/images/icons/freeListing.png)";
      
      new mapboxgl.Marker(el)
        .setLngLat([feature.geometry.coordinates.lng, feature.geometry.coordinates.lat])
        .addTo(this.map);

    }

  }

  removePicture(indexNumber: number, indexVal: string) {

    if (this.freeListingPicture[indexNumber] == indexVal) {
      this.freeListingPicture.splice(indexNumber, 1);
    }
    console.log(this.freeListingPicture);

  }

  freeFormListingData(freeListForm: NgForm) {

    console.log(freeListForm);
    var getCategoryVal = document.getElementById("category") as HTMLInputElement;
    var categoryVal = getCategoryVal.value;
    console.log(categoryVal);

    var getListFor = document.getElementById("listFor") as HTMLInputElement;
    var listForVal = getListFor.value;
    console.log(listForVal);

    this._freeList.updateFreeListingData(this.freeListId, this.userToken, this.freeListingPicture, freeListForm.value.title, categoryVal, freeListForm.value.description, freeListForm.value.pickUpTime, Number(listForVal), this.onClickLng, this.onClickLat).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "UPDATE SUCCESS", summary: 'Listing Information have been updated', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);

        }
        else {
          this._toast.warning({ detail: "UPDATE FAILED", summary: 'Unable to update your listing Information', position: 'br' });

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
      () => console.log("Update Listing successfully")
    )
  }


}
