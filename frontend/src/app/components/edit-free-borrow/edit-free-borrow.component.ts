import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { FreeBorrow } from 'src/app/interface/freeBorrow';
import { FreeListing } from 'src/app/interface/freeListing';
import { FreeBorrowServieService } from 'src/app/services/freeBorrow-servie/free-borrow-servie.service';
import { FreeListServiceService } from 'src/app/services/freeList-service/free-list-service.service';
import { ImgbbUploadService } from 'src/app/services/imgbb-upload/imgbb-upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-free-borrow',
  templateUrl: './edit-free-borrow.component.html',
  styleUrls: ['./edit-free-borrow.component.css']
})
export class EditFreeBorrowComponent implements OnInit {

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

  freeBorrowListingPicture: any[]=[];
  listingPicture!: string;
  
  errMsg!: string;
  status!: any;
  onClickLng !: number;
  onClickLat !: number;
  constructor( private route: ActivatedRoute, private spinner: NgxSpinnerService, private _toast: NgToastService, private readonly ImgbbService: ImgbbUploadService, private _router: Router, private _freeBorrow: FreeBorrowServieService) {
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
    this._freeBorrow.getFreeBorrowListingDataById(this.freeListId, this.userToken).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeBorrow = res;
        console.log(this.freeBorrow);
        console.log(this.freeBorrow[0].title);
        this.freeBorrowListingPicture = this.freeBorrow[0].picture;
        this.latitude = this.freeBorrow[0].location.lat;
        this.longitude = this.freeBorrow[0].location.lng;
        this.setFreeListingLocation();
        for (var i = 0; i < this.listForArr.length; i++) {
          if (this.freeBorrow[0].listFor == this.listForArr[i].value) {
            this.listForArr[i].status = "true";
          }
        }

     

      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.freeBorrow = [];
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
        this.freeBorrowListingPicture.push(this.listingPicture);
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

    var lat = this.freeBorrow[0].location.lat;
    var lng = this.freeBorrow[0].location.lng;
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

    if (this.freeBorrowListingPicture[indexNumber] == indexVal) {
      this.freeBorrowListingPicture.splice(indexNumber, 1);
    }
    console.log(this.freeBorrowListingPicture);

  }

  freeBorrowListingData(freeBorrowListForm: NgForm) {

    console.log(freeBorrowListForm);
   

    var getListFor = document.getElementById("listFor") as HTMLInputElement;
    var listForVal = getListFor.value;
    console.log(listForVal);

    this._freeBorrow.updateFreeBorrowData(this.freeListId, this.userToken, this.freeBorrowListingPicture, freeBorrowListForm.value.title, freeBorrowListForm.value.description, freeBorrowListForm.value.lendingInfo, Number(listForVal), this.onClickLng, this.onClickLat).subscribe(
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
