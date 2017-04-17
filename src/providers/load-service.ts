import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import { Platform, ToastController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { SayItService } from '../providers/sayit-service';
import { FilePath } from 'ionic-native';
import { Murmurhash3Gc } from "../providers/murmurhash3-gc";

/*
  Generated class for the LoadService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoadService {

  constructor(
      public file: File,
      public fileChooser: FileChooser,
      public toastCtrl: ToastController,
      public sayItService: SayItService,
      public platform: Platform,
      public mmh3gc: Murmurhash3Gc 
    ) {
    console.log('Hello LoadService Provider');
  }
  
  LoadFromFile(){
    this.fileChooser.open()
    .then(uri => {
      if (this.platform.is('android')) 
      {
        FilePath.resolveNativePath(uri)
        .then(filePath => {
          console.log(filePath);
          let currentName = uri.substring(uri.lastIndexOf('/') + 1);
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          console.log(correctPath, currentName);
          this.readFromFile(correctPath, currentName);
        }).catch((er)=>{
          console.log(er, "couldn't resolve");
        });
      }else {
        var currentName = uri.substr(0, uri.lastIndexOf('/') + 1);
        var correctPath = uri.substr(0, uri.lastIndexOf('/') + 1);
        this.readFromFile(correctPath, currentName);
      }
    }
    ).catch(e => 
      console.log(e, "couln't choose")
    );
  }

  readFromFile(path, name){
    this.file.readAsText(path, name)
    .then((jsontxt)=>{
      try{
        this.matchHash(JSON.parse(jsontxt));
      }
      catch(e){
        console.log("invalid data");
        this.presentToast("Not a SayIt Data File");
      }
    }).catch((er)=>{
      console.log(er, "couldn't read");
    });
  }

  matchHash(data){
    var currHash = data['hash'];
    var currCat = data['categories'];
    var actHash = this.mmh3gc.getHash(JSON.stringify(currCat), 42).toString();
    console.log(data, currCat, currHash, actHash);
    if(currHash == actHash){
      console.log("Hash Match");
      this.sayItService.loadFromJSONData(currCat);
    }
    else{
      this.presentToast("Invalid Data");
    }
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
