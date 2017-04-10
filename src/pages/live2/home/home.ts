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
  category;
  constructor(
    public navCtrl: NavController,
    public sayItService: SayItService
  ) {
    this.sayItService.getCategories().then((categories)=>{
      this.categories = categories;
      this.category = categories[0];
      //console.log("Fetched Data.\n", JSON.stringify(categories));
    })
  }

  goToCategoryPage(category){
    this.navCtrl.push(Live2CategoryPage, {
      category: category
    });
  }

  goNext(category){
    var ind = this.categories.indexOf(category);
    if(ind != this.categories.length - 1)
      this.category = this.categories[ind+1];
  }

  goPrevious(category){
    var ind = this.categories.indexOf(category);
    if(ind != 0)
      this.category = this.categories[ind-1];
  }

}
