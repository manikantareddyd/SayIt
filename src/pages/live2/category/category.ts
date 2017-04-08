import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SayItService } from '../../../providers/sayit-service';
import { Live2ActionPage } from '../action/action';
/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-live2-category',
  templateUrl: 'category.html'
})
export class Live2CategoryPage {
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
    console.log('Loaded CategoryPage.');
  }
  goToActionPage(action, category){
    this.navCtrl.push(Live2ActionPage, {
      action: action
    });
  }

  goBack(){
    this.navCtrl.pop();
  }


}
