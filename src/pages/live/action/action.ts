import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Action page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-live-action',
  templateUrl: 'action.html'
})
export class LiveActionPage {
  action;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.action = this.navParams.get('action');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionPage');
  }

}
