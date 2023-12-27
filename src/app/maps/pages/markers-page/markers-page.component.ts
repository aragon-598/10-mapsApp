import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl'; 

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public zoom:number = 13;
  public map?:Map;
  public currentLngLat:LngLat = new LngLat(-89.57612539627047, 13.988017362190945);

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML='Aragon';

    // const marker = new Marker({
    //   element: markerHtml
    // })
    //             .setLngLat(this.currentLngLat)
    //             .addTo(this.map);
  }

  createMarker():void{

    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnLat = this.map.getCenter();
    this.addMarker(lgnLat,color)
  }

  addMarker(lngLat:LngLat, color:string):void{
    if(!this.map) return;

    const marker = new Marker({
      color,
      draggable:true
    })
      .setLngLat(lngLat)
      .addTo(this.map);
  }

}
