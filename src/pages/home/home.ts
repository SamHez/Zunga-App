import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as Watson from 'watson-developer-cloud';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private conversation: Watson.ConversationV1;
  public displayText: string;
  public searchText: string;

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

}
