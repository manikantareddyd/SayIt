import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Action page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-builder-editor-action',
  templateUrl: 'action.html'
})
export class EditorActionPage {
  action;
  category;
  mode;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {
    this.action = this.navParams.get('action');
    this.category = this.navParams.get('category');
    this.mode = this.navParams.get('mode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionPage');
  }

}
