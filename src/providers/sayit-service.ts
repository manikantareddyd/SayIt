import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the SayitService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SayItService {
  KEY_CATEGORIES = 'st.categories';
  categories;
  constructor(public storage: Storage) {
    console.log('Hello SayItService Provider');
  }

  generateCategoryKey(){
    return Object.keys(this.categories).length + 1;
  }

  getCategoriesArray(){
    var values = [];
    for(var categoryKey in this.categories){
      values.push(this.categories[categoryKey]);
    }
    return values;
  }

  addCategory(category){
    if(category['title'] == ''){
      return this.getCategoriesArray();
    }
    let categoryKey = this.generateCategoryKey();
    category['key'] = categoryKey;
    this.categories[categoryKey] = category;
    this.storage.set(this.KEY_CATEGORIES, this.categories);
    return this.getCategoriesArray();
  }

  removeCategory(categoryKey){
    delete this.categories[categoryKey];
    this.storage.set(this.KEY_CATEGORIES, this.categories);
    return this.getCategoriesArray
  }

  updateCategory(category){
    var categoryKey = category['key'];
    this.categories[categoryKey] = category;
    this.storage.set(this.KEY_CATEGORIES, this.categories);
    return this.getCategoriesArray();
  }

  getCategories(){
    var promise = new Promise((resolve, reject) => {
      this.storage.get(this.KEY_CATEGORIES).then((categories) => {
        if(!categories){
          this.categories = [];
        }
        else{
          this.categories = categories;
        }
        resolve(this.getCategoriesArray());
      })
    })
  }

}
