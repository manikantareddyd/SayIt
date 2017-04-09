import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SayItService } from '../../providers/sayit-service';
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
    public sayitservice: SayItService
    ) {
      this.sayitservice.getMode().then((mode)=>{
        this.mode = mode;
      })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  updateMode(){
    this.sayitservice.updateMode(mode);
  }

}
