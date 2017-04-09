import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events, ActionSheetController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { SayItService } from '../../../../providers/sayit-service';

import { Camera, File, FilePath } from 'ionic-native';

declare var cordova: any;

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
    public toastCtrl: ToastController, 
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    public events: Events,
    public sayItService: SayItService
    ) {
    this.action = this.navParams.get('action');
    this.category = this.navParams.get('category');
    this.mode = this.navParams.get('mode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionPage');
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
    this.events.publish('reloadEditorCategoryData');
    this.navCtrl.pop();
  }


  deleteActionPicture(action, category){
    action.image = "assets/img/bg.png";
    this.action = action;
    this.sayItService.updateAction(action, category);
    this.events.publish('reloadEditorCategoryData');
  }
  
  public takePicture(action, category, sourceType) {
  // Create options for the Camera Dialog
    var options = {
      quality: 75,
      sourceType: sourceType,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 480,
      targetHeight: 480,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };
    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        FilePath.resolveNativePath(imagePath)
        .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(action, category, correctPath, currentName, this.createFileName());
        });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(action, category, correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
  // Copy the image to a local folder
  private copyFileToLocalDir(action, category, namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      action.image = cordova.file.dataDirectory + newFileName;
      this.action = action;
      this.sayItService.updateAction(action, category);
      this.events.publish('reloadEditorCategoryData');
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }


  public presentImageActionSheet(action, category) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(action, category, Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(action, category, Camera.PictureSourceType.CAMERA);
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
