import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, Events, ActionSheetController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { Camera,  FilePath } from 'ionic-native';
import { File } from '@ionic-native/file';
import { SayItService } from "../providers/sayit-service";

declare var cordova: any;

@Injectable()
export class PictureService {
  category;
  action;
  constructor(
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController, 
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    public events: Events,
    public file: File,
    public sayItService: SayItService
  ) {
  }
  
  takeCategoryPicture(category, sourceType) {
    if(sourceType=="library"){
      sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
    }
    else{
      sourceType = Camera.PictureSourceType.CAMERA;
    }
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
      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) 
      {
        FilePath.resolveNativePath(imagePath)
        .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyCategoryFileToLocalDir(category, correctPath, currentName, this.createFileName());
        });
      }else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyCategoryFileToLocalDir(category, correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      console.log("get cat pic", err);
      this.presentToast('Error while selecting image.');
    });
  }

  getUpdatedCategory(){
    return this.category;
  }
  
  // Copy the image to a local folder
  copyCategoryFileToLocalDir(category, namePath, currentName, newFileName) 
  {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(
      success => {
        category.image = this.file.dataDirectory + newFileName;
        this.category = category;
        this.sayItService.updateCategory(category);
        this.events.publish('reloadEditorHomeData');
        this.events.publish('reloadCategoryImage', category);
      }, error => {
        console.log("copy cat pic", error );
        this.presentToast('Error while storing file.');
      }
    );
  }

  /************************************************/

  takeActionPicture(action, category, sourceType) {
    if(sourceType=="library"){
      sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
    }
    else{
      sourceType = Camera.PictureSourceType.CAMERA;
    }
    // Create options for the Camera Dialog
    var options = {
      quality: 60,
      sourceType: sourceType,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 360,
      targetHeight: 360,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };
    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      console
      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        FilePath.resolveNativePath(imagePath)
        .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyActionFileToLocalDir(action, category, correctPath, currentName, this.createFileName());
        });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyActionFileToLocalDir(action, category, correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      console.log("get action pic", err);
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  // Copy the image to a local folder
  private copyActionFileToLocalDir(action, category, namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      action.image = this.file.dataDirectory + newFileName;
      this.action = action;
      this.sayItService.updateAction(action, category);
      this.events.publish('reloadEditorCategoryData');
      this.events.publish('reladActionImage', action);
    }, error => {
      console.log("copy action pic",error);
      this.presentToast('Error while storing file.');
    });
  }

  /************************************************/
  getUpdatedAction(){
    return this.action;
  }

  // Create a new name for the image
  createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  presentToast(text) {
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
      return this.file.dataDirectory + img;
    }
  }

}
