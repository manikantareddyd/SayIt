import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { SayItService } from '../../../../providers/sayit-service';
import { EditorActionPage } from '../action/action';
import { EditorHomePage } from '../home/home';
/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-builder-editor-category',
  templateUrl: 'category.html'
})
export class EditorCategoryPage {
  category;
  mode;
  actions;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
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
    console.log('ionViewDidLoad CategoryPage');
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
      title: ''
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

  
}
