import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModeService } from '../../providers/mode-service';
import { LiveHomePage } from '../live/home/home';
import { Live2HomePage } from '../live2/home/home';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {
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

  navHome() {
    this.modeservice.getMode().then((mode)=>{
      if(mode=="mode1")
        this.navCtrl.setRoot(LiveHomePage);
      else
        this.navCtrl.setRoot(Live2HomePage);
    });
  }


}
