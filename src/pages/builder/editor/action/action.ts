import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { SayItService } from '../../../../providers/sayit-service';
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
    public navParams: NavParams,
    public events: Events,
    public alertCtrl: AlertController,
    public sayItService: SayItService
    ) {
    this.action = this.navParams.get('action');
    this.category = this.navParams.get('category');
    this.mode = this.navParams.get('mode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionPage');
  }

  deleteAction(action, category){
    let confirm = this.alertCtrl.create({
      title: 'Confirm that you wish to delete this action!',
      message: 'Warning! Cannot be undone.',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.sayItService.removeAction(action, category);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  updateAction(action, category, mode){
    this.action = action;
    if(mode == "EDIT"){
      this.sayItService.updateAction(action, category);
    }
    else if(mode == "ADD"){
      this.sayItService.addAction(action, category);
    }
    console.log(category);
    this.events.publish('reloadEditorCategoryData');
    this.navCtrl.pop();
  }
}
