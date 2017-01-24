import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SayItService } from '../../../providers/sayit-service';
import { LiveActionPage } from '../action/action';
/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-live-category',
  templateUrl: 'category.html'
})
export class LiveCategoryPage {
  category;
  actions;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public sayItService: SayItService
  ) {
    this.category = this.navParams.get('category');
    this.actions = this.sayItService.getActionsArray(this.category);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }
  goToActionPage(action, category){
    this.navCtrl.push(LiveActionPage, {
      action: action,
    });
  }

  
}
