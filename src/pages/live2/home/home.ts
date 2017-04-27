import { Component } from '@angular/core';

import { NavController, Events } from 'ionic-angular';
import { SayItService } from '../../../providers/sayit-service';
import { IntroPage } from '../../intro/intro';
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
    public sayItService: SayItService,
    public events: Events
  ) {
    this.categories = this.sayItService.defaultCats;
    this.category = this.categories[0];
    this.sayItService.getCategories().then(
        (categories)=>{
          var fBoot = 1;
          console.log('fBoot', fBoot, 'cats', categories);
          try
          {
            if(Object.keys(categories).length)
            {
              this.categories = categories;
              this.category = categories[0];
            }
            console.log("ooo", categories);
          }
          catch(e)
          {
          }
          //console.log("Fetched Data.\n", JSON.stringify(categories));
    });
    this.events.subscribe('reloadEditorHomeData',()=>{
      this.categories = this.sayItService.getCategoriesArray();
      this.category = this.categories[0];
    });
  }
  foo(){}
  goToCategoryPage(category){
    this.navCtrl.push(Live2CategoryPage, {
      category: category
    });
  }

  // goNext(category){
  //   var catkeys = Object.keys(this.categories);
  //   var ind = catkeys.indexOf(category['key']);
  //   if(ind != 0)
  //     this.category = this.categories[catkeys[ind+1]];
  // }

  // goPrevious(category){
  //   var catkeys = Object.keys(this.categories);
  //   var ind = catkeys.indexOf(category['key']);
  //   if(ind != 0)
  //     this.category = this.categories[catkeys[ind-1]];
  // }

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
