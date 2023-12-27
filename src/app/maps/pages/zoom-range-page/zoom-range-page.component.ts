import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl'; 
@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{
  

  @ViewChild('map') divMap?: ElementRef;

  public zoom:number = 9;
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

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove()
  }

  mapListeners(){
    if( !this.map )throw 'Mapa no inicializado';

    this.map.on('zoom', (e)=>{
      this.zoom = this.map!.getZoom();
      
    });

    this.map.on('zoomend',(e)=>{
      if(this.map!.getZoom()<18) return;
      this.map!.zoomTo(18);

    });

    this.map.on('move',()=>{
      this.currentLngLat = this.map!.getCenter();
      
    });
  }

  zoomIn(){
    this.map?.zoomIn()
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged(value: string){
    this.zoom = parseFloat(value);
    this.map?.setZoom(this.zoom);
  }
}
