import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input()
  public lngLat?:[number,number];

  @ViewChild('map') divMap?: ElementRef;

  public map?:Map;

  ngAfterViewInit() {
    if(!this.divMap) throw 'Not found HTML element';
    if(!this.lngLat) throw "LngLat can't be null or undefined";

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 10, // starting zoom
      interactive:false
    });
    new Marker()
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }

}
