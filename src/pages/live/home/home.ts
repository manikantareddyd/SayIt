import { Component } from '@angular/core';

import { NavController, Events } from 'ionic-angular';
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
    public sayItService: SayItService,
    public events: Events
  ) {
    // this.sayItService.firstBoot().then((fBoot)=>{
    //   console.log(fBoot, 'fBoot', 'mode1');
      
    // });
    
    this.categories = this.sayItService.defaultCats;
    this.sayItService.getCategories().then(
        (categories)=>{
          var fBoot = 1;
          console.log('fBoot', fBoot, 'cats', categories);
          try
          {
            if(Object.keys(categories).length)
              this.categories = categories;
            console.log("ooo", categories);
          }
          catch(e)
          {
          }
          //console.log("Fetched Data.\n", JSON.stringify(categories));
    });
    this.events.subscribe('reloadEditorHomeData',()=>{
      this.categories = this.sayItService.getCategoriesArray();
    });
  }

  foo(){}

  goToCategoryPage(category){
    this.navCtrl.push(LiveCategoryPage, {
      category: category
    });
  }

}
