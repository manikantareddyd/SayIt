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
  action;
  actions;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public sayItService: SayItService
  ) {
    this.category = this.navParams.get('category');
    this.actions = this.category.actions;
    // this.actions = this.sayItService.getActionsArray(this.category);
    this.action = this.actions[0];
  }
  ionViewDidLoad() {
    //console.log('Loaded CategoryPage.');
  }
  goToActionPage(action, category){
    this.sayItService.speakAction(action);
    // this.navCtrl.push(Live2ActionPage, {
    //   action: action
    // });
  }
  foo(){}
  goBack(){
    this.navCtrl.pop();
  }
  
  // goNext(action){
  //   var catkeys = Object.keys(this.actions);
  //   var ind = catkeys.indexOf(action['key']);
  //   if(ind != 0)
  //     this.category = this.actions[catkeys[ind+1]];
  // }

  // goPrevious(action){
  //   var catkeys = Object.keys(this.actions);
  //   var ind = catkeys.indexOf(action['key']);
  //   if(ind != 0)
  //     this.category = this.actions[catkeys[ind-1]];
  // }

  goNext(action){
    var ind = this.actions.indexOf(action);
    if(ind != this.actions.length - 1)
      this.action = this.actions[ind+1];
  }

  goPrevious(action){
    var ind = this.actions.indexOf(action);
    if(ind != 0)
      this.action = this.actions[ind-1];
  }


}
