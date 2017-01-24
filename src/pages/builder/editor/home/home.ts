import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { SayItService } from '../../../../providers/sayit-service';
import { EditorCategoryPage } from '../category/category';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-builder-editor-home',
  templateUrl: 'home.html'
})
export class EditorHomePage {
  categories;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public events: Events,
    public sayItService: SayItService
    ) {
    this.events.subscribe('reloadEditorHomeData',()=>{
      this.categories = this.sayItService.getCategoriesArray();
    });
    this.sayItService.getCategories().then((categories)=>{
      this.categories = categories;
    })
  }

  ionViewDidLoad() {
    console.log('Loaded EditorHomePage');
  }


  reset(){
    this.sayItService.reset();
    this.navCtrl.pop();
  }
  goToCategoryPage(category, mode){
    this.navCtrl.push(EditorCategoryPage, {
      category: category,
      mode: mode
    });
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
            this.categories = this.sayItService.removeCategory(category['key']);
          }
        }
      ]
    });
    confirm.present();
  }

  addCategory(){
    var category = {
      title: '',
      actions: []
    }
    return this.goToCategoryPage(category, "ADD");
  }

}
