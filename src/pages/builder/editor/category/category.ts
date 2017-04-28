import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController, Events, ActionSheetController } from 'ionic-angular';
import { SayItService } from '../../../../providers/sayit-service';
import { PictureService } from '../../../../providers/picture-service';
import { EditorActionPage } from '../action/action';

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
    public events: Events,
    public sayItService: SayItService,
    public pictureService: PictureService
    ) {
    
    this.category = this.navParams.get('category');
    this.mode = this.navParams.get('mode');
    this.actions = this.sayItService.getActionsArray(this.category);
    this.events.subscribe('reloadEditorCategoryData',()=>{
      this.actions = this.sayItService.getActionsArray(this.category);
    });
    this.events.subscribe('reloadCategoryImage', (category)=>{
      // this.category['image'] = category['image'];
      // this.navCtrl.pop();
    })
  }

  ionViewDidLoad() {
    //console.log('Loaded CategoryPage');
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
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            //console.log('Agree clicked');
            this.actions = this.sayItService.removeAction(action, category);
            this.presentToast("Action Deleted");
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
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            //console.log('Agree clicked');
            this.sayItService.removeCategory(category);
            this.presentToast("Category Deleted");
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
    this.presentToast("Category Added");
    this.events.publish('reloadEditorHomeData');
    this.navCtrl.pop();
  }

  deleteCategoryPicture(category){
    category.image = this.sayItService.defaultImg;
    this.category = category;
    this.sayItService.updateCategory(category);
    this.events.publish('reloadEditorHomeData');
    this.presentToast("Category Image Deleted");
  }
  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  presentImageActionSheet(category) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.pictureService.takeCategoryPicture(category, "library");
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pictureService.takeCategoryPicture(category, "camera");
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
