import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareFilePage } from "../file/file";
import { ShareSendPage } from "../send/send";
/*
  Generated class for the Share page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-share-home',
  templateUrl: 'home.html'
})
export class ShareHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareHomePage');
  }
  
  goToFilePage(){
    this.navCtrl.push(ShareFilePage);
  }

  goToSendPage(){
    this.navCtrl.push(ShareSendPage);
  }
}
