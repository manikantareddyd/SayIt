import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareLoadPage } from "../load/load";
import { ShareSendPage } from "../send/send";
import { LoadService } from '../../../providers/load-service';
import { SayItService } from '../../../providers/sayit-service';

/*
  Generated class for the Share page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class ShareHomePage {
  defaultImg;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadService: LoadService,
    public sayItService: SayItService
    ) {
      this.defaultImg = this.sayItService.defaultImg;
    }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ShareHomePage');
  }
  
  goToFilePage(){
    // this.navCtrl.push(ShareLoadPage);
    this.loadService.LoadFromFile();
  }



  goToSendPage(){
    this.navCtrl.push(ShareSendPage);
  }
}
