import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the ModeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ModeService {
  KEY_MODE = "st.mode";
  mode;
  constructor(public storage: Storage) {
    //console.log('Hello ModeService Provider');
  }
  

  updateMode(mode){
    this.mode = mode;
    //console.log("in mode service changed to ", mode);
    this.storage.set(this.KEY_MODE, this.mode);
    return this.mode;
  }
  
  returnMode(){
    return this.mode;
  }

  getMode(){
    var promise = new Promise((resolve, reject)=>{
      this.storage.get(this.KEY_MODE).then((mode)=>{
        if(!mode){
          this.mode = "mode1";
          //console.log(this.mode, "service promise");
        }
        else{
          this.mode = mode;
        }
        resolve(this.returnMode());
      })
    });
    return promise;
  }


}
