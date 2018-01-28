import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import * as Watson from 'watson-developer-cloud';

declare var google;

//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private conversation: Watson.ConversationV1;
  public displayText: string;
  public searchText: string;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  constructor(public navCtrl: NavController) {
    this.conversation = new Watson.ConversationV1({
      username: '2e512803-6638-4295-8780-ef085b69faf8',
      password: 'VMYF7jHLvmvw',
      version_date: '2017-05-26'
    });
  }

  public checkForAnswer(): void {
    this.displayText = "Thinking...";

    let params = {
      workspace_id: '56dd10ae-6056-4fbd-b6f1-acd1a58e2779',
      input: {'text': this.searchText}
    };

    this.conversation.message(params, (error, response) => {
      if (error) {
        this.displayText = "Oops! Couldn't understand that";
      } else {
        console.log(JSON.stringify(response));
        console.log(response.output.text[0])
;        this.displayText = response.output.text[0];
      }
    });
  }

  ionViewDidLoad(){
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
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
