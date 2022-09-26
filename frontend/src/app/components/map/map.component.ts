import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
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
  message = 'sjh';
  // data
  source: any;
  markers: any;
  constructor() {
       (mapboxgl as any).accessToken = 'pk.eyJ1IjoibG90dXNiaXN3YXMiLCJhIjoiY2t5ZTd4ZnFjMDUycjJucG1vamhuMmFxbSJ9.iot_0EeUP_G4rtV33DV_QA';
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
            'coordinates': [-77.032, 38.913]
          },
          properties: {
            title: 'Home'
          }
        }
      ]
    };

    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';
      

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
      .setLngLat([88.48786130507187,23.41248256345665])
      .setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
      `<h3>${feature.properties.title}</h3>`
      )
      )
      .addTo(this.map);
      }
      
  }
}
