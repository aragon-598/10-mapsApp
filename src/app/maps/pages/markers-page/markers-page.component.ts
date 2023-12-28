import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl'; 

export interface MarkerAndColor{
  color: string
  marker: Marker
}

export interface PlainMarker{
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

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

    this.readFromLocalStorage();
  }

  createMarker():void{

    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnLat = this.map.getCenter();
    this.addMarker(lgnLat,color);
    this.saveToLocalStorage();
  }

  addMarker(lngLat:LngLat, color:string):void{
    if(!this.map) return;

    const marker = new Marker({
      color,
      draggable:true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({marker, color});
  }

  deleteMarker(index:number):void{
    this.markers[index].marker.remove();// eliminar solo el marcador del mapa
    this.markers.splice(index,1); //eliminar el objeto de la lista
  }

  flyTo(marker:Marker):void{
    this.map?.flyTo({
      zoom:14,
      center:marker.getLngLat()
    });
  }

  saveToLocalStorage():void{
    const plainMarkers:PlainMarker[] = this.markers.map(({color,marker}) => {
      return{
        color,
        lngLat: marker.getLngLat().toArray(),
      }
    });
    console.log(plainMarkers);
    
    localStorage.setItem('plainMarkers',JSON.stringify(plainMarkers));
    
  }

  readFromLocalStorage():void{
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]'

    const plainMarkers:PlainMarker[] = JSON.parse(plainMarkersString);

    
    plainMarkers.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng,lat);

      this.addMarker(coords,color);
    });
    
  }

}
