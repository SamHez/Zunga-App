import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RemoteService} from "../../app/remote.service";

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public displayText: string;
  public searchText: string;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  constructor(public navCtrl: NavController, private remote: RemoteService) {
  }

  public checkForAnswer(): void {
    this.displayText = "Thinking...";
    let handler = this.remote.checkMeaning(this.searchText);
    handler.subscribe(
      (translation) => {
        this.displayText = translation.resp + " " + translation.guesses[0];
      },
      () => {
        this.displayText = 'Oops! Did not get that. Please try again.'
      }
    );
  }

  ionViewDidLoad() {
    this.initMap();
  }


  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 0.323188, lng: 32.576357}
    });

    this.directionsDisplay.setMap(this.map);
  }


  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      }
    });
  }

}
