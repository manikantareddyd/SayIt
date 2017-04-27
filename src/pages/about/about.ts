import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModeService } from '../../providers/mode-service';
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  mode;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modeservice: ModeService
    ) {
        //console.log("settings current mode", mode);
    }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SettingsPage');
  }

}
