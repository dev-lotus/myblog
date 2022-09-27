import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-location',
  templateUrl: './my-location.component.html',
  styleUrls: ['./my-location.component.css']
})
export class MyLocationComponent implements OnInit {

  userToken!: string;
  latitude = 23.4444;
  longitude = 43.2222;

  status: any;
  errMsg: any;

  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-streets-v11'

  // data
  source: any;
  markers: any;

  onClickLng !: number;
  onClickLat !: number;


  constructor(private _userService: UserServiceService, private router: Router) {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.userToken = String(localStorage.getItem("userId"));
    this.latitude = Number(localStorage.getItem("myLocationLat"));
    this.longitude = Number(localStorage.getItem("myLocationLng"));
  }
  ngOnInit(): void {
    this._userService.getMyLocation(this.userToken).subscribe(
      res => {
        this.status = res;
        localStorage.setItem("myLocationLng",String(this.status.lng));
        localStorage.setItem("myLocationLat",String(this.status.lat));
      
        console.log(this.status);

      }, err => {
        this.errMsg = err;
      }
    );

    this.initializeMap();

    this.setHomeLocation();

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
  }

  this.map.on('click', add_marker);

}

setHomeLocation() {

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

  updateMyLocation() {
    this._userService.updateUserLocation(this.userToken, this.onClickLng, this.onClickLat).subscribe(
      res => {
        this.status = res;
  
        if (this.status == true) {
          localStorage.setItem("myLocationLng",String(this.onClickLng));
            localStorage.setItem("myLocationLat",String(this.onClickLat));
          alert("Updated SUCESS");
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        else {
          alert(" FAILED");
        }
      }, err => {
        this.errMsg = err;
        console.log(this.errMsg)
      }
    )
  }


}
