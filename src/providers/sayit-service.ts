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
    // storage.clear();
    console.log('Hello SayItService Provider');
  }

  /*
    Model model
    categories = [
                  {
                    title='xyz',
                    actions = [
                      {
                        title='abc'
                      },
                      {
                       ...           
                      }
                    ]
                  },
                  {
                    ...
                  },
                  ...
                ]
  */


  generateCategoryKey(){
    var last = this.categories.length - 1;
    var newKey = 0;
    if(last > -1) newKey = this.categories[last]['key'] + 1;
    return newKey;
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

  removeCategory(category){
    delete this.categories[category['key']];
    this.storage.set(this.KEY_CATEGORIES, this.categories);
    return this.getCategoriesArray();
  }

  updateCategory(category){
    if(category['title'] == ''){
      return this.getCategoriesArray();
    }
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
    return promise;
  }

/* Actions Start Here */
  generateActionKey(category){
    var last = category['actions'].length - 1;
    var newKey = 0;
    if(last > -1) newKey = category['actions'][last]['key'] + 1;
    return newKey;
  }

  getActionsArray(category){
    var values = []
    for(var actionKey in category['actions']){
      values.push(category['actions'][actionKey])
    }
    return values;
  }

  addAction(action, category){
    if(action['title'] == '' ){
      return this.getActionsArray(category);
    }
    let actionKey = this.generateActionKey(category);
    let categoryKey = category['key']
    action['key'] = actionKey;
    category['actions'][actionKey] = action;
    this.categories[categoryKey] = category;
    this.storage.set(this.KEY_CATEGORIES, this.categories);
    return this.getActionsArray(category);
  }

  removeAction(action, category){
    delete category['actions'][action['key']];
    let categoryKey = category['key'];
    this.categories[categoryKey] = category;
    this.storage.set(this.KEY_CATEGORIES, this.categories);
    return this.getActionsArray(category);
  }

  updateAction(action, category){
    if(action['title'] == '' ){
      return this.getActionsArray(category);
    }
    let actionKey = action['key'];
    let categoryKey = category['key'];
    category['actions'][actionKey] = action;
    this.categories[categoryKey] = category;
    this.storage.set(this.KEY_CATEGORIES, this.categories);
    return this.getActionsArray(category);
  }

  getActions(category){
    let categoryKey = category['key'];
    var promise = new Promise((resolve, reject) => {
      this.storage.get(this.KEY_CATEGORIES).then((actions)=>{
        if(!actions){
          category['actions'] = [];
        }
        else{
          category['actions'] = actions;
        }
        this.categories[categoryKey] = category;
      })
    })
    return promise;
  }
}
