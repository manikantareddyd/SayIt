import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Murmurhash3Gc } from "../providers/murmurhash3-gc";

import 'rxjs/add/operator/map';

declare var cordova: any;
/*
  Generated class for the ShareService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShareService {

  constructor(
    public file: File,
    public ss: SocialSharing,
    public mmh3gc: Murmurhash3Gc 
  ) {
  }

  share(categories){
    var category_str = JSON.stringify(categories);
    var hash = this.mmh3gc.getHash(category_str, 42).toString();
    console.log(hash);
    var data = {
      "hash":hash, 
      "categories":categories
    };
    console.log(JSON.stringify(data));
    var msg = "Actions for SayIt App. Refer to sayit help."
    this.writeExistingFile(msg, data);
    /*this.file.checkFile(
      this.file.dataDirectory, 
      "sayit.txt"
    ).then(
      (state) => {
        if(state){
          this.writeExistingFile(msg, data);
        }
        else{
          this.writeNew(msg, data);
        }
      }
    ).catch((e)=>{
      console.log("couldnt find state", e);
    });*/
  }

  writeNew(msg, data){
    this.file.writeFile(
      this.file.dataDirectory, 
      "sayit.txt", 
      JSON.stringify(data), 
      true
    ).then(
      (update) => {
        this.invokeShare(msg);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }
  
  writeExistingFile(msg, data){
    this.file.removeFile(
      this.file.dataDirectory,
      "sayit.txt"
    ).then(
      ()=>{
        this.writeNew(msg, data);
      }
    ).catch(
      (er)=>{
        this.writeNew(msg, data);
        console.log(er);
      }
    )
  }

  invokeShare(msg){
    this.ss.share(msg, "SayItData.txt", this.file.dataDirectory+"/sayit.txt", "")
    .then(
      (update) => {
      }
    ).catch(
      (err)=>{
        console.log(err);
      }
    );
  }
}
