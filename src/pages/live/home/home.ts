import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { SayItService } from '../../../providers/sayit-service';

import { LiveCategoryPage } from '../category/category';
@Component({
  selector: 'page-live-home',
  templateUrl: 'home.html'
})
export class LiveHomePage {
  categories;
  constructor(
    public navCtrl: NavController,
    public sayItService: SayItService
  ) {
    this.sayItService.getCategories().then((categories)=>{
      this.categories = categories;
      //console.log("Fetched Data.\n", JSON.stringify(categories));
    })
  }

  goToCategoryPage(category){
    this.navCtrl.push(LiveCategoryPage, {
      category: category
    });
  }

}
