import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
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
    public sayItService: SayItService,
    public toastCtrl: ToastController
  ) {
    this.category = this.navParams.get('category');
    this.actions = this.sayItService.getActionsArray(this.category);
  }
  ionViewDidLoad() {
    //console.log('Loaded CategoryPage.');
  }
  goToActionPage(action, category){
    this.sayItService.speakAction(action);
    this.presentToast(action["text"]);
    // this.navCtrl.push(LiveActionPage, {
    //   action: action
    // });
  }

  foo(){}

  goBack(){
    this.navCtrl.pop();
  }

presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
