import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-pick',
  templateUrl: './map-pick.component.html',
  styleUrls: ['./map-pick.component.scss']
})
export class MapPickComponent implements OnInit {
  showMap: boolean = false;
  lat: number = 10;
  lng: number = 10;
  zoom: number = 16;
  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((e) => {
        this.lat = e.coords.latitude;
        this.lng = e.coords.longitude;
        this.showMap = true;
        console.log(e.coords);
      }, this.showLocationError)
    } else {
      alert('Please Use Modern Browser Like Chrome');
    }
  }

  ngOnInit() {
  }



  public showLocationError(event) {
    console.log(event);
    this.showMap = false;
  }

  mapClicked(event) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  markerDragEnd(event) {
    console.log(event);
  }

}
