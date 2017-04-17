import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { TextToSpeech } from 'ionic-native';

@Injectable()
export class SayItService {
  KEY_CATEGORIES = 'st.categories';
  categories;
  defaultImg = "assets/img/bg.png";
  constructor(public storage: Storage) {
    // storage.clear();
  }

  /*
    Model model
    categories = 
    [
      {
        title='xyz',
        image='path to image',
        actions = [
          {
            title='abc',
            text='This is the text action',
            image='path to image',
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
    category['image'] = this.defaultImg;
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

  updateCategoryWithActions(category){
    var categoryKey = categoryKey;
    this.categories[categoryKey]['actions'] = category['actions'];
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
    action['image'] = this.defaultImg;
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

  speakAction(action){
    TextToSpeech.speak(action['text']).catch(
      (reason: any) => console.log("Couldn't speak action text", reason)
    );
  }

  loadFromJSONData(data){
    var i=0;
    var currentCategories = this.categories;
    var check, index;
    console.log('data', data);
    try{
      for(i=0; i<data.length; i++){
        check = this.checkIfCategoryPresent(data[i]);
        if(!check[0]){
          console.log("new category");
          this.addCategory(data[i]);
        }
        else{
          data[i]['key']=this.categories[check[1]]['key'];
          data[i]['image'] = this.categories[check[1]]['image'];
          console.log("cat exists. Updating");
          this.updateCategoryWithActions(data[i]);
        }
      }
    }
    catch(e){
      console.log(e, "oops");
    }
  
    
  }

  checkIfCategoryPresent(category){
    var i=0;
    for(i=0; i<this.categories.length; i++){
      if(this.categories[i]['title'] == category['title'])
        return [true, i];
    return [false, 0];
    }
  }
}
