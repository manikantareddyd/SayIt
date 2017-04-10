import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModeService } from '../../providers/mode-service';
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  mode;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modeservice: ModeService
    ) {
      this.modeservice.getMode().then((mode)=>{
        this.mode = mode;
        console.log("settings current mode", mode);
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  updateMode(mode){
    this.mode = mode;
    console.log("in settings.ts changed to ", this.mode);
    this.modeservice.updateMode(this.mode);
  }

}
