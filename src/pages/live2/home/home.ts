import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { SayItService } from '../../../providers/sayit-service';

import { Live2CategoryPage } from '../category/category';
@Component({
  selector: 'page-live2-home',
  templateUrl: 'home.html'
})
export class Live2HomePage {
  categories;
  constructor(
    public navCtrl: NavController,
    public sayItService: SayItService
  ) {
    this.sayItService.getCategories().then((categories)=>{
      this.categories = categories;
      console.log("Fetched Data.\n", JSON.stringify(categories));
    })
  }

  goToCategoryPage(category){
    this.navCtrl.push(Live2CategoryPage, {
      category: category
    });
  }

  goBack(){
    this.navCtrl.pop();
  }

  goNext(category){
    
  }

  goPrevious(category){

  }

}
