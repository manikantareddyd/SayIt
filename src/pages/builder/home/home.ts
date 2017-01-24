import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { EditorHomePage } from '../editor/home/home';
import { Storage } from "@ionic/storage";
@Component({
  selector: 'page-builder-home',
  templateUrl: 'home.html'
})
export class BuilderHomePage {

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public alertCtrl: AlertController
  ) {
    
  }

  goToEditorHome(){
    this.navCtrl.push(EditorHomePage);
  }

  reset(){
    let confirm = this.alertCtrl.create({
      title: 'Confirm that you wish to reset all data!',
      message: 'This will remove all actions in all categories.<br> Warning! Cannot be undone.',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {    
            var categories = [];
            this.storage.set('st.categories', categories);
          }
        }
      ]
    });
    confirm.present();
  }

}
