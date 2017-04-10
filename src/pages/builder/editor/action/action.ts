import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events, ActionSheetController } from 'ionic-angular';
import { SayItService } from '../../../../providers/sayit-service';
import { PictureService } from '../../../../providers/picture-service';

@Component({
  selector: 'page-builder-editor-action',
  templateUrl: 'action.html'
})
export class EditorActionPage {
  action;
  category;
  mode;
  lastImage: string = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public events: Events,
    public sayItService: SayItService,
    public pictureService: PictureService
    ) {
    this.action = this.navParams.get('action');
    this.category = this.navParams.get('category');
    this.mode = this.navParams.get('mode');
    this.events.subscribe('reloadActionImage', (data)=>{
      this.action['image'] = data[0]['image'];
    })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ActionPage');
  }

  speakAction(action){
    this.sayItService.speakAction(action);
  }

  deleteAction(action, category){
    let confirm = this.alertCtrl.create({
      title: 'Confirm that you wish to delete this action!',
      message: 'Warning! Cannot be undone.',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            //console.log('Agree clicked');
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
    this.events.publish('reloadEditorCategoryData');
    this.navCtrl.pop();
  }


  deleteActionPicture(action, category){
    action.image = "assets/img/bg.png";
    this.action = action;
    this.sayItService.updateAction(action, category);
    this.events.publish('reloadEditorCategoryData');
  }
  
  public presentImageActionSheet(action, category) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.pictureService.takeActionPicture(action, category, "library");
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pictureService.takeActionPicture(action, category, "camera");
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
}
