import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
    public http: Http,
    public file: File,
    public ss: SocialSharing,
    public mmh3gc: Murmurhash3Gc 
  ) {
  }

  share(categories){
    var category_str = JSON.stringify(categories);
    var hash = this.mmh3gc.getHash(category_str, 42).toString();
    console.log(hash);
    var data = {"hash":hash, "categories":categories};
    var msg = "Actions for SayIt App. Refer to sayit help."
    this.file.writeFile(
      this.file.dataDirectory, 
      "sayit.data", 
      JSON.stringify(data), 
      true).then(
        (update) => {
          this.ss.share(msg, "SayIt Data", this.file.dataDirectory+"/sayit.data", "").then(
            (update) => {
            }
          ).catch(
            (err)=>{
              console.log(err);
            }
          )
        }
      ).catch(
        (err) => {
          console.log(err);
        }
    );
  }

}
