import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@Injectable()
export class SayItService {
  KEY_CATEGORIES = 'st.categories';
  KEY_BOOTCOUNT = 'st.boot';
  categories;
  defaultImg = "assets/img/bg.png";
  BootCount = 0;
  defaultCats = [
            {
              "title": "Food",
              "image": "assets/boot/food.png",
              "actions":[
                {
                  "title":"Good Food",
                  "text": "This Food is delicious",
                  "image": "assets/boot/good_food.png"
                },
                {
                  "title":"Hot Food",
                  "text": "The Food is really Hot",
                  "image": "assets/boot/hot_food.png"
                }
              ]
            },
            {
              "title": "Water",
              "image": "assets/boot/water.png",
              "actions":[
                {
                  "title":"Thirsty",
                  "text": "I am very thirsty",
                  "image": "assets/boot/thirsty.png"
                }
              ]
            }
          ];
  constructor(
    public storage: Storage,
    public tts: TextToSpeech
  ) {
    // storage.clear();
  }

  public getBoot()
  {
    return this.BootCount;
  }

  public firstBoot(){
     return new Promise((resolve, reject) => {
      this.storage.get(this.KEY_BOOTCOUNT).then((bootCount) => {
        if(!bootCount)
        {
          this.BootCount += 1;
          this.storage.set(this.KEY_CATEGORIES, this.defaultCats);
          this.categories = this.defaultCats;
          this.storage.set(this.KEY_BOOTCOUNT, this.BootCount);
        }
        else
        {
          this.BootCount = bootCount + 1;
          this.storage.set(this.KEY_BOOTCOUNT, this.BootCount);
        }
        resolve(this.getBoot());
      })
    })
    
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
      },categories
      {
        ...
      },
      ...
    ]
  */

  reset(){
    this.storage.set('st.categories', []);
    // this.storage.set('st.fBoot', 0);
  }
  generateCategoryKey(){
    var last = Object.keys(this.categories).length - 1;
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

  updateCategoryWithActions(original_category, new_actions)
  {
    console.log("new actions", new_actions, new_actions[0], new_actions.length);
    var i = 0;
    while(i < new_actions.length)
    {
      console.log("i", i, "Action", new_actions[i], "cat", original_category);
      this.addAction(new_actions[i], original_category);
      i++;
    }
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
    var last = Object.keys(category['actions']).length - 1;
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
    this.tts.speak(action['text']).catch(
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
        if(check[0])
        {
          data[i]['key']=this.categories[check[1]]['key'];
          data[i]['image'] = this.defaultImg;
          console.log("cat exists. Updating", data[i]['actions']);
          this.updateCategoryWithActions(this.categories[check[1]], data[i]['actions']);          
        }
        else{
          console.log("new category");
          this.addCategory(data[i]);
        }
      }
    }
    catch(e){
      console.log(e, "oops");
    }
  
    
  }

  checkIfCategoryPresent(category)
  {
    var i=0;
    for(var catKey in this.categories)
    {
      console.log(this.categories[catKey]['title'], category['title'])
      if(this.categories[catKey]['title'] == category['title'])
      {
        return [1, catKey];
      }
    } 
    return [0, 0];
  }
}
