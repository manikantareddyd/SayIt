import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SayItService } from '../../../../providers/sayit-service';
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
    public sayItService: SayItService
    ) {
    
    this.sayItService.getCategories().then((categories)=>{
      this.categories = categories;
    })
  }

  ionViewDidLoad() {
    console.log('Loaded EditorHomePage');
  }

  showCategory(category){
    if(!category){
      category = {
        title:'',
        actions: []
      }
      
    }
  }

}
