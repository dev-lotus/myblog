import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  constructor() {
       (mapboxgl as any).accessToken = environment.mapbox.accessToken ;
  }

  ngOnInit(): void {
    this.initializeMap();
    this.setHomeMarker();
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

    this.buildMap()

  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
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
      visualizePitch:true
    });

    this.map.addControl(navControl,"bottom-right");
    this.map.addControl(trackPin,"bottom-right")
      }

  changeCenterLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.map.flyTo({
          center: [this.lng, this.lat],
          zoom:13
        })
      });
    }
  }

  setHomeMarker()
  {
    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            'coordinates': {
              "lng": 83.48786130507187,
              "lat":23.41248256345665 
            },
          },
          properties: {
            availStatus:'Available',
            title: 'Pizza',
            picture:'https://i.ibb.co/j3jGCXw/pizza.jpg',
            updatedAt: '2022-11-19T09:12:46.056+00:00',
            likes: 1,
            distance: '0.4 KM',
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            'coordinates': {
              "lng": 88.48786130507187,
              "lat":23.41248256345665 
            },
          },
          properties: {
            availStatus:'Available',
            title: 'Pizza',
            picture:'https://i.ibb.co/j3jGCXw/pizza.jpg',
            updatedAt: '2022-11-19T09:12:46.056+00:00',
            likes: 1,
            distance: '0.4 KM',

          }
        }
      ]
    };
    console.log(geojson.features.length);

    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = "url(https://img.icons8.com/flat-round/2x/home.png)";

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
      .setLngLat([feature.geometry.coordinates.lng, feature.geometry.coordinates.lat])
      .setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
      `<div style="text-align:center; padding-bottom: 5px;"><img src="${feature.properties.picture}" width="100" /></div> <p>Someone is giving away</p> 
      <h5><b>${feature.properties.title}</b></h5> 
      <p>Added on: 19th, Nov, 2022</p>
       <p>Added at: 12:30 PM</p>`
      )
      )
      .addTo(this.map);
      }
      
  }
}
