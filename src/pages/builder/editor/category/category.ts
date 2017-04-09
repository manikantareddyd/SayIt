import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events, ActionSheetController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { SayItService } from '../../../../providers/sayit-service';
import { EditorActionPage } from '../action/action';

import { Camera, File, FilePath } from 'ionic-native';

declare var cordova: any;

@Component({
  selector: 'page-builder-editor-category',
  templateUrl: 'category.html'
})
export class EditorCategoryPage {
  category;
  mode;
  actions;
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
    
    this.category = this.navParams.get('category');
    this.mode = this.navParams.get('mode');
    this.actions = this.sayItService.getActionsArray(this.category);
    this.events.subscribe('reloadEditorCategoryData',()=>{
      this.actions = this.sayItService.getActionsArray(this.category);
    });
  }

  ionViewDidLoad() {
    console.log('Loaded CategoryPage');
  }


  goToActionPage(action, category, mode){
    this.navCtrl.push(EditorActionPage, {
      action: action,
      category: category,
      mode: mode
    });
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
            this.actions = this.sayItService.removeAction(action, category);
          }
        }
      ]
    });
    confirm.present();
  }

  addAction(category){
    var action = {
      title: '',
      text:''
    }
    return this.goToActionPage(action, category, "ADD");
  }

  deleteCategory(category){
    let confirm = this.alertCtrl.create({
      title: 'Confirm that you wish to delete this category!',
      message: 'This will also remove all actions in this category.<br> Warning! Cannot be undone.',
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
            this.sayItService.removeCategory(category);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  updateCategory(category, mode){
    this.category = category;
    if(category['title'] != ""){
      if(mode == "EDIT"){
        this.sayItService.updateCategory(category);
      }
      else if(mode == "ADD"){
        this.sayItService.addCategory(category);
      }
    }
    this.events.publish('reloadEditorHomeData');
    this.navCtrl.pop();
  }

  deleteCategoryPicture(category){
    category.image = "assets/img/bg.png";
    this.category = category;
    this.sayItService.updateCategory(category);
    this.events.publish('reloadEditorHomeData');
  }
  
  public takePicture(category, sourceType) {
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
          this.copyFileToLocalDir(category, correctPath, currentName, this.createFileName());
        });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(category, correctPath, currentName, this.createFileName());
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
  private copyFileToLocalDir(category, namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      category.image = cordova.file.dataDirectory + newFileName;
      this.category = category;
      this.sayItService.updateCategory(category);
      this.events.publish('reloadEditorHomeData');
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


  public presentImageActionSheet(category) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(category, Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(category, Camera.PictureSourceType.CAMERA);
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
