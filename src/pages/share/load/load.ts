import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadService } from '../../../providers/load-service';
/*
  Generated class for the File page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-share-load',
  templateUrl: 'load.html'
})
export class ShareLoadPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadService: LoadService,
    ) {}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FilePage');
  }

  

}
